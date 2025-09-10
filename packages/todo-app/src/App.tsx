import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./pages/Route";
import ReactQueryProvider from "./contexts/ReactQueryProvider";

function App() {
  return (
    <BrowserRouter>
      <ReactQueryProvider>
        <AppRoutes />
      </ReactQueryProvider>
    </BrowserRouter>
  );
}

export default App;
