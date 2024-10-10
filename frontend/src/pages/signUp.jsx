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

  
  return (
    <>
      <div className="h-[92vh] grid-cols-1 gap-x-4 lg:grid lg:grid-cols-2">
        {/* Left Container*/}
        <div className="hidden items-center justify-center lg:container lg:flex">
          <div className="p-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1663931932651-ea743c9a0144?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="img"
              className="rounded-3xl object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Right Container*/}
        <div className="container mx-auto flex flex-col justify-between items-center h-[90vh]">
          {/* Header Container*/}
          <div className="w-full flex items-center justify-start text-md text-center border-t p-4 lg:p-8">
            <a onClick={() => navigate(-1)} className=" cursor-pointer">
              <ChevronLeftIcon className="size-7"/>
            </a>
            <LogoSVG />
          </div>

          {/* Form Container*/}
          <div className="w-80">
            <h1 className="mb-6 text-2xl text-base-content text-center font-display font-bold">
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
                      className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.username && touched.username ? "border-red-500" : "border-gray-300"
                      }`}
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
                      className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.email && touched.email ? "border-red-500" : "border-gray-300"
                      }`}
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
                      className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.password && touched.password ? "border-red-500" : "border-gray-300"
                      }`}
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
                      className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.first_name && touched.first_name ? "border-red-500" : "border-gray-300"
                      }`}
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
                      className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.last_name && touched.last_name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.last_name && touched.last_name && (
                      <div style={{ color: "red" }}>{errors.last_name}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
                  >
                    Register
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
