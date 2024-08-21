import Home from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sales from "./components/Sales"
import SalesGrowth from "./components/SalesGrowth";
import NewCustomers from "./components/NewCustomers";
import RepeatCustomers from "./components/RepeatCustomers";
import GeographicalDistribution from "./components/GeographicalDistribution";
import Clv from "./components/Clv";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/salesgrowth" element={<SalesGrowth />} />
        <Route path="/newcustomers" element={<NewCustomers />} />
        <Route path="/repeatcustomers" element={<RepeatCustomers />} />
        <Route path="/clv" element={<Clv />} />
        <Route path="/gd" element={<GeographicalDistribution />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
