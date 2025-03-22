import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance
import "./CreateProduct.css";

const CreateProduct = ({ setProducts, products }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [expiration, setExpiration] = useState("");
  const [barcode, setBarcode] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const addProduct = async () => {
    if (!name || !date || !expiration || !barcode) {
      alert("Please fill all fields, including the barcode.");
      return;
    }

    if (new Date(expiration) < new Date(date)) {
      alert("Expiration date cannot be before the product date.");
      return;
    }

    const newProduct = {
      name,
      date,
      expiration,
      barcode,
    };

    try {
      // Store in Firestore
      const docRef = await addDoc(collection(db, "products"), newProduct);
      console.log("Product added with ID: ", docRef.id);

      // Update local state
      setProducts([...products, { id: docRef.id, ...newProduct }]);

      // Clear inputs
      setName("");
      setDate("");
      setExpiration("");
      setBarcode("");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <div className="create-product-container">
      <h1 className="form-title">➕ Add New Product</h1>
      <div className="form">
        <label>Product Name</label>
        <input 
          className="input-field" 
          placeholder="Enter product name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        
        <label>Manufacturing Date</label>
        <input 
          className="input-field" 
          type="date" 
          value={date} 
          min={today} 
          onChange={(e) => setDate(e.target.value)} 
        />
        
        <label>Expiration Date</label>
        <input 
          className="input-field" 
          type="date" 
          value={expiration} 
          min={date || today} 
          onChange={(e) => setExpiration(e.target.value)} 
        />

        <label>Barcode Number</label>
        <input 
          className="input-field" 
          placeholder="Enter barcode (required)" 
          value={barcode} 
          onChange={(e) => setBarcode(e.target.value)} 
        />

        <button className="add-button" onClick={addProduct}>
          ✅ Add Product
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
