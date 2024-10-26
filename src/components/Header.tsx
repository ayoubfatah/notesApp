import { PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren) {
  return (
    <div className="md:my-16 flex flex-col gap-4 items-center">{children}</div>
  );
}
