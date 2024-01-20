import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";
import { useRouter } from "next/router";

const Signin = () => {
  const email = useRef();
  const password = useRef();
  const router = useRouter();

  const formHandler = (e) => {
    e.preventDefault();

    signinHandler(email.current.value, password.current.value);
  };
  const signinHandler = async (email, password) => {
    let response = await fetch(
      `https://securityboat-hn72.onrender.com/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    let data = await response.json();
    console.log(data);
    if (data.message == "Login Successful") {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);
    }

    alert(data.message);
    if (data.role == "admin") {
      alert("Welcome Admin");
      router.replace("/createitem");
    } else {
      router.replace("/");
    }
  };
  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <main className="form-signin m-auto">
          <form onSubmit={formHandler}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                ref={password}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign in
            </button>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Signin;
