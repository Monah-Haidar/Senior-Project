import React, { useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";

import LogoSVG from "../assets/logoSVG";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";



function SignUp() {
  const navigate = useNavigate();
  // Regular expressions to validate user input
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const NAME_REGEX = /^[A-Za-z ]+$/;

  const userRef = useRef();

  // put focus on user as soon as the page loads
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const inputStyle =
    "w-full py-3 px-3 text-sm font-body font-medium rounded-md border border-slate-300 placeholder:text-slate-400 placeholder:text-base focus:outline-none focus:border-none focus:ring-1 focus:ring-primary";

  return (
    <>
      <div className="flex flex-row">
        {/* Left Container*/}
        <div className="lg:container lg:flex items-center justify-center hidden">
          <div className="p-4">
            <img
              src="https://www.investopedia.com/thmb/ASStR21rMu9-9_nj1x07H83zbUs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-stock-market-data-on-digital-display-1058454392-c48e2501742f4c21ad57c25d6a087bd0.jpg"
              alt=""
              className="rounded-3xl object-cover h-fit w-full"
            />
          </div>
        </div>

        {/* Right Container*/}
        <div className="container mx-auto flex flex-col justify-between items-center h-screen">
          {/* Header Container*/}
          <div className="w-full flex items-center justify-start text-md text-center border-t p-4 lg:p-8">
            <a onClick={() => navigate(-1)} className=" cursor-pointer">
              <ChevronLeftIcon className="size-7"/>
            </a>
            <LogoSVG />
          </div>

          {/* Form Container*/}
          <div className="w-80">
            <h1 className="mb-6 text-2xl text-base-content text-center font-display font-semibold">
              Sign up with email
            </h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
                username: "",
                first_name: "",
                last_name: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (!EMAIL_REGEX.test(values.email)) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                } else if (!PWD_REGEX.test(values.password)) {
                  errors.password =
                    "password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character";
                }
                if (!values.username) {
                  errors.username = "Required";
                } else if (!USER_REGEX.test(values.username)) {
                  errors.username = "Invalid username";
                }
                if (!values.first_name) {
                  errors.first_name = "Required";
                } else if (!NAME_REGEX.test(values.first_name)) {
                  errors.first_name =
                    "First name can only contain alphabetic characters";
                }
                if (!values.last_name) {
                  errors.last_name = "Required";
                } else if (!NAME_REGEX.test(values.last_name)) {
                  errors.last_name =
                    "Last name can only contain alphabetic characters";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                fetch("http://localhost:3500/user/create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json()).then(console.log)
                  .then(() => navigate("/user/sign-in"))
                  // .then((data) => {
                  //   if (data.token) {
                  //     document.cookie = `token=${data.token}`;
                  //     localStorage.setItem("token", data.token);
                  //     window.location.reload();
                  //   }
                  // })
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      ref={userRef}
                      className={inputStyle}
                    />
                    {errors.username && touched.username && (
                      <div style={{ color: "red" }}>{errors.username}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={inputStyle}
                    />
                    {errors.email && touched.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={inputStyle}
                    />
                    {errors.password && touched.password && (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.first_name}
                      className={inputStyle}
                    />
                    {errors.first_name && touched.first_name && (
                      <div style={{ color: "red" }}>{errors.first_name}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                      className={inputStyle}
                    />
                    {errors.last_name && touched.last_name && (
                      <div style={{ color: "red" }}>{errors.last_name}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={inputStyle}
                  >
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>

          {/* Footer Container*/}
          <div className="w-full text-md text-center border-t p-4 lg:p-8">
            <p className="font-display font-semibold">
              Already have an account?
              <Link
                to="/user/sign-in"
                className="ml-2 font-display font-semibold leading-6 text-primary"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
