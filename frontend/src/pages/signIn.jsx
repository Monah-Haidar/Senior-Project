import { useRef, useEffect } from "react";
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


  // Regular expressions to validate user input
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const NAME_REGEX = /^[A-Za-z ]+$/;

  // put focus on user as soon as the page loads
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const inputStyle = "w-full py-3 px-3 text-sm font-body font-medium rounded-md border border-slate-300 placeholder:text-slate-400 placeholder:text-base focus:outline-none focus:border-none focus:ring-1 focus:ring-primary";

  return (
    <>
      <div className="lg:grid lg:grid-cols-2 grid-cols-1 gap-x-4">
        {/* Left Container*/}
        <div className="container mx-auto flex flex-col justify-between items-center h-screen">
          {/* Header Container*/}
          <div className="w-full flex items-center justify-start text-md text-center border-t p-4 lg:p-8">
            <a onClick={() => navigate(-1)} className=" cursor-pointer">
              <ChevronLeftIcon className="size-7" />
            </a>
            <LogoSVG />
          </div>

          {/* Form Container*/}
          <div className="w-80">
            <h1 className="mb-6 text-2xl text-base-content text-center font-display font-semibold">
              Login with email
            </h1>
            <Formik
              initialValues={{
                email: "monahhaidar1123@gmail.com", 
                password: "monahhaidar1123@M",
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
                  errors.password = "Invalid password";
                }
                return errors;
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
                      if (response.status === 401) {
                        setErrors({ password: "Incorrect password" });
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


                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={inputStyle}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* Footer Container*/}
          <div className="w-full text-md text-center border-t p-4 lg:p-8">

            <p className="font-display font-semibold">
              Don't have an account?
              <Link
                to="/user/sign-up"
                className="ml-2 font-display font-semibold leading-6 text-primary"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Container*/}
        <div className="lg:container lg:flex items-center justify-center hidden">
          <div className="p-4">
            <img
              src="https://www.investopedia.com/thmb/ASStR21rMu9-9_nj1x07H83zbUs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-stock-market-data-on-digital-display-1058454392-c48e2501742f4c21ad57c25d6a087bd0.jpg"
              alt=""
              className="rounded-3xl object-cover h-fit w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
