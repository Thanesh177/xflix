// src/PasscodeGate.js
import React, { useState } from 'react';
import './PasscodeGate.css';

function PasscodeGate({ children, correctPasscode = "1772" }) {
  const [enteredPasscode, setEnteredPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // When the input changes, update the passcode and check if it matches.
  const handleChange = (e) => {
    const value = e.target.value;
    setEnteredPasscode(value);
    if (value === correctPasscode) {
      setIsAuthenticated(true);
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="passcode-gate-container">
      <div className="passcode-gate-panel">
        <h2 className="passcode-title">Access Portal</h2>
        <p className="passcode-instruction">
          Enter your passcode to access the system
        </p>
        <input
          type="password"
          value={enteredPasscode}
          onChange={handleChange}
          placeholder="••••••"
          className="passcode-input"
        />
      </div>
    </div>
  );
}

export default PasscodeGate;