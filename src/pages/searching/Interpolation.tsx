import SearchPage from "../SearchPage";
import { CODE, interpolationSearch } from "@/lib/algorithms";
import { SEARCH_LEGEND } from "@/lib/legends";

const runner = (arr: number[], target: number) => {
  const out: string[] = [];
  let low = 0, high = arr.length - 1;
  out.push(`Start with low=${low}, high=${high}. Target=${target}.`);
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      out.push(`Single element left at index ${low}.`);
      if (arr[low] === target) { out.push(`Match! Return ${low}.`); return out; }
      out.push(`No match. Return -1.`); return out;
    }
    if (arr[low] === arr[high]) {
      out.push(`All values in range [${low}..${high}] are ${arr[low]}.`);
      if (arr[low] === target) out.push(`Match! Return ${low}.`);
      else out.push(`No match. Return -1.`);
      return out;
    }
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    const safe = Math.max(low, Math.min(high, pos));
    out.push(`Estimate position ≈ ${safe} (value ${arr[safe]}).`);
    if (arr[safe] === target) { out.push(`Match! Return ${safe}.`); return out; }
    if (arr[safe] < target) { out.push(`Target greater → search right of ${safe}.`); low = safe + 1; }
    else { out.push(`Target smaller → search left of ${safe}.`); high = safe - 1; }
  }
  out.push(`Out of range. Return -1 (not found).`);
  return out;
};

const Interpolation = () => (
  <SearchPage
    title="Interpolation Search"
    description="A smarter binary search that estimates where the target should be using value distribution."
    howItWorks={`Instead of always picking the middle, we guess where the target is likely to be based on its value.
The formula uses the value range of the array to jump closer to the target.

This works best on sorted, uniformly distributed numeric data.
On uneven data it can degrade to O(n).`}
    defaultArray="10 20 30 40 50 60 70 80 90 100"
    defaultTarget="70"
    needsSorted
    note="Interpolation search works best on sorted, uniformly distributed numbers. Unsorted input is sorted automatically."
    build={interpolationSearch}
    complexity={{ best: "O(1)", average: "O(log log n)", worst: "O(n)", space: "O(1)" }}
    code={CODE.interpolation}
    codeRunner={runner}
    back="/searching"
    legend={SEARCH_LEGEND}
  />
);

export default Interpolation;
