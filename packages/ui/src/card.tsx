import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border px-6 py-4 bg-white rounded-xl bg-[#ededed]"
    >
      <h1 className="text-xl font-semibold text-gray-800 border-b pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}
