"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { DemoModal } from "./DemoModal";

export type DemoStep = "form" | "success";

type DemoModalContextValue = {
  isOpen: boolean;
  step: DemoStep;
  email: string;
  open: () => void;
  close: () => void;
  submit: (email: string) => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<DemoStep>("form");
  const [email, setEmail] = useState("");

  const open = useCallback(() => {
    setStep("form");
    setEmail("");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setStep("form");
    setEmail("");
  }, []);

  const submit = useCallback((submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("success");
  }, []);

  const value = useMemo(
    () => ({ isOpen, step, email, open, close, submit }),
    [isOpen, step, email, open, close, submit],
  );

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <DemoModal />
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) {
    throw new Error("useDemoModal precisa estar dentro de <DemoModalProvider>");
  }
  return ctx;
}
