"use client";

import { useRouter } from "next/navigation";

export default function Link({ href, children, className }) {
  const router = useRouter();
  return (
    <>
      <span
        onClick={() => {
          router.push(href);
        }}
        className={className}
      >
        {children}
      </span>
    </>
  );
}

