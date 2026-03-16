import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { CreatorProfile } from "../backend";

interface ActiveProfileContextType {
  activeProfileIndex: number;
  setActiveProfileIndex: (index: number) => void;
  activeProfile: CreatorProfile | null;
  setActiveProfile: (profile: CreatorProfile | null) => void;
}

const ActiveProfileContext = createContext<
  ActiveProfileContextType | undefined
>(undefined);

export function ActiveProfileProvider({ children }: { children: ReactNode }) {
  const [activeProfileIndex, setActiveProfileIndexState] = useState<number>(
    () => {
      const stored = localStorage.getItem("activeProfileIndex");
      return stored ? Number.parseInt(stored, 10) : 0;
    },
  );
  const [activeProfile, setActiveProfile] = useState<CreatorProfile | null>(
    null,
  );

  const setActiveProfileIndex = (index: number) => {
    setActiveProfileIndexState(index);
    localStorage.setItem("activeProfileIndex", index.toString());
  };

  return (
    <ActiveProfileContext.Provider
      value={{
        activeProfileIndex,
        setActiveProfileIndex,
        activeProfile,
        setActiveProfile,
      }}
    >
      {children}
    </ActiveProfileContext.Provider>
  );
}

export function useActiveProfile() {
  const context = useContext(ActiveProfileContext);
  if (!context) {
    throw new Error(
      "useActiveProfile must be used within ActiveProfileProvider",
    );
  }
  return context;
}
