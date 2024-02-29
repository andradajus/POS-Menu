import InputModal from "../../components/InputModal";
import { AddFoodInputs } from "../../constants/inputs";
import { useState, useEffect } from "react";
import { getProducts, addProducts } from "../../lib/firebaseutils"
const MenuTable = () => {
  const [editableCell, setEditableCell] = useState(null);
  const [products, setProducts] = useState([])

  const handleAddProduct = () => {
    const modal = document.getElementById("addProductModal");
    if (modal) {
      modal.showModal();
    }
  };

  const handleEditClick = (index) => {
    setEditableCell(index);
  };

  const handleInputChange = (event, index, field) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = event.target.value;
    setProducts(updatedProducts);
  };

  const handleInputBlur = () => {
    setEditableCell(null);
  };

  const handleFormSubmit = async(formData) => {
    try {
      const data = await addProducts(formData);
      console.log("product data", data)
    }
    catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  console.log("products", products)

  return (
    <>
      <div className="flex justify-between">
        <button className="btn btn-primary m-3" onClick={handleAddProduct}>
          Add Product
        </button>
        <div className="flex align-middl text-2xl mt-4 font-bold">
          Product Table
        </div>
        <div></div>
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
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={index}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  {editableCell === index ? (
                    <>
                      <div className="avatar"></div>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleInputChange(e, index, "name")}
                        onBlur={handleInputBlur}
                      />
                    </>
                  ) : (
                    <div
                      className="font-bold flex "
                      onClick={() => handleEditClick(index)}
                    >
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="/tailwind-css-component-profile-2@56w.png"
                          alt="IMG"
                        />
                      </div>
                      {product.name}
                    </div>
                  )}
                </td>
                <td>
                  {editableCell === index ? (
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) =>
                        handleInputChange(e, index, "description")
                      }
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    <div
                      className="font-bold"
                      onClick={() => handleEditClick(index)}
                    >
                      {product.description}
                    </div>
                  )}
                </td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="addProductModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <span className="flex justify-center text-2xl font-bold">
              Add Product
            </span>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("addProductModal").close()}
            >
              ✕
            </button>
          </form>
          <InputModal onSubmit={handleFormSubmit} inputs={AddFoodInputs} />
        </div>
      </dialog>
    </>
  );
};

export default MenuTable;
