import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "./useOnClickOutside";

const navData = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Image",
    href: "/image",
  },
  {
    name: "Video",
    href: "/video",
  },
  {
    name: "ObjectDetection",
    href: "/object",
  },
  {
    name: "FeatureExtractor",
    href: "/feature",
  },
];

export default function NavComponent() {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef(null);

  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalOpen(false));

  return (
    <div className=" text-center py-7 text-5xl font-bold ">
      <Link to="/">
        <h1>React ML5</h1>
      </Link>
    </div>
  );
}
