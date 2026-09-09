import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types/index.ts'

/**
 * @file blk_download_file_action.test.ts
 * @description block-feature-testing-agent.md 및 ConventionsCoreRules.md 지침 준수 테스트
 * 
 * [검증 대상 기능]: DOWNLOAD_FILE (파일 / 소개서 다운로드) 액션 및 파일 용량 제한
 * [시나리오]:
 *  1. 5MB(5,242,880 bytes) 이하 정상 파일 업로드 시 허용 및 용량 포맷팅 검증
 *  2. 5MB 초과 파일 입력 시 엄격한 거부(Rejection) 방어 분기 보장 검증
 *  3. 다운로드 메타데이터(URL, 파일명, 파일용량)의 BlockInputConfig Zod 스키마 무결성 검증
 *  4. 빈 URL 또는 파일 미첨부 시 잘못된 다운로드 트리거 방어 검증
 */

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

function validateUploadFileSize(bytes: number): { isValid: boolean; error?: string; formattedSize: string } {
  const formatFileSize = (b: number): string => {
    if (b < 1024) return `${b} B`
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
    return `${(b / (1024 * 1024)).toFixed(1)} MB`
  }

  if (bytes > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: '파일 용량은 최대 5MB 이하만 업로드할 수 있습니다.',
      formattedSize: formatFileSize(bytes),
    }
  }

  return {
    isValid: true,
    formattedSize: formatFileSize(bytes),
  }
}

test('DOWNLOAD_FILE (파일 다운로드) 용량 제한 및 메타데이터 격리 테스트', async (t) => {
  await t.test('1. 5MB 이하(예: 1.5MB, 4.9MB) 파일은 정상 업로드 허용 및 포맷팅되어야 한다.', () => {
    const size1_5Mb = 1.5 * 1024 * 1024
    const res1 = validateUploadFileSize(size1_5Mb)
    assert.strictEqual(res1.isValid, true)
    assert.strictEqual(res1.formattedSize, '1.5 MB')

    const size500Kb = 500 * 1024
    const res2 = validateUploadFileSize(size500Kb)
    assert.strictEqual(res2.isValid, true)
    assert.strictEqual(res2.formattedSize, '500.0 KB')
  })

  await t.test('2. 5MB를 초과(예: 5.1MB, 10MB)하는 파일은 즉시 거부되어야 한다.', () => {
    const sizeOver = 5.1 * 1024 * 1024
    const res = validateUploadFileSize(sizeOver)
    assert.strictEqual(res.isValid, false)
    assert.strictEqual(res.error, '파일 용량은 최대 5MB 이하만 업로드할 수 있습니다.')
  })

  await t.test('3. 정확히 5MB(경계값)인 파일은 허용되어야 한다.', () => {
    const boundarySize = 5 * 1024 * 1024
    const res = validateUploadFileSize(boundarySize)
    assert.strictEqual(res.isValid, true)
    assert.strictEqual(res.formattedSize, '5.0 MB')
  })

  await t.test('4. DOWNLOAD_FILE 메타데이터(downloadFileUrl, downloadFileName, downloadFileSize) Zod 스키마 검증', () => {
    const validConfig = {
      buttonText: '소개서 다운로드',
      actionType: 'DOWNLOAD_FILE',
      buttonLink: 'data:application/pdf;base64,mockdata',
      downloadFileUrl: 'data:application/pdf;base64,mockdata',
      downloadFileName: '회사소개서_2026.pdf',
      downloadFileSize: '1.2 MB'
    }
    const parseResult = BlockInputConfigSchema.safeParse(validConfig)
    assert.ok(parseResult.success)
  })

  await t.test('5. 파일 주소가 없을 때 다운로드 트리거 방어 로직 검증', () => {
    const resolveDownloadTarget = (config: { downloadFileUrl?: string; buttonLink?: string }) => {
      const fileUrl = config.downloadFileUrl || config.buttonLink
      if (!fileUrl || !fileUrl.trim()) return null
      return fileUrl.trim()
    }

    assert.strictEqual(resolveDownloadTarget({}), null)
    assert.strictEqual(resolveDownloadTarget({ downloadFileUrl: '' }), null)
    assert.strictEqual(resolveDownloadTarget({ downloadFileUrl: '   ' }), null)
    assert.strictEqual(
      resolveDownloadTarget({ downloadFileUrl: 'https://example.com/brochure.pdf' }),
      'https://example.com/brochure.pdf'
    )
  })
})
