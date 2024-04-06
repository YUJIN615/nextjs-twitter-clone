import {ReactNode} from "react";
import styles from './main.module.css';

type Props = { children: ReactNode, modal:ReactNode }

export default function BeforeLoginLayout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      로그인 전 레이아웃
      {children}
      {modal}
    </div>
  );
}
