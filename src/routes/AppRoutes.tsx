import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Simulator from '../pages/Simulator';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* All pages will be rendered inside the Layout component */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="simulator" element={<Simulator />} />
        <Route path="about" element={<About />} />
        {/* You can add a 404 page here later */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;