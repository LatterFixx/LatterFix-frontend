"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 font-sans text-neutral-50 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 left-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-950 to-neutral-950 -z-10" />

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl w-full mx-auto backdrop-blur-sm z-10 border-b border-indigo-900/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-lg text-white">L</div>
          <span className="font-bold text-xl tracking-tight">TaskManager<span className="text-indigo-400">Pro</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Stellar Escrow</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-white text-neutral-950 text-sm font-semibold hover:bg-neutral-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Connect Wallet 
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-start px-4 pt-28 pb-32 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Powered by Soroban Smart Contracts
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-100 to-indigo-500"
        >
          Decentralized Work,<br /> Secured by Stellar.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed"
        >
          Create tasks, fund them via on-chain escrow, and securely release payments when work is verified. Fast, transparent, and globally accessible.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] hover:-translate-y-1">
            Create a Task
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-full bg-transparent text-white font-semibold hover:bg-neutral-800 border border-neutral-700 transition-colors flex items-center justify-center gap-2">
            Explore Bounties
          </button>
        </motion.div>

        {/* Feature grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto w-full px-6"
        >
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm text-left hover:border-indigo-500/50 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-100">Native Escrow</h3>
            <p className="text-neutral-400 leading-relaxed">Funds are deterministically locked in Soroban native smart contracts. Zero counterparty risk.</p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm text-left hover:border-indigo-500/50 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-100">Instant Payouts</h3>
            <p className="text-neutral-400 leading-relaxed">Upon task completion, the smart contract triggers sub-second token transfers securely over Stellar.</p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm text-left hover:border-indigo-500/50 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-100">Multi-Sig Verified</h3>
            <p className="text-neutral-400 leading-relaxed">Requires transparent authorization to release payouts, keeping both creators and workers protected.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
