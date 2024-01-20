import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BagItem = ({ item }) => {
  const router = useRouter();

  const buyHandler = () => {
    fetch(`https://securityboat-hn72.onrender.com/orders/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        router.replace("/");
      });
  };

  let [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`https://securityboat-hn72.onrender.com/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let sum = 0;
        data.forEach((el) => {
          sum = sum + el.price;
        });
        setTotal(sum);
      });
  }, []);

  return (
    <>
      <div
        className="card mb-4 rounded-3 shadow-sm border-primary"
        style={{ height: "300px" }}
      >
        <div className="card-header py-3 text-bg-primary border-primary">
          <h4 className="my-0 fw-normal">Cart Summary</h4>
        </div>
        <div className="card-body">
          <h6
            className="card-title pricing-card-title"
            style={{ marginTop: "50px" }}
          >
            Total: Rs. {`${total}`}.00/-
          </h6>
          <button
            type="button"
            className="w-100 btn btn-lg btn-primary"
            onClick={buyHandler}
            style={{ marginTop: "50px" }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default BagItem;
