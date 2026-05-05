import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTracks, submitApplication } from '../api/auth';

export default function ChooseTrack() {
  const [cohort, setCohort] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getTracks().then(({ data }) => {
      setCohort(data.cohort);
      setTracks(data.tracks);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!selectedTrack) return setError('Please select a track.');
    try {
      await submitApplication(Number(selectedTrack));
      navigate('/application/status');
    } catch (err) {
      setError('Failed to submit application.');
    }
  };

  return (
    <div className="page">
      <h1>Choose your training track</h1>
      <p>You're applying to the current cohort at Africa Agility.</p>
      <form onSubmit={handleSubmit}>
        <div className="input-locked">
          <span>{cohort?.name || 'Loading...'}</span>
          <span>🔒</span>
        </div>
        <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)} required>
          <option value="">Select a track</option>
          {tracks.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit application</button>
      </form>
    </div>
  );
}
