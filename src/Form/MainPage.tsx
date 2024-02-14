import React, { useEffect, useState } from "react";
import Form1 from "./Form1";
import Test from "./Form";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const MainPage = () => {
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
    const userDataBlob = new Blob([JSON.stringify(user, null, 2)], {
      type: "application/json",
    });
    console.log(userDataBlob, "");
    const userDataUrl = URL.createObjectURL(userDataBlob);

    const parsedData: FormData[] = JSON.parse(localStorage.getItem("formData"));

    const mainZip3 = new JSZip();

    // Add userData.json to the mainZip3
    mainZip3.file("material.json", userDataBlob);

    // USER SECTION COMPLETED

    // Create a content folder within mainZip3
    const contentFolder = mainZip3.folder("content");

    // Loop through parsedData and add each zipBlob to the content folder
    await Promise.all(
      parsedData.map(async (data, index) => {
        const contentZip = new JSZip();
        const contentJson = {
          index: index,
          title: data.title,
          content: data.content,
          separator: data.separator,
        };

        // Add the content.json file to the contentZip
        const blockFolder = contentZip.folder("Blocks");
        blockFolder.file(`content.json`, JSON.stringify(contentJson, null, 2));
        // contentZip.file(`content.json`, JSON.stringify(contentJson, null, 2));

        const titleContent = JSON.stringify({
          index: index,
          title: data.title,
        });

        // Add a separate file for the title only
        contentZip.file(`title.json`, titleContent);

        // Generate zipBlob for contentZip
        const zipBlob = await contentZip.generateAsync({ type: "blob" });

        // Add zipBlob to the content folder of mainZip3
        contentFolder.file(`content_${index}.zip`, zipBlob);
        // const BlockFolder = ContentSaperateZipfiles.folder(`Blocks`);
        // BlockFolder.file(`content.json`, JSON.stringify(contentJson, null, 2));

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
