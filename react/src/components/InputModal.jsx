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

  const handleCheckboxChange = (name, value) => {
    setFormData((prevData) => {
      if (!prevData[name]) {
        return { ...prevData, [name]: [value] };
      }
      const updatedArray = prevData[name].includes(value)
        ? prevData[name].filter((item) => item !== value)
        : [...prevData[name], value];
      return { ...prevData, [name]: updatedArray };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("Form submitted Modal:", formData);
    setFormData({});
  };

  return (
    <>
      <span className="flex justify-center text-2xl font-bold">
                {inputs.length > 0 ? `Add ${inputs[0].label}` : ""}
      </span>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <label key={input.value} className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-lg">{input.label}</span>
              </div>
              {input.type === "select" ? (
                <select
                  value={formData[input.value] || ""}
                  onChange={(e) => handleChange(input.value, e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                  required={input.required === "Required"}
                >
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  {selectInputs[input.label] && selectInputs[input.label].length > 0 ? (
                    selectInputs[input.label].map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No options available
                    </option>
                  )}
                </select>
              ) : input.type === "checkbox" ? (
                <div className="form-control">
                  {selectInputs[input.label] && selectInputs[input.label].length > 0 ? (
                    <>
                      <label className="label cursor-pointer">
                        <span className="label-text">N/A</span>
                        <input
                          type="checkbox"
                          value="N/A"
                          onChange={() => handleCheckboxChange(input.value, "N/A")}
                          className="checkbox"
                        />
                      </label>

                      {selectInputs[input.label].map((item) => (
                        <div key={item.value}>
                          {console.log("Item:", item)}
                          <label className="label cursor-pointer">
                            <span className="label-text">{item.name}</span>
                            <input
                              type="checkbox"
                              value={formData[input.value]?.includes(item.name) || false}
                              onChange={() => handleCheckboxChange(input.value, item.name)}
                              className="checkbox"
                            />
                          </label>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>No options available</p>
                  )}
                </div>
              ) : (
                <input
                  type={input.type}
                  value={formData[input.value] || ""}
                  onChange={(e) => handleChange(input.value, e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  required={input.required === "Required"}
                  disabled={input.disabled === "Disabled"}
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
