import React from "react";
import { Sidebar } from "../Components";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <div className="w-96">
        <Sidebar />
      </div>
      <div className="w-full py-5 pr-7">{children}</div>
    </div>
  );
}
