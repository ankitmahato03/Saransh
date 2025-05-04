import { Pizza } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12  ">
        <div className="flex flex-col items-center text-center space-y-4">
          <Pizza className="w-6 h-6 text-rose-500 " />
          <div className="text-center mb-16">
            <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
              Whatch How Saransh Transform
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                this NExt.js cousrse PDF
              </span>
              into an easy-to-read summary!
            </h3>
          </div>
          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
            {/* Summary Viewr  */}
          </div>
        </div>
      </div>
    </section>
  );
}
