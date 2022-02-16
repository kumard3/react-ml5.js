import { useState, useEffect, useRef } from "react";
import ml5 from "ml5";
import p5 from "p5";

export default function FeatureExtractor() {
  const app = useRef();
  const [modeldata, setModelData] = useState([]);
  let [video, setvideo] = useState(); 

  const sketch = (p) => {
    let mobilenet;

    function modelReady() {
      console.log("Model is ready!!!");
      // mobilenet.predict(video, gotResults);
    }

    function gotResults(error, results) {
      if (error) {
        console.error(error);
      } else {
        setModelData(results);
        mobilenet.predict(video, gotResults);
      }
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
