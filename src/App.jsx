import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ImageClassifier from "./pages/Image";
import VideoClassifier from "./pages/Video";
import NavComponent from "./components/NavComponent";
import ObjectDetection from "./pages/ObjectDetection";
import FeatureExtractor from "./pages/FeatureExtractor";
import Card from "./components/Card";
import { Data } from "./data";

export const HomePage = () => {
  return (
    <div className="container mx-auto flex flex-wrap justify-center sm:justify-start ">
      {Data.map((n) => {
        return (
          <>
            {" "}
            <Card
              title={n.title}
              description={n.description}
              link={n.link}
            />{" "}
          </>
        );
      })}
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
          <Route path="/object" element={<ObjectDetection />} />
          <Route path="/feature" element={<FeatureExtractor />} />
        </Routes>
      </>
    </div>
  );
}
