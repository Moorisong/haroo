import { v4 as uuidv4 } from 'uuid'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function maskPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '')
  if (digits.length < 8) return '***-****-****'
  return digits.slice(0, 3) + '-****-' + digits.slice(-4)
}

async function supabaseServiceFetch(path: string, options?: RequestInit) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null
  const url = `${SUPABASE_URL}/rest/v1${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Prefer: 'return=representation',
      ...(options?.headers || {}),
    },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Supabase error (${res.status}): ${err}`)
  }
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export interface WaitlistSignupRow {
  id: string
  project_id: string
  phone_masked: string
  phone_raw: string | null
  status: 'PENDING' | 'NOTIFIED'
  notified_at: string | null
  created_at: string
}

export class WaitlistSignupModel {
  /**
   * 신청자 저장 - phoneMasked만 저장, phone_raw는 선택적
   */
  static async insert(
    projectId: string,
    phone: string
  ): Promise<WaitlistSignupRow> {
    const row: Omit<WaitlistSignupRow, 'created_at'> = {
      id: uuidv4(),
      project_id: projectId,
      phone_masked: maskPhone(phone),
      phone_raw: phone,
      status: 'PENDING',
      notified_at: null,
    }

    try {
      const data = await supabaseServiceFetch('/waitlist_signups', {
        method: 'POST',
        body: JSON.stringify(row),
      })
      console.log(`[Waitlist] 신청 저장: ${maskPhone(phone)} (project: ${projectId})`)
      return (data?.[0] || row) as WaitlistSignupRow
    } catch (err) {
      console.error('[WaitlistSignup] insert 오류:', err)
      return { ...row, created_at: new Date().toISOString() }
    }
  }

  /**
   * 프로젝트별 신청자 목록 조회 (마스킹 번호 + 상태)
   */
  static async getByProject(projectId: string): Promise<WaitlistSignupRow[]> {
    try {
      const data = await supabaseServiceFetch(
        `/waitlist_signups?project_id=eq.${encodeURIComponent(projectId)}&order=created_at.desc&select=id,project_id,phone_masked,status,notified_at,created_at`
      )
      return (data || []) as WaitlistSignupRow[]
    } catch (err) {
      console.error('[WaitlistSignup] getByProject 오류:', err)
      return []
    }
  }

  /**
   * 미발송 신청자 원본 번호 조회 (발송 전용)
   */
  static async getPendingPhones(
    projectId: string
  ): Promise<Array<{ id: string; phone: string }>> {
    try {
      const data = await supabaseServiceFetch(
        `/waitlist_signups?project_id=eq.${encodeURIComponent(projectId)}&status=eq.PENDING&select=id,phone_raw`
      )
      return ((data || []) as Array<{ id: string; phone_raw: string | null }>)
        .filter((r) => r.phone_raw)
        .map((r) => ({ id: r.id, phone: r.phone_raw! }))
    } catch (err) {
      console.error('[WaitlistSignup] getPendingPhones 오류:', err)
      return []
    }
  }

  /**
   * 발송 완료 처리 (status → NOTIFIED)
   */
  static async markNotified(ids: string[]): Promise<void> {
    if (ids.length === 0) return
    const inList = `(${ids.map((id) => `"${id}"`).join(',')})`
    try {
      await supabaseServiceFetch(
        `/waitlist_signups?id=in.${inList}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status: 'NOTIFIED', notified_at: new Date().toISOString() }),
        }
      )
    } catch (err) {
      console.error('[WaitlistSignup] markNotified 오류:', err)
    }
  }

  /**
   * 총 신청자 수 조회
   */
  static async countByProject(projectId: string): Promise<number> {
    try {
      const res = await supabaseServiceFetch(
        `/waitlist_signups?project_id=eq.${encodeURIComponent(projectId)}&select=id`
      )
      return Array.isArray(res) ? res.length : 0
    } catch {
      return 0
    }
  }
}
