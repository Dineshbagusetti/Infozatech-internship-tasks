import { useEffect, useMemo, useReducer, useState } from "react";
import "./index.css";


/*PRODUCT CARD*/


function ProductCard({
  product,
  formatPrice,
  onViewDetails,
}) {
  return (
    <article className="product-card">

      <div className="image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className="product-info">

        <h2>{product.title}</h2>

        <p className="category">
          {product.category}
        </p>

        <div className="price">
          {formatPrice(product.price)}
        </div>

        <div className="rating">

          <span className="stars">
            ★★★★★
          </span>

          <span className="rating-number">
            {product.rating.toFixed(1)}
          </span>

          <span className="reviews">
            ({Math.floor(product.stock * 10)} reviews)
          </span>

        </div>

        <button
          className="details-button"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </button>

      </div>

    </article>
  );
}


/*HOME PAGE*/

function Home() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [sort, setSort] = useState("default");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // Fetch products
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);

      } catch (error) {

        setError(
          "Unable to load products. Please try again."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);


  // Get categories
  const categories = useMemo(() => {

    return [
      ...new Set(
        products.map(
          (product) => product.category
        )
      ),
    ];

  }, [products]);


  // Search + filter + sort
  const filteredProducts = useMemo(() => {

    let result = [...products];


    // Search
    if (search.trim() !== "") {

      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }


    // Category
    if (category !== "all") {

      result = result.filter(
        (product) =>
          product.category === category
      );

    }


    // Sort by price
    if (sort === "price-low") {

      result.sort(
        (a, b) => a.price - b.price
      );

    }

    if (sort === "price-high") {

      result.sort(
        (a, b) => b.price - a.price
      );

    }


    // Sort by name
    if (sort === "name-az") {

      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    }

    if (sort === "name-za") {

      result.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    }

    return result;

  }, [
    products,
    search,
    category,
    sort,
  ]);


  // Price formatting
  const formatPrice = (price) => {

    return `₹${Math.round(
      price * 83
    ).toLocaleString("en-IN")}`;

  };


  // View details
  const handleViewDetails = (product) => {

    alert(
      `Product: ${product.title}\n\n` +
      `Price: ${formatPrice(product.price)}\n` +
      `Rating: ${product.rating}\n` +
      `Category: ${product.category}\n` +
      `Stock: ${product.stock}`
    );

  };


  return (

    <main className="container">

      {/* Search controls */}
      <section className="search-section">

        <div className="search-box">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* Category */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="all">
            All Categories
          </option>

          {categories.map((cat) => (

            <option
              key={cat}
              value={cat}
            >
              {cat
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                )}
            </option>

          ))}

        </select>


        {/* Sorting */}
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >

          <option value="default">
            Sort by Price
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="name-az">
            Name: A to Z
          </option>

          <option value="name-za">
            Name: Z to A
          </option>

        </select>


        <button className="search-button">
          🔍 Search
        </button>

      </section>


      {/* Product count */}
      {!loading && !error && (

        <div className="product-count">
          {filteredProducts.length} products found
        </div>

      )}


      {/* Loading */}
      {loading && (

        <div className="empty-state">

          <div className="spinner"></div>

          <p>
            Loading products...
          </p>

        </div>

      )}


      {/* Error */}
      {!loading && error && (

        <div className="empty-state">

          <div className="empty-icon">
            ⚠️
          </div>

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <button
            className="retry-button"
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>

        </div>

      )}


      {/* Empty */}
      {!loading &&
        !error &&
        filteredProducts.length === 0 && (

          <div className="empty-state">

            <div className="empty-search-icon">
              🔍
            </div>

            <h2>
              No products found
            </h2>

            <p>
              Try a different search term
              or change the filters.
            </p>

          </div>

        )}


      {/* Products */}
      {!loading &&
        !error &&
        filteredProducts.length > 0 && (

          <section className="product-grid">

            {filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  formatPrice={formatPrice}
                  onViewDetails={
                    handleViewDetails
                  }
                />

              )
            )}

          </section>

        )}

    </main>

  );
}


/* ABOUT PAGE */

