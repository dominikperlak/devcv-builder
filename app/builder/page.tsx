'use client';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Builder from '../components/resume/resumebuilder';

const Builderpage = () => {
  return (
    <Router>
      <Builder />
    </Router>
  );
};

export default Builderpage;
