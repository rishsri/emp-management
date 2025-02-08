export interface Customer {
    id: string;
    fullName?: string;
    email: string;
    password: string;
    employees: Employee[];
  }

  export interface Employee {
    id: string;
    customerId?: string;
    fullName: string;
    role: string;
    email: string;
  }

  export interface AuthState {
    isAuthenticated: boolean;
    currentCustomer: Customer | null;
  }

  // https://app.eraser.io/workspace/OmU0Zw3AeM3znoxQvUpJ?origin=share