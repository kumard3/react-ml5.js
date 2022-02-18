import React, { useState, useEffect, useRef } from "react";
import ml5 from "ml5";
import p5 from "p5";

export default function PitchDetection() {
  const app = useRef();

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(600, 500);
    };

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
