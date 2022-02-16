import { useEffect, useRef } from "react";
import ml5 from "ml5";
import p5 from "p5";

export default function KNNClassification() {
  const app = useRef();

  let video;
  let mobilenet;
  let knn;
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
      knn = ml5.KNNClassifier();
    };
    p.draw = () => {
      p.image(video, 0, 0);
    };
    function gotResults(error, results) {
      if (error) {
        console.error(error);
      } else {
        console.log(results);
      }
    }
    p.mousePressed = () => {
      if (knn.getNumLabels() > 0) {
        const logits = mobilenet.infer(video);
        knn.classify(logits, gotResults);
      }
    };

    p.keyPressed = () => {
      const logits = mobilenet.infer(video);
      if (p.key === "l") {
        knn.addExample(logits, "left");
        console.log("left");
      } else if (p.key === "r") {
        knn.addExample(logits, "right");
        console.log("right");
      }
    };
  };
  useEffect(() => {
    let newp5 = new p5(sketch, app.current);

    return () => {
      newp5.remove();
    };
  }, []);
  // console.log(knn)
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
