import { useState } from "react";
import { predictPrice } from "../api";

function PriceForm() {
  const [form, setForm] = useState({});
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrice(null);
    const result = await predictPrice(form);
    setPrice(result);
    setLoading(false);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Car Price Prediction</h2>

      <select name="Company" onChange={handleChange} required>
        <option value="">Select Company</option>
        <option value="BMW">BMW</option>
        <option value="Toyota">Toyota</option>
        <option value="Ford">Ford</option>
        <option value="Chevrolet">Chevrolet</option>
      </select>

      <select name="Transmission" onChange={handleChange} required>
        <option value="">Transmission</option>
        <option value="Auto">Auto</option>
        <option value="Manual">Manual</option>
      </select>

      <select name="Body Style" onChange={handleChange} required>
        <option value="">Body Style</option>
        <option value="SUV">SUV</option>
        <option value="Sedan">Sedan</option>
        <option value="Hatchback">Hatchback</option>
      </select>

      <input
        type="number"
        name="Annual Income"
        placeholder="Annual Income"
        onChange={handleChange}
        required
      />

      <button type="submit">
        {loading ? "Predicting..." : "Predict Price"}
      </button>

      {price && <h3>Predicted Price: ${price}</h3>}
    </form>
  );
}

export default PriceForm;
