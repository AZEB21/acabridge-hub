import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../api/auth';
import { Country } from 'country-state-city';

const africanCountryCodes = [
  "DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD",
  "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "SZ", "ET",
  "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG",
  "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW",
  "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG",
  "TN", "UG", "ZM", "ZW"
];

const NATIONALITIES = [
  ...Country.getAllCountries()
    .filter(country => africanCountryCodes.includes(country.isoCode))
    .map(country => country.name)
    .sort(),
  "Other"
];

export default function ProfileSetup() {
  const [form, setForm] = useState({ age: '', nationality: '', location: '', bio: '', career_goal: '' });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [otherNationality, setOtherNationality] = useState('');

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
console.log(Country.getAllCountries());
console.log(JSON.stringify(NATIONALITIES, null, 2));
console.log(
  NATIONALITIES.length
);

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
        <select
            value={form.nationality}
            onChange={(e) =>
                setForm({
                    ...form,
                    nationality: e.target.value
                })
            }
        >
            <option value="">Nationality</option>

            {NATIONALITIES.map((country) => (
                <option
                    key={country}
                    value={country}
                >
                    {country}
                </option>
            ))}
        </select>
        {form.nationality === 'Other' && (
          <input
            type="text"
            placeholder="Enter your nationality"
            value={otherNationality}
            onChange={(e) => setOtherNationality(e.target.value)}
          />
        )}
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
