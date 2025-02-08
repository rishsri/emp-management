import { Link } from "react-router-dom";
import "./style.css";
import { urls } from "../../../URLs/urls";
import { UserPlus, Briefcase, Mail } from "lucide-react";
import { useAuthContext } from "../../../context/AuthContext";


const EmployeeList = () => {
  const { currentCustomer } = useAuthContext();
  const employees = currentCustomer?.employees || [];

  return (
    <div className="container employee">
      <div className="glass-card  w-100 card-container">
        <div className="employee-list employee-card">
          <div>
            <h2 className="heading-lg employee-heading ">Employees</h2>
            <p className="text-sm text-gray">
              Manage your team members and their roles
            </p>
          </div>
          <Link to={urls.EMPLOYEE_REGISTRATION} className="btn btn-primary">
            <UserPlus className="h-5 w-5 add-employee " />
            Add Employee
          </Link>
        </div>

        {employees.length > 0 ? (
          <div>
            {employees.map((employee) => (
              <div key={employee.id} className="employee-card">
                <h3 className="employee-name">{employee.fullName}</h3>
                <div className="employee-info">
                  <Briefcase className="h-4 w-4" />
                  <span>{employee.role}</span>
                </div>
                <div className="employee-info">
                  <Mail className="h-4 w-4" />
                  <span>{employee.email}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <UserPlus className="icon-user-plus" />
            <p className="heading-lg">No employees found</p>
            <p className="text-gray">
              Add your first employee to get started with team management.
            </p>
            <Link to={urls.EMPLOYEE_REGISTRATION} className="btn btn-primary">
              <UserPlus className="icon-user-plus-small" />
              Add First Employee
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;