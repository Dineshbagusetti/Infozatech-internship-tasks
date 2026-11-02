import React from "react";

function Address({
  formData,
  handleChange,
  errors,
}) {
  return (
    <div className="step-content">

      <div className="step-heading">

        <h2>Address Information</h2>

        <p>
          Enter your current address details.
        </p>

      </div>

      <div className="form-grid">

        <div className="form-group full-width">

          <label>
            Address
            <span>*</span>
          </label>

          <textarea
            name="address"
            placeholder="Enter your full address"
            value={formData.address}
            onChange={handleChange}
            className={
              errors.address ? "input-error" : ""
            }
          ></textarea>

          {errors.address && (
            <small>{errors.address}</small>
          )}

        </div>

        <div className="form-group">

          <label>
            City
            <span>*</span>
          </label>

          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            className={
              errors.city ? "input-error" : ""
            }
          />

          {errors.city && (
            <small>{errors.city}</small>
          )}

        </div>

        <div className="form-group">

          <label>
            State
            <span>*</span>
          </label>

          <input
            type="text"
            name="state"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleChange}
            className={
              errors.state ? "input-error" : ""
            }
          />

          {errors.state && (
            <small>{errors.state}</small>
          )}

        </div>

        <div className="form-group">

          <label>
            Pincode
            <span>*</span>
          </label>

          <input
            type="text"
            name="pincode"
            placeholder="Enter 6 digit pincode"
            value={formData.pincode}
            onChange={handleChange}
            maxLength="6"
            className={
              errors.pincode ? "input-error" : ""
            }
          />

          {errors.pincode && (
            <small>{errors.pincode}</small>
          )}

        </div>

        <div className="form-group">

          <label>
            Country
          </label>

          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >

            <option value="India">
              India
            </option>

            <option value="United States">
              United States
            </option>

            <option value="United Kingdom">
              United Kingdom
            </option>

            <option value="Canada">
              Canada
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}

export default Address;