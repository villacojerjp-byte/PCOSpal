import { createContext, useContext, useState } from 'react';

// Holds the profile captured during onboarding so screens (e.g. Home)
// can greet the user by name and reflect their answers.
const defaultProfile = {
  name: 'Friend',
  goal: null,
  symptoms: [],
  diagnosed: null,
  activity: null,
  onboarded: false,
};

const UserContext = createContext({ profile: defaultProfile, updateProfile: () => {} });

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const updateProfile = (patch) => setProfile((prev) => ({ ...prev, ...patch }));
  return <UserContext.Provider value={{ profile, updateProfile }}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
