import InputModal from "../../components/InputModal";
import {
  AddFoodInputs,
  AddSizeInputs,
  AddCategoryInputs,
} from "../../constants/inputs";
import { useState, useEffect } from "react";
import { getProducts, addProducts, getSizes, addSizes, getCategories, addCategories } from "../../lib/firebaseutils";
import { MenuTableItems } from "../../constants/datas";
import ViewModal from "../../components/ViewModal";
const MenuTable = () => {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState("");
  const [categories, setCategories] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [selectInputs, setSelectInputs] = useState({});
  const [selectInputs2, setSelectInputs2] = useState({});
  const [handler, setHandler ] = useState("");
  const [productId, setProductId] = useState("");

  const handleModal = (onClick) => {
    switch (onClick) {
      case "addProduct":
        console.log("Add Product")
        setInputs(AddFoodInputs);
        setSelectInputs(sizes);
        setSelectInputs2(categories);
        setHandler("products");
        break;
      case "addSizes":
        console.log("Add Size")
        setInputs(AddSizeInputs);
        setHandler("sizes");
        break;
      case "addCategory":
        console.log("Add Category")
        setInputs(AddCategoryInputs);
        setHandler("categories");
        break;
      default:
        console.log("Any");
        setHandler("view");
        setProductId(onClick);
        setInputs(AddFoodInputs)
        break;
      }
    console.log("onclick", onClick);
    openModal()
  };

  const openModal = () => {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.showModal();
    }
  }

  const closeModal = () => {
    const modalElement = document.getElementById("modal");
    if (modalElement) {
      setHandler("")
      setInputs("")
      modalElement.close();
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      let data;
      if (handler === "products") {
        data = await addProducts(formData);
      }
      if (handler === "sizes") {
        data = await addSizes(formData);
      }
      if (handler === "categories") {
        data = await addCategories(formData);
      }
      console.log("Transaction Successful", data);
      fetchProductData();
      document.getElementById("modal").close();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const fetchProductData = async () => {
    try {
      const productData = await getProducts();
      const sizesData = await getSizes();
      const categoryData = await getCategories();
      setProducts(productData);
      setSizes(sizesData)
      setCategories(categoryData)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  console.log("products", products);
  console.log("Menu Table Sizes", sizes)
  console.log("sizes", sizes);
  console.log("categories", categories);
  console.log("productid", productId)
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
                        src={product.image}
                        alt="IMG"
                      />
                    </div>
                    <span className="ml-1 mt-3">{product.name}</span>
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
                    <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleModal(product.id)}
                    >
                      View
                    </button>
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
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          {
            handler === "products" || handler === "sizes" || handler === "categories" ?
            (
              <InputModal
                onSubmit={handleFormSubmit}
                inputs={inputs}
                selectInputs={{Size: selectInputs, Category: selectInputs2}}
              />
            ) : (
              <ViewModal
                id={productId}
                onSubmit={handleFormSubmit}
                inputs={inputs}
                setInputs={setInputs}
                setSelectInputs={setSelectInputs}
                selectInputs={{Size: selectInputs, Category: selectInputs2}} />
            )
          }
        </div>
      </dialog>
    </>
  );
};

export default MenuTable;
