import { ArrowRight, GitBranch, MessageCircleQuestion, Scale } from "lucide-react";
import { academyContent } from "../content/generatedContent";
import { GlassPanel } from "./GlassPanel";

const scenarios = [
  {
    icon: MessageCircleQuestion,
    title: "Discovery Path",
    prompt: "The owner says the check is part of retirement income.",
    action: "Identify the emotional driver before recommending a path.",
  },
  {
    icon: GitBranch,
    title: "Decision Gate",
    prompt: "The customer asks for a proposal but will not schedule a review.",
    action: "Decide whether this is real progress or a false commitment.",
  },
  {
    icon: Scale,
    title: "Negotiation Moment",
    prompt: "The buyout feels low compared with decades of rent.",
    action: "Expand value before trading dollars.",
  },
];

export function PracticePanel() {
  const chapter = academyContent.chapters.find((item) => item.title.includes("Discovery")) ?? academyContent.chapters[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.7fr_0.3fr]">
      <GlassPanel className="p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-teal">Practice Studio</p>
        <h2 className="mt-3 text-3xl font-semibold">Structured simulations without gimmicks</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">
          The MVP uses static scenarios from the framework. Future versions can introduce scored branching,
          but the goal remains the same: explain why a choice is commercially sound.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <article key={scenario.title} className="rounded-3xl border border-white/12 bg-white/[0.07] p-5">
                <Icon className="h-6 w-6 text-teal" />
                <h3 className="mt-5 text-lg font-semibold">{scenario.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{scenario.prompt}</p>
                <p className="mt-4 text-sm leading-6 text-white/80">{scenario.action}</p>
              </article>
            );
          })}
        </div>
      </GlassPanel>

      <GlassPanel className="p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-white/45">Decision Exercise</p>
        <h3 className="mt-3 text-xl font-semibold">{chapter.title}</h3>
        <div className="mt-5 space-y-3 text-sm leading-6 text-white/68">
          {chapter.greatAeSignals.slice(0, 4).map((signal) => (
            <p key={signal}>{signal}</p>
          ))}
        </div>
        <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-academy">
          Start Scenario <ArrowRight className="h-4 w-4" />
        </button>
      </GlassPanel>
    </div>
  );
}
