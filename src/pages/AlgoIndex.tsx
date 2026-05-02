import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import PageShell from "@/components/PageShell";

interface Item {
  to: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  complexity: string;
}

interface Props {
  title: string;
  subtitle: string;
  back?: string;
  items: Item[];
}

const AlgoIndex = ({ title, subtitle, items, back }: Props) => {
  return (
    <PageShell title={title} subtitle={subtitle} back={back}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <motion.div
            key={c.to}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={c.to} className="group block h-full">
              <div className="relative overflow-hidden rounded-2xl glass p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-glow blur-3xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl glass-strong grid place-items-center text-primary group-hover:scale-110 transition-transform">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-secondary/60 border border-border text-accent">{c.complexity}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Open <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
};

export default AlgoIndex;
