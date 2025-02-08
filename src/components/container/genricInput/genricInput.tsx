import { InputProps } from "./interface";
import "./style.css"

const GenricInput = ({
  type,
  placeholder,
  className,
  value,
  handleChange,
  name,
}: InputProps) => {
  return (
    <div>
      <input
        name = {name}
        type={type}
        placeholder={placeholder}
        className={className || "input-field"}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default GenricInput;
