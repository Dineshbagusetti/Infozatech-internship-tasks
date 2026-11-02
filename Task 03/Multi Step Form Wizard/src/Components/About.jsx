import React from "react";

function About() {
  return (
    <main className="page-container">

      <section className="about-hero">

        <div className="about-logo">
          Quick<span>Link</span>
        </div>

        <h1>Simple Links. Powerful Possibilities.</h1>

        <p>
          QuickLink is a simple and efficient URL shortening
          application designed to make long URLs short,
          clean, and easy to share.
        </p>

      </section>

      <section className="about-card">

        <h2>What is QuickLink?</h2>

        <p>
          QuickLink converts long and complicated URLs into
          short, shareable links. Instead of sending a long
          URL, you can create a compact link that is easier
          to remember and share.
        </p>

        <p>
          The application also allows you to manage your
          shortened links and keep track of how many times
          they have been visited.
        </p>

      </section>

      <section className="features-section">

        <h2>Why use QuickLink?</h2>

        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🔗
            </div>

            <h3>Short URLs</h3>

            <p>
              Convert long URLs into clean and compact
              links that are easier to share.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>Track Visits</h3>

            <p>
              Keep track of how many times your shortened
              links have been visited.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              📋
            </div>

            <h3>Easy Copy</h3>

            <p>
              Quickly copy shortened links to your
              clipboard with one click.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ⚡
            </div>

            <h3>Fast & Simple</h3>

            <p>
              A clean interface makes creating and
              managing links quick and easy.
            </p>

          </div>

        </div>

      </section>

      <section className="how-it-works">

        <h2>How QuickLink Works</h2>

        <div className="process-grid">

          <div className="process-step">

            <div className="process-number">
              1
            </div>

            <h3>Paste URL</h3>

            <p>
              Enter the long URL you want to shorten.
            </p>

          </div>

          <div className="process-step">

            <div className="process-number">
              2
            </div>

            <h3>Shorten</h3>

            <p>
              Click the Shorten URL button to create
              your short link.
            </p>

          </div>

          <div className="process-step">

            <div className="process-number">
              3
            </div>

            <h3>Share</h3>

            <p>
              Copy your new short URL and share it
              anywhere.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;