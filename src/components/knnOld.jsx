import { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import p5 from "p5";

let video;
let mobilenet;
let knn;

export default function KNNold() {
  const [ready, setReady] = useState(false);
  const [labels, setLabels] = useState("Need tranning Data");


  const app = useRef();

  const sketch = (p) => {
    function modelReady() {
      console.log("Model is ready!!!");
    }

    function goClassify() {
      const logits = mobilenet.infer(video);
      knn.classify(logits, function (error, results) {
        if (error) {
          console.error(error);
        } else {
          setLabels(results.label);
          goClassify()
        }
      });
    }

    p.setup = () => {
      p.createCanvas(600, 480);
      video = p.createCapture(p.VIDEO);
      video.hide();
      p.background(0);
      mobilenet = ml5.featureExtractor("MobileNet", modelReady);
      knn = ml5.KNNClassifier();
    };

    p.draw = () => {
      p.image(video, 0, 0);
      if (!ready && knn.getNumLabels() > 0) {
        goClassify();
        setReady(true);
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
  function modelSave() {
    knn.save('model.json', function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('model saved');
      }
    });
  }
  useEffect(() => {
    let newp5 = new p5(sketch, app.current);
    return () => {
      newp5.remove();
    };
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <div ref={app} />
      <h1 className="text-xl">{labels} </h1>
      <button onClick={modelSave} className=" text-white text-3xl px-5 py-3 rounded-xl bg-slate-700 ">save ML5</button>
    </div>
  );
}
