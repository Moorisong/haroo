/**
 * 클라이언트 단 이미지 리사이징 및 WebP/AVIF 압축 유틸리티
 * S3 업로드 전 트래픽 및 스토리지 절약을 위해 사용
 */
export async function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const scaleSize = maxWidth / img.width
        
        let width = img.width
        let height = img.height
        
        if (scaleSize < 1) {
          width = maxWidth
          height = img.height * scaleSize
        }
        
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          return reject(new Error('Canvas context not available'))
        }
        
        ctx.drawImage(img, 0, 0, width, height)
        
        // WebP 포맷으로 압축
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob)
            else reject(new Error('Blob conversion failed'))
          },
          'image/webp',
          quality
        )
      }
      img.onerror = (error) => reject(error)
    }
    reader.onerror = (error) => reject(error)
  })
}
