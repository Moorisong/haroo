export const stats = [
  { label: '감정', value: 42 },
  { label: '에너지', value: 67 },
  { label: '지식', value: 25 },
  { label: '창의력', value: 50 },
  { label: '행복도', value: 78 },
  { label: '지구력', value: 33 },
  { label: '체력', value: 58 },
  { label: '대인관계', value: 90 },
  { label: '행운', value: 20 },
  { label: '기술', value: 75 },
];

export const greetString = ` (•‿•)
 하루는 오늘도 평범해요!
 오늘도 나를 성장시켜줘!
 당신의 선택으로 하루는 달라져요.`;

export const vote = {
  topic: '오늘 하루는 뭘 해볼까요?',
  option: ['책 읽기 📖', '산책하기 🚶', '게임하기 🎮', '친구 만나기 😜'],
  infoString: `
    책을 읽으면 하루의 지식이 올라가요! 더 많은 지식을 쌓으면 다양한 인사말과 표정이 생겨요.\n
    하루는 매일 조금씩 성장하고, 여러분의 선택에 따라 더욱 다양한 능력을 얻을 수 있어요.\n
    매일 투표를 통해 하루의 스탯을 변화시키고, 오늘의 선택이 내일을 만들어갑니다.\n
    여러분이 선택한 책은 하루의 지식을 쌓을 수 있게 해주며, 이는 하루의 표정에도 영향을 미쳐요.\n
    더 많은 지식을 쌓으면 하루의 말투나 반응이 달라지고, 더 다양한 행동을 할 수 있게 됩니다.\n
    지식을 통해 하루와의 상호작용이 더욱 풍부해지고, 스토리도 더욱 흥미로워질 거예요.\n
    여러분의 선택이 하루의 미래를 만들어간다는 점에서, 하루를 키워나가는 재미가 커질 거랍니다.\n
    그럼 오늘도 하루에게 무엇을 배워볼까요? 오늘의 선택이 내일의 하루를 만들어가요!\n
  `,
};

export const chatGptData = {
  vote: {
    todayPoll: {
      date: '2025-05-09',
      selectedOption: '선택된 항목입니다.',
      selectedVotesCnt: 10,
      totalVotesCnt: 55,
    },
    tomorrowPoll: {
      date: '2025-05-10',
      topic: '잠수함 창문에 달팽이 붙어있으면 내 반응은?',
      options: [
        '얼른 셀카 찍는다',
        '동료와 신비로운 실험 시작',
        '진지하게 연구 리포트 작성',
        '나도 달팽이가 되어본다 (꾸엑)',
      ],
      knowledge:
        '심해에서는 달팽이처럼 극한 환경에 적응한 생명체가 종종 발견됩니다. 실제로 잠수함 연구원들은 창문에 달라붙는 작은 생물과 조용히 눈을 맞추기도 하죠. 이런 기이한 만남은 인간의 호기심을 자극해서 새로운 탐구를 시작하게 만들곤 합니다! 오늘은 물속 세상에서 일어날 법한 별별 상상을 펼쳐봐요.',
    },
  },
  harooStats: {
    statChanges: [
      {
        label: '창의력',
        value: '+3',
      },
      {
        label: '공감능력',
        value: '+2',
      },
      {
        label: '카리스마',
        value: '+2',
      },
      {
        label: '욕설지수',
        value: '-1',
      },
    ],
    UpdatedStats: [
      {
        label: '불친절도',
        value: '1',
      },
      {
        label: '고백차인횟수',
        value: '3',
      },
      {
        label: '연애횟수',
        value: '2',
      },
      {
        label: '욕설지수',
        value: '1',
      },
      {
        label: '애정표현력',
        value: '-3',
      },
      {
        label: '논리력',
        value: '-2',
      },
      {
        label: '공감능력',
        value: '3',
      },
      {
        label: '감수성',
        value: '13',
      },
      {
        label: '카리스마',
        value: '-2',
      },
      {
        label: '고집',
        value: '-3',
      },
      {
        label: '집중력',
        value: '46',
      },
      {
        label: '꾸준함',
        value: '3',
      },
      {
        label: '창의력',
        value: '46',
      },
      {
        label: '자존감',
        value: '1',
      },
      {
        label: '유머감각',
        value: '-4',
      },
      {
        label: '이별극복력',
        value: '-55',
      },
    ],
  },
  harooGreeting: {
    asciiArt: '(  • v •)\n /|🍀|\\ \n  / \\',
    greeting:
      '잠수함 창밖에서 달팽이랑 눈 마주친 거 실화야?\n오늘은 창의력 + 공감력 만렙 하루 등장!👓\n신비로운 하루, 지구판 닌텐도월드 도전중!\n굴 껍질처럼 소프트하지만 깜짝친구 늘 환영🌊\n내일 뭐 붙었나 또 기대해줘~',
  },
};
