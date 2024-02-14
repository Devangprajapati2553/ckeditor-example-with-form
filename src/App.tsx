import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation } from "react-router-dom";

const App = () => {
  const [storedData, setStoredData] = useState(
    localStorage.getItem("formValues")
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      localStorage.setItem("formValues", JSON.stringify(values));
      setStoredData(values);
    },
  });

  useEffect(() => {
    const data = localStorage.getItem("formValues");
    if (data) {
      setStoredData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="w-full flex flex-col max-w-screen-2xl  mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {/* <h2>Stored Data:</h2>
        <p>Title: {storedData?.title}</p> */}
        <div className="mt-10">
          {/* Description:{" "} */}
          <CKEditor
            editor={ClassicEditor}
            
            data={storedData?.description ?? "Devang"}
            onChange={(event, editor) => {
              formik.setFieldValue("description", editor.getData());
            }}
          />
          {/* <div dangerouslySetInnerHTML={{ __html: storedData?.description }} /> */}
          <h1>{storedData?.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
