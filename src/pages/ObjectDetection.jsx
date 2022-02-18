import { useState, useEffect, useRef } from "react";
import ml5 from "ml5";
import p5 from "p5";

let detector;
let detections = [];
let video;

export default function ObjectDetection() {
  const app = useRef();
  const sketch = (p) => {
    function videoReady() {
      // Models available are 'cocossd', 'yolo'
      detector = ml5.objectDetector("cocossd", modelReady);
    }

    function gotDetections(error, results) {
      if (error) {
        console.error(error);
      }
      detections = results;
      detector.detect(video, gotDetections);
    }

    function modelReady() {
      detector.detect(video, gotDetections);
    }

    p.setup = () => {
      p.createCanvas(640, 480);
      video = p.createCapture(p.VIDEO, videoReady);
      video.size(640, 480);
      video.hide();
    };
    p.draw = () => {
      p.image(video, 0, 0);

      for (let i = 0; i < detections.length; i += 1) {
        const object = detections[i];
        p.stroke(0, 255, 0);
        p.strokeWeight(4);
        p.noFill();
        p.rect(object.x, object.y, object.width, object.height);
        p.noStroke();
        p.fill(255);
        p.textSize(24);
        p.text(object.label, object.x + 10, object.y + 24);
      }
    };
  };
  useEffect(() => {
    let newp5 = new p5(sketch, app.current);
    return () => {
      newp5.remove();
    };
  }, []);
  return (
    <div className="App">
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
