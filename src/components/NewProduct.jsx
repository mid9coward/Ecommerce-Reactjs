import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";

const NewProduct = ({ product }) => {
  const { id, name, price, image } = product;
  return (
    <Link to={`products/${id}`} key={id} className="group">
      <div className="w-full  max-w-sm aspect-square rounded-lg overflow-hidden  bg-tertiary-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <div className="flex-col items-center justify-center">
        <h3 className="mt-4  text-gray-700">{name}</h3>
        <p className="mt-1  font-medium text-gray-900">{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default NewProduct;
