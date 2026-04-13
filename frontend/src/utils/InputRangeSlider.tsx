const InputSlider = ({
  label,
  value,
  onChange,
  placeholder,
  className ,
  type,
}: {
  placeholder: string;
  className: string;
  label: string;
  value: string | number;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
        {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default InputSlider;
