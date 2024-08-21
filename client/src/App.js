import Home from "./pages/Home.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sales from "./components/Sales.jsx"
import SalesGrowth from "./components/SalesGrowth.jsx";
import NewCustomers from "./components/NewCustomers.jsx";
import RepeatCustomers from "./components/RepeatCustomers.jsx";
import GeographicalDistribution from "./components/GeographicalDistribution.jsx";
import Clv from "./components/Clv.jsx";
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
