import type { ReactNode } from "react";
import { Reveal } from "@/components/ui";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}

/** Consistent inner-page hero — matches the editorial home aesthetic. */
export function PageHeader({ eyebrow, title, intro, crumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-[72px]">
      <div className="dotgrid dotgrid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pt-14 pb-4 sm:px-8 lg:pt-20">
        <Breadcrumbs items={crumbs} />
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
            <span className="h-px w-8 bg-accent/40" />
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,5.2vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.02em] text-ink">
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-mute sm:text-lg">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
