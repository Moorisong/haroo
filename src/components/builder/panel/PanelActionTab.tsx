import React, { useState, useEffect } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { ACTION_OPTIONS, PANEL_LABELS } from './constants'
import type { BlockInputConfig } from '@/types'
import type { BlockCapability } from '../SidePropertyPanel'
import FileUploadField from './FileUploadField'
import ButtonSelectorChips from './ButtonSelectorChips'
import ActionDetailFields from './ActionDetailFields'

interface PanelActionTabProps {
  cap: BlockCapability
  config: BlockInputConfig & Record<string, any>
  handleChange: (fieldOrData: string | Record<string, any>, value?: any) => void
}

export default function PanelActionTab({ cap, config, handleChange }: PanelActionTabProps) {
  const { pages, canvasBlocks, highlightPageSwitcher } = useBuilderStore()
  const [selectedBtnIndex, setSelectedBtnIndex] = useState<number>(0)

  const isActionAllowed = (action: string) => {
    if (!cap.allowedActions) return true
    return cap.allowedActions.includes(action)
  }

  // Ensure config.buttons array is initialized or sync with legacy buttonText/actionType
  const buttons = config.buttons && config.buttons.length > 0 ? config.buttons : [
    {
      id: 'btn_primary',
      text: config.buttonText || '버튼 1',
      variant: 'primary',
      actionType: config.actionType || '',
      buttonLink: config.buttonLink || '',
      notifyKakao: config.notifyKakao,
      thankYouMessage: config.thankYouMessage,
      modalIcon: config.modalIcon,
      paymentAmount: config.paymentAmount,
      paymentSuccessUrl: config.paymentSuccessUrl,
      customTargetId: config.customTargetId,
      customEffect: config.customEffect
    }
  ]

  const currentBtn = buttons[selectedBtnIndex] || buttons[0]

  useEffect(() => {
    if (currentBtn?.actionType === 'NAVIGATE_PAGE' && pages.length <= 1) {
      highlightPageSwitcher(true)
    }
  }, [currentBtn?.actionType, pages.length, highlightPageSwitcher])

  const handleUpdateButton = (field: string, value: any) => {
    const updatedButtons = [...buttons]
    updatedButtons[selectedBtnIndex] = {
      ...updatedButtons[selectedBtnIndex],
      [field]: value
    }
    handleChange('buttons', updatedButtons)

    // Legacy sync for single button compatibility
    if (selectedBtnIndex === 0) {
      handleChange(field, value)
    }
  }

  const handleActionTypeChange = (newAction: string) => {
    if (newAction === currentBtn.actionType) return

    const updatedButtons = [...buttons]
    updatedButtons[selectedBtnIndex] = {
      ...updatedButtons[selectedBtnIndex],
      actionType: newAction,
      buttonLink: '',
      customTargetId: '',
      thankYouMessage: '',
      downloadFileUrl: '',
      downloadFileName: '',
      downloadFileSize: '',
    }

    if (selectedBtnIndex === 0) {
      handleChange({
        buttons: updatedButtons,
        actionType: newAction,
        buttonLink: '',
        customTargetId: '',
        thankYouMessage: '',
        downloadFileUrl: '',
        downloadFileName: '',
        downloadFileSize: '',
      })
    } else {
      handleChange('buttons', updatedButtons)
    }
  }

  const handleAddButton = () => {
    if (buttons.length >= 3) return
    const newBtn = {
      id: `btn_${Date.now()}`,
      text: `보조 버튼 ${buttons.length}`,
      variant: 'outline',
      actionType: 'OPEN_URL'
    }
    const updated = [...buttons, newBtn]
    handleChange('buttons', updated)
    setSelectedBtnIndex(updated.length - 1)
  }

  const handleRemoveButton = (index: number) => {
    if (buttons.length <= 1) return
    const updated = buttons.filter((_: any, i: number) => i !== index)
    handleChange('buttons', updated)
    setSelectedBtnIndex(0)
  }

  return (
    <div className="space-y-6">
      {cap.hasButton && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{PANEL_LABELS.SECTION_ACTION}</h4>

          {/* Button Selection Chip Selector */}
          <ButtonSelectorChips
            buttons={buttons}
            selectedBtnIndex={selectedBtnIndex}
            onSelect={setSelectedBtnIndex}
            onAdd={handleAddButton}
            onRemove={handleRemoveButton}
          />

          {/* Active Button Settings */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.BUTTON_TEXT}</label>
              <input 
                type="text" 
                value={currentBtn.text || ''} 
                onChange={(e) => handleUpdateButton('text', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-sky-500"
                placeholder="버튼 문구 입력"
              />
            </div>

            {cap.hasButtonAction && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.ACTION_TYPE}</label>
                <select
                  value={currentBtn.actionType || ''}
                  onChange={(e) => handleActionTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:border-sky-500"
                >
                  <option value="">-- 동작 선택 --</option>
                  {Object.entries(ACTION_OPTIONS).map(([key, label]) => (
                    isActionAllowed(key) ? <option key={key} value={key}>{label}</option> : null
                  ))}
                </select>
              </div>
            )}

            <ActionDetailFields
              actionType={currentBtn.actionType}
              buttonLink={currentBtn.buttonLink}
              customTargetId={currentBtn.customTargetId}
              thankYouMessage={currentBtn.thankYouMessage}
              modalIcon={currentBtn.modalIcon}
              pages={pages}
              canvasBlocks={canvasBlocks}
              onUpdate={handleUpdateButton}
            />

            {/* 7. DOWNLOAD_FILE */}
            {currentBtn.actionType === 'DOWNLOAD_FILE' && (
              <FileUploadField
                fileUrl={currentBtn.downloadFileUrl || currentBtn.buttonLink}
                fileName={currentBtn.downloadFileName}
                fileSize={currentBtn.downloadFileSize}
                onChange={({ fileUrl, fileName, fileSize }) => {
                  const updatedButtons = [...buttons]
                  updatedButtons[selectedBtnIndex] = {
                    ...updatedButtons[selectedBtnIndex],
                    buttonLink: fileUrl,
                    downloadFileUrl: fileUrl,
                    downloadFileName: fileName,
                    downloadFileSize: fileSize,
                  }
                  handleChange('buttons', updatedButtons)
                  if (selectedBtnIndex === 0) {
                    handleChange({
                      buttonLink: fileUrl,
                      downloadFileUrl: fileUrl,
                      downloadFileName: fileName,
                      downloadFileSize: fileSize,
                    })
                  }
                }}
                onClear={() => {
                  const updatedButtons = [...buttons]
                  updatedButtons[selectedBtnIndex] = {
                    ...updatedButtons[selectedBtnIndex],
                    buttonLink: '',
                    downloadFileUrl: '',
                    downloadFileName: '',
                    downloadFileSize: '',
                  }
                  handleChange('buttons', updatedButtons)
                  if (selectedBtnIndex === 0) {
                    handleChange({
                      buttonLink: '',
                      downloadFileUrl: '',
                      downloadFileName: '',
                      downloadFileSize: '',
                    })
                  }
                }}
              />
            )}

          </div>
        </div>
      )}
    </div>
  )
}
