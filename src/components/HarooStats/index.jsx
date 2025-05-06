export default function HarooStats(props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-xl mx-auto w-[15rem]">
      <h2 className="text-lg font-bold mb-2">📊 하루의 스탯</h2>
      <div className="overflow-y-auto max-h-56 space-y-4 pr-2">
        {props.data.map(({ label, value }) => (
          <div key={label}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <span className="text-sm font-mono text-gray-900">{value} / 100</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div className="bg-indigo-400 h-2 rounded" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
