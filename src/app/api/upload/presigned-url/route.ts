import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { filename, contentType } = await req.json()
    
    // TODO: AWS SDK를 사용하여 S3 Presigned URL 생성
    // const command = new PutObjectCommand({ Bucket, Key, ContentType })
    // const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    
    const mockUrl = `https://mock-s3-bucket.s3.ap-northeast-2.amazonaws.com/${filename}?sig=mock`
    
    return NextResponse.json({ url: mockUrl })
  } catch (error) {
    console.error('[api/upload/presigned-url]', error)
    return NextResponse.json({ error: 'URL 생성 실패' }, { status: 500 })
  }
}
