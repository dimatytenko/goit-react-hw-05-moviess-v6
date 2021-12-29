import styles from "./Appbar.module.css";
import Navigation from "../Navigation";

export default function AppBar() {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
}
