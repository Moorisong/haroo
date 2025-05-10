export default function LogoutButton({ text, onClick }) {
  return (
    <button className="bg-[#E5F2FF] text-[#0051C1] font-bold px-4 py-2 rounded-md cursor-pointer" onClick={onClick}>
      {text}
    </button>
  );
}
