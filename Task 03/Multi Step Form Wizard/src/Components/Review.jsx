import React from "react";

function Review({ formData }) {
  return (
    <div className="step-content">

      <div className="step-heading">

        <h2>Review Your Information</h2>

        <p>
          Please verify your information before submitting.
        </p>

      </div>

      <div className="review-section">

        <div className="review-header">
          <h3>Personal Information</h3>
        </div>

        <div className="review-grid">

          <div className="review-item">
            <span>First Name</span>
            <strong>{formData.firstName}</strong>
          </div>

          <div className="review-item">
            <span>Last Name</span>
            <strong>{formData.lastName}</strong>
          </div>

          <div className="review-item">
            <span>Email</span>
            <strong>{formData.email}</strong>
          </div>

          <div className="review-item">
            <span>Phone</span>
            <strong>{formData.phone}</strong>
          </div>

        </div>

      </div>

      <div className="review-section">

        <div className="review-header">
          <h3>Address Information</h3>
        </div>

        <div className="review-grid">

          <div className="review-item full">
            <span>Address</span>
            <strong>{formData.address}</strong>
          </div>

          <div className="review-item">
            <span>City</span>
            <strong>{formData.city}</strong>
          </div>

          <div className="review-item">
            <span>State</span>
            <strong>{formData.state}</strong>
          </div>

          <div className="review-item">
            <span>Pincode</span>
            <strong>{formData.pincode}</strong>
          </div>

          <div className="review-item">
            <span>Country</span>
            <strong>{formData.country}</strong>
          </div>

        </div>

      </div>

      <div className="review-note">
        <span>✓</span>
        Please check all details carefully before submitting.
      </div>

    </div>
  );
}

export default Review;