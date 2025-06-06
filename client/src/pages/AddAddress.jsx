import { useState } from "react";
import InputField from "../components/InputField";
import { assets } from "../assets/assets";

const AddAddress = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved address:", formData);
  };

  return (
    <div className="min-h-[90vh] flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-10 bg-white">
      {/* Form Section */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-3xl font-semibold mb-8">
          Add Shipping <span className="text-primary">Address</span>
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <InputField
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <InputField
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <InputField
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            <InputField
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Zip code"
            />
            <InputField
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>
          <InputField
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dull transition cursor-pointer"
          >
            SAVE ADDRESS
          </button>
        </form>
      </div>

      {/* Illustration */}
      <div className="hidden md:flex w-1/2 justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="w-2/3"
        />
      </div>
    </div>
  );
};

export default AddAddress;
