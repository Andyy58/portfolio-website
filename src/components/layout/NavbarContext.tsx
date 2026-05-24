import { createContext, useState, useContext, type ReactNode } from "react";

interface NavbarContextType {
  isNavVisible: boolean;
  setIsNavVisible: (visible: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);

  return (
    <NavbarContext.Provider value={{ isNavVisible, setIsNavVisible }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context == undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }

  return context;
}