function About({ onNavigate }) {

  return (

    <main className="page-container">

      <section className="about-hero">

        <div className="about-icon">
          <h1>🛍️About Product Search</h1><br />
        </div>

        
        <p>
          A simple and user-friendly product
          browsing application built with React.js.
        </p><br />

      </section>


      <section className="about-content">

        {/* About */}
        <div className="about-card">

          <h1>
            What is Product Search?
          </h1><br />

          <p>
            Product Search is a web application
            that allows users to easily browse,
            search, filter, and sort products.
          </p><br />

          <p>
            Product information is retrieved from
            a public REST API and displayed using
            reusable React components.
          </p><br />

        </div>


        {/* Features */}
        <div className="about-card">

          <h1>
            Key Features
          </h1>
          <br />
          <ul>

            <li>
              🔍 Search products by name
            </li><br />

            <li>
              📂 Filter products by category
            </li><br />

            <li>
              ↕️ Sort products by price or name
            </li><br />

            <li>
              ⭐ Display product ratings
            </li><br />

            <li>
              📱 Responsive interface
            </li><br />

            <li>
              ⏳ Loading and empty states
            </li><br />

          </ul>

        </div>


        {/* Technologies */}
        <div className="about-card">

          <h1>
            Technologies Used
          </h1><br />

          <div className="technology-list">

            <span>React.js</span><br /><br />

            <span>JavaScript</span><br /><br />

            <span>HTML</span><br /><br />

            <span>CSS</span><br /><br />

            <span>REST API</span><br /><br />

          </div>

        </div>

      </section>


      <div className="about-action">

        <button
          className="primary-button"
          onClick={() => onNavigate("home")}
        >
          Explore Products
        </button>

      </div>

    </main>

  );
}


/* CONTACT PAGE */

function Contact() {

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    message: "",
  
 });

  const [submitted, setSubmitted] =
    useState(false);


  // Input change
  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setSubmitted(false);

  };


  // Submit form
  const handleSubmit = (e) => {

    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });

  };


  return (

    <main className="page-container">

      <section className="contact-header">

        <div className="about-icon">
          <h1>📩Contact Us</h1>
        </div>

        <br />
        <p>
          Have a question or feedback?
          We'd love to hear from you.
        </p><br />

      </section>


      <section className="contact-layout">

        {/* Contact Information */}
        <div className="contact-info">

          <h2>
            Get in Touch
          </h2>
          <br />
          <p>
            Feel free to contact us if you
            have any questions, suggestions,
            or feedback about Product Search.
          </p><br />


          <div className="contact-item">

            

            <div>

                <li>📧Email</li>
              <br />
              <p>
                support@productsearch.com
              </p>
              <br />
            </div>

          </div>


          <div className="contact-item">

            

            <div>

                <li>📞Phone</li>
              <br /> 

              <p>
                +91 98765 43210
              </p>

            </div>

          </div>


          <div className="contact-item">
            

            <div><br />

                <li>📍Address</li><br />
              <p>
                Visakhapatnam, Andhra Pradesh, India
              </p>

            </div>

          </div>

        </div><br />


        {/* Form */}
        <div className="contact-form-card">

          <h2>
            Send Us a Message
          </h2><br />


          {submitted && (

            <div className="success-message">

              ✅ Your message has been
              submitted successfully!

            </div>

          )}


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div><br />


            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div><br />


            <div className="form-group">

              <label>
                Message
              </label>

              <textarea
                name="message"
                rows="5"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

            </div><br />


            <button
              type="submit"
              className="submit-button"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </main>

  );
}


/* MAIN APP */


function App() {

  // Page state
  const [page, setPage] = useState("home");


  // Navigation function
  const navigate = (pageName) => {

    setPage(pageName);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  return (

    <div className="app">

      {/* HEADER */}

      <header className="header">

        {/* Logo */}
        <button
          className="logo-section logo-button"
          onClick={() => navigate("home")}
        >

          <span className="cart-icon">
            🛒
          </span>

          <h1>
            Product Search
          </h1>

        </button>


        {/* Navigation */}
        <nav className="navbar">

          <button
            className={
              page === "home"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => navigate("home")}
          >
            Home
          </button>


          <button
            className={
              page === "about"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => navigate("about")}
          >
            About
          </button>


          <button
            className={
              page === "contact"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => navigate("contact")}
          >
            Contact
          </button>

        </nav>

      </header>


      {/* PAGE CONTENT */}

      {page === "home" && (
        <Home />
      )}


      {page === "about" && (
        <About
          onNavigate={navigate}
        />
      )}


      {page === "contact" && (
        <Contact />
      )}

    </div>

  );
}

export default App;