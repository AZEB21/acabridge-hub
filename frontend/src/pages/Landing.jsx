import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing">
      <nav>
        <span>AcaBridge</span>
        <div>
          <Link to="/signin">Sign in</Link>
          <Link to="/register">Apply now</Link>
        </div>
      </nav>
      <section className="hero">
        <span className="badge">Africa Agility Academy</span>
        <h1>Africa's next generation of<br /><span>tech talent starts here.</span></h1>
        <p>One classroom. Real mentors. Live cohorts. Career-ready outcomes.</p>
        <Link to="/register" className="btn-primary">Apply to Cohort 9.0</Link>
      </section>
    </div>
  );
}
