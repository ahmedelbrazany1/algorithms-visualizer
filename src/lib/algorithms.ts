// Algorithm step generators. Each yields a sequence of "frames" the UI animates.

export type SearchFrame = {
  array: number[];
  step?: number; // number of element checks/comparisons completed so far
  active?: number; // index currently being checked
  low?: number;
  high?: number;
  mid?: number;
  estimate?: number;
  discarded?: [number, number][]; // ranges that are excluded
  found?: number; // index where found
  failed?: boolean;
  message: string;
};

export type SortFrame = {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  pivot?: number;
  sorted?: number[];
  currentMin?: number;
  key?: number; // insertion sort key index
  group?: [number, number][]; // merge sort sub-array bounds being processed
  message: string;
  comparisons: number;
  swaps: number;
};

// ---------------- SEARCH ----------------
export function linearSearch(arr: number[], target: number): SearchFrame[] {
  const frames: SearchFrame[] = [];
  let step = 0;
  frames.push({ array: arr, step, message: `Start linear search for ${target}. Check each element from left to right.` });
  for (let i = 0; i < arr.length; i++) {
    step++;
    frames.push({ array: arr, step, active: i, message: `Compare arr[${i}] = ${arr[i]} with target ${target}.` });
    if (arr[i] === target) {
      frames.push({ array: arr, step, active: i, found: i, message: `Found ${target} at index ${i}.` });
      return frames;
    }
  }
  frames.push({ array: arr, step, failed: true, message: `${target} was not found in the array.` });
  return frames;
}

export function binarySearch(sorted: number[], target: number): SearchFrame[] {
  const frames: SearchFrame[] = [];
  let low = 0, high = sorted.length - 1;
  let step = 0;
  frames.push({ array: sorted, step, low, high, message: `Start with low=${low}, high=${high}.` });
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    step++;
    frames.push({ array: sorted, step, low, high, mid, active: mid, message: `Mid index = ${mid}, value = ${sorted[mid]}.` });
    if (sorted[mid] === target) {
      frames.push({ array: sorted, step, low, high, mid, found: mid, message: `Found ${target} at index ${mid}.` });
      return frames;
    }
    if (target < sorted[mid]) {
      const newHigh = mid - 1;
      frames.push({ array: sorted, step, low, high: newHigh, mid, message: `Target < ${sorted[mid]}. Move to LEFT half.`, discarded: [[mid, high]] });
      high = newHigh;
    } else {
      const newLow = mid + 1;
      frames.push({ array: sorted, step, low: newLow, high, mid, message: `Target > ${sorted[mid]}. Move to RIGHT half.`, discarded: [[low, mid]] });
      low = newLow;
    }
  }
  frames.push({ array: sorted, step, failed: true, message: `${target} was not found.` });
  return frames;
}

export function interpolationSearch(sorted: number[], target: number): SearchFrame[] {
  const frames: SearchFrame[] = [];
  let low = 0, high = sorted.length - 1;
  let step = 0;
  frames.push({ array: sorted, step, low, high, message: `Start with low=${low}, high=${high}.` });
  while (low <= high && target >= sorted[low] && target <= sorted[high]) {
    if (low === high) {
      step++;
      frames.push({ array: sorted, step, low, high, active: low, message: `Single element left. Check arr[${low}] = ${sorted[low]}.` });
      if (sorted[low] === target) frames.push({ array: sorted, step, found: low, message: `Found ${target} at index ${low}.` });
      else frames.push({ array: sorted, step, failed: true, message: `${target} not found.` });
      return frames;
    }
    if (sorted[low] === sorted[high]) {
      step++;
      frames.push({ array: sorted, step, low, high, active: low, message: `All values in range [${low}..${high}] are ${sorted[low]}. Check one value.` });
      if (sorted[low] === target) {
        frames.push({ array: sorted, step, found: low, message: `Found ${target} at index ${low}.` });
      } else {
        frames.push({ array: sorted, step, failed: true, message: `${target} not found.` });
      }
      return frames;
    }
    const pos = low + Math.floor(((target - sorted[low]) * (high - low)) / (sorted[high] - sorted[low]));
    const safePos = Math.max(low, Math.min(high, pos));
    step++;
    frames.push({ array: sorted, step, low, high, estimate: safePos, active: safePos, message: `Estimate position ≈ ${safePos} (value ${sorted[safePos]}) based on value distribution.` });
    if (sorted[safePos] === target) {
      frames.push({ array: sorted, step, found: safePos, message: `Found ${target} at index ${safePos}.` });
      return frames;
    }
    if (sorted[safePos] < target) {
      frames.push({ array: sorted, step, low: safePos + 1, high, message: `Target > ${sorted[safePos]}. Search to the right.`, discarded: [[low, safePos]] });
      low = safePos + 1;
    } else {
      frames.push({ array: sorted, step, low, high: safePos - 1, message: `Target < ${sorted[safePos]}. Search to the left.`, discarded: [[safePos, high]] });
      high = safePos - 1;
    }
  }
  frames.push({ array: sorted, step, failed: true, message: `${target} not found.` });
  return frames;
}

