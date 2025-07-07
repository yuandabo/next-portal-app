// src/components/ui/Skeleton.tsx
import React from "react";
import clsx from "clsx";

type Props = {
  className?: string;
};

export function Skeleton({ className }: Props) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-200 dark:bg-gray-700 rounded ",
        className
      )}
    />
  );
}
