"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Lock } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="w-full pb-32 pt-12 z-10">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-6"
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
    </section>
  );
}
