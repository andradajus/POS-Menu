export const FoodCategory = {
  sides: "Sides",
  entrees: "Entrees",
  drink: "Drinks",
  dessert: "Desserts",
  breakfast: "Breakfast",
};

export const AddFoodInputs = [
  {
    label: "Product",
    value: "name",
    type: "text",
    required: "Required",
  },
  {
    label: "ID",
    value: "id",
    type: "text",
    disabled: "Disabled",
  },
  {
    label: "Image",
    value: "image",
    type: "text",
    required: "Required",
  },
  {
    label: "Price",
    value: "price",
    type: "number",
    required: "Required",
  },
  {
    label: "Price Increment",
    value: "price_increment",
    type: "number",
    required: "Price Increment/Size",
  },
  {
    label: "Stock",
    value: "stock",
    type: "number",
    required: "Required",
  },
  {
    label: "Category",
    value: "category",
    type: "select",
    required: "Required",
  },
  {
    label: "Description",
    value: "description",
    type: "text",
  },
  {
    label: "Size",
    value: "size",
    type: "checkbox",
    required: "Required",
  },
];

export const AddSizeInputs = [
  {
    label: "Size",
    value: "name",
    type: "text",
    required: "Required",
  },
  {
    label: "Code",
    value: "code",
    type: "text",
    required: "Required",
  },
];

export const AddCategoryInputs = [
  {
    label: "Category",
    value: "name",
    type: "text",
    required: "Required",
  },
];
