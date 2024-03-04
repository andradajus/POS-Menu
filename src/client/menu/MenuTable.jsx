/* eslint-disable react/prop-types */
import InputModal from "../../components/InputModal";
import {
  AddFoodInputs,
  AddSizeInputs,
  AddCategoryInputs,
} from "../../constants/inputs";
import { useState, useEffect } from "react";
import { getProducts, addProducts, updateProduct, getSizes, addSizes, getCategories, addCategories, deleteProduct} from "../../lib/firebaseutils";
import { MenuTableItems, MenuHeaderItems } from "../../constants/datas";
import ViewModal from "../../components/ViewModal";
import { AddIcon, AscendingIcon, DescendingIcon, DeleteIcon, ViewIcon } from "../../assets/icons"
import { sortProducts } from "../../lib/utils";
import numeral from "numeral";
const MenuTable = ({setTransactionFlag, transactionFlag}) => {
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
        setHandler("addProduct");
        callData()
        break;
      case "addSizes":
        console.log("Add Size")
        setInputs(AddSizeInputs);
        setHandler("addSizes");
        break;
      case "addCategory":
        console.log("Add Category")
        setInputs(AddCategoryInputs);
        setHandler("addCategories");
        break;
      default:
        setHandler("updateProduct");
        setProductId(onClick);
        callData()
        break;
      }
    console.log("onclick", onClick);
    openModal()
  };

  const callData = () => {
    setInputs(AddFoodInputs)
    setSelectInputs(sizes);
    setSelectInputs2(categories);
  }

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

  const handleFormSubmit = async (formData, productId) => {
    try {
      let data;
      if (handler === "addProduct") {
        data = await addProducts(formData);
      }
      if (handler === "addSizes") {
        data = await addSizes(formData);
      }
      if (handler === "addCategories") {
        data = await addCategories(formData);
      }
      if (handler === "updateProduct") {
        data = await updateProduct(formData, productId);
      }
      if (handler === "deleteProduct") {
        data = await deleteProduct(formData, productId);
      }
      console.log("Transaction Successful", data);
      fetchProductData();
      document.getElementById("modal").close();
      setTransactionFlag(true)
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
      if (productId)
        setProductId("")
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSort = (sortByField, sortOrder) => {
    const sortedProducts = sortProducts(products, sortByField, sortOrder);
    setProducts(sortedProducts);
  };

  useEffect(() => {
    fetchProductData();
  }, [transactionFlag]);

  return (
    <>
      <div className="flex justify-center text-3xl font-bold m-2">
        Product Table
      </div>
      <div className="flex max-h-32 overflow-auto">
          {MenuTableItems.map((item, index) => (
            <div key={index} >

              <button
                className="btn btn-primary m-1"
                onClick={() => handleModal(item.onClick)}
              >
              <AddIcon />
                {item.label}
              </button>
            </div>
          ))}
        </div>

      <div className="overflow-x-auto h-screen">
        <table className="table">
          <thead>
            <tr>
              {MenuHeaderItems.map((item, index) => (
                <th key={index}>
                  <div className="flex justify-between">
                    <div>
                      {item.label}
                    </div>
                    <div className="flex">
                      {(item.onClickAsc && item.onClickDesc) && (
                        <>
                          <AscendingIcon
                            className="cursor-pointer hover:opacity-50 w-5 h-5"
                            onClick={() => handleSort(item.field, 'asc')}
                          />

                          <DescendingIcon
                            className="cursor-pointer hover:opacity-50 w-5 h-5"
                            onClick={() => handleSort(item.field, 'desc')}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </th>
              ))}
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
                    <div className="mask mask-squircle w-28">
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex flex-col justify-around ml-1">
                      <span></span>
                      <span className="ml-1 text-xl font-semibold">{product.name}</span>
                      <span></span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold text-xs">{product.description}</div>
                </td>
                <td>{product.category}</td>
                <td>₱ {numeral(product.price).format('0,0.00')}</td>
                <td>{product.stock}</td>
                <td>
                {product.size.map((data) => (
                  <div  key={data.id} className="flex-col">
                    <div>{data.size}</div>
                  </div>
                ))}
                </td>
                <td>
                  <div className="flex flex-col">
                    <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleModal(product.id)}
                    >
                    <ViewIcon />
                      View
                    </button>
                    <button
                      className="btn btn-error"
                      onFocus={() => setHandler("deleteProduct")}
                      onClick={() => {
                        handleFormSubmit(product.name, product.id);
                      }}
                    >
                    <DeleteIcon />
                    Delete
                    </button>
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
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          {
            handler === "addProduct" || handler === "addSizes" || handler === "addCategories" ?
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
                selectInputs={{Size: selectInputs, Category: selectInputs2}}
                />
            )
          }
        </div>
      </dialog>
    </>
  );
};

export default MenuTable;
