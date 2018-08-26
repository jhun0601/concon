import React from "react";

export default () => {
  return (
    <footer className="fp bg-secondary text-white mt-5 p-4 text-center">
      <div className="container">
        Copyright &copy; {new Date().getFullYear()} ConCon
      </div>
    </footer>
  );
};
