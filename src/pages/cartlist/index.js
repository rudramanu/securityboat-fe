import BagItem from "@/components/BagItem";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://securityboat-hn72.onrender.com/cart/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: sessionStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomImage = () => {
    const width = 300;
    const height = 200;
    const randomImageURL = `https://source.unsplash.com/random/${width}x${height}`;
    return randomImageURL;
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {data.map((el) => {
            const randomImage = getRandomImage();
            return (
              <div
                className="card"
                style={{
                  width: "300px",
                }}
                key={el._id}
              >
                <img src={randomImage} className="card-img-top" alt="Product" />
                <div className="card-body">
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button type="button" class="btn btn-outline-secondary">
                      Rs.{el.price}/-
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <BagItem />
      </div>
      <Footer />
    </>
  );
};

export default CartList;
