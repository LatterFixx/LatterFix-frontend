"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Plus, RefreshCw, Send, CheckCircle, UserPlus } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  reward: string;
  token: string;
  status: string;
  assignee: string | null;
  creator: string;
  submission: string | null;
  tags: string[];
}

export default function BountiesPreview() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState<string | null>(null);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [token, setToken] = useState("USDC");
  const [tags, setTags] = useState("");

  // Submission modal state
  const [activeSubmitTaskId, setActiveSubmitTaskId] = useState<number | null>(null);
  const [submissionLink, setSubmissionLink] = useState("");

  const backendUrl = "http://localhost:3001";

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.warn("Backend offline, using fallback mock data:", err);
      setTasks([
        {
          id: 1,
          title: "Soroban Smart Contract Audit",
          description: "Audit the task management escrow smart contract for security vulnerabilities and optimize gas footprint.",
          reward: "2500",
          token: "USDC",
          status: "Open",
          assignee: null,
          creator: "GD3F...TaskManager",
          submission: null,
          tags: ["Security", "Soroban", "Rust"]
        },
        {
          id: 2,
          title: "Freighter Wallet Integration",
          description: "Integrate Freighter Wallet API for secure, decentralized user authentication and signature signing.",
          reward: "1500",
          token: "USDC",
          status: "InProgress",
          assignee: "GB2X...Developer",
          creator: "GD3F...TaskManager",
          submission: null,
          tags: ["Frontend", "TypeScript", "Freighter"]
        },
        {
          id: 3,
          title: "Design Platform Landing Page",
          description: "Create a modern, sleek landing page with dark-mode elements, animations, and branding asset configurations.",
          reward: "800",
          token: "XLM",
          status: "Completed",
          assignee: "GC4W...Designer",
          creator: "GD3F...TaskManager",
          submission: "https://github.com/LatterFixx/latterfix/pull/12",
          tags: ["Design", "CSS", "Next.js"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const connectWallet = () => {
    // Simulated Freighter integration
    const mockAddress = "GC" + Math.random().toString(36).substring(2, 12).toUpperCase() + "TaskManagerPro";
    setWallet(mockAddress);
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) return alert("Please connect wallet first");
    
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      reward,
      token,
      creator: wallet,
      assignee: null,
      submission: null,
      status: "Open",
      tags: tags.split(",").map(t => t.trim())
    };

    try {
      const res = await fetch(`${backendUrl}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          reward,
          token,
          creator: wallet,
          tags: tags.split(",").map(t => t.trim())
        })
      });

      if (res.ok) {
        setShowForm(false);
        setTitle("");
        setDescription("");
        setReward("");
        setTags("");
        fetchTasks();
      } else {
        throw new Error("Failed to save bounty");
      }
    } catch (err) {
      console.warn("Backend offline, saving task locally:", err);
      setTasks(prev => [...prev, newTask]);
      setShowForm(false);
      setTitle("");
      setDescription("");
      setReward("");
      setTags("");
    }
  };

  const handleClaim = async (id: number) => {
    if (!wallet) return alert("Please connect wallet to claim tasks");
    try {
      const res = await fetch(`${backendUrl}/api/tasks/${id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignee: wallet })
      });
      if (res.ok) {
        fetchTasks();
      } else {
        throw new Error("Failed to assign");
      }
    } catch (err) {
      console.warn("Backend offline, claiming task locally:", err);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, assignee: wallet, status: "InProgress" } : t));
    }
  };

  const handleSubmitWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmitTaskId) return;

    try {
      const res = await fetch(`${backendUrl}/api/tasks/${activeSubmitTaskId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submission: submissionLink })
      });
      if (res.ok) {
        setActiveSubmitTaskId(null);
        setSubmissionLink("");
        fetchTasks();
      } else {
        throw new Error("Failed to submit");
      }
    } catch (err) {
      console.warn("Backend offline, submitting work locally:", err);
      setTasks(prev => prev.map(t => t.id === activeSubmitTaskId ? { ...t, submission: submissionLink, status: "Completed" } : t));
      setActiveSubmitTaskId(null);
      setSubmissionLink("");
    }
  };

  const handleVerify = async (id: number) => {
    const mockTxHash = "5a7b..." + Math.random().toString(16).substring(2, 10);
    try {
      const res = await fetch(`${backendUrl}/api/tasks/${id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash: mockTxHash })
      });
      if (res.ok) {
        fetchTasks();
      } else {
        throw new Error("Failed to verify");
      }
    } catch (err) {
      console.warn("Backend offline, completing task locally:", err);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "Verified" } : t));
    }
  };

  return (
    <section id="escrow" className="w-full py-20 bg-neutral-950/50 border-y border-white/5 z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Wallet Status Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-neutral-900 border border-indigo-500/20 rounded-2xl p-6 mb-12 gap-4">
          <div>
            <h3 className="font-bold text-white text-lg">Stellar Account Connection</h3>
            <p className="text-sm text-neutral-400">
              {wallet ? `Connected: ${wallet.substring(0, 10)}...${wallet.substring(wallet.length - 8)}` : "Freighter Wallet not connected"}
            </p>
          </div>
          <button 
            onClick={connectWallet}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-sm"
          >
            {wallet ? "Connected" : "Simulate Wallet Connection"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Live Bounties & Tasks</h2>
            <p className="text-neutral-400">Claim tasks, submit your work, and get paid instantly in decentralized escrows.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" /> Create Bounty
            </button>
            <button 
              onClick={fetchTasks}
              className="p-2 border border-neutral-800 rounded-xl hover:bg-neutral-900 text-neutral-400 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Task Creation Form */}
        {showForm && (
          <form onSubmit={handleCreateTask} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 mb-8 max-w-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Create New Stellar Escrowed Bounty</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Task Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-neutral-950 border border-neutral-850 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              />
              <textarea 
                placeholder="Task Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                required
                className="bg-neutral-950 border border-neutral-850 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 h-28"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" 
                  placeholder="Reward Amount" 
                  value={reward} 
                  onChange={(e) => setReward(e.target.value)}
                  required
                  className="bg-neutral-950 border border-neutral-850 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                />
                <select 
                  value={token} 
                  onChange={(e) => setToken(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="USDC">USDC</option>
                  <option value="XLM">XLM</option>
                </select>
              </div>
              <input 
                type="text" 
                placeholder="Tags (comma separated, e.g. Frontend, React)" 
                value={tags} 
                onChange={(e) => setTags(e.target.value)}
                className="bg-neutral-950 border border-neutral-850 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold">
              Fund & Launch Bounty
            </button>
          </form>
        )}

        {/* Task List Grid */}
        {loading ? (
          <div className="text-center py-12 text-neutral-400">Loading dynamic escrows...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full">
                      {task.reward} {task.token}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                      task.status === "Open" ? "bg-emerald-500/10 text-emerald-400" :
                      task.status === "InProgress" ? "bg-amber-500/10 text-amber-400" :
                      task.status === "Completed" ? "bg-indigo-500/10 text-indigo-400" :
                      "bg-neutral-800 text-neutral-400"
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{task.title}</h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-3">{task.description}</p>
                </div>

                <div>
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {task.tags.map(t => (
                      <span key={t} className="text-xs text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>

                  {/* Actions based on task status */}
                  {task.status === "Open" && (
                    <button 
                      onClick={() => handleClaim(task.id)}
                      className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <UserPlus className="w-4 h-4" /> Claim Bounty
                    </button>
                  )}

                  {task.status === "InProgress" && (
                    <div>
                      {activeSubmitTaskId === task.id ? (
                        <form onSubmit={handleSubmitWork} className="mt-2">
                          <input 
                            type="text" 
                            placeholder="Link to delivery (e.g. GitHub PR)" 
                            value={submissionLink}
                            onChange={(e) => setSubmissionLink(e.target.value)}
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white mb-2 focus:outline-none"
                          />
                          <div className="flex gap-2">
                            <button type="submit" className="flex-1 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500 transition-all flex items-center justify-center gap-1">
                              <Send className="w-3.5 h-3.5" /> Send
                            </button>
                            <button type="button" onClick={() => setActiveSubmitTaskId(null)} className="py-1.5 px-3 bg-neutral-850 text-neutral-400 rounded-lg text-xs hover:bg-neutral-800">
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button 
                          onClick={() => setActiveSubmitTaskId(task.id)}
                          className="w-full py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Send className="w-4 h-4" /> Submit Work
                        </button>
                      )}
                    </div>
                  )}

                  {task.status === "Completed" && (
                    <button 
                      onClick={() => handleVerify(task.id)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" /> Verify & Release Escrow
                    </button>
                  )}

                  {task.status === "Verified" && (
                    <div className="text-center text-xs text-neutral-500 font-medium py-2">
                      🎉 Payout Distributed on Stellar
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
