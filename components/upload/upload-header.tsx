import { Sparkle } from "lucide-react";
import { Badge } from "../ui/badge";

export default function UploadHeader(){
    return(
         <div className="flex flex-col justify-center items-center text-center gap-6">
          {/* Badge with icon */}
          <div className="relative overflow-hidden p-[1px] rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group ">
            <Badge
              variant="secondary"
              className="flex items-center gap-2 py-2 px-6 text-base font-medium bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Sparkle className="h-5 w-5 text-rose-600 animate-pulse" />
              <span>AI Powered Content Creation</span>
            </Badge>
          </div>
          <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Start uploading{" "}
            <span className=" relative inline-block">
              <span className=" relative z-10 px-2" aria-hidden="true">
                Your PDF's{" "}
              </span>
              <span className="absolute inset-0 bg-amber-500/70 -rotate-2 rounded-lg transform -skew-y-1 "></span>
            </span>
          </div>
          <div className="mt-2 leading-8 text-lg  text-gray-600 max-w-2xl text-center">
            <p className="">
              Upload your PDF and let AI do the magic.
            </p>
          </div>
        </div>
    )
}