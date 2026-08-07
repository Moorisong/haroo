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

  console.log('\n--- 🏁 Block Drag Resize Tests Complete ---')
}

runBlockDragResizeTests()
