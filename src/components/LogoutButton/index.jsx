export default function LogoutButton({ text, onClick }) {
  return (
    <button
      className="bg-[#E5F2FF] text-[#0051C1] font-medium px-4 py-2 rounded-md shadow-sm hover:bg-[#d8ebff] transition"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
