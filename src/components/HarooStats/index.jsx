export default function HarooStats({ data }) {
  return (
    <div className="w-full bg-white rounded-sm border border-gray-300 p-6 w-full md:w-1/3 flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">🎹 하루의 스탯</h2> {/* 가운데 정렬 */}
      <div className="space-y-4 max-h-35 overflow-y-auto pr-1 flex-1">
        {data.map(({ label, value }) => {
          const barColor = value < 0 ? 'bg-red-600' : 'bg-blue-600';
          const width = Math.min(Math.abs(value), 100);
          return (
            <div key={label}>
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-gray-600">{label}</span>
                <span className="font-mono text-gray-800">{value} / 100</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden opacity-60">
                <div className={`${barColor} h-full`} style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
