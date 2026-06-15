"use client";

import { useState } from "react";

interface ContractMethod {
  name: string;
  description: string;
  params: string[];
  category: "admin" | "task" | "escrow" | "profile";
}

const CONTRACT_METHODS: ContractMethod[] = [
  { name: "initialize", description: "Bootstrap the contract with admin, fee BPS, token address, and fee recipient.", params: ["admin: Address", "platform_fee_bps: u32", "token_contract: Address", "fee_recipient: Address"], category: "admin" },
  { name: "create_task", description: "Deposit reward into escrow and register a new on-chain task.", params: ["creator: Address", "title: String", "description: String", "reward: i128", "tags: Vec<String>"], category: "task" },
  { name: "assign_task", description: "Claim an open task and move it to InProgress state.", params: ["assignee: Address", "task_id: u32"], category: "task" },
  { name: "submit_work", description: "Submit a delivery URL, advancing the task to Completed.", params: ["assignee: Address", "task_id: u32", "delivery_url: String"], category: "task" },
  { name: "complete_task", description: "Verify delivery and release escrowed funds minus platform fee.", params: ["caller: Address", "task_id: u32"], category: "escrow" },
  { name: "cancel_task", description: "Cancel an open task and refund the escrowed reward to creator.", params: ["creator: Address", "task_id: u32"], category: "escrow" },
  { name: "dispute_task", description: "Flag a task as Disputed, freezing escrow until admin resolution.", params: ["caller: Address", "task_id: u32"], category: "escrow" },
  { name: "resolve_dispute", description: "Admin allocates custom split of escrowed funds between creator and assignee.", params: ["admin: Address", "task_id: u32", "creator_refund: i128", "assignee_payout: i128"], category: "escrow" },
  { name: "create_profile", description: "Register a developer profile on-chain with username and bio.", params: ["user: Address", "username: String", "bio: String"], category: "profile" },
  { name: "reward_contribution", description: "Increment contributor reputation points upon verified task completion.", params: ["admin: Address", "user: Address", "points: u32"], category: "profile" },
  { name: "get_task", description: "Fetch the full on-chain task struct by its ID.", params: ["task_id: u32"], category: "task" },
  { name: "get_profile", description: "Retrieve contributor profile details from on-chain storage.", params: ["user: Address"], category: "profile" },
];

const CATEGORY_COLORS = {
  admin:   { bg: "bg-rose-500/10",    text: "text-rose-400",    dot: "bg-rose-500"   },
  task:    { bg: "bg-indigo-500/10",  text: "text-indigo-400",  dot: "bg-indigo-500" },
  escrow:  { bg: "bg-amber-500/10",   text: "text-amber-400",   dot: "bg-amber-500"  },
  profile: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500"},
};

export default function ContractExplorer() {
  const [selected, setSelected] = useState<ContractMethod | null>(null);
  const [filter, setFilter] = useState<"all" | "admin" | "task" | "escrow" | "profile">("all");

  const visible = filter === "all" ? CONTRACT_METHODS : CONTRACT_METHODS.filter(m => m.category === filter);

  return (
    <section id="contract-explorer" className="w-full py-20 bg-neutral-950 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">Soroban Smart Contract</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-3">Contract Method Explorer</h2>
          <p className="text-neutral-400 max-w-xl">Inspect every public function exposed by the TaskManager Pro Soroban contract deployed on the Stellar Testnet.</p>
        </div>

        {/* Contract address badge */}
        <div className="flex items-center gap-3 mb-8 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 w-fit">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-neutral-400 font-mono">Testnet Contract:</span>
          <span className="text-xs font-mono text-emerald-400">CDLDVFKHEZ2RVB3NG4UQA4VPD3TSHV6XMHXMHP2BSGCJ2IIWVTOHGDSG</span>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {(["all","admin","task","escrow","profile"] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map((method) => {
            const colors = CATEGORY_COLORS[method.category];
            const isSelected = selected?.name === method.name;
            return (
              <button
                key={method.name}
                onClick={() => setSelected(isSelected ? null : method)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "border-indigo-500/50 bg-neutral-900"
                    : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <span className="font-mono font-bold text-white text-sm">{method.name}()</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${colors.bg} ${colors.text}`}>
                    {method.category}
                  </span>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed">{method.description}</p>
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-neutral-800">
                    <p className="text-xs text-neutral-500 font-semibold mb-2 uppercase tracking-wider">Parameters</p>
                    <div className="space-y-1">
                      {method.params.map(p => (
                        <div key={p} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-indigo-500" />
                          <code className="text-xs text-indigo-300 font-mono">{p}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Live stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: "Contract Methods",  value: "12" },
            { label: "Test Cases Passing", value: "5 / 5" },
            { label: "Network",           value: "Stellar Testnet" },
            { label: "SDK Version",       value: "soroban-sdk v22" },
          ].map(stat => (
            <div key={stat.label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
