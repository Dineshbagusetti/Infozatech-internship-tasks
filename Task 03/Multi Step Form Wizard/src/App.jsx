import React, { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route } from "react-router-dom";

import Header from "./Components/Header";
import ProgressBar from "./Components/ProgressBar";
import PersonalInfo from "./Components/PersonalInfo";
import Address from "./Components/Address";
import Review from "./Components/Review";
import MyLinks from "./Components/MyLinks";
import About from "./Components/About";

import "./App.css";

/*Home Component*/

function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    address: "",
    city: "",
    state: "",
    pincode: "",

    country: "India",
  });

  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  /*Update form data*/

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Remove error when user starts correcting field
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  /*Validate Step 1*/

  const validatePersonalInfo = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*Validate Address (Step 2)*/

  const validateAddress = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must contain 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*Next button*/

  const handleNext = () => {
    if (currentStep === 1) {
        const isValid = validatePersonalInfo();

      if (isValid) {
        setCurrentStep(2);
        setErrors({});
      }
    } else if (currentStep === 2) {
      const isValid = validateAddress();

      if (isValid) {
        setCurrentStep(3);
        setErrors({});
      }
    }
  };

  /*Previous button*/

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previousStep) => previousStep - 1);
      setErrors({});
    }
  };

  /*Submit form*/

  const handleSubmit = () => {
    console.log("Submitted:", formData);

    setSubmitted(true);
  };

  /*Start again*/

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });

    setCurrentStep(1);
    setErrors({});
    setSubmitted(false);
  };

  return (
    
      <main className="main-content">

        {!submitted ? (
          <>

            <section className="hero-section">

              <h1>Complete Your Profile</h1>

              <p>
                Enter your information in a few simple steps.
              </p>

            </section>

            <div className="form-card">

            {/*Progress Bar*/}

              <ProgressBar currentStep={currentStep} />

              <div className="form-container">

                {currentStep === 1 && (
                  <PersonalInfo
                    formData={formData}
                    handleChange={handleChange}
                    errors={errors}
                  />
                )}

                {currentStep === 2 && (
                  <Address
                    formData={formData}
                    handleChange={handleChange}
                    errors={errors}
                  />
                )}
                

                {currentStep === 3 && (
                  <Review
                    formData={formData}
                  />
                )}

              </div>
              {/*Form Actions*/}

              <div className="form-actions">

                {currentStep > 1 && (
                  <button
                    type="button"
                    className="back-button"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}

                <div className="action-right">

                  {currentStep < 3 && (
                    <button
                      type="button"
                      className="primary-button"
                      onClick={handleNext}
                    >
                      Continue
                    </button>
                  )}

                  {currentStep === 3 && (
                    <button
                      type="button"
                      className="primary-button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  )}

                </div>

              </div>

            </div>

          </>
        ) : (
          /*Success Message*/

          <div className="success-card">

            <div className="success-icon">
              ✓
            </div>

            <h1>Submission Successful!</h1>

            <p>
              Your information has been submitted successfully.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={handleReset}
            >
              Submit Another Response
            </button>

          </div>

        )}

      </main>

    
  );
}

function App() {

  return (

    <BrowserRouter>

      <div className="app">

        <Header />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/links"
            element={<MyLinks />}
          />

          <Route
            path="/about"
            element={<About />}
          />

        </Routes>


        <footer>
          © 2026 QuickLink.
          Made for simple sharing.
        </footer>

      </div>
    </BrowserRouter>
    

  );
}

export default App;