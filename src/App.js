import React from "react";
import ImageGrid from "./components/ImageGrid";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid />
    </div>
  );
}

export default App;
