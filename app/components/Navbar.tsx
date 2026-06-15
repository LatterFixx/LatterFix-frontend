"use client";

import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 max-w-7xl w-full mx-auto backdrop-blur-md z-50 border-b border-white/5 sticky top-0 bg-neutral-950/80">
      <Logo />
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#escrow" className="hover:text-white transition-colors">Stellar Escrow</a>
        <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
      </div>
      <button className="px-6 py-2.5 rounded-full bg-white text-neutral-950 text-sm font-semibold hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]">
        Connect Wallet 
      </button>
    </nav>
  );
}
