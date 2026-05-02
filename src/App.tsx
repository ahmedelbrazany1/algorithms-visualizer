import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Home from "./pages/Home";
import Searching from "./pages/Searching";
import Sorting from "./pages/Sorting";
import Linear from "./pages/searching/Linear";
import Binary from "./pages/searching/Binary";
import Interpolation from "./pages/searching/Interpolation";
import Bubble from "./pages/sorting/Bubble";
import Selection from "./pages/sorting/Selection";
import Insertion from "./pages/sorting/Insertion";
import Quick from "./pages/sorting/Quick";
import Merge from "./pages/sorting/Merge";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/searching" element={<Searching />} />
        <Route path="/searching/linear" element={<Linear />} />
        <Route path="/searching/binary" element={<Binary />} />
        <Route path="/searching/interpolation" element={<Interpolation />} />
        <Route path="/sorting" element={<Sorting />} />
        <Route path="/sorting/bubble" element={<Bubble />} />
        <Route path="/sorting/selection" element={<Selection />} />
        <Route path="/sorting/insertion" element={<Insertion />} />
        <Route path="/sorting/quick" element={<Quick />} />
        <Route path="/sorting/merge" element={<Merge />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
