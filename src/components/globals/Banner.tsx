import { LucideIcon, MessageSquareWarningIcon } from "lucide-react";
import { ReactNode } from "react";

function Banner({ label }: { label: string }) {
  return (
    <div className="h-12 px-4 py-6 flex items-center gap-3 text-sm text-yellow-900 bg-yellow-200 border-b-2 border-yellow-300">
      <>
        <MessageSquareWarningIcon className="w-5" />
      </>
      <p>{label}</p>
    </div>
  );
}
export default Banner;
