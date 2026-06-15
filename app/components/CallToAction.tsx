export default function CallToAction() {
  return (
    <section className="w-full py-24 z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Ready to decentralize your workflow?
        </h2>
        <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of developers and DAOs using TaskManager Pro to securely delegate tasks and distribute bounties using the Stellar network.
        </p>
        <button className="px-10 py-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:from-indigo-400 hover:to-purple-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105">
          Start for Free
        </button>
      </div>
    </section>
  );
}
