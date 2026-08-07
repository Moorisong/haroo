'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomAccordion01, { type AccordionItem } from '../atoms/atom_accordion_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

const DEFAULT_FAQS: AccordionItem[] = [
  { id: '1', question: '예약은 어떻게 하나요?', answer: '상단의 예약 폼을 통해 이름, 연락처, 원하시는 날짜를 입력하시면 24시간 내 확인 문자를 보내드립니다.' },
  { id: '2', question: '취소/환불 규정은 어떻게 되나요?', answer: '예약 3일 전까지는 전액 환불이 가능합니다. 그 이후에는 환불이 어려울 수 있으니 꼭 미리 연락 주시기 바랍니다.' },
  { id: '3', question: '주차는 가능한가요?', answer: '네, 건물 지하 1~2층에 주차 공간이 마련되어 있습니다. 방문 시 주차권을 발급해 드립니다.' },
  { id: '4', question: '운영 시간이 어떻게 되나요?', answer: '평일은 오전 10시부터 오후 7시, 주말 및 공휴일은 오전 11시부터 오후 6시까지 운영합니다.' },
]

interface Props { config: BlockInputConfig }

export default function BlkFaq01({ config }: Props) {
  const {
    title = '아코디언 목록',
    subtitle = '클릭하여 상세 내용을 펼쳐보세요.',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    faqItems = DEFAULT_FAQS,
  } = config as BlockInputConfig & { faqItems?: AccordionItem[] }

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} px-6 ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="text-center mb-8">
            <AtomBadge01 variant="default" className="mb-3 mx-auto">아코디언</AtomBadge01>
            <AtomText01 as="h2" className="text-2xl font-bold mb-2">{title}</AtomText01>
            <AtomText01 as="p" className="opacity-70 text-sm">{subtitle}</AtomText01>
          </div>
          <AtomAccordion01 items={faqItems} />
        </div>
      </div>
    </AtomCard01>
  )
}
