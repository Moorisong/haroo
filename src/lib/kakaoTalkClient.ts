/**
 * KakaoTalkClient - 알리고(Aligo) REST API 연동
 *
 * 환경변수 미설정 시 dry-run 모드 (콘솔 로그만 출력, 에러 없이 성공 반환)
 * 실발송을 위해 .env.local에:
 *   ALIGO_API_KEY, ALIGO_USER_ID, ALIGO_SENDER,
 *   ALIGO_KAKAO_SENDER_KEY, ALIGO_KAKAO_TEMPLATE_CODE
 */

const ALIGO_BASE_URL = 'https://kakaoapi.aligo.in'
const SMS_BASE_URL = 'https://apis.aligo.in'

const isDryRun = !process.env.ALIGO_API_KEY || !process.env.ALIGO_USER_ID

function maskPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '')
  if (digits.length < 8) return phone
  return digits.slice(0, 3) + '-****-' + digits.slice(-4)
}

interface AligoResult {
  success: boolean
  code?: number | string
  message?: string
  isDryRun?: boolean
}

export class KakaoTalkClient {
  /**
   * 알림톡 단건 발송 (카카오 미설치 시 LMS 자동 대체)
   */
  static async sendAlimtalk(
    phone: string,
    templateCode: string,
    variables: Record<string, string>
  ): Promise<AligoResult> {
    if (isDryRun) {
      console.log(`[DRY-RUN] 알림톡 -> ${maskPhone(phone)} (${templateCode})`, variables)
      return { success: true, isDryRun: true }
    }

    const token = await KakaoTalkClient.getToken()
    if (!token) {
      console.warn('[KakaoTalk] 토큰 발급 실패 - LMS fallback')
      return KakaoTalkClient.sendLmsFallback(phone, KakaoTalkClient.buildMessage(variables))
    }

    const tplCode = templateCode || process.env.ALIGO_KAKAO_TEMPLATE_CODE || 'TPL_WAITLIST_01'
    const message = KakaoTalkClient.buildMessage(variables)

    const body = new URLSearchParams({
      apikey: process.env.ALIGO_API_KEY!,
      userid: process.env.ALIGO_USER_ID!,
      senderkey: process.env.ALIGO_KAKAO_SENDER_KEY!,
      tpl_code: tplCode,
      sender: process.env.ALIGO_SENDER!,
      receiver_1: phone,
      recvname_1: variables['name'] || '고객',
      subject_1: '알림 신청 접수',
      message_1: message,
      token,
      failover: 'Y',
      fsubject_1: '알림 신청 접수',
      fmessage_1: message,
    })

    try {
      const res = await fetch(`${ALIGO_BASE_URL}/akv10/alimtalk/send/`, { method: 'POST', body })
      const data = await res.json()
      if (data.code !== 100) {
        console.warn('[KakaoTalk] 알림톡 발송 실패:', data.message)
        return { success: false, code: data.code, message: data.message }
      }
      return { success: true, code: data.code }
    } catch (err) {
      console.error('[KakaoTalk] sendAlimtalk 오류:', err)
      return KakaoTalkClient.sendLmsFallback(phone, message)
    }
  }

  /**
   * LMS 대체 발송 (알림톡 실패 시)
   */
  static async sendLmsFallback(phone: string, message: string): Promise<AligoResult> {
    if (isDryRun) {
      console.log(`[DRY-RUN] LMS 대체 -> ${maskPhone(phone)}`, message)
      return { success: true, isDryRun: true }
    }
    try {
      const body = new URLSearchParams({
        key: process.env.ALIGO_API_KEY!,
        user_id: process.env.ALIGO_USER_ID!,
        sender: process.env.ALIGO_SENDER!,
        receiver: phone,
        msg: message,
        msg_type: 'LMS',
        title: '알림 신청 접수',
      })
      const res = await fetch(`${SMS_BASE_URL}/send/`, { method: 'POST', body })
      const data = await res.json()
      return { success: data.result_code === '1', code: data.result_code }
    } catch (err) {
      console.error('[KakaoTalk] sendLmsFallback 오류:', err)
      return { success: false, message: String(err) }
    }
  }

  /**
   * 대기자 일괄 발송 (500건 초과 시 자동 배치)
   */
  static async broadcast(
    phones: string[],
    templateCode: string,
    customMessage?: string
  ): Promise<{ success: boolean; sent: number; failed: number }> {
    if (isDryRun) {
      console.log(`[DRY-RUN] 일괄 발송 ${phones.length}명 (${templateCode})`)
      return { success: true, sent: phones.length, failed: 0 }
    }

    const BATCH_SIZE = 500
    let sent = 0
    let failed = 0
    const msg = customMessage || '[하루] 신청하신 서비스가 오픈되었습니다. 지금 바로 확인해보세요!'

    for (let i = 0; i < phones.length; i += BATCH_SIZE) {
      const batch = phones.slice(i, i + BATCH_SIZE)
      const token = await KakaoTalkClient.getToken()
      if (!token) { failed += batch.length; continue }

      const body = new URLSearchParams({
        apikey: process.env.ALIGO_API_KEY!,
        userid: process.env.ALIGO_USER_ID!,
        senderkey: process.env.ALIGO_KAKAO_SENDER_KEY!,
        tpl_code: templateCode,
        sender: process.env.ALIGO_SENDER!,
        token,
        failover: 'Y',
      })

      batch.forEach((phone, idx) => {
        body.set(`receiver_${idx + 1}`, phone)
        body.set(`recvname_${idx + 1}`, '고객')
        body.set(`subject_${idx + 1}`, '오픈 알림')
        body.set(`message_${idx + 1}`, msg)
        body.set(`fsubject_${idx + 1}`, '오픈 알림')
        body.set(`fmessage_${idx + 1}`, msg)
      })

      try {
        const res = await fetch(`${ALIGO_BASE_URL}/akv10/alimtalk/send/`, { method: 'POST', body })
        const data = await res.json()
        if (data.code === 100) { sent += batch.length } else { failed += batch.length }
      } catch { failed += batch.length }
    }

    return { success: failed === 0, sent, failed }
  }

  private static async getToken(): Promise<string | null> {
    try {
      const body = new URLSearchParams({
        apikey: process.env.ALIGO_API_KEY!,
        userid: process.env.ALIGO_USER_ID!,
      })
      const res = await fetch(`${ALIGO_BASE_URL}/akv10/token/create/30/`, { method: 'POST', body })
      const data = await res.json()
      return data.code === 100 ? data.token : null
    } catch { return null }
  }

  private static buildMessage(variables: Record<string, string>): string {
    return variables['message'] || '[하루] 알림 신청이 완료되었습니다.\n오픈 시 카카오톡으로 안내해 드립니다.'
  }
}
