import { sanitizeJsonb } from '../jsonbSanitizer'
import { v4 as uuidv4 } from 'uuid'
// import { supabase } from '../supabaseClient' // 실제 연동 시

export class FormSubmissionModel {
  static async insert(projectId: string, blockId: string, rawFormData: any) {
    const sanitizedData = sanitizeJsonb(rawFormData)
    
    const newSubmission = {
      id: uuidv4(),
      projectId,
      blockId,
      formData: sanitizedData,
      createdAt: new Date().toISOString()
    }

    // TODO: Supabase 실제 삽입
    // const { data, error } = await supabase.from('FormSubmission').insert([newSubmission])
    // if (error) throw error

    return newSubmission
  }

  static async getByProject(projectId: string) {
    // TODO: Supabase 실제 조회
    // const { data, error } = await supabase.from('FormSubmission').select('*').eq('projectId', projectId).order('createdAt', { ascending: false })
    // if (error) throw error
    // return data
    return []
  }
}
