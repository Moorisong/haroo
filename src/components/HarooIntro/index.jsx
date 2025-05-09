export default function HarooIntro({ introString, emoticon }) {
  return (
    <div className="w-full md:w-2/3 px-6 py-5 bg-[#f9fafb] rounded-sm border border-gray-300 p-6 text-gray-700 flex flex-col items-center justify-center space-y-2">
      <div className="w-full text-center">
        <pre className="text-xl font-bold block">{emoticon}</pre>
      </div>
      <div className="w-full text-center text-sm leading-relaxed font-sans max-h-48 overflow-y-auto">
        <pre>{introString}</pre>
      </div>
    </div>
  );
}
