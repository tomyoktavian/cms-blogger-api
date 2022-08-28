import React from 'react';
import Navbar from '@components/navbar';

import Footer from '@components/footer';
// import PopupWidget from "../components/popupWidget";

export default function Layout(props: any) {
  const { children } = props;
  return (
    <>
      <div className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Navbar {...props} />
        <div>{children}</div>

        <Footer {...props} />
      </div>
    </>
  );
}
