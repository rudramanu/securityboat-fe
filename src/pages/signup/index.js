import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRef } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const name = useRef();
  const email = useRef();
  const mobile = useRef();
  const password = useRef();
  const router = useRouter();

  const formHandler = (e) => {
    e.preventDefault();

    signupHandler(
      name.current.value,
      email.current.value,
      mobile.current.value,
      password.current.value
    );
  };

  const signupHandler = async (name, email, mobile, password) => {
    let response = await fetch(
      `https://securityboat-hn72.onrender.com/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobile, password }),
      }
    );
    let data = await response.json();
    console.log(data);
    alert(data.message);
    router.replace("/signin");
  };

  const signupbtn = {
    marginTop: "10px",
  };
  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <main className="form-signin m-auto">
          <form onSubmit={formHandler}>
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Rudra"
                ref={name}
              />
              <label htmlFor="floatingInput">Enter your name</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                ref={email}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="9612345678"
                ref={mobile}
              />
              <label htmlFor="floatingInput">Mobile number</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                ref={password}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              className="btn btn-primary w-100 py-2"
              style={signupbtn}
              type="submit"
            >
              Sign up
            </button>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
