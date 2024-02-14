import { useEffect, useState } from "react";
import { useFormik } from "formik";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import EditSvg from "./EditSvg";
import { useNavigate } from "react-router-dom";

// import 'yoopta-editor/dist/index.css';
interface FormData {
  title: string;
  content: string | { text: string; twyllable: boolean; type: string };
  separator: string;
}
function Test() {
  const [user, setUserData] = useState<any>({});

  const [image, setImage] = useState<string>("");
  const [contentData, setContentData] = useState([]);
  const [value, setValue] = useState([]);
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      title: "",
      abstract: "",
      cover: "",
      author: "",
      language: "",

      contenttitle: "",
      content: "",
      separator: "",
    },
    onSubmit: async (values) => {
      const newContent = {
        
        title: values.contenttitle,
        content: values.content,
        separator: values.separator,
        id:values.contenttitle
      };

      // Push the values to the state array
      setContentData((prevContentData) => [...prevContentData, newContent]);
      let existingData: FormData[] = JSON.parse(
        localStorage.getItem("formData") || "[]"
      );

      existingData.push(newContent);

      localStorage.setItem("formData", JSON.stringify(existingData));

      // Clear the form values
      setValues({
        ...values,
        contenttitle: "",
        content: "",
        separator: "",
      });
    },
  });

  //   const formik = useFormik({
  //     initialValues: {
  //       title: "",
  //       content: "",
  //       separator: "",
  //     },
  //     onSubmit: async (values) => {
  //       const isHTML = /<[a-z][\s\S]*>/i.test(values.content);

  //       const contentToSave = isHTML
  //         ? { text: values.content, twyllable: false, type: "paragraph" }
  //         : values.content;
  //       const formDataToSave: FormData = {
  //         title: values.title,
  //         content: contentToSave,
  //         separator: values.separator,
  //       };

  //       let existingData: FormData[] = JSON.parse(
  //         localStorage.getItem("formData") || "[]"
  //       );

  //       existingData.push(formDataToSave);

  //       localStorage.setItem("formData", JSON.stringify(existingData));

  //       const zip = new JSZip();

  //       // Add a file to the zip containing the form data
  //       zip.file(
  //         "formData.json",
  //         JSON.stringify(
  //           {
  //             title: values.title,
  //             content: contentToSave,
  //             separator: values.separator,
  //           },
  //           null,
  //           2
  //         )
  //       );

  //       // Generate the zip file asynchronously
  //       const content = await zip.generateAsync({ type: "blob" });

  //       // Save the zip file
  //       saveAs(content, "formData.zip");
  //       resetForm();
  //     },
  //   });

  const [FormDataa, setFormData] = useState<FormData[]>([]);
  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem("formData");
    const GetuserData = localStorage.getItem("userData");
    const userDataGet: FormData[] = JSON.parse(GetuserData);
    setUserData(userDataGet);
    if (storedData) {
      const parsedData: FormData[] = JSON.parse(storedData);
      console.log(parsedData, "AAA>>>");
      setFormData(parsedData);
    }
  }, []);

  const HandleAllContent = () => {
    // Get the values
  };

  const navigate = useNavigate();
  return (
    <div className="mt-20 ">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="mt-10  ">
            <div className="mt-5">
              <h2 className="text-3xl ">Content</h2>
              {FormDataa.map((data, index) => (
                <div
                  key={index}
                  className="mt-5 cursor-pointer bg-gray-50 p-2 rounded-md  ml-5 "
                  onClick={() =>
                    navigate("/content", {
                      state: {
                        id:data?.title,
                        title: data?.title,
                        content: data?.content,
                      },
                    })
                  }
                >
                  {/* <YooptaEditor value={data.title} onChange={onChange} /> */}

                  <h3 className="pl-5 capitalize">{data.title}</h3>
                </div>
              ))}

              {/* { FormDataa.length === 0 && <p>No form data available.</p>} */}
            </div>
          </div>
          <div className="mt-5">
            {/* <form> */}
            <div className="flex items-start  justify-between">
              <div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="file">
                    Bulk Create With single file (Epub/Special Html)
                  </label>
                  {/* dropify */}
                  <div className="h-[150px] w-96 bg-gray-100 border-dashed border-gray-300 rounded-md"></div>
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="file">Import anexported content</label>
                  {/* dropify */}
                  <div className="h-[150px] w-96 bg-gray-100 border-dashed border-gray-300 rounded-md"></div>
                </div>
              </div>
              <div>
                <h3>Manually Create</h3>
                <div className=" mt-5 flex items-center justify-between gap-20">
                  <label htmlFor="title">
                    <span className="text-red-500">* </span> title
                  </label>
                  <div>
                    <input
                      type="text"
                      value={values.contenttitle}
                      onChange={handleChange}
                      name="contenttitle"
                      id="contenttitle"
                      className=" pl-5 w-96 border  outline-none  h-10"
                    />
                  </div>
                </div>

                <div className=" mt-5 flex items-start gap-20">
                  <label htmlFor="Content">
                    <span className="text-red-500">* </span> Content
                  </label>
                  <div>
                    <textarea
                      rows={5}
                      // type="text"
                      value={values.content}
                      onChange={handleChange}
                      name="content"
                      id="Content"
                      className="p-3 min-h-[80px]  pl-5 w-96 border  outline-none  h-10"
                    />
                    <p className="text-xs text-gray-400">
                      insert valid and supported HTML or a plain text
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start gap-20 mt-5">
                  <label htmlFor="separator">
                    <span className="text-red-500">* </span> Separator
                  </label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="separator"
                        id="separator"
                        value={"doubleline"}
                        onChange={handleChange}
                      />
                      <label htmlFor="radio1">Use double newline</label>
                      <input
                        type="radio"
                        name="separator"
                        id="separator"
                        value={"singleline"}
                        onChange={handleChange}
                      />
                      <label htmlFor="radio2">Use single newline</label>
                    </div>
                    <p className="text-xs text-gray-400">
                      choose how paragraph are saperated for plain text
                      materials
                    </p>
                  </div>
                </div> */}
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    // onClick={(e) => HandleAllContent(e)}
                    className=" mt-5  border  rounded-sm  px-5 p-1   bg-blue-500 text-white  "
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
            {/* </form> */}
          </div>

          {/* <div className="flex items-center justify-center mb-20">
            <button
              onClick={(e) => handleSubmit(e)}
              className="  border  rounded-sm  px-5 p-1   bg-blue-500 text-white"
            >
              Submit
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default Test;
