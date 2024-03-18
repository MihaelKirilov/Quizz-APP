import "./style.css"

import React from "react"

export default function Footer() {
  return (
    <footer className="footer">
      {/* <small> */}
        Created by{" "}
        <a
          className="footer-link underline-animation" 
          href="https://github.com/MihaelKirilov" target="_blank">
          Mihael Kirilov
        </a>
      {/* </small> */}
    </footer>
  )
}