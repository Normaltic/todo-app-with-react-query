import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./pages/Route";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
