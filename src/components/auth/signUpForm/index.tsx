import { useState } from "react";
import GenricInput from "../../container/genricInput/genricInput";
import "./style.css";
import { UserPlus } from "lucide-react";
import { emailRegex } from "../../../utils/regex";
import { useNavigate } from "react-router-dom";
import { urls } from "../../../URLs/urls";
import { useAuthContext } from "../../../context/AuthContext";

export interface IinputFields {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SingUpForm = () => {
  const navigate = useNavigate();
  const { register } = useAuthContext();
  const [inputValue, setInputValue] = useState<IinputFields>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<IinputFields>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });

    setError({
      ...error,
      [name]: "",
    });
  };

  const checkValidation = () => {
    let fieldValue = JSON.parse(localStorage.getItem("customers") || "[]");

    const errors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!inputValue.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!inputValue.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(inputValue.email)) {
      errors.email = "Invalid email format";
    } else if (
      fieldValue.some((customer: any) => customer.email === inputValue.email)
    ) {
      errors.email = "Email already exists";
    }

    if (!inputValue.password.trim()) {
      errors.password = "Password is required";
    }

    if (!inputValue.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (
      inputValue.password &&
      inputValue.password !== inputValue.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }

    setError(errors);
    return Object.values(errors).every((value) => !value);
  };

  const handleSubmit = () => {
    if (checkValidation()) {
      const newCustomer = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        ...inputValue,
        employees: [], // Initialize the employees array
      };

      register(newCustomer);
      navigate(urls.EMPLOYEE); // Navigate to the employee list page
    }
  };

  return (
    <div className="flex items-center justify-center ht-80  ">
      <div className="glass-card w-30">
        <div className="text-center">
          <UserPlus className="h-12 w-12 user-icon " />
          <h2 className="heading-lg">Create Account</h2>
          <p className="text-gray">Join us to manage your team effectively</p>
        </div>

        <div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <GenricInput
              type="text"
              placeholder="Enter your full name"
              className=""
              value={inputValue.fullName}
              handleChange={handleChange}
              name={"fullName"}
            />
            <span className="error">{error.fullName}</span>
          </div>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <GenricInput
              type="email"
              placeholder="Enter your email"
              className=""
              value={inputValue.email}
              handleChange={handleChange}
              name={"email"}
            />
            <span className="error">{error.email}</span>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <GenricInput
              type="password"
              placeholder="Create a password"
              className=""
              value={inputValue.password}
              handleChange={handleChange}
              name={"password"}
            />
            <span className="error">{error.password}</span>
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <GenricInput
              type="password"
              placeholder="Confirm your password"
              className=""
              value={inputValue.confirmPassword}
              handleChange={handleChange}
              name={"confirmPassword"}
            />
            <span className="error">{error.confirmPassword}</span>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary btn-full"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SingUpForm;
