import Head from 'next/head';
import { useContext } from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import { ThemeContext } from '../contexts/ThemeContext';

const Layout = ({ title, children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="h-full" style={{ backgroundColor: theme.background, color: theme.foreground }}>
      <Head>
        <title> { title } </title>
      </Head>
      <div className="container mx-auto h-full">
        <Header/>
        <Content>
          { children }
        </Content>
        <Footer/>
      </div>
    </div>
  )
};

export default Layout;