import Home from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sales from "./components/Sales"
import SalesGrowth from "./components/SalesGrowth";
import NewCustomers from "./components/NewCustomers";
import RepeatCustomers from "./components/RepeatCustomers";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
