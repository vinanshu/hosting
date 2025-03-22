import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance
import "./Home.css"; // Import the external CSS file

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Reference to the Firestore collection
    const productsRef = collection(db, "products");

    // Real-time listener for Firestore data
    const unsubscribe = onSnapshot(query(productsRef), (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter active (not expired) products
  const activeProducts = products.filter((product) => {
    if (!product.expiration) return false; // Ignore if expiration date is missing
    const expDate = new Date(product.expiration);
    expDate.setHours(0, 0, 0, 0);
    return expDate > today;
  });

  // Sort products by manufacturing date (oldest first)
  const sortedProducts = [...activeProducts].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="home-container">
      <h1 className="title">Product Details</h1>

      {/* Product List */}
      {sortedProducts.length > 0 ? (
        <div className="product-grid">
          {sortedProducts.map((product) => {
            const expDate = new Date(product.expiration);
            expDate.setHours(0, 0, 0, 0);
            const daysLeft = (expDate - today) / (1000 * 60 * 60 * 24);

            // Determine Expiry Class
            let expiryClass = "safe"; // Default green
            let expiryMessage = "✅ Good to use";

            if (daysLeft <= 3) {
              expiryClass = "danger"; // Red (3 or less days)
              expiryMessage = "⚠️ Expiring Soon!";
            } else if (daysLeft <= 6) {
              expiryClass = "warning"; // Orange (4-6 days)
              expiryMessage = "⚠️ Expiring in a few days!";
            }

            return (
              <div key={product.id} className={`product-card ${expiryClass}`}>
                <h2 className="product-name">{product.name}</h2>
                <p className="product-detail">ID: {product.id}</p>
                <p className="product-detail">Manufacturing Date: {product.date}</p>
                <p className="product-detail">Expiration Date: {product.expiration}</p>
                <p className="product-detail">
                  Barcode: <span className="barcode">{product.barcode || "N/A"}</span>
                </p>
                <p className="expiring-text">{expiryMessage}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-products">No active products available.</p>
      )}
    </div>
  );
};

export default Home;
