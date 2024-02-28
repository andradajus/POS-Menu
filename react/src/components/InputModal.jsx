/* eslint-disable react/prop-types */
import { useState } from "react";
const InputModal = ({inputs, onSubmit}) => {
    const [formData, setFormData] = useState({});

    const handleChange = (name, value) => {
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData)
        console.log("Form submitted Modal:", formData);
        setFormData({});
    };

    console.log("input modal", inputs)

    return (
    <>
        <div className="modal">
            <div className="modal-box">
                <form onSubmit={handleSubmit}>
                    {Array.isArray(inputs) ? (
                        inputs.map((input) => (
                            <div key={input.value} className="mb-4">
                                <label className="block text-sm font-bold">{input.label}</label>
                                <input
                                    type={input.type}
                                    value={formData[input.value] || ''}
                                    onChange={(e) => handleChange(input.value, e.target.value)}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                        ))
                    ) : (
                        <p>Error: Inputs must be an array</p>
                    )}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
    )
}

export default InputModal
