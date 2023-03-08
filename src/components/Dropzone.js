import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import axios from "axios";
import { useState } from "react";
export default function App() {
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles[0].file);
    const formData = new FormData();
    formData.append("image", incommingFiles[0].file);
    setFiles(incommingFiles);
    axios.post("http://142.93.237.244:9090/v1/product-images", formData);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files) => {
    console.log("list cleaned", files);
  };
  return (
    <>
      <Dropzone
        style={{ minWidth: "550px" }}
        //view={"list"}
        onChange={updateFiles}
        minHeight="195px"
        onClean={handleClean}
        value={files}
        maxFiles={5}
        //header={false}
        // footer={false}
        maxFileSize={2998000}
        //label="Drag'n drop files here or click to browse"
        //label="Suleta tus archivos aquí"
        accept=".png,image/*"
        // uploadingMessage={"Uploading..."}
        url="https://my-awsome-server/upload-my-file"
        //of course this url doens´t work, is only to make upload button visible
        //uploadOnDrop
        //clickable={false}
        fakeUploading
        //localization={"FR-fr"}
        disableScroll
      >
        {files.length > 0 &&
          files.map((file) => (
            <FileItem
              {...file}
              key={file.id}
              onDelete={onDelete}
              onSee={handleSee}
              //localization={"ES-es"}
              resultOnTooltip
              preview
              info
              hd
            />
          ))}
      </Dropzone>
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={(e) => handleSee(undefined)}
      />
    </>
  );
}
