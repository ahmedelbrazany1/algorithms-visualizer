import SortPage from "../SortPage";
import { CODE, quickSort } from "@/lib/algorithms";
import { SORT_LEGEND } from "@/lib/legends";

const runner = (arr: number[]) => {
  const out: string[] = [`Initial: [${arr.join(", ")}]`];
  const a = [...arr];
  const qs = (lo: number, hi: number) => {
    if (lo >= hi) return;
    const pivot = a[hi];
    out.push(`Partition [${lo}..${hi}] using pivot ${pivot}.`);
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      if (a[j] <= pivot) { i++; if (i !== j) [a[i], a[j]] = [a[j], a[i]]; }
    }
    [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
    out.push(`Pivot ${pivot} placed at index ${i + 1}. Array: [${a.join(", ")}]`);
    qs(lo, i); qs(i + 2, hi);
  };
  qs(0, a.length - 1);
  out.push(`Final sorted: [${a.join(", ")}]`);
  return out;
};

const Quick = () => (
  <SortPage
    title="Quick Sort"
    description="Pick a pivot, push smaller values left and larger right, then recurse on each side."
    howItWorks={`We choose a pivot (here: the last element).
Everything smaller than the pivot goes to its left, everything larger to its right.
Then we apply the same idea to the two sides — divide and conquer.`}
    defaultArray="10 7 8 9 1 5 6 3 2"
    build={quickSort}
    complexity={{ best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" }}
    code={CODE.quick}
    codeRunner={runner}
    back="/sorting"
    legend={SORT_LEGEND}
  />
);

export default Quick;
