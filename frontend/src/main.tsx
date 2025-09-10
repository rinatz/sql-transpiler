import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { App } from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: 必ず #root が存在する前提なので null チェックはしない
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
