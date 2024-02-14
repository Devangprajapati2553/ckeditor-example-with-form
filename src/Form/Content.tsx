import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface FormData {
  title: string;
  content: string | { text: string; twyllable: boolean; type: string };
  separator: string;
}
const Content = () => {
  const [FormDataa, setFormData] = useState<FormData[]>([]);
  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData: FormData[] = JSON.parse(storedData);
      console.log(parsedData, "AAA>>>");
      setFormData(parsedData);
    }
  }, []);

  const { state } = useLocation();

  const { handleChange, setFieldValue, values, handleSubmit } = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values) => {
      console.log(values);

      //   const GetData = JSON.parse(localStorage.getItem("formData"));
      //   const FindData = GetData?.map((x) => {
      //     x.title == state?.title;
      //   });
    },
  });

  return (
    <div className="px-10 max-w-screen-xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="mt-5">
          <div className="mt-5">
            <h3 className="my-5 text-xl capitalize">{state?.title}</h3>
          </div>
          <CKEditor
            editor={ClassicEditor}
            data={state?.content}
            onChange={(event, editor) => {
              console.log(editor.getData(), "WHAs Come");
              setFieldValue("content", editor.getData());
            }}
          />
          {/* {FormDataa.map((data, index) => (
          <div key={index} className="mt-5">

          </div>
        ))} */}
          <div className="flex items-center gap-3 justify-end my-10">
            <button type="button" className="border  rounded-sm px-5 p-1   ">
              Cancel
            </button>
            <button
              //   onClick={HandlechangeContent}
              type="submit"
              className="border  rounded-sm  px-5 p-1   bg-blue-500 text-white "
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Content;
