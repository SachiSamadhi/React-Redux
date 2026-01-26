import React, { useState } from "react";
import { useRegisterUserMutation } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    nic: "",
    address: "",
    dob: "",
    occupation: "",
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { userName, phone, email, firstName, lastName, nic, address, dob, occupation } = formData;
    if (!userName || !phone || !email || !firstName || !lastName || !nic || !address || !dob || !occupation) {
      alert("Please fill all fields!");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone must be 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await registerUser(formData).unwrap();
      alert(res?.Message || "Registration successful! Please login.");
      setFormData({
        userName: "",
        phone: "",
        email: "",
        firstName: "",
        lastName: "",
        nic: "",
        address: "",
        dob: "",
        occupation: "",
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err?.data?.Message || err?.data?.Result || "Registration failed. Check DB or SP.");
    }
  };

  return (
    <div className="page-container register-page">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="userName" placeholder="Username" value={formData.userName} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} maxLength={10} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="text" name="nic" placeholder="NIC" value={formData.nic} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
        <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} required />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
