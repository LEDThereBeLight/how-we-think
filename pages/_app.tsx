import "@code-hike/mdx/dist/index.css"
import React from "react"
import "./reset.css"
import "./style.scss"

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  )
}
