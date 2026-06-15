import { Hexagon } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
        <Hexagon className="w-6 h-6 fill-white/20" />
      </div>
      <span className="font-bold text-2xl tracking-tight text-white">
        TaskManager<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Pro</span>
      </span>
    </div>
  );
}
