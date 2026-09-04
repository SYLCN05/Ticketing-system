import { Route, Routes } from "react-router-dom";
import { Tickets } from "./Tickets";
export function Home() {
  return (
    <div>
      <div className="flex items-center justify-center bg-[url(/Backgroundhome.jpg)] w-full h-140 bg-cover brightness-100">
        <div className=" flex flex-col text-lg text-white font-mono w-2xl h-50 justify-between text-center">
          <h2 className="text-6xl">Ticketing System</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            voluptatem quia enim eum quidem quisquam ea est officia nostrum
            nisi.
          </p>
        </div>
      </div>
    </div>
  );
}