// ---------------- SORT ----------------
const f = (a: number[], extra: Partial<SortFrame>, c: number, s: number, msg: string): SortFrame =>
  ({ array: [...a], comparisons: c, swaps: s, message: msg, ...extra });

export function bubbleSort(input: number[]): SortFrame[] {
  const a = [...input]; const frames: SortFrame[] = []; let c = 0, s = 0;
  const sorted: number[] = [];
  frames.push(f(a, { sorted: [...sorted] }, c, s, `Bubble Sort: compare adjacent pairs and swap if out of order.`));
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      c++;
      frames.push(f(a, { comparing: [j, j + 1], sorted: [...sorted] }, c, s, `Compare ${a[j]} and ${a[j + 1]}.`));
      if (a[j] > a[j + 1]) {
        const left = a[j];
        const right = a[j + 1];
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; s++; swapped = true;
        frames.push(f(a, { swapping: [j, j + 1], sorted: [...sorted] }, c, s, `Swap because ${left} > ${right}.`));
      }
    }
    sorted.unshift(a.length - 1 - i);
    frames.push(f(a, { sorted: [...sorted] }, c, s, `Largest of pass settled at index ${a.length - 1 - i}.`));
    if (!swapped) {
      frames.push(f(a, { sorted: a.map((_, idx) => idx) }, c, s, `No swaps in this pass. Array is already sorted.`));
      return frames;
    }
  }
  frames.push(f(a, { sorted: a.map((_, idx) => idx) }, c, s, `Sorted!`));
  return frames;
}

export function selectionSort(input: number[]): SortFrame[] {
  const a = [...input]; const frames: SortFrame[] = []; let c = 0, s = 0;
  const sorted: number[] = [];
  frames.push(f(a, { sorted: [...sorted] }, c, s, `Selection Sort: find the minimum and place it at the front.`));
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    frames.push(f(a, { currentMin: minIdx, sorted: [...sorted] }, c, s, `Assume min at index ${i} (value ${a[i]}).`));
    for (let j = i + 1; j < a.length; j++) {
      c++;
      frames.push(f(a, { currentMin: minIdx, comparing: [j], sorted: [...sorted] }, c, s, `Compare ${a[j]} with current min ${a[minIdx]}.`));
      if (a[j] < a[minIdx]) {
        minIdx = j;
        frames.push(f(a, { currentMin: minIdx, sorted: [...sorted] }, c, s, `New minimum: ${a[minIdx]} at index ${minIdx}.`));
      }
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]]; s++;
      frames.push(f(a, { swapping: [i, minIdx], sorted: [...sorted] }, c, s, `Swap min into position ${i}.`));
    }
    sorted.push(i);
    frames.push(f(a, { sorted: [...sorted] }, c, s, `Index ${i} sorted.`));
  }
  return frames;
}

export function insertionSort(input: number[]): SortFrame[] {
  const a = [...input]; const frames: SortFrame[] = []; let c = 0, s = 0;
  const sorted: number[] = a.length > 0 ? [0] : [];
  frames.push(f(a, { sorted: [...sorted] }, c, s, `Insertion Sort: grow a sorted prefix one element at a time.`));
  for (let i = 1; i < a.length; i++) {
    const key = a[i]; let j = i - 1;
    frames.push(f(a, { key: i, sorted: [...sorted] }, c, s, `Pick key ${key} at index ${i}.`));
    while (j >= 0) {
      c++;
      frames.push(f(a, { key: i, comparing: [j, j + 1], sorted: [...sorted] }, c, s, `Compare ${a[j]} with key ${key}.`));
      if (a[j] > key) {
        a[j + 1] = a[j]; s++;
        frames.push(f(a, { swapping: [j, j + 1], sorted: [...sorted] }, c, s, `Shift ${a[j]} to index ${j + 1}.`));
        j--;
      } else {
        break;
      }
    }
    a[j + 1] = key;
    sorted.push(i);
    frames.push(f(a, { sorted: [...sorted] }, c, s, `Insert key ${key} at index ${j + 1}.`));
  }
  return frames;
}

