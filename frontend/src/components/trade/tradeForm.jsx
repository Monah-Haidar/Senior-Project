import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const inputStyle =
  "w-full mt-2 py-3 px-3 text-sm font-body font-medium rounded-md border border-slate-300 placeholder:text-slate-400 placeholder:text-base focus:outline-none focus:border-none focus:ring-1 focus:ring-primary";

const errorStyle = "text-red-500 text-sm mt-1";

const TradeForm = () => {
  const axiosPrivate = useAxiosPrivate();

  const [success, setSuccess] = useState(false);

  const initialValues = {
    amount: "",
    take_profit_price: "",
    stop_loss_price: "",
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError("Must be a number")
      .required("amount is required"),
    take_profit_price: Yup.number()
      .typeError("Must be a number")
      .required("take profit price is required"),
    stop_loss_price: Yup.number()
      .typeError("Must be a number")
      .required("stop loss price is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        quantity: values.amount,
        take_profit_price: values.take_profit_price,
        stop_loss_price: values.stop_loss_price,
      };

      await axiosPrivate.post("/order/create", payload);

      console.log("Order Created: ", payload);
      resetForm();
      setSuccess(true);
    } catch (error) {
      console.error("Error creating order:", error);
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
            {/* Amount Field */}
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <Field
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter amount"
                className={inputStyle}
              />
              <ErrorMessage
                name="amount"
                component="div"
                className={errorStyle}
              />
            </div>

            {/* Stop Loss Field */}
            <div className="form-group">
              <label htmlFor="stop_loss_price">Stop Loss Price</label>
              <Field
                type="number"
                id="stop_loss_price"
                name="stop_loss_price"
                className={inputStyle}
                placeholder="Enter stop loss"
              />
              <ErrorMessage
                name="stop_loss_price"
                component="div"
                className={errorStyle}
              />
            </div>

            {/* Take Profit Field */}
            <div className="form-group">
              <label htmlFor="take_profit_price">Take Profit Price</label>
              <Field
                type="number"
                id="take_profit_price"
                name="take_profit_price"
                className={inputStyle}
                placeholder="Enter take profit"
              />
              <ErrorMessage
                name="take_profit_price"
                component="div"
                className={errorStyle}
              />
            </div>

            {/* Buy Button */}
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
                onClick={() => handleModalClick("my_modal_5")}
              >
                Buy
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {success && (
        <dialog id="my_modal_5" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">Success!</h3>
            <p className="py-4">Market Order Created Successfully</p>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default TradeForm;
