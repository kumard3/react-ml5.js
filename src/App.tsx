import { useState, useEffect, useRef } from "react";
import ml5 from "ml5";

export default function App() {
  const [isModelReady, setIsModelReady] = useState(false);
  const classifier: any = useRef();
  const classifiers = ml5.imageClassifier("MobileNet", modelLoaded);
  console.log(classifiers);
  // const onModelReady = () => setIsModelReady(true);
  function modelLoaded() {
    console.log("Model Loaded!");
    setIsModelReady(true);
  }
  useEffect(() => {
    classifier.current = ml5.imageClassifier("MobileNet", modelLoaded);
  }, []);
  return (
    <div className="bg-black text-white min-h-screen">
      <h1>Heelo World</h1>
    </div>
  );
}
