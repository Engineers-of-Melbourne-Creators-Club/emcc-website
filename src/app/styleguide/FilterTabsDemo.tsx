"use client";

// FilterTabs is controlled, so the demo needs a little client state to click through it.
import { useState } from "react";
import { FilterTabs } from "@/components/FilterTabs/FilterTabs";

const options = [
  "All",
  "Mechanical",
  "Electrical",
  "Software",
  "Civil",
] as const;

export function FilterTabsDemo() {
  const [value, setValue] = useState<(typeof options)[number]>("All");
  return (
    <FilterTabs
      label="Filter by discipline"
      options={options}
      value={value}
      onChange={setValue}
    />
  );
}
