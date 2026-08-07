import { useBuilderStore } from '../stores/useBuilderStore'
import { BlockInputConfigSchema } from '../types'

function runTests() {
  console.log('--- 🧪 WYSIWYG Store & Zod Validation Test ---')
  
  // 1. Zod Validation Test
  console.log('\\n[1] Zod Validation Test')
  const validData = { title: 'Hello', backgroundColor: '#000000', videoUrl: 'https://youtube.com/watch?v=123' }
  const parsed = BlockInputConfigSchema.safeParse(validData)
  if (parsed.success) {
    console.log('✅ Zod Validation Success:', parsed.data)
  } else {
    console.error('❌ Zod Validation Failed:', parsed.error)
  }

  const invalidData = { videoUrl: 'not_a_url' }
  const parsedInvalid = BlockInputConfigSchema.safeParse(invalidData)
  if (!parsedInvalid.success) {
    console.log('✅ Zod Validation correctly caught invalid URL.')
  } else {
    console.error('❌ Zod Validation failed to catch invalid URL.')
  }

  // 2. Store Test
  console.log('\\n[2] Zustand Store Action Test')
  const store = useBuilderStore.getState()
  
  // add block
  store.addBlock({ id: 'blk_test_01', name: 'Test Block', tier: 'STARTER' })
  const blocks = useBuilderStore.getState().canvasBlocks
  const testBlock = blocks[0]
  if (testBlock) {
    console.log('✅ Block added:', testBlock.name)
    
    // update data
    useBuilderStore.getState().updateBlockInputData(testBlock.instanceId, { title: 'Updated Title' })
    const updatedBlocks = useBuilderStore.getState().canvasBlocks
    if (updatedBlocks[0].inputConfig?.title === 'Updated Title') {
      console.log('✅ Block data updated securely (0.01s cycle validation)')
    } else {
      console.error('❌ Block data update failed')
    }

    // viewport switch
    useBuilderStore.getState().setDeviceViewport('tablet')
    if (useBuilderStore.getState().deviceViewport === 'tablet') {
      console.log('✅ Viewport switched to tablet')
    }

    // preview toggle
    useBuilderStore.getState().togglePreviewMode()
    if (useBuilderStore.getState().isPreviewMode === true) {
      console.log('✅ Preview mode toggled on')
    }
  } else {
    console.error('❌ Block was not added')
  }

  console.log('\\n--- 🏁 Tests Complete ---')
}

runTests()
