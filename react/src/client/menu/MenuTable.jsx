import InputModal from "../../components/InputModal"
import { AddFoodInputs } from "../../constants/inputs"
const MenuTable = () => {
    const inputs = AddFoodInputs
    const handleAddProduct = () => {
        const modal = document.getElementById('addProductModal');
        if (modal) {
            modal.showModal();
        }
    }

    const handleFormSubmit = (formData) => {
        console.log('Form submitted with data:', formData);
    };

    console.log("inputs", inputs)

    return (
        <>
            <div className="flex justify-between">
                <button
                className="btn btn-primary m-3"
                onClick={handleAddProduct}
                >
                Add Product
                </button>
                <div className="flex align-middl text-2xl mt-4 font-bold">Product Table</div>
                <div></div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                            <label>
                                1
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Product Name</div>
                                    <div className="text-sm opacity-50">Description</div>
                                </div>
                            </div>
                            </td>
                            <td>Category</td>
                            <td>Price</td>
                            <th>Stock</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <dialog id="addProductModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
                    </form>
                    <InputModal onSubmit={handleFormSubmit} inputs={inputs} />
                </div>
            </dialog>
        </>
    )
}

export default MenuTable
