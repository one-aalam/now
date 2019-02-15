import Link from 'next/link';
import fetch from 'isomorphic-fetch';
import Layout from '../components/Layout';

const AboutPage = ({ isServer, stars }) => (
  <Layout>
      <p>
        This is another page of the SSR example, you accessed it{" "}
        <strong>{ isServer ? "server" : "client" } side</strong>.
        { stars }
      </p>
      <p>
        You can reload to see how the page change.
      </p>
      <Link href="/">
        <a>Go to Home</a>
      </Link>
  </Layout>
)

AboutPage.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/developit/preact')
  const json = await res.json()
  const isServer = typeof window === "undefined";
  return { stars: json.stargazers_count, isServer }
}

export default AboutPage