import SortPage from "../SortPage";
import { CODE, bubbleSort } from "@/lib/algorithms";
import { SORT_LEGEND } from "@/lib/legends";

const runner = (arr: number[]) => {
  const a = [...arr]; const out: string[] = [`Initial: [${a.join(", ")}]`];
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        out.push(`Swap ${a[j]} and ${a[j + 1]} at indices ${j},${j + 1}.`);
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    out.push(`Pass ${i + 1} done → [${a.join(", ")}]`);
    if (!swapped) {
      out.push(`No swaps in this pass, so the array is already sorted.`);
      break;
    }
  }
  out.push(`Final sorted: [${a.join(", ")}]`);
  return out;
};

const Bubble = () => (
  <SortPage
    title="Bubble Sort"
    description="Compare neighbors, swap if wrong, repeat. The biggest values 'bubble' to the end."
    howItWorks={`We walk through the array and compare each pair of adjacent elements.
If they are in the wrong order, we swap them.
After each full pass, the largest unsorted element ends up at the end.

Easy to understand, but slow on big arrays.`}
    defaultArray="5 2 8 1 9 3 7 4 6"
    build={bubbleSort}
    complexity={{ best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" }}
    code={CODE.bubble}
    codeRunner={runner}
    back="/sorting"
    legend={SORT_LEGEND}
  />
);

export default Bubble;
