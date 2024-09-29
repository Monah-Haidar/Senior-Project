import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const inputStyle =
  "w-full mt-2 py-3 px-3 text-sm font-body font-medium rounded-md border border-slate-300 placeholder:text-slate-400 placeholder:text-base focus:outline-none focus:border-none focus:ring-1 focus:ring-primary";

const errorStyle = "text-red-500 text-sm mt-1";

const PredictForm = () => {
  const [result, setResult] = useState("");

  const initialValues = {
    title: "",
    reasoning: "",
    mood: "",
    market_condition: "",
    img: "",
    self_reflection: "",
  };

  const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg|webp)$/i;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    reasoning: Yup.string().required("Reasoning is required"),
    mood: Yup.string().required("Mood is required"),
    market_condition: Yup.string().required("Market Condition is required"),
    self_reflection: Yup.string().required("Self Reflection is required"),
    img: Yup.string()
      .required("Image is required")
      .url("Must be a valid URL")
      .matches(
        imageUrlRegex,
        "Must be a valid image URL (jpeg, jpg, gif, png, svg, webp)"
      ),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission
    fetch("http://localhost:7000/alert/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Created alert", data);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                className={inputStyle}
                placeholder="Enter title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reasoning">Reasoning</label>
              <Field
                type="text"
                id="reasoning"
                name="reasoning"
                className={inputStyle}
                placeholder="Enter reasoning"
              />
              <ErrorMessage
                name="reasoning"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mood">Mood</label>
              <Field
                type="text"
                id="mood"
                name="mood"
                className={inputStyle}
                placeholder="Enter mood"
              />
              <ErrorMessage
                name="mood"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="market_condition">Market Condition</label>
              <Field
                type="text"
                id="market_condition"
                name="market_condition"
                className={inputStyle}
                placeholder="Enter market condition"
              />
              <ErrorMessage
                name="market_condition"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="img">Image url</label>
              <Field
                type="text"
                id="img"
                name="img"
                className={inputStyle}
                placeholder="Enter image url"
              />
              <ErrorMessage
                name="img"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="self_reflection">Self Reflection</label>
              <Field
                type="text"
                id="self_reflection"
                name="self_reflection"
                className={inputStyle}
                placeholder="Enter self reflection"
              />
              <ErrorMessage
                name="self_reflection"
                component="div"
                className={errorStyle}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Predict
            </button>
          </Form>
        )}
      </Formik>
      <p className=" mt-2 pb-2">Result: {result}</p>
    </div>
  );
};

export default PredictForm;
