import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: process.env.NODE_ENV === "development" ? Infinity : 5000,
      refetchOnMount: process.env.NODE_ENV === "development" ? false : true,
      refetchOnWindowFocus:
        process.env.NODE_ENV === "development" ? false : true,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        autoClose={5000}
        newestOnTop={true}
        bodyClassName="toastBody"
        position="top-center"
      />
    </QueryClientProvider>
  </React.StrictMode>
);
//reportWebVitals();
