import SearchPage from "../SearchPage";
import { CODE, linearSearch } from "@/lib/algorithms";
import { SEARCH_LEGEND } from "@/lib/legends";

const runner = (arr: number[], target: number) => {
  const out: string[] = [`Start at index 0. Target = ${target}.`];
  for (let i = 0; i < arr.length; i++) {
    out.push(`Compare arr[${i}] = ${arr[i]} with target ${target}.`);
    if (arr[i] === target) { out.push(`Equal! Return index ${i}.`); return out; }
    out.push(`Not equal. Move to next element.`);
  }
  out.push(`End of array. Return -1 (not found).`);
  return out;
};

const Linear = () => (
  <SearchPage
    title="Linear Search"
    description="Walk through the array one element at a time, comparing each with the target."
    howItWorks={`We start at the leftmost element and check each one in order.
If the value matches the target, we stop.
If we reach the end without a match, the target is not in the array.

It works on any array (sorted or not), but it can be slow on large inputs.`}
    defaultArray="1 2 3 4 6 7 9"
    defaultTarget="6"
    build={linearSearch}
    complexity={{ best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" }}
    code={CODE.linear}
    codeRunner={runner}
    back="/searching"
    legend={SEARCH_LEGEND.filter((l) => l.label !== "Mid (binary)" && l.label !== "Discarded range")}
  />
);

export default Linear;
