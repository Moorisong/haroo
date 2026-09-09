import React from 'react'

interface PanelRepeaterFieldProps {
  customFieldType: string
  config: any
  handleChange: (field: string, value: any) => void
}

export default function PanelRepeaterField({ customFieldType, config, handleChange }: PanelRepeaterFieldProps) {
  // Determine which config key stores the array based on the custom field type
  let fieldKey = ''
  let items: any[] = []
  let defaultNewItem: any = { id: Date.now().toString() }

  switch (customFieldType) {
    case 'POLL_OPTIONS':
      fieldKey = 'pollOptions'
      items = config.pollOptions || []
      defaultNewItem = { ...defaultNewItem, label: '새 옵션', votes: 0, percentage: 0 }
      break
    case 'ACTION_ITEMS':
      fieldKey = 'actionItems'
      items = config.actionItems || []
      defaultNewItem = { ...defaultNewItem, title: '새 액션', controlType: 'switch', defaultChecked: false }
      break
    case 'CALENDAR_EVENTS':
      fieldKey = 'calendarEvents'
      items = config.calendarEvents || []
      defaultNewItem = { ...defaultNewItem, date: new Date().toISOString().split('T')[0], title: '새 일정' }
      break
    case 'TIMELINE_ITEMS':
      fieldKey = 'timelineItems'
      items = config.timelineItems || []
      defaultNewItem = { ...defaultNewItem, date: '2026.08.01', title: '새 항목', status: 'pending' }
      break
    case 'REVIEW_ITEMS':
      fieldKey = 'reviewItems'
      items = config.reviewItems || []
      defaultNewItem = { ...defaultNewItem, author: '익명', rating: 5, content: '리뷰 내용' }
      break
    case 'RANKING_ITEMS':
      fieldKey = 'rankingItems'
      items = config.rankingItems || []
      defaultNewItem = { ...defaultNewItem, rank: items.length + 1, title: '새 항목', score: '0' }
      break
    case 'FILE_ITEMS':
      fieldKey = 'fileItems'
      items = config.fileItems || []
      defaultNewItem = { ...defaultNewItem, name: '새 파일.pdf', size: '1MB' }
      break
    default:
      return null // Not supported or TABLE_DATA which requires special handling
  }

  const handleAddItem = () => {
    handleChange(fieldKey, [...items, { ...defaultNewItem, id: Date.now().toString() }])
  }

  const handleRemoveItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    handleChange(fieldKey, newItems)
  }

  const handleUpdateItem = (index: number, key: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [key]: value }
    handleChange(fieldKey, newItems)
  }

  // Common UI to render fields dynamically based on the object keys
  const renderItemFields = (item: any, index: number) => {
    return Object.keys(defaultNewItem).map(key => {
      if (key === 'id') return null
      
      const val = item[key] !== undefined ? item[key] : defaultNewItem[key]
      const strVal = String(val ?? '')
      
      // 항목 종류별 제한 글자수 계산
      let itemMaxLen = 50
      if (['content', 'description', 'hiddenContent'].includes(key)) itemMaxLen = 150
      if (['author', 'name', 'title', 'label'].includes(key)) itemMaxLen = 30
      
      return (
        <div key={key} className="flex flex-col gap-1 w-full mt-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] text-slate-500 uppercase">{key}</label>
            {typeof val !== 'number' && (
              <span className={`text-[9px] ${strVal.length >= itemMaxLen ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                ({strVal.length}/{itemMaxLen}자)
              </span>
            )}
          </div>
          {typeof val === 'number' ? (
            <input 
              type="number" 
              value={val} 
              onChange={(e) => handleUpdateItem(index, key, Number(e.target.value))}
              className="px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-500"
            />
          ) : (
            <input 
              type="text" 
              maxLength={itemMaxLen}
              value={val} 
              onChange={(e) => handleUpdateItem(index, key, e.target.value)}
              className="px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-500"
            />
          )}
        </div>
      )
    })
  }

  return (
    <div className="space-y-3 mt-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-700">시각적 리피터 리스트</label>
        <button 
          onClick={handleAddItem}
          className="px-2 py-1 bg-sky-100 text-sky-700 hover:bg-sky-200 rounded text-xs font-semibold"
        >
          + 추가
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {items.length === 0 && (
          <div className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded border border-slate-100">
            항목이 없습니다.
          </div>
        )}
        {items.map((item, index) => (
          <div key={item.id || index} className="p-3 bg-white border border-slate-200 rounded shadow-sm relative group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-600">항목 {index + 1}</span>
              <button 
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700 text-xs px-1"
              >
                삭제
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
               {renderItemFields(item, index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
