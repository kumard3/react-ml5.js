import React from "react";
import { Link } from "react-router-dom";
export default function Card(props) {
  return (
    <Link to={props.link} className="m-4 ">
      <div className="bg-slate-800 border-2 hover:shadow-slate-700 hover:shadow-lg border-slate-500 max-w-md flex flex-col justify-center items-center p-10 rounded-3xl">
        <div>
          <h1 className="text-4xl">{props.title}</h1>
        </div>
        <h2 className="text-xl pt-5">{props.description}</h2>
      </div>
    </Link>
  );
}
