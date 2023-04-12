import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  async function getData() {
    try {
      setLoading(true);
      const response = await axios.get("https://dummyjson.com/products");
      const data = Object.values(response.data.products);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);
  }, []);

  return (
    <main className="px-6 py-4">
      <h1 className="text-3xl">Lottie Animation</h1>
      {loading && (
        <Lottie
          animationData={require("../../public/loading.json")}
          style={{ width: 300, height: 300 }}
          autoplay={true}
          loop={true}
        />
      )}
      {data && data.length > 0 && (
        <div className="flex flex-col gap-4">
          {data.map((item) => {
            return (
              <div key={item.id}>
                <h1 className="font-bold text-lg">{item.title}</h1>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      )}
      {!loading && !data && (
        <Lottie
          animationData={require("../../public/loading.json")}
          style={{ width: 300, height: 300 }}
          autoplay={true}
          loop={true}
        />
      )}
    </main>
  );
}
