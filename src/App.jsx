import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ImageClassifier from "./pages/Image";
import VideoClassifier from "./pages/Video";
import NavComponent from "./components/NavComponent";
import ObjectDetection from "./pages/ObjectDetection";
import FeatureExtractor from "./pages/FeatureExtractor";
import Card from "./components/Card";
import { Data } from "./data";
import KNNClassification from "./pages/KNNClassification";
import TeachableMachine from "./pages/TeachableMachine";
import PitchDetection from "./pages/PitchDetection";
import PoseNet from "./pages/PoseNet";

export const HomePage = () => {
  return (
    <div className="container mx-auto flex flex-wrap justify-center sm:justify-start ">
      {Data.map((n, index) => {
        return (
          <Card
            key={index}
            title={n.title}
            description={n.description}
            link={n.link}
          />
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
          <Route path="/knn" element={<KNNClassification />} />
          {/* <Route path="/teachablemachine" element={<TeachableMachine />} /> */}
          <Route path="/pitchdetection" element={<PitchDetection />} />
          <Route path="/PoseNet" element={<PoseNet />} />
        </Routes>
      </>
    </div>
  );
}
