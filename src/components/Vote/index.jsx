import React from 'react';

export default function Vote(props) {
  const formatTextWithLineBreaks = (text) =>
    text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <h2 className="text-xl font-bold">{props.data.topic}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {props.data.options.map((e) => (
            <button className="bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded font-medium" key={e + 1}>
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-sm text-blue-700 leading-[0.8] whitespace-pre-wrap text-justify">
          {formatTextWithLineBreaks(props.data.knowledge)}
        </p>
      </div>
    </>
  );
}
