import { CloudAlertIcon, FileText, LogOutIcon, MoveRight } from "lucide-react";
import { ReactNode } from "react";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText />,
    label: "Upload PDF",
    description: "Easily upload your PDF document to get started.",
  },
  {
    icon: <CloudAlertIcon />,
    label: "Process",
    description: "Our system processes the document to extract key insights.",
  },
  {
    icon: <LogOutIcon />,
    label: "Download Summary",
    description: "Download the summarized version of your document.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="uppercase font-bold text-xl mb-4 text-rose-500">
            How it works
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto">
            Transform any PDF into an easy-to-digest Summary in three steps
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <div className="relative flex items-stretch">
              <StepItem key={idx} {...step} />
              {idx<steps.length - 1 && (
              <div className="hidden md:block top-1/2 -right-4  absolute transform -translate-y-1/2 z-10">
                <MoveRight
                  size={32}
                  strokeWidth={1}
                  className="text-rose-500"
                />
              </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24  w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20">
          <div className="text-rose-500 ">{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="font-semibold text-lg mb-2 text-center">{label}</h4>
          <p className="text-sm text-gray-600 text-center">{description}</p>
        </div>
      </div>
    </div>
  );
}
