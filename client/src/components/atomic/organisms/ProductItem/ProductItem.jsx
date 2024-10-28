import { ProductName } from "../../atoms/product/Name/ProductName";
import { ProductCost } from "../../atoms/product/Cost/ProductCost";
import { ProductQuantitySelector } from "../../moleculs/QuantitySelector/QuantitySelector";
import { ProductButton } from "../../atoms/product/Button/ProductButton";
import { ProductImage } from "../../atoms/product/Image/ProductImage"; //"../../atoms/product/image/ProductImage";

export const ProductItem = () => {
  return (
    <div>
      <ProductImage
        src="../../../../resources/productImage/tart.webp"
        alt={"#"}
      />
      <ProductName name={"Tart"} />
      <ProductCost cost={23} />
      <ProductQuantitySelector count={1} />
      <ProductButton
        method={function () {
          console.log("tut");
        }}
      />
    </div>
  );
};
