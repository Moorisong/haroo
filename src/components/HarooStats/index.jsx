export default function HarooStats({ data }) {
  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">📊 하루의 스탯</h2>
      <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
        {data.map(({ label, value }) => (
          <div key={label}>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-600">{label}</span>
              <span className="font-mono text-gray-800">{value} / 100</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
