import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../api/auth';

export default function VerifyOTP() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(29);
  const navigate = useNavigate();
  const email = localStorage.getItem('pending_email');

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await verifyOTP(email, code);
      localStorage.setItem('access_token', data.tokens.access);
      localStorage.setItem('refresh_token', data.tokens.refresh);
      localStorage.removeItem('pending_email');
      navigate('/onboarding/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid code.');
    }
  };

  const handleResend = async () => {
    await resendOTP(email);
    setCountdown(29);
  };

  return (
    <div className="page">
      <h1>Check your inbox</h1>
      <p>We sent a 6-digit code to <strong>{email}</strong></p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="------"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Verify &amp; continue</button>
      </form>
      {countdown > 0
        ? <p>Resend code in {countdown}s</p>
        : <button onClick={handleResend}>Resend code</button>
      }
    </div>
  );
}
