import { useState } from "react";
import GenricInput from "../../container/genricInput/genricInput";
import "./style.css";
import { UserPlus } from "lucide-react";
import { emailRegex } from "../../../utils/regex";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { urls } from "../../../URLs/urls";
import { useAuthContext } from "../../../context/AuthContext";

const NewEmployeeRegistration = () => {
  const navigate = useNavigate();
  const { currentCustomer, setCurrentCustomer } = useAuthContext();
  const [inputValue, setInputValue] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const [error, setError] = useState({
    fullName: "",
    email: "",
    role: "",
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
    let currentEmployeeCheck = JSON.parse(
      localStorage.getItem("customers") || "[]"
    );

    const errors = {
      fullName: "",
      email: "",
      role: "",
    };

    if (!inputValue.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!inputValue.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(inputValue.email)) {
      errors.email = "Invalid email format";
    }

    if (!inputValue.role.trim()) {
      errors.role = "Role is required";
    }

    if (
      currentEmployeeCheck.some(
        (employee: any) => employee.email === inputValue.email
      )
    ) {
      errors.email = "Email already exists";
    }

    setError(errors);
    return Object.values(errors).every((value) => !value);
  };

  const handleSubmit = () => {
    if (checkValidation() && currentCustomer) {
      const customers = JSON.parse(localStorage.getItem("customers") || "[]");

      const customerIndex = customers.findIndex(
        (c: any) => c.id === currentCustomer.id
      );

      if (customerIndex === -1) {
        toast.error("Customer not found");
        return;
      }

      const newEmployee = {
        id: Math.random().toString(36).substr(2, 9),
        ...inputValue,
      };

      // Update customers array
      customers[customerIndex].employees.push(newEmployee);
      localStorage.setItem("customers", JSON.stringify(customers));

      // Update currentCustomer in state and localStorage
      const updatedCustomer = {
        ...currentCustomer,
        employees: [...currentCustomer.employees, newEmployee],
      };
      setCurrentCustomer(updatedCustomer);
      localStorage.setItem("currentCustomer", JSON.stringify(updatedCustomer));

      toast.success("Employee added successfully");
      navigate(urls.EMPLOYEE);
    }
  };

  return (
    <div className="flex items-center justify-center ht-80  ">
      <div className="glass-card w-30">
        <div className="text-center">
          <UserPlus className="h-12 w-12 user-icon " />
          <h2 className="heading-lg">Add New Employee</h2>
          <p className="text-gray">Enter the details of your new team member</p>
        </div>

        <div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <GenricInput
              type="text"
              placeholder="Enter employee name"
              className=""
              value={inputValue.fullName}
              handleChange={handleChange}
              name={"fullName"}
            />
            <span className="error">{error.fullName}</span>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <GenricInput
              type="email"
              placeholder="Enter employee email"
              className=""
              value={inputValue.email}
              handleChange={handleChange}
              name={"email"}
            />
            <span className="error">{error.email}</span>
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <GenricInput
              type="text"
              placeholder="Enter Employee Role"
              className=""
              value={inputValue.role}
              handleChange={handleChange}
              name={"role"}
            />
            <span className="error">{error.role}</span>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary btn-full"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default NewEmployeeRegistration;
