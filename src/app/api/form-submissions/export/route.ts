import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // TODO: DB에서 FormSubmission 데이터 조회 후 CSV/Excel 형식으로 변환하여 반환
  // const { searchParams } = new URL(req.url)
  // const projectId = searchParams.get('projectId')
  
  const mockCsv = '이름,연락처,문의내용\n홍길동,010-1234-5678,예약 문의합니다.'
  
  return new NextResponse(mockCsv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="inquiries.csv"',
    },
  })
}
