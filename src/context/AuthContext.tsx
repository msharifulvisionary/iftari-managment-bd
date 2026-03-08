import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, get } from 'firebase/database';

interface ManagerProfile {
  name: string;
  messName: string;
  phone: string;
  bloodGroup: string;
  year: string;
  month: string;
  username: string;
}

interface AuthContextType {
  currentUser: User | null;
  profile: ManagerProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, profile: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ManagerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const profileRef = ref(db, `managers/${user.uid}`);
        const snapshot = await get(profileRef);
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, profile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
