import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputPassword } from "@/components/Common/Input";
const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(1, "must be more than 1 character")
        .required("Required"),
      repeatPassword: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl text-cyan-800">Change Password</div>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <InputPassword
            name="password"
            label="Password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
          <InputPassword
            name="repeatPassword"
            label="Repeat Password"
            value={formik.values.repeatPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <p className="text-red-500">{formik.errors.repeatPassword}</p>
          )}
        </div>
        <button type="submit" className="v-btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
