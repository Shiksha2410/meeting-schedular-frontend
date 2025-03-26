import React from "react";
import ReactDOM from "react-dom/client";

const TestComponent = () => <h1>Test Component Rendered</h1>;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TestComponent />
  </React.StrictMode>
);