export function quickSort(input: number[]): SortFrame[] {
  const a = [...input]; const frames: SortFrame[] = []; let c = 0, s = 0;
  const sortedSet = new Set<number>();

  const partition = (lo: number, hi: number): number => {
    const pivot = a[hi];
    frames.push(f(a, { pivot: hi, sorted: [...sortedSet] }, c, s, `Pivot = ${pivot} (index ${hi}). Partition [${lo}..${hi}].`));
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      c++;
      frames.push(f(a, { pivot: hi, comparing: [j], sorted: [...sortedSet] }, c, s, `Compare ${a[j]} with pivot ${pivot}.`));
      if (a[j] <= pivot) {
        i++;
        if (i !== j) {
          const left = a[i];
          const right = a[j];
          [a[i], a[j]] = [a[j], a[i]]; s++;
          frames.push(f(a, { pivot: hi, swapping: [i, j], sorted: [...sortedSet] }, c, s, `Swap ${left} ↔ ${right}.`));
        }
      }
    }
    if (i + 1 !== hi) {
      [a[i + 1], a[hi]] = [a[hi], a[i + 1]]; s++;
      frames.push(f(a, { swapping: [i + 1, hi], sorted: [...sortedSet] }, c, s, `Place pivot ${pivot} at index ${i + 1}.`));
    } else {
      frames.push(f(a, { pivot: hi, sorted: [...sortedSet] }, c, s, `Pivot ${pivot} is already at index ${hi}.`));
    }
    sortedSet.add(i + 1);
    return i + 1;
  };

  const qs = (lo: number, hi: number) => {
    if (lo <= hi) {
      if (lo === hi) { sortedSet.add(lo); return; }
      const p = partition(lo, hi);
      qs(lo, p - 1);
      qs(p + 1, hi);
    }
  };

  frames.push(f(a, {}, c, s, `Quick Sort: pick a pivot, partition, recurse.`));
  qs(0, a.length - 1);
  for (let i = 0; i < a.length; i++) sortedSet.add(i);
  frames.push(f(a, { sorted: [...sortedSet] }, c, s, `Sorted!`));
  return frames;
}

export function mergeSort(input: number[]): SortFrame[] {
  const a = [...input]; const frames: SortFrame[] = []; let c = 0, s = 0;
  frames.push(f(a, {}, c, s, `Merge Sort: divide the array, then merge sorted halves.`));

  const merge = (lo: number, mid: number, hi: number) => {
    const left = a.slice(lo, mid + 1);
    const right = a.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    frames.push(f(a, { group: [[lo, mid], [mid + 1, hi]] }, c, s, `Merge [${lo}..${mid}] and [${mid + 1}..${hi}].`));
    while (i < left.length && j < right.length) {
      c++;
      if (left[i] <= right[j]) { a[k++] = left[i++]; } else { a[k++] = right[j++]; }
      s++;
      frames.push(f(a, { group: [[lo, hi]], comparing: [k - 1] }, c, s, `Place value at index ${k - 1}.`));
    }
    while (i < left.length) { a[k++] = left[i++]; s++; frames.push(f(a, { group: [[lo, hi]], comparing: [k - 1] }, c, s, `Copy remaining left.`)); }
    while (j < right.length) { a[k++] = right[j++]; s++; frames.push(f(a, { group: [[lo, hi]], comparing: [k - 1] }, c, s, `Copy remaining right.`)); }
    frames.push(f(a, { group: [[lo, hi]] }, c, s, `Merged [${lo}..${hi}].`));
  };

  const ms = (lo: number, hi: number) => {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    frames.push(f(a, { group: [[lo, mid], [mid + 1, hi]] }, c, s, `Divide [${lo}..${hi}] into two halves.`));
    ms(lo, mid);
    ms(mid + 1, hi);
    merge(lo, mid, hi);
  };

  ms(0, a.length - 1);
  frames.push(f(a, { sorted: a.map((_, i) => i) }, c, s, `Sorted!`));
  return frames;
}

// Source code strings shown in Code Mode
export const CODE: Record<string, string> = {
  linear: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;   // found
  }
  return -1;                           // not found
}`,
  binary: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (target < arr[mid]) high = mid - 1;
    else low = mid + 1;
  }
  return -1;
}`,
  interpolation: `function interpolationSearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,
  bubble: `function bubbleSort(a) {
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}`,
  selection: `function selectionSort(a) {
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
}`,
  insertion: `function insertionSort(a) {
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}`,
  quick: `function quickSort(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return a;
  const pivot = a[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (a[j] <= pivot) {
      i++;
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
  [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
  quickSort(a, lo, i);
  quickSort(a, i + 2, hi);
  return a;
}`,
  merge: `function mergeSort(a) {
  if (a.length <= 1) return a;
  const mid = Math.floor(a.length / 2);
  const left = mergeSort(a.slice(0, mid));
  const right = mergeSort(a.slice(mid));
  const merged = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    merged.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return [...merged, ...left.slice(i), ...right.slice(j)];
}`,
};

export function parseArray(input: string): number[] {
  return input
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}

export function isSorted(a: number[]): boolean {
  for (let i = 1; i < a.length; i++) if (a[i] < a[i - 1]) return false;
  return true;
}
