export default function Footer() {
  return (
    <div className="flex space-x-4 text-sm text-gray-500">
      <a href="/terms" target="_blank" className="hover:text-gray-700 underline-offset-2 hover:underline">
        이용약관
      </a>
      <span>|</span>
      <a href="/privacy" target="_blank" className="hover:text-gray-700 underline-offset-2 hover:underline">
        개인정보처리방침
      </a>
    </div>
  );
}
