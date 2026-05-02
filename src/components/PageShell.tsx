import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  back?: string;
}

const segmentLabel = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");

const PageShell = ({ children, title, subtitle, back }: Props) => {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="container py-6 md:py-10"
    >
      <div className="flex flex-col gap-4 mb-6 md:mb-10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            {parts.map((p, i) => {
              const path = "/" + parts.slice(0, i + 1).join("/");
              const last = i === parts.length - 1;
              return (
                <span key={path} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  {last ? (
                    <span className="text-foreground">{segmentLabel(p)}</span>
                  ) : (
                    <Link to={path} className="hover:text-foreground transition-colors">{segmentLabel(p)}</Link>
                  )}
                </span>
              );
            })}
          </nav>
          {back && (
            <Button asChild variant="ghost" size="sm">
              <Link to={back}><ArrowLeft className="h-4 w-4" /> Back</Link>
            </Button>
          )}
        </div>
        {title && (
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
              <span className="text-gradient-primary">{title}</span>
            </h1>
            {subtitle && <p className="text-muted-foreground max-w-3xl">{subtitle}</p>}
          </div>
        )}
      </div>
      {children}
    </motion.main>
  );
};

export default PageShell;
