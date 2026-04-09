import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      <label className="text-xs font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="px-3 py-2.5 rounded-lg text-sm w-full border-2 transition-colors focus:outline-none focus:border-opacity-100"
        style={{ 
          borderColor: error ? '#0066cc' : '#e0e0e0',
          backgroundColor: '#f9f9f9'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#0066cc';
          e.target.style.backgroundColor = '#fff';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#0066cc' : '#e0e0e0';
          e.target.style.backgroundColor = '#f9f9f9';
        }}
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs font-medium" style={{ color: '#0066cc' }}>{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
