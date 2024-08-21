import Home from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sales from "./components/Sales"
import SalesGrowth from "./components/SalesGrowth";
import NewCustomers from "./components/NewCustomers";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/salesgrowth" element={<SalesGrowth />} />
        <Route path="/newcustomers" element={<NewCustomers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
