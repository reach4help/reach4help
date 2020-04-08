import React from 'react';
import Layout from '../components/Layout';
import Landing from '../sections/Landing';
import About from '../sections/About';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Resources from '../sections/Resources';
import Team from '../sections/Team';
import Thanks from '../sections/Thanks';

const IndexPage = () => (
  <Layout>
    <Header />
    <Landing />
    <About />
    <Resources />
    <Team />
    <Thanks />
    <Footer />
  </Layout>
);

export default IndexPage;
