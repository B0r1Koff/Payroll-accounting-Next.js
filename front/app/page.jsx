import styles from "./page.module.css";
import Auth from "./authorization/page";

export default function Home() {
  return (
    <main className="app">
      <Auth></Auth>
    </main>
  );
}
