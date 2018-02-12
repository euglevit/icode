import React from 'react';
import './LandingHeader.css';

export default function LandingHeader(){

  return (
    <div className="landing-header-wrapper">
      <div className="landing-header">
        <i className="fas fa-question"></i>
        <h2>Ask Questions</h2>
        <p className="landing-header-text">Log In And Ask A Web Development Question. </p>
      </div>
      <div className="landing-header">
        <i className="fas fa-code"></i>
        <h2>Learn To Code</h2>
        <p className="landing-header-text">Check Out Questions Others Have Asked.</p>
      </div>
      <div className="landing-header">
        <i className="far fa-lightbulb"></i>
        <h2>Help Others</h2>
        <p className="landing-header-text">Answer Others Questions To Help Their Learning, And Yours!</p>
      </div>
    </div>
  )
}