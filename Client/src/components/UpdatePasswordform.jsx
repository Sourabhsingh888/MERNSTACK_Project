import React, { useState } from "react";
import axios from "axios";
import { BASE_SERVER_URL_BACKEND } from "../utils/Api";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdatePasswordForm = () => {
  const [form, setForm] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
  });

  const [status, setStatus] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "newPassword") {
      const strong =
        value.length >= 8 && /[!@#$%^&*]/.test(value) && /\d/.test(value);
      setPasswordStrength(strong ? "Strong" : "Weak");
    }
  };

  const resetForm = () => {
    setForm({ username: "", currentPassword: "", newPassword: "" });
    setPasswordStrength("");
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL_BACKEND}/api/users/update-password`,
        form
      );
      if (response.data.success) {
          setStatus("Password updated successfully");
          resetForm();
      } else {
        setStatus("Password update failed");
      }
    } catch (err) {
      const message = err.response?.data?.error || "Error updating password";
      setStatus(message);
    }
  };

  return (
    <div className="container mt-5">
      {status && <div className="alert alert-info mt-3">{status}</div>}
      <h3>Update User Password</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            className="form-control"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <div className="form-text">Strength: {passwordStrength}</div>
        </div>

        <button type="submit" className="btn btn-primary mb-2">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
