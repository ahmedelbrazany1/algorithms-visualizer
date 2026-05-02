import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, BarChart3, Home } from "lucide-react";
import logo from "@/assets/ecu-logo.png";
import { motion } from "framer-motion";

const Navbar = () => {
  const { pathname } = useLocation();
  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/searching", label: "Searching", icon: Search },
    { to: "/sorting", label: "Sorting", icon: BarChart3 },
  ];
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass-strong border-b border-border/60">
        <nav className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="ECU logo" className="h-9 w-auto transition-transform group-hover:scale-105" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-bold text-sm tracking-wide">ECU Algorithms</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Visualizer</span>
            </div>
          </Link>
          <ul className="flex items-center gap-1">
            {items.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={`relative flex items-center gap-2 px-3 sm:px-4 h-10 rounded-md text-sm font-medium transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{label}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-md bg-gradient-primary opacity-20 border border-primary/40"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
