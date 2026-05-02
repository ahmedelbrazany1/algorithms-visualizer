interface Item { color: string; label: string; }
const Legend = ({ items }: { items: Item[] }) => (
  <div className="flex flex-wrap gap-3 text-xs">
    {items.map((i) => (
      <div key={i.label} className="flex items-center gap-2 glass rounded-full px-3 py-1.5">
        <span className="h-3 w-3 rounded-sm" style={{ background: i.color }} />
        <span className="text-muted-foreground">{i.label}</span>
      </div>
    ))}
  </div>
);
export default Legend;
