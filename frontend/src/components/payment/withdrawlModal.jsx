import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function WithdrawlModal() {
  const [success, setSuccess] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  return (
    <div className="modal-box">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle bg-gray-100 absolute right-2 top-2">
          ✕
        </button>
      </form>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Bank Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Withdraw money from your account.
        </p>

        <Formik
          initialValues={{
            IBAN: "",
            amount: "",
          }}
          validate={(values) => {
            const errors = {};
            const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;

            if (!values.IBAN || !ibanRegex.test(values.IBAN)) {
              errors.IBAN = "Please enter a valid IBAN";
            }
            if (!values.amount || isNaN(values.amount)) {
              errors.amount = "Please enter a valid amount";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const transactionData = {
              amount: values.amount,
              token: token,
            };

            try {
              const withdrawTransaction = async () => {
                const response = await axiosPrivate.post(
                  "/transaction/withdraw",
                  transactionData
                );
                setSuccess(true);
              };
            } catch (error) {
              console.error("Error:", error);
            } finally {
              setSubmitting(false);
            }

            withdrawTransaction();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="IBAN"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  IBAN Number
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="IBAN"
                    id="IBAN"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="IBAN"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="amount"
                    id="amount"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
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
            <span>Your Withdraw Is Successfull!</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
