const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon = null,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {icon && <img src={icon} width={20} height={20} />}
      {children}
    </button>
  );
};

export default Button;
