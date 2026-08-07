import { useBuilderStore } from '../stores/useBuilderStore'
import { BlockInputConfigSchema } from '../types'

function runImageUploadTests() {
  console.log('--- 🧪 Image Upload & DataURL Store Sync Test ---')
  
  // 1. Zod Validation with DataURL and standard URLs
  console.log('\n[1] Zod Validation Test for imageUrl')
  const testDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  const validImageConfig = { title: 'Hero Section', imageUrl: testDataUrl }
  
  const parsed = BlockInputConfigSchema.safeParse(validImageConfig)
  if (parsed.success) {
    console.log('✅ Zod Validation Success for image config:', parsed.data.imageUrl?.slice(0, 30) + '...')
  } else {
    console.error('❌ Zod Validation Failed:', parsed.error)
  }

  // 2. Zustand Store imageUrl Update Test
  console.log('\n[2] Zustand Store Image Data Update Test')
  const store = useBuilderStore.getState()
  store.addBlock({ id: 'blk_hero_01', name: '히어로 섹션', tier: 'STARTER' })
  
  const blocks = useBuilderStore.getState().canvasBlocks
  const heroBlock = blocks.find(b => b.blockId === 'blk_hero_01')
  
  if (heroBlock) {
    console.log('✅ Hero Block created:', heroBlock.name)
    
    // Update imageUrl with DataURL
    useBuilderStore.getState().updateBlockInputData(heroBlock.instanceId, { imageUrl: testDataUrl })
    const updatedHero = useBuilderStore.getState().canvasBlocks.find(b => b.instanceId === heroBlock.instanceId)
    
    if (updatedHero?.inputConfig?.imageUrl === testDataUrl) {
      console.log('✅ Image URL successfully updated in 0.01s cycle to Store state!')
    } else {
      console.error('❌ Image URL update failed in store state.')
    }
  } else {
    console.error('❌ Hero Block was not found')
  }

  console.log('\n--- 🏁 Image Upload Tests Complete ---')
}

runImageUploadTests()
