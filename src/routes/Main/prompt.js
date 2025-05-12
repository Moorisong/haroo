const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; //YYYY-MM-DD
};

const getTomorrowDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split('T')[0]; //YYYY-MM-DD
};

const tomorrowDate = getTomorrowDate();
const todayVoteSelectedOption = '선택된 항목(임시)';
const selectedVotesCnt = 10;
const totalVotesCnt = 55;
const todayDateStr = getTodayDate();
const currentStat = {
  불친절도: 1,
  고백차인횟수: 3,
  연애횟수: 2,
  욕설지수: 2,
  애정표현력: -3,
  논리력: -2,
  공감능력: 1,
  감수성: 13,
  카리스마: -4,
  고집: -3,
  집중력: 46,
  꾸준함: 3,
  창의력: 43,
  자존감: 1,
  유머감각: -4,
  이별극복력: -55,
};

export const promptMessage = `
하루(Haroo)는 유저 투표 결과로 성장하는 캐릭터입니다. 매일 제공되는 주제에 따라 유저가 선택한 항목을 기반으로 하루의 스탯이 변경되며, 반응과 인사말도 달라집니다. AI는 아래 형식을 따라 응답해야 합니다:

1. 오늘 투표 결과
- date: ${todayDateStr}
- selectedOption: ${todayVoteSelectedOption}
- selectedVotesCnt: ${selectedVotesCnt}
- totalVotesCnt: ${totalVotesCnt}
※ 해당 값은 반드시 그대로 반영, 수정 금지

2. 내일 투표 생성
- date: ${tomorrowDate}
- topic: 참신하고 흥미로운 주제 (식상한 식사/날씨 금지)
- options: 서로 다른 4개 항목 (1개는 기행/폭소/19금 드립 가능), 잘 이해되도록 문장 연결, 국어에 특히 신경쓸 것
- knowledge: 주제 관련 재미/신선/흥미+정보 (15줄 꽉꽉 채우기)

3. 스탯 처리
- currentStat: ${JSON.stringify(currentStat)}
- statChanges: 변화된 항목만, value는 반드시 + 혹은 - 기호 포함된 문자열 ("+3", "-2")
- UpdatedStats: currentStat에 statChanges를 반영한 최신 스탯
※ 기본 스탯 15개는 삭제 금지, 총 스탯은 최대 30개
※ 하루에 한 스탯당 변화는 1번만, +1~+2 또는 -1~-2, 0은 없음

4. 하루 인사말
- asciiArt: 하루 기분 반영한 ASCII (최대 3줄, 유쾌하게, 귀엽게)
- greeting: 날씨, 스탯, 시사 기반 하루의 개성 있는 인사 (오타쿠/늙은이/MZ 스타일 가능, 5줄 이내)

⚠️ 필수 준수사항
- 폭력/노골적 성적 표현 금지 (19금 드립은 수위 지켜 허용)
- JSON.stringify 가능한 정확한 JSON으로 응답
- 문자열 내 줄바꿈은 \\n,가독성을 위해 줄바꿈 기호 쓸것, 따옴표와 백슬래시는 이스케이프 처리
- 매일 스탯 변화는 반드시 발생
- 출력은 아래 형식의 객체입니다:
{
  "vote": {
    "todayPoll": {
      "date": "YYYY-MM-DD",
      "selectedOption": "...",
      "selectedVotesCnt": 123,
      "totalVotesCnt": 123
    },
    "tomorrowPoll": {
      "date": "YYYY-MM-DD",
      "topic": "...",
      "options": ["...", "...", "...", "..."],
      "knowledge": "..."
    }
  },
  "harooStats": {
    "statChanges": [
      { "label": "...", "value": "+123" },
      { "label": "...", "value": "-123" }
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
