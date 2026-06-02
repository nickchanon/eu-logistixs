// Set dark class immediately before React hydrates — prevents flash
document.documentElement.classList.add("dark");

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
