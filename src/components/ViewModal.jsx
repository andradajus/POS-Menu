/* eslint-disable react/prop-types */
import { getProducyById } from "../lib/firebaseutils";
import { useEffect, useState } from "react"
const ViewModal = ({selectInputs, inputs, setInputs, onSubmit, id}) => {
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
                return { ...prevData, [name]: [{ [name]: value }] };
            }
            const updatedArray = prevData[name].some((checkboxItem) => checkboxItem[name] === value)
                ? prevData[name].filter((checkboxItem) => checkboxItem[name] !== value)
                : [...prevData[name], { [name]: value }];
            return { ...prevData, [name]: updatedArray };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(id, formData);
        setFormData({});
    };

    const viewHandler = async (id) => {
        try {
            const data = await getProducyById(id);
            setInputs((prevInputs) => [data, ...prevInputs]);
            setFormData(data)
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
    if (id)
        viewHandler(id)
    }, [id])


return (
        <>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit}>
                    {inputs &&
                    inputs.filter((input) => input.label && input.label.trim() !== "").map((input) => (
                        <label key={input?.value} className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-bold text-lg">{input?.label}</span>
                        </div>
                        {input?.type === "select" ? (
                            <select
                            value={formData[input?.value] || ""}
                            onChange={(e) => handleChange(input?.value, e.target.value)}
                            className="select select-bordered w-full max-w-xs"
                            required={input?.required === "Required"}
                            >
                            <option value="" disabled>
                                Select an option
                            </option>
                            {selectInputs[input?.label] && selectInputs[input?.label].length > 0 ? (
                                selectInputs[input?.label].map((item) => (
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
                        ) : input?.type === "checkbox" ? (
                            <div className="form-control">
                            {selectInputs[input?.label] && selectInputs[input?.label].length > 0 ? (
                                <>
                                <label className="label cursor-pointer">
                                    <span className="label-text">N/A</span>
                                    <input
                                    type="checkbox"
                                    checked={formData[input?.value]?.some(item => item.size === "N/A") || false}
                                    onChange={() => handleCheckboxChange(input?.value, "N/A")}
                                    className="checkbox"
                                    />
                                </label>

                                {selectInputs[input.label].map((item) => (
                                <div key={item.value}>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">{item.name}</span>
                                        <input
                                        type="checkbox"
                                        checked={formData[input?.value]?.some(selectedSize => selectedSize.size === item.name) || false}
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
                            type={input?.type}
                            value= {formData && formData[input?.value] && formData[input?.value] !== "" ? formData[input?.value] : ""}
                            onChange={(e) => handleChange(input?.value, e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                            required={input?.required === "Required"}
                            disabled={input?.disabled === "Disabled"}
                            />
                        )}
                        <div className="label">
                            <span className="label-text-alt"></span>
                            <span className="label-text-alt">{input?.required}</span>
                        </div>
                        </label>
                    ))}
                    <button type="submit" className="btn btn-block btn-primary">
                    Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default ViewModal
