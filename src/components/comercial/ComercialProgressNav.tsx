import { comercialNav } from "./comercial.data";

export function ComercialProgressNav() {
  return (
    <nav className="progress" aria-label="Progresso da apresentação">
      {comercialNav.map((n) => (
        <a key={n.id} href={`#${n.id}`} data-t={n.id}>
          <span className="t">{n.label}</span>
          <span className="d" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
