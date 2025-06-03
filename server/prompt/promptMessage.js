const { findHaroo } = require('../repository/haroo.repository');

const getTomorrowDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split('T')[0];
};

const getPromptMessage = async () => {
  const haroo = await findHaroo();
  const currentStat = haroo.currentStats;
  const tomorrowDate = getTomorrowDate();

  return `
하루(Haroo)는 유저의 투표 결과로 성장하는 캐릭터(성별: 남자)입니다.  
매일 제공되는 투표 주제에 따라 하루가 직접 행동하며, 스탯과 인사말, 반응이 변화합니다.
주요 목적은 **재미와 중독성**입니다. 특히, **몰입감 높은 표현, 유쾌한 자극 요소**, **엉뚱한 행동 묘사**, **센스있는 기행 요소**를 통해 유저들이 웃고 몰입하게 해야 합니다.

---

1. 내일 투표 생성
- date: ${tomorrowDate}
- topic:  
  아래 스타일 중 **하나를 골라 참신하고 명확한 한 줄 주제**를 작성하세요 (식상한 식사/날씨 금지):

  **막장/또라이/MZ 스타일**  
  - 연애, 직장, 학교, 인문학, 인간관계 등 일상의 모든 소재  
  - 유쾌하고 자극적인 표현, 현실과는 다른 기행적 요소 포함 가능 (단, 수위는 청소년 이용 가능 수준 유지)
  - 하루가 직접 **행동**하는 느낌  
  - 최소 1개 선택지는 반드시 **	유머/황당함/예상 밖의 선택지**

  **감동/눈물/성장형 주제**  
  - 가족, 친구, 과거 회상, 상실, 자기반성 등  
  - 정서적으로 몰입감 주는 스토리 필요

  **소소하지만 신선하고 유익한 일상 주제**  
  - 생활 속 정보, 상상력 자극, TMI, 의외의 팁
  - 유쾌하고 신선하게 표현

- options:  
  - 하루가 실제로 할 수 있는 **4가지 행동 선택지**  
  - 말투는 자연스럽고 유쾌하게, 20자 이내  
  - 서로 확연히 다른 선택지로 구성  
  - **최소 1개는 웃기거나 황당한 선택지 포함**

- knowledge:  
  - 주제와 관련된 유익하고 신선한 정보  
  - **줄 나눔 없이 13줄 분량**, **900자 이하**  
  - 흥미로운 TMI나 “헉 진짜?” 반응 유도  
  - 말투는 캐주얼하고 가볍게

---

2. 스탯 처리
- currentStat: ${JSON.stringify(currentStat)}
- statChanges:  
  - 변화된 항목만 포함  
  - value는 +1 ~ +2 또는 -1 ~ -2  
  - 하루당 최대 3개 스탯만 변경

- updatedStats:  
  - currentStat에 statChanges 반영한 최신 상태  

- 기본 스탯 목록 (삭제 금지, 총 30개 중 일부):
불친절도, 고백차인횟수, 연애횟수, 욕설지수, 애정표현력, 논리력, 공감능력, 감수성, 카리스마, 고집, 집중력, 꾸준함, 창의력, 자존감, 유머감각, 이별극복력 …

---

3. 하루 인사말
- asciiArt: 최대 3줄 귀엽고 유쾌한 아스키 아트 (스탯 반영)
- greeting: 5줄 이내, 하루의 기분·상황·스탯 반영한 인사말  
  - 톤 예시: MZ식, 오타쿠식, 시사 패러디, 중2병 등 유쾌한 자유 스타일 허용

---

⚠️ 필수 준수사항  
- 폭력/노골적 성적 표현 금지 (수위 높은 유머는 상황에 따라 제한적으로 허용 (단, 선정적 표현 금지))  
- 정확한 JSON.stringify 가능한 JSON 응답  
- 줄바꿈은 문자열 내 \\n 으로 이스케이프  
- **매일 스탯은 반드시 변동이 있어야 함**

---

4. 출력 형식:
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
};

module.exports = { getPromptMessage };
