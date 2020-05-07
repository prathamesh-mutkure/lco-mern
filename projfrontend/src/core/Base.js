import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Jumbotron from "./components/Jumbotron";

const Base = ({
  title = "Title",
  description = "Description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <NavBar />
    <div className="container-fluid">
      <Jumbotron title={title} description={description} />
      <div className={className}>{children}</div>
    </div>
    <Footer />
  </div>
);

export default Base;
