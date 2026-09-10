import { useBuilderStore } from '../stores/useBuilderStore'

function runBlockDragResizeTests() {
  console.log('--- 🧪 Block Drag Resize & Responsive Reflow Unit Test ---')

  const store = useBuilderStore.getState()
  
  // 1. 블록 추가
  console.log('\n[1] Canvas Block Addition Test')
  store.addBlock({ id: 'blk_pricing_01', name: '요금제 카드', tier: 'STARTER' })
  const blocks = useBuilderStore.getState().canvasBlocks
  const addedBlock = blocks.find((b) => b.blockId === 'blk_pricing_01')

  if (!addedBlock) {
    console.error('❌ Failed to add block')
    return
  }
  console.log('✅ Block successfully added:', addedBlock.instanceId)

  // 2. 마우스 드래그 조작으로 가로 폭 narrow (576px) 스냅 및 상하 여백 spacious 업데이트
  console.log('\n[2] Drag Resizing Store Sync Test (Width: narrow, PaddingY: spacious)')
  useBuilderStore.getState().updateBlockInputData(addedBlock.instanceId, {
    containerWidth: 'narrow',
    paddingY: 'spacious',
  })

  const updatedBlock = useBuilderStore.getState().canvasBlocks.find((b) => b.instanceId === addedBlock.instanceId)
  if (
    updatedBlock?.inputConfig?.containerWidth === 'narrow' &&
    updatedBlock?.inputConfig?.paddingY === 'spacious'
  ) {
    console.log('✅ Block inputConfig updated via drag resize handles!')
  } else {
    console.error('❌ Drag resize store update failed:', updatedBlock?.inputConfig)
  }

  // 3. 꽉참(full) 레벨 확대 드래그 테스팅
  console.log('\n[3] Drag Resizing Store Sync Test (Width: full, PaddingY: extraSpacious)')
  useBuilderStore.getState().updateBlockInputData(addedBlock.instanceId, {
    containerWidth: 'full',
    paddingY: 'extraSpacious',
  })

  const fullBlock = useBuilderStore.getState().canvasBlocks.find((b) => b.instanceId === addedBlock.instanceId)
  if (
    fullBlock?.inputConfig?.containerWidth === 'full' &&
    fullBlock?.inputConfig?.paddingY === 'extraSpacious'
  ) {
    console.log('✅ Block layout successfully updated to Full width and ExtraSpacious padding!')
  } else {
    console.error('❌ Full width drag resize failed.')
  }

  // 4. 블록 높이 확장 시 하단 블록 자동 밀림(Auto-shift) 및 새 블록 추가 시 겹침 방지 테스팅
  console.log('\n[4] Block Height Expansion & Auto-shift Test')
  // 두 번째 블록 추가 (비디오 블록)
  store.addBlock({ id: 'blk_video_01', name: '비디오', tier: 'STARTER' })
  const videoBlock = useBuilderStore.getState().canvasBlocks.find((b) => b.blockId === 'blk_video_01')
  if (!videoBlock) {
    throw new Error('❌ Failed to add video block')
  }

  // 초기 상태: pricingBlock 높이 400px 설정
  useBuilderStore.getState().updateBlockInputData(addedBlock.instanceId, { posY: 0, blockHeight: 400 })
  useBuilderStore.getState().updateBlockInputData(videoBlock.instanceId, { posY: 400, blockHeight: 300 })

  // pricingBlock 카드 대량 추가 등으로 높이가 400 -> 1200으로 확장
  useBuilderStore.getState().updateBlockInputData(addedBlock.instanceId, { blockHeight: 1200 })

  const stateAfterShift = useBuilderStore.getState()
  const shiftedVideoBlock = stateAfterShift.canvasBlocks.find((b) => b.instanceId === videoBlock.instanceId)
  
  if (shiftedVideoBlock && (shiftedVideoBlock.inputConfig?.posY ?? 0) >= 1200) {
    console.log(`✅ Lower block automatically shifted down: posY = ${shiftedVideoBlock.inputConfig?.posY}px`)
  } else {
    throw new Error(`❌ Lower block did not shift properly: posY = ${shiftedVideoBlock?.inputConfig?.posY}`)
  }

  // 3번째 블록 추가 시 최하단(1200 + 300 = 1500) 밑으로 추가되는지 검증
  store.addBlock({ id: 'blk_txt_01', name: '텍스트', tier: 'STARTER' })
  const txtBlock = useBuilderStore.getState().canvasBlocks.find((b) => b.blockId === 'blk_txt_01')
  if (txtBlock && (txtBlock.inputConfig?.posY ?? 0) >= 1500) {
    console.log(`✅ Newly added block placed at non-overlapping bottom: posY = ${txtBlock.inputConfig?.posY}px`)
  } else {
    throw new Error(`❌ Newly added block overlapped: posY = ${txtBlock?.inputConfig?.posY}`)
  }

  console.log('\n--- 🏁 Block Drag Resize Tests Complete ---')
}

runBlockDragResizeTests()
