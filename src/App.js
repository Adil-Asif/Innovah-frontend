
import HomePage from "./views/HomePage/HomePage";
import InventoryManagement from "./views/ProjectManagement/InventoryManagement";
import Routers from "./routes/routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return( <>
  <BrowserRouter>
 <Routers/>
 </BrowserRouter>
  </>
  )
}

export default App;
