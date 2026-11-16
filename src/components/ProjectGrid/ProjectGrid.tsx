"use client";

// Client component because the filter lives in the URL (?discipline=software), which makes
// a filtered view shareable and keeps it when the user presses back.
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/lib/types";
import { filters, ProjectGridView, type Filter } from "./ProjectGridView";

type Props = { projects: Project[] };

export function ProjectGrid({ projects }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const param = searchParams.get("discipline");
  const filter =
    filters.find((f) => f !== "All" && f.toLowerCase() === param) ?? "All";

  const onFilter = (next: Filter) => {
    const query = next === "All" ? "" : `?discipline=${next.toLowerCase()}`;
    // replace, not push, so clicking through filters does not fill the back button history.
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  return (
    <ProjectGridView projects={projects} filter={filter} onFilter={onFilter} />
  );
}
