import Head from 'next/head';
import Router from 'next/router';
import { useContext } from 'react';
import Nprogress from 'nprogress';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { ThemeContext } from '../contexts/ThemeContext';

Router.onRouteChangeStart = url => Nprogress.start();
Router.onRouteChangeComplete = () => Nprogress.done();
Router.onRouteChangeError = () => Nprogress.done();

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