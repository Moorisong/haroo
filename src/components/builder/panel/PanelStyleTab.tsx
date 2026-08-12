import React from 'react'
import { PANEL_LABELS, THEME_PRESETS } from './constants'

interface PanelStyleTabProps {
  config: any
  handleChange: (field: string, value: any) => void
}

export default function PanelStyleTab({ config, handleChange }: PanelStyleTabProps) {
  const applyTheme = (theme: typeof THEME_PRESETS[0]) => {
    handleChange('backgroundColor', theme.bg)
    handleChange('textColor', theme.text)
    // Optional: Could apply primary color to buttons if the block config supports it
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">스마트 테마 팔레트</h4>
        <div className="grid grid-cols-2 gap-2">
          {THEME_PRESETS.map((theme) => (
            <button
              key={theme.id}
              onClick={() => applyTheme(theme)}
              className="flex items-center gap-2 p-2 border border-slate-200 rounded-md hover:border-sky-500 transition-colors bg-slate-50 text-left"
            >
              <div 
                className="w-4 h-4 rounded-full border border-slate-300"
                style={{ backgroundColor: theme.bg }}
              />
              <span className="text-xs font-semibold text-slate-700 truncate">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{PANEL_LABELS.SECTION_STYLE}</h4>
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.BACKGROUND_COLOR}</label>
          <div className="flex space-x-2">
            <input 
              type="color" 
              value={config.backgroundColor || '#ffffff'} 
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="w-10 h-10 rounded border border-slate-300 cursor-pointer p-1"
            />
            <input 
              type="text" 
              value={config.backgroundColor || '#ffffff'} 
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm uppercase"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.TEXT_COLOR}</label>
          <div className="flex space-x-2">
            <input 
              type="color" 
              value={config.textColor || '#0f172a'} 
              onChange={(e) => handleChange('textColor', e.target.value)}
              className="w-10 h-10 rounded border border-slate-300 cursor-pointer p-1"
            />
            <input 
              type="text" 
              value={config.textColor || '#0f172a'} 
              onChange={(e) => handleChange('textColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm uppercase"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
