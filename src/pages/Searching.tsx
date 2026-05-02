import AlgoIndex from "./AlgoIndex";
import { ListOrdered, Binary, Sigma } from "lucide-react";

const Searching = () => (
  <AlgoIndex
    title="Searching Algorithms"
    subtitle="Three ways to find a value inside an array. Pick one to see it run, step by step."
    items={[
      { to: "/searching/linear", title: "Linear Search", desc: "Check every element from left to right until found.", icon: ListOrdered, complexity: "O(n)" },
      { to: "/searching/binary", title: "Binary Search", desc: "Repeatedly halve a sorted array to zero in on the target.", icon: Binary, complexity: "O(log n)" },
      { to: "/searching/interpolation", title: "Interpolation Search", desc: "Estimate the target's position using value distribution.", icon: Sigma, complexity: "O(log log n)" },
    ]}
  />
);

export default Searching;
