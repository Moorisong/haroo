export default function HarooIntro(props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-center">
        <pre className="text-sm leading-tight font-mono bg-gray-100 p-4 rounded shadow text-center whitespace-pre-wrap">
          {props.introString}
        </pre>
      </div>
    </div>
  );
}
