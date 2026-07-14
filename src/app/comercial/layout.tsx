import { ComercialGate } from "@/components/comercial/ComercialGate";
import "../jornada.css";
import "./comercial.css";

/**
 * Layout do /comercial — protege toda a rota com o portão de senha
 * (`ComercialGate`). Só o time Nuki, com a senha, chega no conteúdo. O CSS da
 * apresentação é importado aqui também pra estilizar o próprio gate mesmo antes
 * do `page.tsx` montar.
 */
export default function ComercialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ComercialGate>{children}</ComercialGate>;
}
