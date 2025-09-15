import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./pages/Route";
import ReactQueryProvider from "./contexts/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <BrowserRouter>
      <ReactQueryProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <AppRoutes />
      </ReactQueryProvider>
    </BrowserRouter>
  );
}

export default App;
