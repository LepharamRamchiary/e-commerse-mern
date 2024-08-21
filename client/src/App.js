import Home from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sales from "./components/sales"
import SalesGrowth from "./components/SalesGrowth";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/salesgrowth" element={<SalesGrowth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
