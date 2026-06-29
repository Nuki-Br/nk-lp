import { journeyNav } from "./journey.data";

export function JourneyProgressNav() {
  return (
    <nav className="progress" aria-label="Progresso da jornada">
      {journeyNav.map((n) => (
        <a key={n.id} href={`#${n.id}`} data-t={n.id}>
          <span className="t">{n.label}</span>
          <span className="d" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
