import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
  footer,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div>
      <div>
        <Link href={"/parallel"}>parallel</Link>
        <Link href={"/parallel/settings"}>parallel/settings</Link>
      </div>
      <br />
      {sidebar}
      {children}
      {footer}
    </div>
  );
}
