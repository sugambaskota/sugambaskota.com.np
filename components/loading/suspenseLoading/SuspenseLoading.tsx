import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SuspenseLoading() {
  return (
    <div className="container flex h-full w-full items-center justify-center text-neutral-700">
      <div className="flex items-center justify-center gap-1.5 text-xl">
        <AiOutlineLoading3Quarters className="animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
