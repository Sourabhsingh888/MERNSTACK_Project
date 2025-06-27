import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_SERVER_URL_BACKEND } from "../utils/Api";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
    customGender: "",
    profession: "Student",
    companyName: "",
    addressLine1: "",
    country: "",
    state: "",
    city: "",
    subscriptionPlan: "Basic",
    newsletter: true,
    dob: "",
    profilePhoto: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [status, setStatus] = useState("");
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_SERVER_URL_BACKEND}/api/location/countries`)
      .then((res) => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (formData.country) {
      axios
        .get(
          `${BASE_SERVER_URL_BACKEND}/api/location/states/${formData.country}`
        )
        .then((res) => setStates(res.data));
      setFormData({ ...formData, state: "", city: "" });
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      axios
        .get(
          `${BASE_SERVER_URL_BACKEND}/api/location/cities/${formData.state}`
        )
        .then((res) => setCities(res.data));
      setFormData({ ...formData, city: "" });
    }
  }, [formData.state]);

  const validateUsername = (value) => {
    if (!value) return "Username is required";
    if (value.length < 4 || value.length > 20) return "Must be 4–20 characters";
    if (/\s/.test(value)) return "No spaces allowed";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const updatedValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    if (name === "profilePhoto" && files[0]) {
      setPreviewImage(URL.createObjectURL(files[0]));
    }

    if (name === "gender" && value !== "Other") {
      setFormData({ ...formData, gender: value, customGender: "" });
    } else if (name === "customGender") {
      setFormData({ ...formData, gender: value, customGender: value });
    } else {
      setFormData({ ...formData, [name]: updatedValue });
    }

    if (name === "username") {
      const error = validateUsername(value);
      setUsernameError(error);

      if (!error) {
        axios
          .get(
            `${BASE_SERVER_URL_BACKEND}/api/users/check-username?username=${value}`
          )
          .then((res) => {
            setUsernameAvailable(res.data.available);
          });
      } else {
        setUsernameAvailable(null);
      }
    }

    if (name === "password") {
      const strong =
        value.length >= 8 && /[!@#$%^&*]/.test(value) && /\d/.test(value);
      setPasswordStrength(strong ? "Strong" : "Weak");
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      gender: "Male",
      customGender: "",
      profession: "Student",
      companyName: "",
      addressLine1: "",
      country: "",
      state: "",
      city: "",
      subscriptionPlan: "Basic",
      newsletter: true,
      dob: "",
      profilePhoto: null,
    });
    setPreviewImage(null);
  };
  
    
  const handleFinalSubmit = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post(
        `${BASE_SERVER_URL_BACKEND}/api/users/submit-user`,
        data
      );
        setStatus("Form submitted successfully!");
        resetForm();
      setShowPreview(false);
    } catch (err) {
        setStatus("Error submitting form");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Multi-Step User Profile Update Form</h2>
      {status && <div className="alert alert-info mt-3">{status}</div>}
      {!showPreview ? (
        <form onSubmit={handlePreview} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Profile Photo</label>
            <input
              type="file"
              className="form-control"
              name="profilePhoto"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {/* Show username format validation error */}
            {usernameError && (
              <div className="text-danger mt-1">{usernameError}</div>
            )}

            {/* Show availability message only if no validation error */}
            {!usernameError && usernameAvailable === false && (
              <div className="text-danger mt-1">Username not available</div>
            )}
            {!usernameError && usernameAvailable === true && (
              <div className="text-success mt-1">Username available</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              name="gender"
              value={
                formData.gender === "Male" || formData.gender === "Female"
                  ? formData.gender
                  : "Other"
              }
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {formData.gender !== "Male" && formData.gender !== "Female" && (
            <div className="mb-3">
              <label className="form-label">Custom Gender</label>
              <input
                type="text"
                className="form-control"
                name="customGender"
                value={formData.customGender}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <div className="form-text">
              Password strength: {passwordStrength}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Profession</label>
            <select
              className="form-select"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
            >
              <option value="Student">Student</option>
              <option value="Developer">Developer</option>
              <option value="Entrepreneur">Entrepreneur</option>
            </select>
          </div>

          {formData.profession === "Entrepreneur" && (
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Country</label>
            <select
              className="form-select"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                -- Select Country --
              </option>
              {countries.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">State</label>
            <select
              className="form-select"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                -- Select State --
              </option>
              {states.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <select
              className="form-select"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                -- Select City --
              </option>
              {cities.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              max={new Date().toISOString().split("T")[0]}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Subscription Plan</label>
            <div>
              {["Basic", "Pro", "Enterprise"].map((plan) => (
                <div className="form-check" key={plan}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="subscriptionPlan"
                    value={plan}
                    checked={formData.subscriptionPlan === plan}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">{plan}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Subscribe to newsletter</label>
          </div>

          <button type="submit" className="btn btn-primary">
            Preview
          </button>
        </form>
      ) : (
        <div className="mt-4">
          <h4>Preview Information</h4>
          <ul className="list-group">
            <li className="list-group-item">Username: {formData.username}</li>
            <li className="list-group-item">Gender: {formData.gender}</li>
            <li className="list-group-item">
              Profession: {formData.profession}
            </li>
            {formData.profession === "Entrepreneur" && (
              <li className="list-group-item">
                Company: {formData.companyName}
              </li>
            )}
            <li className="list-group-item">
              Address: {formData.addressLine1}
            </li>
            <li className="list-group-item">DOB: {formData.dob}</li>
            <li className="list-group-item">
              Subscription Plan: {formData.subscriptionPlan}
            </li>
            <li className="list-group-item">
              Newsletter: {formData.newsletter ? "checked" : "Not checked"}
            </li>
          </ul>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="img-thumbnail mt-3"
              style={{ maxWidth: "200px" }}
            />
          )}
          <button className="btn btn-success mt-3" onClick={handleFinalSubmit}>
            Confirm & Submit
          </button>
          <button
            className="btn btn-secondary mt-3 ms-2"
            onClick={() => setShowPreview(false)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileForm;