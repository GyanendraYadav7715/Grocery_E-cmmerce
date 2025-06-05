import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className="mt-16">
         <p className="text-2xl md:text-3xl font-medium">Best Seller</p>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6 ">
            <div>
                <ProductCard product={products[0]}/>  
           </div>
         </div>
       </div>
  )
}

export default BestSeller