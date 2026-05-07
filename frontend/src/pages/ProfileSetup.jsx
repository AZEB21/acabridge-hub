import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/auth";
import {
  PageWrap, TopBar, TopLogo, StepLabel, ProgressLine,
  Content, BackBtn, PageTitle, PageSub,
  Label, Input, Select, Textarea, CharCount, Row2,
  PrimaryBtn, GhostBtn, PhotoCircle, PhotoLabel,
} from "../styles/Flow.styles.jsx";
import LogoImg from "../assets/Logo.PNG";

const NATIONALITIES = [
  "Ethiopian", "Nigerian", "Ghanaian", "Kenyan", "South African",
  "Ugandan", "Tanzanian", "Rwandan", "Senegalese", "Other",
];

/* Camera SVG icon */
const CameraIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9aa0b0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

export default function ProfileSetup() {
  const [form, setForm] = useState({
    age: "", nationality: "", location: "", bio: "", career_goal: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const navigate = useNavigate();

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Save profile data to localStorage for the preview page
    localStorage.setItem("profile_data", JSON.stringify(form));
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
      if (photoFile) fd.append("profile_photo", photoFile);
      await updateProfile(fd);
    } catch {
      // endpoint not live yet — continue anyway
    } finally {
      setLoading(false);
      navigate("/onboarding/track");
    }
  };

  return (
    <PageWrap>
      <TopBar>
        <TopLogo src={LogoImg} alt="AcaBridge" />
        <StepLabel>Step 3 of 5</StepLabel>
      </TopBar>
      <ProgressLine $pct="60%" />

      <Content>
        <BackBtn onClick={() => navigate("/verify-otp")}>← Back</BackBtn>

        <PageTitle>Tell us about you</PageTitle>
        <PageSub>This step is optional — you can skip and complete it later.</PageSub>

        {/* Photo upload */}
        <PhotoCircle onClick={() => fileRef.current.click()}>
          {photoPreview
            ? <img src={photoPreview} alt="preview" />
            : <CameraIcon />
          }
        </PhotoCircle>
        <PhotoLabel>Profile photo (optional)</PhotoLabel>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhoto}
        />

        <form onSubmit={handleSubmit}>
          <Row2>
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                placeholder="22"
                value={form.age}
                onChange={set("age")}
                min={16}
                max={60}
                style={{ marginBottom: 14 }}
              />
            </div>
            <div>
              <Label>Nationality</Label>
              <Select value={form.nationality} onChange={set("nationality")} style={{ marginBottom: 14 }}>
                <option value="">Select</option>
                {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
              </Select>
            </div>
          </Row2>

          <Label>Location</Label>
          <Input
            type="text"
            placeholder="City, Country (e.g. Lagos, Nigeria)"
            value={form.location}
            onChange={set("location")}
          />

          <Label>Short bio</Label>
          <Textarea
            placeholder="A sentence or two about yourself"
            maxLength={200}
            value={form.bio}
            onChange={set("bio")}
          />
          <CharCount>{form.bio.length}/200</CharCount>

          <Label>Career goal</Label>
          <Textarea
            placeholder="e.g. Become a Product Manager at a fintech"
            value={form.career_goal}
            onChange={set("career_goal")}
            style={{ marginBottom: 14 }}
          />

          <PrimaryBtn type="submit" disabled={loading}>
            {loading ? "Saving…" : "Continue"}
          </PrimaryBtn>
        </form>

        <GhostBtn onClick={() => { localStorage.setItem("profile_data", JSON.stringify(form)); navigate("/onboarding/track"); }}>
          Skip this step
        </GhostBtn>
      </Content>
    </PageWrap>
  );
}
