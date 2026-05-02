import SortPage from "../SortPage";
import { CODE, mergeSort } from "@/lib/algorithms";
import { SORT_LEGEND } from "@/lib/legends";

const runner = (arr: number[]) => {
  const out: string[] = [`Initial: [${arr.join(", ")}]`];
  const ms = (a: number[]): number[] => {
    if (a.length <= 1) return a;
    const mid = Math.floor(a.length / 2);
    out.push(`Split [${a.join(", ")}] into [${a.slice(0, mid).join(", ")}] and [${a.slice(mid).join(", ")}]`);
    const L = ms(a.slice(0, mid)); const R = ms(a.slice(mid));
    const merged: number[] = []; let i = 0, j = 0;
    while (i < L.length && j < R.length) merged.push(L[i] <= R[j] ? L[i++] : R[j++]);
    const final = [...merged, ...L.slice(i), ...R.slice(j)];
    out.push(`Merge [${L.join(", ")}] + [${R.join(", ")}] → [${final.join(", ")}]`);
    return final;
  };
  const sorted = ms([...arr]);
  out.push(`Final sorted: [${sorted.join(", ")}]`);
  return out;
};

const Merge = () => (
  <SortPage
    title="Merge Sort"
    description="Split the array in half until pieces have one element, then merge them in order."
    howItWorks={`Divide: cut the array in half repeatedly until each piece has just one item.
Conquer: merge adjacent sorted pieces back together in order.

Always O(n log n) time, but uses extra memory for merging.`}
    defaultArray="38 27 43 3 9 82 10"
    build={mergeSort}
    complexity={{ best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" }}
    code={CODE.merge}
    codeRunner={runner}
    back="/sorting"
    legend={SORT_LEGEND}
  />
);

export default Merge;
