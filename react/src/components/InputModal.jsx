/* eslint-disable react/prop-types */
import { useState } from "react";
const InputModal = ({ inputs, onSubmit }) => {
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

  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <label key={input.value} className="form-control w-full max-w-xs">
              <div className="label">
                <div className="label">
                  <span className="label-text">{input.label}</span>
                </div>
              </div>
              <input
                type={input.type}
                value={formData[input.value] || ""}
                onChange={(e) => handleChange(input.value, e.target.value)}
                className="input input-bordered w-full max-w-xs"
                required={input.required === "Required"}
              />
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
