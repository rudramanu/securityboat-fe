import BagItem from "@/components/BagItem";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
            return (
              <div
                className="card"
                style={{
                  width: "300px",
                }}
                key={el._id}
              >
                <Image
                  src="/assets/pixel.jpg"
                  alt="Product"
                  width={300} // Set the width to the desired value
                  height={200}
                />
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
