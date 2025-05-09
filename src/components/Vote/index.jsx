export default function Vote({ data }) {
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
      <div className="w-full bg-white rounded-xl shadow p-6 mt-10 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">{data.topic}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {data.options.map((e) => (
            <button
              key={e}
              className="bg-indigo-100 hover:bg-indigo-200 transition px-4 py-2 rounded-full font-medium text-sm"
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-5 mt-6 text-sm text-blue-800 rounded">
        {formatWithLineBreaks(data.knowledge)}
      </div>
    </>
  );
}
