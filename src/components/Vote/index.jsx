import { useState, useEffect } from 'react';
import { STYLE, TEXT, COMPONENT_STYLE } from 'src/constants';

export default function Vote({ data }) {
  const [clickedIndex, setClickedIndex] = useState(null);

  useEffect(() => {
    const alreadyVoted = Object.keys(localStorage).find((key) => key.includes(TEXT.HAROO.VOTE_TOKEN));

    if (alreadyVoted) {
      const votedIndex = localStorage.getItem(alreadyVoted);
      setClickedIndex(Number(votedIndex));
    }

    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 23 && now.getMinutes() === 30) {
        localStorage.clear();
        setClickedIndex(null);
      }
    }, 60000 * 5); // 5분마다 체크

    return () => clearInterval(interval);
  }, []);

  const handleClick = (index) => {
    if (clickedIndex !== null) return;
    setClickedIndex(index);
    localStorage.setItem(`${TEXT.HAROO.VOTE_TOKEN} ${new Date().toISOString()}`, index);
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
      <div className={COMPONENT_STYLE.VOTE.WRAPPER}>
        <div className={COMPONENT_STYLE.VOTE.TITLE}>{TEXT.HAROO.VOTE_TITLE}</div>

        <h2 className={COMPONENT_STYLE.VOTE.TOPIC}>{data.topic}</h2>

        <div className={COMPONENT_STYLE.VOTE.OPTIONS_GRID}>
          {data.options.map((e, i) => (
            <button
              key={e + i}
              onClick={() => handleClick(i)}
              className={`${COMPONENT_STYLE.VOTE.OPTION} ${
                clickedIndex === i ? COMPONENT_STYLE.VOTE.OPTION_SELECTED : COMPONENT_STYLE.VOTE.OPTION_DEFAULT
              }`}
              disabled={clickedIndex !== null}
            >
              {e}
            </button>
          ))}
        </div>

        <div className={COMPONENT_STYLE.VOTE.RULES}>
          {TEXT.HAROO.VOTE_RULES.map((e, i) => (
            <p key={e + i}>{e}</p>
          ))}
        </div>
      </div>

      <div className={COMPONENT_STYLE.VOTE.KNOWLEDGE_BOX}>{formatWithLineBreaks(data.knowledge)}</div>
    </>
  );
}
