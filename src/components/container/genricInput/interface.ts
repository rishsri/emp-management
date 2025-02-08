export interface InputProps {
    type: string;
    placeholder: string;
    className: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name : string;
}