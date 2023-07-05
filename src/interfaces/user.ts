export interface User {
  _id: string;
  userId?: string;
  username: string;
  token: string;
  role: string;
  assignedDays?: string[];
}

export interface RegisterForm {
  username: string;
  role: string;
  assignedDays?: string[];
  password: string;
  confirmPassword: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface FormAccount {
  _id: string;
  username: string;
  role: string;
  assignedDays?: Array<{ value: string; label: string; }>;
}

export type Role =
  | 'admin'
  | 'employee'
  | 'veterinarian'
  | 'entretienAgent'
  | 'seller'
  | 'visitor'
  | 'accueilAgent';