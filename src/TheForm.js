import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";

function TheForm({ values, errors, touched, status }) {
    const [data, setData] = useState([])

    useEffect(() => {
        status && setData(data => [...data, status])
    }, [status])

  return (
    <div>
        <h1>My Form!</h1>
      <Form>
        <Field type="text" name="name" placeholder="name" /><br/>
        <Field type="email" name="email" placeholder="email" /><br/>
        <Field type="password" name="password" placeholder="password" /><br/>
        <label>
            Terms of Service
        <Field type="checkbox" name="terms" checked = {values.terms}/>
        </label><br/>
        <button>Submit!</button>
        {touched.name && errors.name && <p>{errors.name}</p>}
        {touched.password && errors.password && <p>{errors.password}</p>}
        {touched.email && errors.email && <p>{errors.email}</p>}
      </Form>
      {data.map(info => (
          <ul key = {info.id}>
              <li>Name: {info.name}</li>
              <li>email: {info.email}</li>
              <li>password: is a secret!</li>
          </ul>
      ))}
    </div>
  );
}

const HigherOrderComponent = withFormik({
  mapPropsToValues({ name, password, email, terms }) {
    return {
      name: name || "",
      password: password || "",
      email: email || "",
      terms: terms || false,
    };
  },
  validationSchema: Yup.object().shape({
      name: Yup.string().required("You need to input your name!"),
      password: Yup.string().required("You need to input a password!"),
      email: Yup.string().required("You need to input a email!"),
  }),
  handleSubmit(values, { setStatus }) {
    axios.post("https://reqres.in/api/users", values)
    .then(res => {
        setStatus(res.data)
        console.log(res.data)
    }).catch(err => console.log("error", err))
  }
})(TheForm);
export default HigherOrderComponent;
