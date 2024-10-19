// import Image from "next/image";
import ProductCard from "./components/ProductCard";

const Home = async () => {

  const productsAPI = await fetch(
    `${process.env.BASE_URL}/api/products`,
    {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    }
  );
  const ProductData = await productsAPI.json();



  return (
    <div className="flex flex-wrap">
      {ProductData.data.map((data: any, index: string) => {
        return <ProductCard products={data} key={index} />;
      })}
    </div>
  );
}


export default Home;