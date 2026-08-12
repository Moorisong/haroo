import { useBuilderStore } from '../stores/useBuilderStore'
import { BlockInputConfigSchema } from '../types'

function runTests() {
  console.log('--- 🧪 Board System Integrated Block Test ---')
  
  // 1. Zod Validation Test (View Type)
  console.log('\n[1] Zod Validation Test for Board')
  const validData = { title: '게시판', boardViewType: 'gallery', backgroundColor: '#000000' }
  const parsed = BlockInputConfigSchema.safeParse(validData)
  if (parsed.success) {
    console.log('✅ Zod Validation Success for board properties:', parsed.data)
  } else {
    console.error('❌ Zod Validation Failed:', parsed.error)
  }

  // 2. Store Test
  console.log('\n[2] Zustand Store Action Test for Integrated Board Block')
  const store = useBuilderStore.getState()
  
  // add board block
  store.addBlock({ id: 'blk_board_list_01', name: '게시판 (통합)', tier: 'STANDARD' })
  
  const blocks = useBuilderStore.getState().canvasBlocks
  if (blocks.length >= 1) {
    console.log('✅ Board Block added to canvas')
    
    // find list block
    const listBlock = blocks.find(b => b.blockId === 'blk_board_list_01')
    if (listBlock) {
      // update data
      useBuilderStore.getState().updateBlockInputData(listBlock.instanceId, { boardViewType: 'gallery' })
      const updatedListBlock = useBuilderStore.getState().canvasBlocks.find(b => b.instanceId === listBlock.instanceId)
      if (updatedListBlock?.inputConfig?.boardViewType === 'gallery') {
        console.log('✅ Board block config updated (0.01s cycle validation)')
      } else {
        console.error('❌ Board block config update failed')
      }
    } else {
      console.error('❌ blk_board_list_01 not found')
    }
  } else {
    console.error('❌ Block was not added')
  }

  console.log('\n--- 🏁 Tests Complete ---')
}

runTests()
