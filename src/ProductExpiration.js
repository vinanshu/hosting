import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Ensure this is your Firestore config
import { collection, getDocs } from "firebase/firestore";
import "./ProductExpiration.css";

const ProductExpiration = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products")); // Fetch products from Firestore
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const today = new Date().setHours(0, 0, 0, 0);

  // Filter expired products
  const expiredProducts = products.filter(product => {
    if (!product.expiration) return false;
    const expDate = new Date(product.expiration).setHours(0, 0, 0, 0);
    return expDate <= today;
  });

  // Sort expired products by expiration date (earliest expired first)
  const sortedExpiredProducts = expiredProducts.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));

  return (
    <div className="expired-container">
      <h1 className="expired-title">⚠️ Expired Products</h1>
      {loading ? (
        <p>Loading expired products...</p>
      ) : sortedExpiredProducts.length > 0 ? (
        <div className="product-list">
          {sortedExpiredProducts.map((product, index) => (
            <div key={product.id} className="product-card">
              <h2 className="product-name">{product.name}</h2>
              <p><strong>ID:</strong> {index + 1}</p>
              <p><strong>Manufactured:</strong> {product.date}</p>
              <p className="expired-date">
                <strong>Expired:</strong> {product.expiration} ❌
              </p>
              <p><strong>Barcode:</strong> {product.barcode || "N/A"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-expired">✅ No expired products.</p>
      )}
    </div>
  );
};

export default ProductExpiration;
