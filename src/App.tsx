import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/tanstack";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
