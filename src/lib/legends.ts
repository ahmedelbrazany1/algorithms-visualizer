// Shared legend definitions using design system colors.
export const SEARCH_LEGEND = [
  { color: "hsl(var(--viz-default))", label: "Default" },
  { color: "hsl(var(--viz-active))", label: "Active / checking" },
  { color: "hsl(var(--viz-compare))", label: "Mid (binary)" },
  { color: "hsl(var(--viz-found))", label: "Found" },
  { color: "hsl(var(--viz-discarded))", label: "Discarded range" },
];

export const SORT_LEGEND = [
  { color: "hsl(var(--viz-default))", label: "Default" },
  { color: "hsl(var(--viz-compare))", label: "Comparing" },
  { color: "hsl(var(--primary))", label: "Swapping" },
  { color: "hsl(var(--accent))", label: "Current min / Group" },
  { color: "hsl(var(--viz-pivot))", label: "Pivot / Key" },
  { color: "hsl(var(--viz-sorted))", label: "Sorted" },
];
