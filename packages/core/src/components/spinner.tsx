import * as React from "react";
import { cn } from "../lib/utils.js";
import { LoaderIcon } from "lucide-react";

export type SpinnerProps = React.ComponentProps<"svg"> & {
  label?: string;
};

function Spinner({ className, label = "Loading", ...props }: SpinnerProps) {
  return (
    <LoaderIcon
      role="status"
      aria-label={label}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
