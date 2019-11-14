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
  } else if( password === "!"){
      errors.password = "error"
  }

  return errors;
};

function BetterForm({status}) {
  const [user, setUser] = useState("");
  const [submit, setSubmit] = useState(false)

  const handleSubmit = (values, tools) => {
   setSubmit(true)
   setTimeout(() => axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setUser(res.data);
        tools.resetForm()
      })
      .catch(err => console.log("error", err))
      .finally(() => {
          setSubmit(false)
      }), 1000)
  };

  useEffect(() => {
    status && setUser(user => [...user, status])
 }, [status])

  return (
    <div >
      <Formik
        initialValues={{ name: "", email: "", password: "" , drop: ""}}
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
                <Field name="password" type="password" placeholder="enter password" />
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
                <Field as= "select" name = "drop">
                    <option>What's your Role?</option>
                    <option value = "Software Engineer">Software Engineer</option>
                    <option value = "Data Scientist">Data Scientist</option>
                    <option value = "UI/UX Designer">UI/UX Designer</option>
                </Field>
                <br />
                <br />
                <button type="submit" disabled = {props.isSubmitting}>
                    {submit ? "SUBMITTING" : "Submit"}
                </button>
              </Form>
              <div className = "forms">
                <p className = "form">{user.name}</p>
                <p className = "form">{user.email}</p>
                <p className = "form">{user.password}</p>
                <p className = "form">{user.drop}</p>
              </div> 
                  {/* {user.map(cv => (
                        <ul>
                            <li>{cv.name}</li>
                        </ul>
                      ))} */}
            </div>
          );
        }}
      />



    </div>
  );
}

export default BetterForm;
