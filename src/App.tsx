import "./App.css";
import Header from "./components/header";
import HomePage from "./components/section/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingUpForm from "./components/auth/signUpForm";
import { ToastContainer } from "react-toastify";
import { urls } from "./URLs/urls";
import EmployeeList from "./components/section/employeeList";
import NewEmployeeRegistration from "./components/section/newEmployee";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/privateRoute";
import LoginForm from "./components/auth/loginForm";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path={urls.HOMEPAGE} element={<HomePage />} />
            <Route path={urls.SIGNUP} element={<SingUpForm />} />
            <Route path={urls.LOGIN} element={<LoginForm />} />

            <Route
              path={urls.EMPLOYEE}
              element={
                <PrivateRoute>
                  <EmployeeList />
                </PrivateRoute>
              }
            />
            <Route
              path={urls.EMPLOYEE_REGISTRATION}
              element={
                <PrivateRoute>
                  <NewEmployeeRegistration />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
