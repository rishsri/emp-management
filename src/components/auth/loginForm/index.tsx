import { useState } from "react";
import GenricInput from "../../container/genricInput/genricInput";
import "./style.css";
import {LogIn } from "lucide-react";
import { emailRegex } from "../../../utils/regex";
import { useNavigate } from "react-router-dom";
import { urls } from "../../../URLs/urls";
import { useAuthContext } from "../../../context/AuthContext";
const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
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
      email: "",
      password: "",
    };

    // Find the user by email
    const user = fieldValue.find((customer: any) => customer.email === inputValue.email);

    if (!inputValue.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(inputValue.email)) {
      errors.email = "Invalid email format";
    } else if (!user) {
      errors.email = "Email does not exist";
    }

    if (!inputValue.password.trim()) {
      errors.password = "Password is required";
    } else if (user && user.password !== inputValue.password) {
      errors.password = "Enter valid password";
    }

    setError(errors);
    return Object.values(errors).every((value) => !value);
  };

  const handleSubmit = () => {
    if (checkValidation()) {
        login(inputValue.email, inputValue.password);
      navigate(urls.EMPLOYEE);
    }
  };

  return (
    <div className="flex items-center justify-center ht-80  ">
      <div className="glass-card w-30">
        <div className="text-center mb-8">
          <LogIn className="h-12 w-12 user-icon" />
          <h2 className="heading-lg">Welcome back</h2>
          <p className="text-gray">Sign in to access your account</p>
        </div>

        <div>
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
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary btn-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
