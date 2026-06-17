"use client";

import { useDemoModal } from "./DemoModalContext";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

export function SolicitarDemoButton({
  children = "Solicitar demo",
  onClick,
  type = "button",
  ...rest
}: Props) {
  const { open } = useDemoModal();

  return (
    <button
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) open();
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
