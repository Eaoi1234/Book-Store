import React from "react";

function Footer() {
  return (
    <footer className=" bg-gray-800 text-center py-4 mt-auto text-white">
      <p>&copy;{new Date().getFullYear()} CopyRight 2021</p>
    </footer>
  );
}

export default Footer;