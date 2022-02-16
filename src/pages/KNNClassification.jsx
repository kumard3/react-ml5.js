import { useState, useEffect, useRef } from "react";
import ml5 from "ml5";
import p5 from "p5";

export default function KNNClassification() {
  const app = useRef();
  const [modeldata, setModelData] = useState([]);
  let [video, setvideo] = useState();

  let mobilenet;
  console.log(mobilenet);
  const sketch = (p) => {
    function modelReady() {
      console.log("Model is ready!!!");
    }

    p.setup = () => {
      p.createCanvas(600, 500);
      video = p.createCapture(p.VIDEO);
      video.hide();
      p.background(0);
      mobilenet = ml5.featureExtractor("MobileNet", modelReady);
    };
    p.draw = () => {
      p.image(video, 0, 0);
    };

    p.mousePressed = () => {
      console.log("first");
      const logits = mobilenet.infer(video);
      console.log(logits);
    };
  };
  useEffect(() => {
    let newp5 = new p5(sketch, app.current);

    return () => {
      newp5.remove();
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div ref={app} />
      {/* {modeldata?.length >= 2 ? (
            <>
              {modeldata?.map((item, index) => {
                return (
                  <div key={index}>
                    <h2>{item.label}</h2>
                    <h2>{item.confidence}</h2>
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )} */}
    </div>
  );
}
