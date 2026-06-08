import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageWrap, TopBar, TopLogo, StepLabel, ProgressLine,
  Content, BackBtn, PageTitle, PageSub,
  Label, Select, PrimaryBtn, ErrorMsg, LockedField,
} from "../styles/Flow.styles.jsx";
import styled from "styled-components";
import LogoImg from "../assets/Logo.PNG";
import { submitApplication, getTracks } from "../api/auth";
import { useEffect } from "react";

const SubNote = styled.p`
  font-size: 12px;
  color: #aaa;
  margin: -10px 0 14px;
`;

export default function ChooseTrack() {
  const [selectedTrack, setSelectedTrack] = useState("");
  const [tracks, setTracks] = useState([
    "Product Management",
    "Software Engineering",
    "Data Analytics",
    "UI/UX Design",
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Try to load tracks from the API; fall back to the static list if not available
  useEffect(() => {
    getTracks()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          setTracks(data.map((t) => (typeof t === "string" ? t : t.name)));
        }
      })
      .catch(() => {
        // keep the static fallback list
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTrack) {
      setError("Please select a track to continue.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await submitApplication(selectedTrack);
      localStorage.setItem("selected_track", selectedTrack);
      navigate("/application/status");
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to submit application. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrap>
      <TopBar>
        <TopLogo src={LogoImg} alt="AcaBridge" />
        <StepLabel>Step 4 of 5</StepLabel>
      </TopBar>
      <ProgressLine $pct="80%" />

      <Content>
        <BackBtn onClick={() => navigate("/onboarding/profile")}>← Back</BackBtn>

        <PageTitle>Choose your training track</PageTitle>
        <PageSub>You're applying to the current cohort at Africa Agility.</PageSub>

        <form onSubmit={handleSubmit}>
          <Label>Cohort</Label>
          <LockedField>
            <span>Cohort 9.0</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </LockedField>
          <SubNote>You're joining the current cohort.</SubNote>

          <Label>Training track</Label>
          <Select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
          >
            <option value="">Select a track</option>
            {tracks.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <PrimaryBtn type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Submit application"}
          </PrimaryBtn>
        </form>
      </Content>
    </PageWrap>
  );
}
