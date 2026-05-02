import SearchPage from "../SearchPage";
import { CODE, binarySearch } from "@/lib/algorithms";
import { SEARCH_LEGEND } from "@/lib/legends";

const runner = (arr: number[], target: number) => {
  const out: string[] = [];
  let low = 0, high = arr.length - 1;
  out.push(`Start with low=${low}, high=${high}. Target=${target}.`);
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    out.push(`mid = floor((${low}+${high})/2) = ${mid}, value = ${arr[mid]}.`);
    if (arr[mid] === target) { out.push(`Match! Return ${mid}.`); return out; }
    if (target < arr[mid]) { out.push(`Target < ${arr[mid]} → search left half.`); high = mid - 1; }
    else { out.push(`Target > ${arr[mid]} → search right half.`); low = mid + 1; }
  }
  out.push(`Range is empty. Return -1 (not found).`);
  return out;
};

const Binary = () => (
  <SearchPage
    title="Binary Search"
    description="Repeatedly halve a sorted array to find the target in logarithmic time."
    howItWorks={`We look at the middle element of the current range.
If it equals the target → done.
If the target is smaller → discard the right half.
If the target is larger → discard the left half.
Repeat until found or the range is empty.

Binary search requires a sorted array.`}
    defaultArray="2 4 6 8 10 12 14 16 18 20"
    defaultTarget="14"
    needsSorted
    note="Binary search requires a sorted array. If your input is unsorted, it will be sorted automatically."
    build={binarySearch}
    complexity={{ best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" }}
    code={CODE.binary}
    codeRunner={runner}
    back="/searching"
    legend={SEARCH_LEGEND}
  />
);

export default Binary;
