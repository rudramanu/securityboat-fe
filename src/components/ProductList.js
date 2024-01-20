import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://securityboat-hn72.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleFilter = (filter) => {
    fetch(`https://securityboat-hn72.onrender.com/products/category/${filter}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  const getRandomImage = () => {
    const width = 300;
    const height = 200;
    const randomImageURL = `https://source.unsplash.com/random/${width}x${height}`;
    return randomImageURL;
  };

  const addToCart = (id) => {
    fetch(`https://securityboat-hn72.onrender.com/cart/add/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => alert(data.message));
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <Sidebar handleFilter={handleFilter} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "50px",
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
                <h5 className="card-title">{el.title}</h5>
                <p className="card-text">{el.description}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart(el._id);
                    }}
                  >
                    Add to cart
                  </button>
                  <button type="button" class="btn btn-outline-secondary">
                    Rs.{el.price}/-
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
