import {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const inputStyle =
  "w-full mt-2 py-3 px-3 text-sm font-body font-medium rounded-md border border-slate-300 placeholder:text-slate-400 placeholder:text-base focus:outline-none focus:border-none focus:ring-1 focus:ring-primary";

const errorStyle = "text-red-500 text-sm mt-1";

const JournalEntryForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    title: "",
    reasoning: "",
    entry_date: "",
    mood: "",
    market_condition: "",
    self_reflection: "",
    img: "",
  };

  // const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg|webp)$/i;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    reasoning: Yup.string().required("Reasoning is required"),
    entry_date: Yup.string().required("Entry Date is required"),
    mood: Yup.string().required("Mood is required"),
    market_condition: Yup.string().required("Market Condition is required"),
    self_reflection: Yup.string().required("Self Reflection is required"),
    img: Yup.mixed()
      .required("Image is required")
      // .url("Must be a valid URL")
      // .matches(
      //   imageUrlRegex,
      //   "Must be a valid image URL (jpeg, jpg, gif, png, svg, webp)"
      // ),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("values: ", values);

    const payload = {
      title: values.title,
      reasoning: values.reasoning,
      entry_date: values.entry_date,
      mood: values.mood,
      market_conditions: values.market_condition,
      self_reflection: values.self_reflection,
      img: values.img,
    };

    try {
      await axiosPrivate.post("/journalEntries", payload);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
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
              <label htmlFor="entry_date">Entry Date</label>
              <Field
                type="date"
                id="entry_date"
                name="entry_date"
                className={inputStyle}
                placeholder="Enter Entry Date"
              />
              <ErrorMessage
                name="entry_date"
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
                as="select"
                className={inputStyle}
                placeholder="Enter mood"
              >
                <option value="Confident">Confident</option>
                <option value="Anxious">Anxious</option>
                <option value="Excited">Excited</option>
                <option value="Fearful">Fearful</option>
                <option value="Cautious">Cautious</option>
                <option value="Frustrated">Frustrated</option>
                <option value="Optimistic">Optimistic</option>
                <option value="Doubtful">Doubtful</option>
                <option value="Calm">Calm</option>
                <option value="Impatient">Impatient</option>
              </Field>
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

            <div className="form-group">
              <label htmlFor="img">Image url</label>
              <Field
                type="text"
                id="img"
                name="img"
                className={inputStyle}
                placeholder="Enter image name"
              />
              <ErrorMessage
                name="img"
                component="div"
                className={errorStyle}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JournalEntryForm;
