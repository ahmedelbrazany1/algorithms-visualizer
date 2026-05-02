import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, BarChart3, ArrowRight, GraduationCap, Sparkles, Users } from "lucide-react";
import logo from "@/assets/ecu-logo.png";

const Home = () => {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <section className="container relative z-10 pt-12 md:pt-20 pb-16 flex flex-col items-center text-center">
        <motion.img
          src={logo}
          alt="Egyptian Chinese University logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-20 md:h-28 w-auto drop-shadow-[0_8px_24px_hsl(var(--primary)/0.35)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Interactive learning
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-5 text-4xl md:text-7xl font-display font-bold tracking-tight leading-[1.05]"
        >
          <span className="text-gradient-primary">Algorithms</span>{" "}
          <span className="text-foreground">Visualizer</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm"
        >
          <span className="glass rounded-full px-4 py-1.5 flex items-center gap-2"><GraduationCap className="h-4 w-4 text-accent" /> Course: <strong className="text-foreground">Algorithms</strong></span>
          <span className="glass rounded-full px-4 py-1.5">Code: <strong className="text-foreground">SET222</strong></span>
          <span className="glass rounded-full px-4 py-1.5">Instructor: <strong className="text-foreground">doaa mabrouk</strong></span>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="mt-10 flex flex-col items-center w-full max-w-4xl relative overflow-hidden rounded-2xl glass border-border/50 p-6 md:p-8"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="flex items-center gap-2 mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <Users className="h-4 w-4" /> Project Members
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
            {[
              { name: "Ahmed Elbrazany", id: "192300475" },
              { name: "Abrar Mostafa", id: "192300008" },
              { name: "Abdullah Haroon", id: "192300300" },
              { name: "Marina emad", id: "192300589" },
              { name: "mayada ahmed", id: "192300584" }
            ].map((member) => (
              <div key={member.id} className="flex flex-col items-center justify-center glass-strong px-6 py-4 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/5 min-w-[220px] hover:-translate-y-1 hover:shadow-elegant hover:border-primary/30 relative group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-semibold text-foreground text-[1.05rem] z-10">{member.name}</span>
                <span className="text-sm text-primary/70 font-mono mt-2 pt-2 border-t border-white/10 w-full text-center tracking-wider z-10">{member.id}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="mt-8 max-w-2xl text-muted-foreground">
          Learn classic searching and sorting algorithms with smooth animations, friendly explanations, and a built-in code mode.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 w-full max-w-4xl">
          {[
            {
              to: "/searching",
              title: "Searching Algorithms",
              desc: "Linear, Binary, and Interpolation — see how they hunt for a target step by step.",
              icon: Search,
              gradient: "from-primary/30 to-primary-glow/10",
              accent: "text-primary",
            },
            {
              to: "/sorting",
              title: "Sorting Algorithms",
              desc: "Bubble, Selection, Insertion, Quick, and Merge — watch the chaos become order.",
              icon: BarChart3,
              gradient: "from-accent/30 to-accent/5",
              accent: "text-accent",
            },
          ].map((c, i) => (
            <motion.div
              key={c.to}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={c.to} className="group block">
                <div className={`relative overflow-hidden rounded-2xl glass p-7 md:p-8 text-left h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant border-border/60 hover:border-primary/50`}>
                  <div className={`absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br ${c.gradient} blur-3xl opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative flex flex-col h-full">
                    <div className={`h-14 w-14 rounded-xl glass-strong grid place-items-center ${c.accent} group-hover:scale-110 transition-transform`}>
                      <c.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl md:text-3xl font-bold">{c.title}</h3>
                    <p className="mt-2 text-muted-foreground">{c.desc}</p>
                    <div className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${c.accent} group-hover:gap-3 transition-all`}>
                      Explore <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
