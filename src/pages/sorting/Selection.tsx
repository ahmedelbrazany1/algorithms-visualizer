import SortPage from "../SortPage";
import { CODE, selectionSort } from "@/lib/algorithms";
import { SORT_LEGEND } from "@/lib/legends";

const runner = (arr: number[]) => {
  const a = [...arr]; const out: string[] = [`Initial: [${a.join(", ")}]`];
  for (let i = 0; i < a.length; i++) {
    let m = i;
    for (let j = i + 1; j < a.length; j++) if (a[j] < a[m]) m = j;
    if (m !== i) { out.push(`Swap min ${a[m]} into position ${i}.`); [a[i], a[m]] = [a[m], a[i]]; }
    else out.push(`Position ${i} already holds the minimum.`);
  }
  out.push(`Final sorted: [${a.join(", ")}]`);
  return out;
};

const Selection = () => (
  <SortPage
    title="Selection Sort"
    description="Find the smallest remaining value and put it at the front. Repeat."
    howItWorks={`We scan the unsorted part to find the minimum.
We swap that minimum with the first unsorted element.
The sorted part grows from left to right.`}
    defaultArray="29 10 14 37 13 7 22"
    build={selectionSort}
    complexity={{ best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)" }}
    code={CODE.selection}
    codeRunner={runner}
    back="/sorting"
    legend={SORT_LEGEND}
  />
);

export default Selection;
