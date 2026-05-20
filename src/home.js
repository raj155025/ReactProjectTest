import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios.post("http://localhost:5000/api/file/upload", formData, {
      onUploadProgress: (e) => {
        setProgress(Math.round((e.loaded * 100) / e.total));
      }
    })
    .then(() => alert("File uploaded!"))
    .catch(() => alert("Upload failed!"));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>📤 Upload File</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
      <p>Progress: {progress}%</p>
    </div>
  );
}