import { Link } from "react-router-dom";
import { urls } from "../../../URLs/urls";
import "./style.css";
import { useAuthContext } from "../../../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="flex items-center justify-center homepage-wrapper">
      <div className="glass-card container text-center">
        <h1 className="heading-lg">
          Welcome to{" "}
          <Link
            to={urls.HOMEPAGE}
            style={{
              background:
                "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Customer Portal
          </Link>
        </h1>
        <p className="text-gray mb-8">
          Streamline your customer management and employee organization with our
          intuitive platform. Get started today and experience the difference.
        </p>
        <div className="flex justify-center gap-2">
          <Link
            to={isAuthenticated ? urls.EMPLOYEE : urls.SIGNUP}
            className="btn btn-primary"
          >
            Get Started
          </Link>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
