import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import ml5 from "ml5";
export default function PoseNet() {
  const app = useRef();
  let video;
  let posenet;
  let pose;
  let skeleton;
  const sketch = (p) => {
    let mobilenet;

    p.setup = () => {
      p.createCanvas(640, 500);
      video = p.createCapture(p.VIDEO);
      video.hide();
      p.background(0);
      posenet = ml5.poseNet(video, modelLoaded);
      posenet.on("pose", gotPoses);
    };
    function gotPoses(poses) {
      //   console.log(poses);
      if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
      }
    }

    function modelLoaded() {
      console.log("loaded");
    }
    // console.log(skeleton,"skeleton")
    p.draw = () => {
      p.image(video, 0, 0);
      // console.log(skeleton,"skeleton")

      if (pose) {
        p.fill(255, 0, 0);
        // p.ellipse(pose.nose.x, pose.nose.y,64);
        // p.ellipse(pose.leftEar.x, pose.leftEar.y,24);
        // p.ellipse(pose.rightEar.x, pose.rightEar.y,24);
        // p.ellipse(pose.leftShoulder.x, pose.leftShoulder.y,24);
        // p.ellipse(pose.rightShoulder.x, pose.rightShoulder.y,24);
        for (let i = 0; i < pose.keypoints.length; i++) {
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          p.fill(0, 255, 0);
          p.ellipse(x, y, 16, 16);
        }

        for (let i = 0; i < skeleton.length; i++) {
          let a = skeleton[i][0];
          let b = skeleton[i][1];
          p.strokeWeight(2);
          p.stroke(255);
          p.line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
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
    <div className="flex justify-center flex-col items-center w-full">
      <div ref={app} />
    </div>
  );
}
