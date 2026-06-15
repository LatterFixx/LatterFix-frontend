import Hero from "./components/Hero";
import Features from "./components/Features";
import BountiesPreview from "./components/BountiesPreview";
import ContractExplorer from "./components/ContractExplorer";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <>
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 left-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-950 to-neutral-950 -z-10" />

      <main className="flex-1 flex flex-col items-center justify-start w-full">
        <Hero />
        <BountiesPreview />
        <Features />
        <ContractExplorer />
        <CallToAction />
      </main>
    </>
  );
}
