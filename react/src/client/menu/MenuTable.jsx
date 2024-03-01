import InputModal from "../../components/InputModal";
import {
  AddFoodInputs,
  AddSizeInputs,
  AddCategoryInputs,
} from "../../constants/inputs";
import { useState, useEffect } from "react";
import { getProducts, addProducts } from "../../lib/firebaseutils";
import { MenuTableItems } from "../../constants/datas";
import { dummySelectInputs } from "../../constants/datas";
const MenuTable = () => {
  const [products, setProducts] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [selectInputs, setSelectInputs] = useState({});

  const handleModal = (onClick) => {
    switch (onClick) {
      case "addProduct":
        setInputs(AddFoodInputs);
        setSelectInputs(dummySelectInputs);
        break;
      case "addSizes":
        setInputs(AddSizeInputs);
        break;
      case "addCategory":
        setInputs(AddCategoryInputs);
        break;
    }
    const modal = document.getElementById("modal");
    if (modal) {
      modal.showModal();
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const data = await addProducts(formData);
      console.log("product data", data);
      fetchProductData();
      document.getElementById("modal").close();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const fetchProductData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  console.log("products", products);

  return (
    <>
      <div className="flex justify-center text-3xl font-bold m-2">
        Product Table
      </div>
      <div className="flex">
        <div>
          {MenuTableItems.map((item, index) => (
            <div key={index} className="join">
              <button
                className="btn btn-primary join-item m-1"
                onClick={() => handleModal(item.onClick)}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product.id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="IMG"
                      />
                    </div>
                    {product.name}
                  </div>
                </td>
                <td>
                  <div className="font-bold">{product.description}</div>
                </td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="flex flex-col">
                    <button className="btn btn-primary">View</button>
                    <butoon className="btn btn-error">Delete</butoon>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <span className="flex justify-center text-2xl font-bold">
              {inputs.length > 0 ? `Add ${inputs[0].label}` : ""}
            </span>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("modal").close()}
            >
              ✕
            </button>
          </form>
          <InputModal
            onSubmit={handleFormSubmit}
            inputs={inputs}
            selectInputs={selectInputs}
          />
        </div>
      </dialog>
    </>
  );
};

export default MenuTable;
