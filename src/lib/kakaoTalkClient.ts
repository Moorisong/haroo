export class KakaoTalkClient {
  /**
   * 알림톡 단건 발송 (예: 폼 제출 시 사장님께 알림)
   */
  static async sendAlimtalk(phone: string, templateCode: string, variables: Record<string, string>) {
    // TODO: 알리고(Aligo) 또는 솔루피아 등 알림톡 API 연동
    console.log(`[KakaoTalk] 알림톡 발송 -> ${phone} (${templateCode})`, variables)
    return { success: true }
  }

  /**
   * LMS 대체 발송 (알림톡 실패 시)
   */
  static async sendLmsFallback(phone: string, message: string) {
    // TODO: LMS 발송 API 연동
    console.log(`[KakaoTalk] LMS 대체 발송 -> ${phone}`, message)
    return { success: true }
  }

  /**
   * 대기자 일괄 발송 (2차 오픈 등)
   */
  static async broadcast(phones: string[], templateCode: string) {
    // TODO: 일괄 발송 API 연동
    console.log(`[KakaoTalk] 대기자 ${phones.length}명 일괄 발송 (${templateCode})`)
    return { success: true }
  }
}
