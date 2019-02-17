import Head from 'next/head';
import { useContext } from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import { ThemeContext } from '../contexts/ThemeContext';

const Layout = ({ title, children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="layout" style={{ backgroundColor: theme.background, color: theme.foreground }}>
      <Head>
        <title> { title } </title>
      </Head>
      <button onClick={toggleTheme}>Toggle Theme!</button>
      <Header />
      <Content>
        { children }
      </Content>
      <Footer />
    </div>
  )
};

export default Layout;