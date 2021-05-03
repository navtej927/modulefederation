import React from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';

const Shell = ({ children }) => {
  console.log("children", children)
  return <>
    <Header />
    <div id="content">
      {children}
    </div>
    <Footer />
  </>
}

export default Shell;