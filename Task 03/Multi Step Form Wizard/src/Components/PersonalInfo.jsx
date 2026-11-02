import React from "react";

function PersonalInfo({
  formData,
  handleChange,
  errors,
}) {
  return (
    <div className="step-content">

      <div className="step-heading">

        <h2>Personal Information</h2>

        <p>
          Tell us a little about yourself.
        </p>

      </div>

      <div className="form-grid">

        <div className="form-group">

          <label>
            First Name
            <span>*</span>
          </label>

          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            className={
              errors.firstName ? "input-error" : ""
            }
          />

          {errors.firstName && (
            <small>{errors.firstName}</small>
          )}

        </div>

        <div className="form-group">

          <label>
            Last Name
            <span>*</span>
          </label>

          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            className={
              errors.lastName ? "input-error" : ""
            }
          />

          {errors.lastName && (
            <small>{errors.lastName}</small>
          )}

        </div>

        <div className="form-group">

          <label>
            Email Address
            <span>*</span>
          </label>

          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            className={
              errors.email ? "input-error" : ""
            }
          />

          {errors.email && (
            <small>{errors.email}</small>
          )}

        </div>

        <div className="form-group">

          <label>
            Phone Number
            <span>*</span>
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="10 digit phone number"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            className={
              errors.phone ? "input-error" : ""
            }
          />

          {errors.phone && (
            <small>{errors.phone}</small>
          )}

        </div>

      </div>

    </div>
  );
}

export default PersonalInfo;