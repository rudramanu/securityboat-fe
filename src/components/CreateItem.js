import React from "react";
import { useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CreateItem = () => {
  const title = useRef();
  const brand = useRef();
  const category = useRef();
  const gender = useRef();
  const price = useRef();
  const description = useRef();

  const addItem = async (
    title,
    brand,
    category,
    gender,
    price,
    description
  ) => {
    let response = await fetch(
      `https://securityboat-hn72.onrender.com/products/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          brand,
          category,
          gender,
          price,
          description,
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    alert(data.message);
  };

  const emptyInputBox = () => {
    title.current.value = "";
    brand.current.value = "";
    category.current.value = "";
    gender.current.value = "";
    price.current.value = "";
    description.current.value = "";
  };

  const formHandler = (e) => {
    e.preventDefault();

    addItem(
      title.current.value,
      brand.current.value,
      category.current.value,
      gender.current.value,
      price.current.value,
      description.current.value
    );
    emptyInputBox();
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={formHandler}
        style={{ width: "50%", margin: "auto", marginTop: "30px" }}
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            ref={title}
          />
          <label for="exampleInputEmail1" class="form-label">
            Brand
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            ref={brand}
          />
          <label for="exampleInputEmail1" class="form-label">
            Category
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            ref={category}
          />
          <label for="exampleInputEmail1" class="form-label">
            Gender
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            ref={gender}
          />
          <label for="exampleInputEmail1" class="form-label">
            Price
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            ref={price}
          />
          <label for="exampleInputEmail1" class="form-label">
            Description
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            ref={description}
          />
        </div>
        <button type="submit" class="btn btn-primary" style={{ width: "20%" }}>
          Add
        </button>
      </form>
      <Footer />
    </>
  );
};

export default CreateItem;
