import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ImageClassifier from "./pages/Image";
import VideoClassifier from "./pages/Video";
import NavComponent from "./components/NavComponent";

export const HomePage = () => {
  return (
    <div className="">
      <h1>tailwind css starter </h1>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-[#0F182B] text-white min-h-screen">
      <NavComponent />
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/image" element={<ImageClassifier />} />
          <Route path="/video" element={<VideoClassifier />} />
        </Routes>
      </>
    </div>
  );
}
