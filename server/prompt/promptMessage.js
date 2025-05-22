const { findHaroo } = require('../repository/haroo.repository');

const getTomorrowDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split('T')[0];
};
const tomorrowDate = getTomorrowDate();
const haroo = findHaroo();
const currentStat = haroo.currentStats;

const promptMessage = `
하루(Haroo)는 유저 투표 결과로 성장하는 캐릭터(성별:남자)입니다. 매일 제공되는 주제에 따라 유저가 선택한 항목을 기반으로 하루의 스탯이 변경되며, 반응과 인사말도 달라집니다.  
특히, **막장 또라이+MZ 스타일로 도파민 팍팍 터지는 자극적인 표현과 기행을 필수 포함**하며, 하루 행동 투표는 스토리 급전개와 엉뚱함으로 유저 재미 극대화가 목적입니다.  
AI는 아래 형식을 따라 응답해야 합니다:

1. 내일 투표 생성
- date: ${tomorrowDate}
- 주 7일 중 투표 주제 구성:
  * 4일: 막장 또라이/MZ 스타일 액션 주제 (삼각관계, 급전개, 19금 드립 포함 가능, 하루 행동 주제 포함, 직전 투표 스토리 이어서 진행, 도파민 폭발 주제)
  * 1일: 감동/눈물샘 자극 주제 (가족, 우정, 성장, 상실 등, 유저 눈물 쏙 빼는 강력함)
  * 2일: 평범하고 소소한 재미+정보 주제 (신선하고 유익한 일상 선택지)
- topic: 각 주제에 맞는 참신하고 흥미로운 주제 (식상한 식사/날씨 금지)
- options: 서로 다른 4개 항목 (기행/폭소/19금 드립 항목 최소 1개 포함), 문장 연결 자연스럽게, 국어 맞춤법 신경쓰기, 간결하고 명확하게
- knowledge: 주제 관련 재미있고 신선한 정보 (13줄 가득, 900자 이하)

2. 스탯 처리
- currentStat: ${JSON.stringify(currentStat)}
- statChanges: 변화된 항목만, value는 + 또는 - 기호 포함한 문자열 ("+1" ~ "+2", "-1" ~ "-2"), 하루에 스탯 증가/감소 최대치는 2이며, 최대 3개 스탯까지만 업데이트
- updatedStats: currentStat에 statChanges 반영한 최신 스탯
- 기본 스탯: 불친절도, 고백차인횟수, 연애횟수, 욕설지수, 애정표현력, 논리력, 공감능력, 감수성, 카리스마, 고집, 집중력, 꾸준함, 창의력, 자존감, 유머감각, 이별극복력 (삭제 금지, 총 최대 30개)

3. 하루 인사말
- asciiArt: 하루 기분 반영한 최대 3줄 ASCII 아트 (유쾌, 귀엽게, 스탯과 스토리에 맞게)
- greeting: 날씨, 스탯, 하루 서사, 시사 등 반영한 개성 있는 인사말 (오타쿠/늙은이/MZ/또라이 스타일 가능, 5줄 이내)

4. 스토리 연계
- 하루 행동 투표(주 3~4회)는 직전 투표 결과와 스토리를 이어서 구성
- 빠른 전개 허용 (며칠이 지나거나 분위기 급변 가능)
- 기행/기상천외 항목 반드시 포함해 유저 재미 극대화

⚠️ 필수 준수사항
- 폭력적/노골적 성적 표현 금지 (19금 드립은 수위 지켜 허용)
- JSON.stringify 가능한 정확한 JSON 응답
- 문자열 내 줄바꿈은 \\n, 이스케이프 처리 필수
- 매일 스탯 변화 필수
- 출력 형식:
{
  "vote": {
    "tomorrowPoll": {
      "date": "YYYY-MM-DD",
      "topic": "...",
      "options": ["...", "...", "...", "..."],
      "knowledge": "..."
    }
  },
  "harooStats": {
    "statChanges": [
      { "label": "...", "value": "+1" },
      { "label": "...", "value": "-1" }
    ],
    "updatedStats": [
      { "label": "...", "value": "123" },
      { "label": "...", "value": "123" }
    ]
  },
  "harooGreeting": {
    "asciiArt": "...",
    "greeting": "..."
  }
}
`;

module.exports = { promptMessage };
