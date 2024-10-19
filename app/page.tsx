// import Image from "next/image";
import ProductCard from "./components/ProductCard";

type product = {
  _id: string;
  name: string;
  img: string;
  price: number;
  rating: number;
  discount: number;
  categories: string;
  brand: string;
  stock: number;
  description: string;
}


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

  if (!productsAPI.ok) {
    throw new Error(`API call failed with status ${productsAPI.status}`)
  }
  const productData = await productsAPI.json();

  return (
    <div className="flex flex-wrap">
      {productsAPI && productData.data.map((data: product, index: string) => {
        return <ProductCard params={data} key={index} />;
      })}
      <h1>odnsovd</h1>
    </div>
  );
}


export default Home;