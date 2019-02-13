import Link from "next/link";
import Header from "../components/header";

export default () => (
  <main>
    <Header />
    <section>
      <Link href="/about">
        <a>Go to {process.env.pageAboutTitle}</a>
      </Link>
    </section>
  </main>
);