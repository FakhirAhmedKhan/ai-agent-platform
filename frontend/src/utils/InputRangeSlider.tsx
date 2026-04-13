import  type{ FC, ChangeEvent } from 'react';

type RangeSliderProps = {
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
};

const RangeSlider: FC<RangeSliderProps> = ({
    label,
    value,
    min = 0,
    max = 1,
    step = 0.1,
    onChange,
}: RangeSliderProps) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">
                {label} ({value})
            </label>

            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 mt-4"
            />
        </div>
    );
};

export default RangeSlider;