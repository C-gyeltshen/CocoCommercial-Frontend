import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./ProductListing/page";
import ProductCreation1 from "./ProductCreation_1/page";
import ProductCreation2 from "./ProductCreation_2/page";
import ProductCreation3 from "./ProductCreation_3/page";
import ProductCreation4 from "./ProductCreation_4/page";
import ProductCreation5 from "./ProductCreation_5/page";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ProductCreation_1" element={<ProductCreation1/>} />
        <Route path="/" element={<ProductCreation1 />} />
        <Route path="/ProductCreation_2" element={<ProductCreation2 />} />
        <Route path="/ProductCreation_3" element={<ProductCreation3 />} />
        <Route path="/ProductCreation_4" element={<ProductCreation4 />} />
        <Route path="/ProductCreation_5" element={<ProductCreation5 />} />
      </Routes>
    </Router>
  );
};

export default App;
