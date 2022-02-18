import React, { useEffect, useRef } from "react";
import ml5 from "ml5";
import p5 from  "p5";
// import "p5/lib/addons/p5.sound.js";

import { model_url } from "../data";

export default function PitchDetection() {
  const app = useRef();
  let pitch;
  let mic;
  let audioContext;

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(400, 400);
      audioContext = p.getAudioContext();
      mic = new p5.AudioIn();
      mic.start(listening);
      pitch = ml5.pitchDetection(
        model_url,
        audioContext,
        mic.stream,
        modelLoaded
      );
    };
    function listening() {
      console.log("first");
    }
    function modelLoaded() {
      console.log("model Loading...");
    }
    p.draw = () => {
      p.background(220);
    };
  };
  useEffect(() => {
    let newp5 = new p5(sketch, app.current);
    return () => {
      newp5.remove();
    };
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <div ref={app} />
    </div>
  );
}
