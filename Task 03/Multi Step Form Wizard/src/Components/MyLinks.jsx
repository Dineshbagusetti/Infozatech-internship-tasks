
import React, { useState } from "react";

function MyLinks() {

  /* LINK DATA*/

  const [links, setLinks] = useState([
    {
      id: 1,
      originalUrl:
        "https://www.google.com/search?q=javascript+tutorial",
      shortUrl: "https://ql.ink/9K12p",
      createdAt: "Sep 8, 2025",
      visits: 12,
    },
    {
      id: 2,
      originalUrl:
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      shortUrl: "https://ql.ink/mN4vT",
      createdAt: "Sep 7, 2025",
      visits: 34,
    },
    {
      id: 3,
      originalUrl:
        "https://www.github.com/features",
      shortUrl: "https://ql.ink/P3zK8",
      createdAt: "Sep 5, 2025",
      visits: 8,
    },
    {
      id: 4,
      originalUrl:
        "https://www.wikipedia.org/wiki/Artificial_intelligence",
      shortUrl: "https://ql.ink/L9tQ1",
      createdAt: "Sep 3, 2025",
      visits: 21,
    },
  ]);

  // Stores the ID of the link that was copied
  const [copiedId, setCopiedId] = useState(null);


  /* COPY SHORT URL */

  const handleCopy = async (url, id) => {
    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback method
        const textArea =
          document.createElement("textarea");

        textArea.value = url;

        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(textArea);
      }

      // Show copied message
      setCopiedId(id);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error(
        "Unable to copy URL:",
        error
      );
    }
  };


  /* DELETE LINK */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this link?"
    );

    if (!confirmed) {
      return;
    }

    setLinks((previousLinks) =>
      previousLinks.filter(
        (link) => link.id !== id
      )
    );
  };

  /* COMPONENT */

  return (
    <main className="page-container">

      {/* PAGE HEADER */}

      <section className="page-heading">

        <h1>My Links</h1>

        <p>
          Manage and track all your shortened
          links.
        </p>

      </section>


      {/* LINKS CARD */}

      <section className="links-card">

        {/* Card Header */}

        <div className="links-card-header">

          <div>
            <h2>Your Shortened Links</h2>

            <p>
              {links.length} shortened{" "}
              {links.length === 1
                ? "link"
                : "links"}
            </p>
          </div>

        </div>


        {/* DISPLAY LINKS */}

        {links.length > 0 ? (

          <div className="table-wrapper">

            <table className="links-table">

              <thead>

                <tr>
                  <th>Original URL</th>
                  <th>Short URL</th>
                  <th>Created At</th>
                  <th>Visits</th>
                  <th>Actions</th>
                </tr>

              </thead>


              <tbody>

                {links.map((link) => (

                  <tr key={link.id}>

                    {/* Original URL */}

                    <td>
                      <div
                        className="original-url"
                        title={link.originalUrl}
                      >
                        {link.originalUrl}
                      </div>
                    </td>


                    {/* Short URL */}

                    <td>

                      <span
                        className="short-url"
                        title={link.shortUrl}
                      >
                        {link.shortUrl}
                      </span>

                    </td>


                    {/* Created Date */}

                    <td>
                      {link.createdAt}
                    </td>


                    {/* Visits */}

                    <td>
                      <span className="visit-count">
                        {link.visits}
                      </span>
                    </td>


                    {/* Actions */}

                    <td>

                      <div className="table-actions">

                        {/* Open Original URL */}

                        <a
                          href={link.originalUrl}
                          className="open-button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                        </a>


                        {/* Copy */}

                        <button
                          type="button"
                          className="copy-button"
                          onClick={() =>
                            handleCopy(
                              link.shortUrl,
                              link.id
                            )
                          }
                        >
                          {copiedId === link.id
                            ? "✓ Copied"
                            : "▣ Copy"}
                        </button>


                        {/* Delete */}

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            handleDelete(link.id)
                          }
                          title="Delete link"
                          aria-label={`Delete ${link.shortUrl}`}
                        >
                          🗑
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          /* EMPTY STATE */

          <div className="empty-links">

            <div className="empty-icon">
              🔗
            </div>

            <h3>
              No shortened links
            </h3>

            <p>
              You haven't created any shortened
              links yet.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

export default MyLinks;
