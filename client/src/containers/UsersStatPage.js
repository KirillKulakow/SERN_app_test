import React from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TableStats from "../components/TableStats";
import Title from "../components/Title";

const UsersStatPage = () => {
  return (
    <>
      <Header />
      <main>
        <BreadCrumbs />
        <Title text='Users statistics' />
        <TableStats />
      </main>
      <Footer />
    </>
  );
};

export default UsersStatPage;
