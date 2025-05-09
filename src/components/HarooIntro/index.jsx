export default function HarooIntro({ introString, emoticon }) {
  return (
    <div className="w-full bg-gray-50 rounded-xl shadow-inner p-6 text-center space-y-4">
      <pre className="text-lg font-mono">{emoticon}</pre>
      <pre className="text-base font-mono whitespace-pre-wrap text-gray-800">{introString}</pre>
    </div>
  );
}
