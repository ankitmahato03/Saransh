import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <Badge variant="outline" className="text-xl bg-amber-300 rounded-3xl">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 mr-1 text-[#fd0000] animate-pulse" />
          <p>Powered By AI </p>
        </div>
      </Badge>

      <h1 className="text-6xl lg:max-w-4xl font-bold text-center py-6">
        Transform PDFs into{" "}
        <span className=" relative inline-block">
          <span className=" relative z-10 px-2" aria-hidden="true">
            concise{" "}
          </span>
          <span className="absolute inset-0 bg-red-300/50 -rotate-2 rounded-lg transform -skew-y-1 "></span>
        </span>
        Summries
      </h1>
      <h2 className="text-lg  sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the documents in seconds{" "}
      </h2>
      <Button
        variant={"link"}
        size="lg"
        className="bg-amber-300 mt-6 rounded-full "
      >
        <Link href="/#pricing" className="flex items-center gap-2">
          <span className="text-xl "> Try Saransh</span>
          <ArrowRight className="animate-bounce font-bold " />
        </Link>
      </Button>
    </section>
  );
}
