import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import CreateProduct from "./CreateProduct";
import ProductExpiration from "./ProductExpiration";
import "./styles.css"; // Import the global styles

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="nav-logo">Product Manager</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">🏠 Home</Link>
            <Link to="/create" className="nav-link">➕ Create</Link>
            <Link to="/expiration" className="nav-link">📅 Expiration</Link>
          </div>
        </nav>

        {/* Page Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/create" element={<CreateProduct setProducts={setProducts} products={products} />} />
            <Route path="/expiration" element={<ProductExpiration products={products} />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 Product Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
