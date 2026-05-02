import AlgoIndex from "./AlgoIndex";
import { Waves, Target, MoveRight, Crosshair, Layers } from "lucide-react";

const Sorting = () => (
  <AlgoIndex
    title="Sorting Algorithms"
    subtitle="Five classic sorting techniques visualized as moving bars. Watch the strategies differ."
    items={[
      { to: "/sorting/bubble", title: "Bubble Sort", desc: "Swap adjacent pairs; the largest bubbles to the end.", icon: Waves, complexity: "O(n²)" },
      { to: "/sorting/selection", title: "Selection Sort", desc: "Find the min and place it at the front, repeat.", icon: Target, complexity: "O(n²)" },
      { to: "/sorting/insertion", title: "Insertion Sort", desc: "Insert each new element into its sorted position.", icon: MoveRight, complexity: "O(n²)" },
      { to: "/sorting/quick", title: "Quick Sort", desc: "Pick a pivot, partition, recurse on both halves.", icon: Crosshair, complexity: "O(n log n)" },
      { to: "/sorting/merge", title: "Merge Sort", desc: "Divide into halves, then merge them in order.", icon: Layers, complexity: "O(n log n)" },
    ]}
  />
);

export default Sorting;
