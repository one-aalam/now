import Head from 'next/head';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Layout = ({ title, children }) => (
  <div className="layout">
    <Head>
      <title> { title } </title>
    </Head>
    <Header />
    <Content>
      { children }
    </Content>
    <Footer />
  </div>
);

export default Layout;