import {ReactNode} from "react";

type Props = { children: ReactNode, modal:ReactNode }

export default function BeforeLoginLayout({ children, modal }: Props) {
  return (
    <div>
      로그인 전 레이아웃
      {children}
      {modal}
    </div>
  );
}
