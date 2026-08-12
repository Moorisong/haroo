import React from 'react'
import { render } from '@testing-library/react'
import BlkPoll01 from '../components/blocks/blk_poll_01'
import BlkActionList01 from '../components/blocks/blk_action_list_01'
import BlkCalendar01 from '../components/blocks/blk_calendar_01'
import BlkTable01 from '../components/blocks/blk_table_01'
import BlkTimeline01 from '../components/blocks/blk_timeline_01'
import BlkFileDownload01 from '../components/blocks/blk_file_download_01'

describe('Project Versatile Blocks', () => {
  it('renders BlkPoll01 without crashing', () => {
    const { container } = render(<BlkPoll01 config={{}} />)
    expect(container).toBeTruthy()
  })

  it('renders BlkActionList01 without crashing', () => {
    const { container } = render(<BlkActionList01 config={{}} />)
    expect(container).toBeTruthy()
  })

  it('renders BlkCalendar01 without crashing', () => {
    const { container } = render(<BlkCalendar01 config={{}} />)
    expect(container).toBeTruthy()
  })

  it('renders BlkTable01 without crashing', () => {
    const { container } = render(<BlkTable01 config={{}} />)
    expect(container).toBeTruthy()
  })

  it('renders BlkTimeline01 without crashing', () => {
    const { container } = render(<BlkTimeline01 config={{}} />)
    expect(container).toBeTruthy()
  })

  it('renders BlkFileDownload01 without crashing', () => {
    const { container } = render(<BlkFileDownload01 config={{}} />)
    expect(container).toBeTruthy()
  })
})
