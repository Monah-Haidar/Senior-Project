import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const inputStyle =
  "w-full mt-2 py-3 px-3 text-sm font-body font-medium rounded-md border border-slate-300 placeholder:text-slate-400 placeholder:text-base focus:outline-none focus:border-none focus:ring-1 focus:ring-primary";

const errorStyle = "text-red-500 text-sm mt-1";

const AlertForm = () => {
  const [success, setSuccess] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const initialValues = {
    title: "",
    threshold: "",
    expiration_date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Alert title is required"),
    threshold: Yup.number().required("threshold is required"),
    expiration_date: Yup.number().required("Invalid date"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {

    const payload = {
      message: values.title,
      threshold: values.threshold,
      expiration_date: values.expiration_date,
    };

    try{

      axiosPrivate.post("/alert/create", payload);

      console.log("values", payload);
      setSuccess(true);
      resetForm();
    }catch(error){
      console.error("Error creating alert:", error);
    } finally {
      setSubmitting(false);
    }

  };

  const handleModalClick = (modalName) => {
    const modal = document.getElementById(modalName);
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className="form-group">
              <label htmlFor="title">Alert Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                className={inputStyle}
                placeholder="Enter alert title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="threshold">Threshold</label>
              <Field
                type="number"
                id="threshold"
                name="threshold"
                className={inputStyle}
                placeholder="Enter threshold"
              />
              <ErrorMessage
                name="threshold"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiration_date">Expiration date</label>
              <Field
                type="text"
                id="expiration_date"
                name="expiration_date"
                className={inputStyle}
                placeholder="Enter expiration date"
              />
              <ErrorMessage
                name="expiration_date"
                component="div"
                className={errorStyle}
              />
            </div>

            <button
              type="submit"
              onClick={() => handleModalClick("successModal")}
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>

      {success ? (
        <div role="alert" className="alert alert-success mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your Alert was Successfully Added!</span>
        </div>
      ) : null}
    </div>
  );
};

export default AlertForm;
