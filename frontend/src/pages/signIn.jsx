import { useRef, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import useAuth from "../hooks/useAuth";

import LogoSVG from "../assets/logoSVG";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const { setAuth } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  // put focus on user as soon as the page loads
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="h-[92vh] grid-cols-1 gap-x-4 lg:grid lg:grid-cols-2">
        {/* Left Container*/}
        <div className="container mx-auto flex h-[92vh] flex-col items-center justify-between">
          {/* Header Container*/}
          <div className="text-md flex w-full items-center justify-start border-t p-4 text-center lg:p-8">
            <a onClick={() => navigate(-1)} className="cursor-pointer">
              <ChevronLeftIcon className="size-7" />
            </a>
            <LogoSVG />
          </div>

          {/* Form Container*/}
          <div className="w-80">
            <h1 className="font-display mb-6 text-center text-2xl font-bold text-base-content">
              Login with email
            </h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
                fetch("http://localhost:3500/user/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                  credentials: "include",
                })
                  .then((response) => {
                    if (!response.ok) {
                      if (response.status === 401 || response.status === 404) {
                        setErrorMessage("Invalid email or password");
                      }
                      throw new Error("Network response was not ok");
                    }
                    return response.json();
                  })
                  .then((data) => {
                    if (data.accessToken) {
                      const accessToken = data?.accessToken;
                      const { email, password } = values;
                      setAuth({ email, password, accessToken });
                      console.log("accessToken:", accessToken);
                      // resetForm({ values: "" });
                      // navigate("/dashboard");
                      navigate(from, { replace: true });
                    }
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {errorMessage && (
                    <div className="rounded-md   bg-red-100 p-3 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`w-full rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                      errorMessage ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`w-full rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                      errorMessage ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full rounded-md bg-gradient-to-r from-blue-500 to-blue-700 py-2 font-semibold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-blue-700"
                  >
                    Log in
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="text-md w-full border-t p-4 text-center lg:p-8">
            <p className="font-display font-semibold">
              Don't have an account?
              <Link
                to="/user/sign-up"
                className="font-display ml-2 font-semibold leading-6 text-primary"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Container*/}
        <div className="hidden items-center justify-center lg:container lg:flex">
          <div className="h-[90vh] p-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1663931932651-ea743c9a0144?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="img"
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
