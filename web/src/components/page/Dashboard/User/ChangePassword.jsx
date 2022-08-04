import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Common/Input";
const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(30, "must be less than 30 characters")
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
      <div>Change Password</div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p>{formik.errors.password}</p>
          )}
          <Input
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            value={formik.values.repeatPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <p>{formik.errors.repeatPassword}</p>
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
