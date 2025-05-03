import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NavLink({
  herf,
  children,
  className,
}: {
  herf: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <Link
      href={herf}
      className={cn(
        "transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500"
      )}
    >
      {}
    </Link>
  );
}
