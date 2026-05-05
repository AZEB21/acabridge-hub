import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../api/auth';

const NATIONALITIES = [
  'Nigerian', 'Ghanaian', 'Kenyan', 'South African',
  'Ethiopian', 'Ugandan', 'Tanzanian', 'Rwandan', 'Other',
];

export default function ProfileSetup() {
  const [form, setForm] = useState({ age: '', nationality: '', location: '', bio: '', career_goal: '' });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
    if (photo) fd.append('profile_photo', photo);
    try {
      await updateProfile(fd);
      navigate('/onboarding/track');
    } catch (err) {
      setError('Failed to save profile.');
    }
  };

  const handleSkip = () => navigate('/onboarding/track');

  return (
    <div className="page">
      <h1>Tell us about you</h1>
      <p>This step is optional — you can skip and complete it later.</p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <select value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })}>
          <option value="">Nationality</option>
          {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
        </select>
        <input
          type="text"
          placeholder="City, Country (e.g. Lagos, Nigeria)"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <textarea
          placeholder="Short bio (max 200 chars)"
          maxLength={200}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <textarea
          placeholder="Career goal"
          value={form.career_goal}
          onChange={(e) => setForm({ ...form, career_goal: e.target.value })}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Continue</button>
      </form>
      <button onClick={handleSkip}>Skip this step</button>
    </div>
  );
}
