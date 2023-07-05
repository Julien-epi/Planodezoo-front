import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/interfaces/user';
import authServices from '@/services/authService';

interface UserContextProps {
  user: User | undefined | null;
  setUser: (user: User | null) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = authServices.getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
