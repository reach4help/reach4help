import React from 'react';
import Layout from '../components/Layout';
import Privacy from '../sections/Privacy';
import Header from '../components/Header';
import Footer from '../components/Footer';

import Landing from '../sections/Landing';
import About from '../sections/About';
import Resources from '../sections/Resources';
import Team from '../sections/Team';
import Thanks from '../sections/Thanks';

const PrivacyPage = () => (
  <Layout>
    <Header />
    {/* <Landing /> */}
    <Privacy />
    <Footer />
  </Layout>
);

export default PrivacyPage;
