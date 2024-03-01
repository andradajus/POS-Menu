/* eslint-disable react/prop-types */
import { useState } from "react";
const InputModal = ({ selectInputs, inputs, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("Form submitted Modal:", formData);
    setFormData({});
  };

  console.log("input modal", inputs);
  console.log("select inputs on modal", selectInputs);

  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <label key={input.value} className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">{input.label}</span>
              </div>
              {input.type === "select" ? (
                <select
                  value={formData[input.value] || ""}
                  onChange={(e) => handleChange(input.value, e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                  required={input.required === "Required"}
                >
                  <option value="" disabled hidden>
                    Select an option
                  </option>
                  {selectInputs && selectInputs.items ? (
                    selectInputs.items.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No options available
                    </option>
                  )}
                </select>
              ) : (
                <input
                  type={input.type}
                  value={formData[input.value] || ""}
                  onChange={(e) => handleChange(input.value, e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  required={input.required === "Required"}
                />
              )}
              <div className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt">{input.required}</span>
              </div>
            </label>
          ))}
          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default InputModal;
