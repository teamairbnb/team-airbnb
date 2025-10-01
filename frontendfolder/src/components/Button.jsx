function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-[10px] bg-blue-600 text-white h-[48px] w-full max-w-[370px] p-2.5 rounded-[16px]"
    >
      {text}
    </button>
  );
}

export default Button;