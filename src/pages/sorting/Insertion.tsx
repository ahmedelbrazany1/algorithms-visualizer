import SortPage from "../SortPage";
import { CODE, insertionSort } from "@/lib/algorithms";
import { SORT_LEGEND } from "@/lib/legends";

const runner = (arr: number[]) => {
  const a = [...arr]; const out: string[] = [`Initial: [${a.join(", ")}]`];
  for (let i = 1; i < a.length; i++) {
    const key = a[i]; let j = i - 1;
    out.push(`Pick key ${key} at index ${i}.`);
    while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
    a[j + 1] = key;
    out.push(`Insert ${key} at index ${j + 1} → [${a.join(", ")}]`);
  }
  out.push(`Final sorted: [${a.join(", ")}]`);
  return out;
};

const Insertion = () => (
  <SortPage
    title="Insertion Sort"
    description="Build a sorted prefix one element at a time, just like sorting playing cards."
    howItWorks={`We start with one card in our 'sorted hand'.
For each new card, we slide it left past larger cards until it sits in the right place.

Great for small or nearly-sorted arrays.`}
    defaultArray="8 3 6 1 5 2 7 4"
    build={insertionSort}
    complexity={{ best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" }}
    code={CODE.insertion}
    codeRunner={runner}
    back="/sorting"
    legend={SORT_LEGEND}
  />
);

export default Insertion;
