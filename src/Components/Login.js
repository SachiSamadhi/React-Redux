import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendOtpMutation, useLoginUserMutation } from "../services/apiSlice";
import "./Login.css";

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const [sendOtp] = useSendOtpMutation();
  const [loginUser] = useLoginUserMutation();

  const handleSendOtp = async () => {
    if (!phone.trim()) return alert("Enter phone number");

    const generatedOtp = 1234; // demo
    try {
      await sendOtp({ phone, otpCode: generatedOtp }).unwrap();
      setOtpSent(true);
      alert(`OTP sent: ${generatedOtp}`);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const handleLogin = async () => {
    if (!otp.trim()) return alert("Enter OTP");

    try {
      const res = await loginUser({ phone, otpCode: Number(otp) }).unwrap();

      setIsLoggedIn(true);

      if (res?.User?.RoleName?.toLowerCase() === "admin") setIsAdmin(true);
      else setIsAdmin(false);

      alert(res?.Message || "Login successful");
      navigate("/dashboard");
    } catch {
      alert("Invalid OTP or login failed");
    }
  };

  return (
    <div className="page-container login-page">
      <h1>Login</h1>

      {!otpSent ? (
        <>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" maxLength={10} />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" maxLength={6} />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default Login;
