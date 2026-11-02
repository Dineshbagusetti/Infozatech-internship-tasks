import React from "react";

function ProgressBar({ currentStep }) {

  const steps = [
    {
      number: 1,
      title: "Personal Info",
    },
    {
      number: 2,
      title: "Address",
    },
    {
      number: 3,
      title: "Review",
    },
  ];

  return (
    <div className="progress-wrapper">

      <div className="progress-line">

        <div
          className="progress-line-active"
          style={{
            width: `${((currentStep - 1) / 2) * 100}%`,
          }}
        ></div>

      </div>

      <div className="steps">

        {steps.map((step) => (

          <div
            className={`step ${
              currentStep >= step.number
                ? "completed"
                : ""
            }`}
            key={step.number}
          >

            <div className="step-circle">

              {currentStep > step.number
                ? "✓"
                : step.number}

            </div>

            <span>{step.title}</span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProgressBar;