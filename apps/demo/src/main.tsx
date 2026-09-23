import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { enableBrowserThemeSurface } from "@sealwax/zcode-ui-theme";
import App from "./App";
import "./styles.css";

enableBrowserThemeSurface();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
