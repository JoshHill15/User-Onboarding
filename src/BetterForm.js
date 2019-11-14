import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validate = ({ name, email, password, status }) => {
  const errors = {};
  if (!name) {
    errors.name = "You need to input a name!";
  } else if (name.length < 3) {
    errors.name = "You need a longer name!";
  }

  if (!email) {
    errors.email = "You need to input a email!";
  }

  if (!password) {
    errors.password = "You need to input a password!";
  } else if (password.length < 7) {
    errors.password = "You need a longer password!";
  }

  return errors;
};

function BetterForm({status}) {
  const [user, setUser] = useState([]);
  const handleSubmit = (values, tools) => {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setUser(res.data);
        tools.resetForm()
      })
      .catch(err => console.log("error", err))
      .finally(() => {
          tools.setSubmitting(false)
      });
  };
  useEffect(() => {
    status && setUser(user => [...user, status])
}, [status])

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validate={validate}
        render={props => {
          console.log(props);
          return (
            <div>
              <h1>The Better Form!</h1>
              <Form>
                <Field name="name" type="text" placeholder="enter name" />
                <ErrorMessage name="name" component="span" />
                <br />
                <Field name="email" type="email" placeholder="enter email" />
                <ErrorMessage name="email" component="span" />
                <br />
                <Field
                  name="password"
                  type="password"
                  placeholder="enter password"
                />
                <ErrorMessage name="password" component="span" />
                <br />
                <label>
                  Terms of Service
                  <Field
                    type="checkbox"
                    name="terms"
                    checked={props.values.terms}
                  />
                </label>
                <br />
                <button type="submit" disabled = {props.isSubmitting}>
                    {props.isSubmitting ? "SUBMITTING" : "Submit"}
                </button>
              </Form>
              {/* <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.password}</p> */}
                  {user.map(cv => (
                        <ul>
                            <li>{cv.name}</li>
                        </ul>
                      ))}
            </div>
          );
        }}
      />



    </div>
  );
}

export default BetterForm;
