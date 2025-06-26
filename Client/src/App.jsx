import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import './App.css'
import UserProfileForm from "./components/UserForm";
import UpdatePasswordForm from "./components/UpdatePasswordform";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/userform" element={<UserProfileForm />} />
          <Route path="/updatepassform" element={<UpdatePasswordForm />} />
          <Route path="*" element={<Navigate to="/userform" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
