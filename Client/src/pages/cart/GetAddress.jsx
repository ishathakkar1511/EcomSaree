import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddressContext } from "../../context/AddressContext";

const GetAddress = () => {
  const navigate = useNavigate();
  const { addresses, addAddress } = useAddressContext();

  const [formData, setFormData] = useState({
    country: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    altPhone: "",
    isDefault: addresses.length === 0, // Default to true if no addresses
  });

  // Update isDefault if addresses change (optional safety)
  useEffect(() => {
    if (addresses.length === 0) {
      setFormData((prev) => ({ ...prev, isDefault: true }));
    }
  }, [addresses]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAddress(formData);
      navigate("/checkout");
    } catch (err) {
      console.error("Failed to save address:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Add New Address
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              required
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              required
            />
            <input
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              placeholder="Apartment"
              className="p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              required
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              required
            />
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              required
            />
          </div>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-3 border border-pink-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
            required
          />

          <input
            name="altPhone"
            value={formData.altPhone}
            onChange={handleChange}
            placeholder="Alternate Phone"
            className="p-3 border border-pink-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">
              Set as Default Address
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-8 py-2 rounded-lg transition duration-300 shadow-md"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetAddress;
