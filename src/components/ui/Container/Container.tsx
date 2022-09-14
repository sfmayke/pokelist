import { ReactElement, ReactNode } from "react";

interface ContainerProps {
  children: ReactElement | ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return(
    <div className="container-root">
      {children}
    </div>
  );
}