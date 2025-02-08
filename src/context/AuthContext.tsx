import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import { Customer, AuthState } from "../types";
  import { toast } from "react-toastify";

  interface AuthContextProps extends AuthState {
    login: (email: string, password: string) => void;
    logout: () => void;
    register: (customer: Customer) => void;
    setCurrentCustomer: (customer: Customer | null) => void;
  }

  const AuthContext = createContext<AuthContextProps | undefined>(undefined);

  export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

    useEffect(() => {
      const customerFromStorage = localStorage.getItem("currentCustomer");
      if (customerFromStorage) {
        // Get the latest customer data from customers array
        const customers = JSON.parse(localStorage.getItem('customers') || '[]');
        const customer = JSON.parse(customerFromStorage);
        const updatedCustomer = customers.find((c: Customer) => c.id === customer.id);

        if (updatedCustomer) {
          setIsAuthenticated(true);
          setCurrentCustomer(updatedCustomer);
          // Update the currentCustomer in localStorage with latest data
          localStorage.setItem('currentCustomer', JSON.stringify(updatedCustomer));
        }
      }
    }, []);

    const login = (email: string, password: string) => {
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const customer = customers.find((c: Customer) => c.email === email);

      if (!customer) {
        toast.error("Email not found");
        return;
      }
      if (customer.password !== password) {
        toast.error("Incorrect password");
        return;
      }

      // Always store and set the customer data from the customers array
      localStorage.setItem('currentCustomer', JSON.stringify(customer));
      setIsAuthenticated(true);
      setCurrentCustomer(customer);
    };

    const register = (customerData: Customer) => {
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const exists = customers.some((c: Customer) => c.email === customerData.email);

      if (exists) {
        toast.error('Email already exists');
        return;
      }

      const newCustomer: Customer = {
        ...customerData,
        id: crypto.randomUUID(),
        employees: []
      };

      customers.push(newCustomer);
      localStorage.setItem('customers', JSON.stringify(customers));
      login(newCustomer.email, newCustomer.password);
      toast.success('Account created successfully');
    };

    const logout = () => {
      localStorage.removeItem("currentCustomer");
      setIsAuthenticated(false);
      setCurrentCustomer(null);
      toast.success("Logout successfully");
    };

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          currentCustomer,
          login,
          logout,
          register,
          setCurrentCustomer,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuthContext must be used within AuthContextProvider");
    }
    return context;
  };