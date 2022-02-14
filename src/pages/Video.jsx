import { useState, useEffect, useRef } from "react";
import ml5 from "ml5";
import p5 from "p5";

export default function VideoClassifier() {
  const app = useRef();
  const [modeldata, setModelData] = useState([]);
  let [video, setvideo] = useState();

  const sketch = (p) => {
    let mobilenet;

    function modelReady() {
      console.log("Model is ready!!!");
    }

    p.setup = () => {
      p.createCanvas(340, 380);
      video = p.createCapture(p.VIDEO);
      video.hide();
      p.background(0);
      mobilenet = ml5.imageClassifier("MobileNet", modelReady);
    };
    p.draw = () => {
      p.image(video, 0, 0);
    };
  };
  useEffect(() => {
    let newp5 = new p5(sketch, app.current);

    return () => {
      newp5.remove();
    };
  }, []);
  console.log(modeldata);

  return (
    <div className="App">
      <div ref={app} />
    </div>
  );
}
