"use client";

import React from "react";

export default function Filter({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <div className="position-relative">
      <button
        onClick={handleOnClick}
        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {title}
        <svg
          className="-mr-1 size-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {expanded && (
        <div className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-gray-300 ring-inset">
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function FilterItem({
  children,
  url,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  url: string;
}) {
  return (
    <a
      href={url}
      className="inline-flex w-full justify-between rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
      {...props}
    >
      {children}
    </a>
  );
}
