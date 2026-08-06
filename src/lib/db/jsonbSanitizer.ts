/**
 * XSS 방지 JSONB Sanitizer
 * DB 삽입 전 악성 스크립트 태그 및 이벤트 핸들러 제거
 */
export function sanitizeJsonb(data: any): any {
  if (typeof data === 'string') {
    // 1. <script> 태그 및 내용 제거
    let sanitized = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // 2. onclick, onerror 등 이벤트 핸들러 제거
    sanitized = sanitized.replace(/ on\w+="[^"]*"/gi, '')
    sanitized = sanitized.replace(/ on\w+='[^']*'/gi, '')
    // 3. javascript: URI 제거
    sanitized = sanitized.replace(/javascript:[^"']*/gi, '')
    return sanitized
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeJsonb)
  }

  if (data !== null && typeof data === 'object') {
    const sanitizedObj: any = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        sanitizedObj[key] = sanitizeJsonb(data[key])
      }
    }
    return sanitizedObj
  }

  return data
}
