import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-faint uppercase">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-accent" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="transition-colors hover:text-ink">
                    {item.name}
                  </Link>
                  <ChevronRight className="h-3 w-3 text-line-2" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
