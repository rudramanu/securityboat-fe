import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    role: "user",
  });

  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setUser({
        isLoggedIn: true,
        role: sessionStorage.getItem("role") || "user",
      });
    }
  }, []);

  const handleLogout = () => {
    fetch(`https://securityboat-hn72.onrender.com/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setUser({
          isLoggedIn: false,
          role: "user",
        });
        sessionStorage.clear();
        router.push("/");
      });
  };

  const navbar = {
    padding: "20px",
  };

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link href="/">
            <p className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              ></svg>
            </p>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link href="/" className="nav-link px-2 text-secondary">
                Home
              </Link>
            </li>
            <li>
              <p href="#" className="nav-link px-2 text-white">
                FAQs
              </p>
            </li>
            <li>
              <p href="#" className="nav-link px-2 text-white">
                About
              </p>
            </li>
          </ul>

          <div className="text-end">
            {user.isLoggedIn ? (
              <>
                {user.role !== "admin" ? (
                  <Link href="/cartlist">
                    <button
                      type="button"
                      class="btn btn-light"
                      style={{ marginRight: "20px" }}
                    >
                      Cart
                    </button>
                  </Link>
                ) : null}
                <button className="btn btn-warning" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <button
                    className="btn btn-success"
                    style={{ marginRight: "20px" }}
                  >
                    Sign-in
                  </button>
                </Link>
                <Link href="/signup">
                  <button type="button" className="btn btn-warning">
                    Sign-up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
