import React, { useEffect, useState } from "react";
import Form1 from "./Form1";
import Test from "./Form";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const MainPage = () => {
  // onSubmit: async (values) => {
  //     const userData = {
  //       name: user.name,
  //       title: user.title,
  //       abstract: user.abstract,
  //       cover: user.cover,
  //       author: user.author,
  //       language: user.language,
  //     };

  //     const userDataBlob = new Blob([JSON.stringify(userData, null, 2)], {
  //       type: "application/json",
  //     });
  //     const userDataUrl = URL.createObjectURL(userDataBlob);
  //     const userDataLink = document.createElement("a");
  //     userDataLink.href = userDataUrl;
  //     // userDataLink.download = "userData.json";
  //     // userDataLink.click();
  //     URL.revokeObjectURL(userDataUrl);

  //     const parsedData: FormData[] = JSON.parse(
  //       localStorage.getItem("formData")
  //     );

  //     const contentZip = new JSZip();
  //     // Iterate over each object in parsedData
  //     parsedData.forEach((data, index) => {
  //       const contentZip = new JSZip();
  //       // Create the content.json for this object
  //       const contentJson = {
  //         title: data.title,
  //         content: data.content,
  //         separator: data.separator,
  //       };

  //       // Add the content.json file to the content zip
  //       contentZip.file(`content.json`, JSON.stringify(contentJson, null, 2));
  //       contentZip.generateAsync({ type: "blob" }).then((zipBlob) => {
  //         // Save or do something with the zipBlob, for example, save to localStorage or download
  //         // Here's an example of how to download the zip file
  //         const zipFileName = `content_${index}.zip`;
  //         saveAs(zipBlob, zipFileName);
  //       });
  //     });

  //     // Generate the content.zip Blob
  //     const contentZipBlob = await contentZip.generateAsync({ type: "blob" });

  //     // Create main zip file containing userData.json and content.zip
  //     const mainZip = new JSZip();
  //     mainZip.file("userData.json", userDataBlob); // Assuming userDataBlob is defined elsewhere
  //     mainZip.folder("content").file("content.zip", contentZipBlob);

  //     // Generate main zip file asynchronously
  //     const mainZipBlob = await mainZip.generateAsync({ type: "blob" });

  //     // Save the main zip file
  //     saveAs(mainZipBlob, "main.zip"); // Change the file name as per your requirement

  // contentZip.file(
  //   "content.json",
  //   JSON.stringify(
  //     {
  //       title: values.contenttitle,
  //       content: values.content,
  //       separator: values.separator,
  //     },
  //     null,
  //     2
  //   )
  // );

  // const contentZipBlob = await contentZip.generateAsync({ type: "blob" });

  // // Create URL for content.zip Blob
  // const contentZipUrl = URL.createObjectURL(contentZipBlob);

  // // Create main zip file containing userData.json and content.zip
  // const mainZip = new JSZip();
  // mainZip.file("userData.json", userDataBlob);
  // mainZip.folder("content").file("content.zip", contentZipBlob);

  // // Generate main zip file asynchronously
  // const mainZipBlob = await mainZip.generateAsync({ type: "blob" });

  // // Save the main zip file
  // saveAs(mainZipBlob, "content.zip");
  //   },
  const [user, setUserData] = useState<any>({});
  const [contentData, setContentData] = useState<any>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    const GetuserData = localStorage.getItem("userData");
    const userDataGet: FormData[] = JSON.parse(GetuserData);
    console.log(userDataGet, "FFFFF");
    setUserData(userDataGet);
    if (storedData) {
      const parsedData: FormData[] = JSON.parse(storedData);
      console.log(parsedData, "AAA>>>");
      setContentData(parsedData);
    }
  }, []);

  const HandleClick = async () => {
    // const userDataBlob = new Blob([JSON.stringify(user, null, 2)], {
    //   type: "application/json",
    // });
    // const userDataUrl = URL.createObjectURL(userDataBlob);
    // const userDataLink = document.createElement("a");
    // userDataLink.href = userDataUrl;
    // // userDataLink.download = "userData.json";
    // // userDataLink.click();
    // URL.revokeObjectURL(userDataUrl);

    // const parsedData: FormData[] = JSON.parse(localStorage.getItem("formData"));

    // const contentZip = new JSZip();
    // parsedData.forEach((data, index) => {
    //   const contentZip = new JSZip();
    //   const contentJson = {
    //     title: data.title,
    //     content: data.content,
    //     separator: data.separator,
    //   };
    //   // Add the content.json file to the content zip
    //   contentZip.file(`content.json`, JSON.stringify(contentJson, null, 2));
    //   const getAllContent = contentZip
    //     .generateAsync({ type: "blob" })
    //     .then((zipBlob) => {
    //       // Save or do something with the zipBlob, for example, save to localStorage or download
    //       // Here's an example of how to download the zip file
    //       const zipFileName = `content_${index}.zip`;
    //       saveAs(zipBlob, zipFileName);
    //       // content all zip
    //       console.log(zipFileName, "QQQQQ");
    //     });
    // });

    // const contentZipBlob = await contentZip.generateAsync({ type: "blob" });

    // const contentZipUrl = URL.createObjectURL(contentZipBlob);

    // const mainZip3 = new JSZip();
    // mainZip3.file("userData.json", userDataBlob);
    // mainZip3.folder("content").file("content.zip", contentZipBlob);

    // const mainZipBlob = await mainZip3.generateAsync({ type: "blob" });

    // saveAs(mainZipBlob, "content.zip");

    const userDataBlob = new Blob([JSON.stringify(user, null, 2)], {
      type: "application/json",
    });
    console.log(userDataBlob, "FFFFFF");
    const userDataUrl = URL.createObjectURL(userDataBlob);

    const parsedData: FormData[] = JSON.parse(localStorage.getItem("formData"));

    const mainZip3 = new JSZip();

    // Add userData.json to the mainZip3
    mainZip3.file("material.json", userDataBlob);

    // Create a content folder within mainZip3
    const contentFolder = mainZip3.folder("content");

    // Loop through parsedData and add each zipBlob to the content folder
    await Promise.all(
      parsedData.map(async (data, index) => {
        const contentZip = new JSZip();
        const contentJson = {
          title: data.title,
          content: data.content,
          separator: data.separator,
        };

        // Add the content.json file to the contentZip
        contentZip.file(`content.json`, JSON.stringify(contentJson, null, 2));

        // Generate zipBlob for contentZip
        const zipBlob = await contentZip.generateAsync({ type: "blob" });

        // Add zipBlob to the content folder of mainZip3
        contentFolder.file(`content_${index}.zip`, zipBlob);

        console.log(`content_${index}.zip`, "QQQQQ");
      })
    );

    // Generate blob for mainZip3 and save it
    const mainZipBlob = await mainZip3.generateAsync({ type: "blob" });
    saveAs(mainZipBlob, "material.zip");

    // Revoke object URL
    URL.revokeObjectURL(userDataUrl);
  };

  return (
    <div className="px-10 max-w-screen-xl mx-auto">
      <h1 className="text-center text-3xl mt-10">Form</h1>
      <Form1 />
      <Test />
      <div className="flex items-center justify-center mb-20">
        <button
          onClick={HandleClick}
          className="  border  rounded-sm  px-5 p-1   bg-blue-500 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MainPage;
