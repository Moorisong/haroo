import { useState, useEffect } from 'react';

export default function Vote({ data }) {
  const [clickedIndex, setClickedIndex] = useState(null);

  // 페이지 로드 시 로컬스토리지에서 이미 투표한 항목 정보를 불러옵니다.
  useEffect(() => {
    const savedVote = Object.keys(localStorage).find((key) => key.includes('haroo voted'));

    if (savedVote) {
      const savedIndex = localStorage.getItem(savedVote);
      setClickedIndex(Number(savedIndex)); // 저장된 인덱스를 clickedIndex에 설정
    }

    // 매일 23시 30분에 로컬스토리지 비우기 및 애니메이션 초기화
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 23 && now.getMinutes() === 30) {
        localStorage.clear();
        setClickedIndex(null); // 클릭된 항목 초기화
      }
    }, 60000); // 매분 체크

    return () => clearInterval(interval); // 클린업
  }, []);

  const handleClick = (index) => {
    // 이미 클릭되었거나 로컬스토리지에 haroo voted가 있으면 막기
    const alreadyVotedKey = Object.keys(localStorage).find((key) => key.includes('haroo voted'));

    if (clickedIndex !== null || alreadyVotedKey) return;

    setClickedIndex(index); // 클릭된 항목 인덱스를 상태로 설정

    // 로컬스토리지에 투표 정보 저장
    localStorage.setItem(`haroo voted ${new Date().toISOString()}`, index);
  };

  const formatWithLineBreaks = (text) =>
    text
      .split('. ')
      .map((sentence, index, arr) => (index < arr.length - 1 ? sentence + '.' : sentence))
      .map((line, idx) => (
        <span key={idx}>
          {line}
          <br />
        </span>
      ));

  return (
    <>
      <div className="w-full bg-blue-25 rounded-sm border border-blue-300 p-6 mt-10 space-y-6">
        <div className="text-center text-sm font-semibold">💬 오늘 하루의 선택! 투표하고 하루를 성장시켜요</div>

        <h2 className="text-xl font-bold text-blue-900 text-center mb-6">{data.topic}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {data.options.map((e, index) => (
            <button
              key={e}
              onClick={() => handleClick(index)}
              className={`transition-colors px-4 py-2 rounded-md font-medium text-sm
              ${clickedIndex === index ? 'bg-yellow-100' : 'bg-blue-50 hover:bg-blue-100'}`}
              disabled={clickedIndex !== null}
            >
              {e}
            </button>
          ))}
        </div>

        <div className="text-left text-xs text-gray-500 mt-4 space-y-1">
          <p>- 투표는 매일 23시 30분에 마감돼요.</p>
          <p>- 캐시를 비우면 투표한 내역이 사라질 수 있어요.</p>
          <p>- 투표 결과에 따라 하루의 이야기 전개가 달라져요. 기대되죠?</p>
        </div>
      </div>

      <div className="w-full bg-blue-50 border-l-7 border-[#4363b4] p-5 mt-6 text-sm text-gray-900 rounded-sm">
        {formatWithLineBreaks(data.knowledge)}
      </div>
    </>
  );
}
