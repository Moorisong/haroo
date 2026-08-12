import BlkPoll01 from '../components/blocks/blk_poll_01'
import BlkActionList01 from '../components/blocks/blk_action_list_01'
import BlkCalendar01 from '../components/blocks/blk_calendar_01'
import BlkTable01 from '../components/blocks/blk_table_01'
import BlkTimeline01 from '../components/blocks/blk_timeline_01'
import BlkFileDownload01 from '../components/blocks/blk_file_download_01'
import BlkReview01 from '../components/blocks/blk_review_01'
import BlkRanking01 from '../components/blocks/blk_ranking_01'
import BlkFloatingButton01 from '../components/blocks/blk_floating_button_01'
import { renderToString } from 'react-dom/server'
import React from 'react'

async function runTests() {
  console.log('Testing versatile blocks...')

  const blocks = [
    { name: 'BlkPoll01', Component: BlkPoll01 },
    { name: 'BlkActionList01', Component: BlkActionList01 },
    { name: 'BlkCalendar01', Component: BlkCalendar01 },
    { name: 'BlkTable01', Component: BlkTable01 },
    { name: 'BlkTimeline01', Component: BlkTimeline01 },
    { name: 'BlkFileDownload01', Component: BlkFileDownload01 },
    { name: 'BlkReview01', Component: BlkReview01 },
    { name: 'BlkRanking01', Component: BlkRanking01 },
    { name: 'BlkFloatingButton01', Component: BlkFloatingButton01 }
  ]

  let passed = 0
  for (const block of blocks) {
    try {
      const html = renderToString(<block.Component config={{}} />)
      if (html.length > 0) {
        console.log(`✅ ${block.name} rendered successfully.`)
        passed++
      } else {
        console.error(`❌ ${block.name} rendered empty HTML.`)
      }
    } catch (e: any) {
      console.error(`❌ ${block.name} failed to render:`, e.message)
    }
  }

  console.log(`\nTest results: ${passed}/${blocks.length} passed.`)
  if (passed !== blocks.length) {
    process.exit(1)
  }
}

runTests().catch(console.error)
