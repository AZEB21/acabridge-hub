import { useState, useEffect } from "react";
import styled from "styled-components";
import { createAdminCohort, getTracks } from "../api/auth";

/* ── Overlay & Modal ── */
const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999; padding: 20px;
`;
const Modal = styled.div`
  background: #fff; border-radius: 16px; padding: 28px 28px 24px;
  width: min(100%, 560px); max-height: 90vh; overflow-y: auto;
  box-shadow: 0 16px 48px rgba(0,0,0,0.18);
`;
const ModalHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
`;
const ModalTitle = styled.h2`font-size: 18px; font-weight: 700; color: #111827; margin: 0;`;
const CloseBtn = styled.button`
  width: 28px; height: 28px; border-radius: 50%; border: none;
  background: #f3f4f6; color: #dc2626; cursor: pointer; font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  &:hover { background: #fee2e2; }
`;

/* ── Form elements ── */
const Form = styled.form`display: flex; flex-direction: column; gap: 16px;`;
const FormGroup = styled.div`display: flex; flex-direction: column; gap: 6px;`;
const Label = styled.label`
  font-size: 13px; font-weight: 600; color: #374151;
  span { color: #dc2626; }
`;
const Input = styled.input`
  height: 44px; border: 1.5px solid #d1d5db; border-radius: 10px;
  padding: 0 14px; font-size: 14px; outline: none; box-sizing: border-box; width: 100%;
  &:focus { border-color: #0b3d91; }
`;
const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
`;

/* ── Track chips ── */
const TrackGrid = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;
`;
const TrackChip = styled.button`
  padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 500;
  cursor: pointer; transition: all 0.15s; border: 1.5px solid;
  border-color: ${({ $selected }) => $selected ? "#0b3d91" : "#d1d5db"};
  background: ${({ $selected }) => $selected ? "#e8efff" : "#fff"};
  color: ${({ $selected }) => $selected ? "#0b3d91" : "#6b7280"};
  &:hover { border-color: #0b3d91; color: #0b3d91; }
`;
const AddTrackBtn = styled.button`
  padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 600;
  cursor: pointer; border: 1.5px dashed #0b3d91; background: none; color: #0b3d91;
  &:hover { background: #e8efff; }
`;

/* ── Error & Submit ── */
const ErrorMsg = styled.p`color: #dc2626; font-size: 13px; margin: 0;`;
const SubmitBtn = styled.button`
  width: 100%; height: 48px; border: none; border-radius: 10px;
  background: #0b3d91; color: #fff; font-size: 15px; font-weight: 700;
  cursor: pointer; margin-top: 4px;
  &:disabled { opacity: 0.65; cursor: not-allowed; }
  &:hover:not(:disabled) { opacity: 0.9; }
`;

/* ── Success modal ── */
const SuccessOverlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center; z-index: 10000;
`;
const SuccessModal = styled.div`
  background: #fff; border-radius: 20px; padding: 48px 36px 36px;
  text-align: center; width: min(90%, 400px);
  box-shadow: 0 24px 64px rgba(0,0,0,0.18);
`;
const SuccessIcon = styled.div`
  width: 72px; height: 72px; border-radius: 50%; background: #16a34a;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
`;
const SuccessTitle = styled.h2`font-size: 22px; font-weight: 800; color: #0d2137; margin: 0 0 10px;`;
const SuccessSub = styled.p`font-size: 14px; color: #6b7280; margin: 0 0 28px; line-height: 1.5;`;
const SuccessBtn = styled.button`
  width: 100%; padding: 13px; background: #0b3d91; color: #fff;
  border: none; border-radius: 10px; font-size: 15px; font-weight: 700;
  cursor: pointer; &:hover { opacity: 0.9; }
`;

/* ── Available tracks list ── */
const DEFAULT_TRACKS = [
  "Backend Engineering", "UI/UX Design", "Product Management",
  "AI/ Machine Learning", "Data Analytics", "Mobile Development",
  "Scrum Mastering", "Branding & Design", "Cyber Security",
  "Frontend Engineering", "Virtual Assistant", "Digital Marketing",
];

export default function CreateCohort({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "", start_date: "", end_date: "", max_students: "",
  });
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [availableTracks, setAvailableTracks] = useState(DEFAULT_TRACKS);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Load tracks from API, fall back to default list
  useEffect(() => {
    if (!isOpen) return;
    getTracks()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          setAvailableTracks(data.map(t => typeof t === "string" ? t : t.name));
        }
      })
      .catch(() => {});
  }, [isOpen]);

  const toggleTrack = (name) => {
    setSelectedTracks(prev =>
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    );
  };


  const [tracks, setTracks] = useState([]);
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [trackError, setTrackError] = useState("");


  // Charger les tracks depuis le backend
  useEffect(() => {

    if (!isOpen) return;


    const fetchTracks = async () => {

      try {

        setLoadingTracks(true);
        setTrackError("");


        const response = await fetch(
          "https://acabridge-hub-1.onrender.com/api/tracks/"
        );


        if (!response.ok) {
          throw new Error("Failed to fetch tracks");
        }


        const data = await response.json();


        setTracks(data);


      } catch (error) {

        console.error("Tracks error:", error);
        setTrackError("Unable to load tracks.");

      } finally {

        setLoadingTracks(false);

      }

    };


    fetchTracks();


  }, [isOpen]);





  const handleChange = (e) => {

    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Cohort name is required."); return; }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        start_date: form.start_date || null,
        end_date: form.end_date || null,
        max_students: form.max_students ? parseInt(form.max_students) : null,
        track_names: selectedTracks,   // backend will match by name
        is_active: true,
        applications_open: true,
      };
      const res = await createAdminCohort(payload);
      setShowSuccess(true);
      if (onCreated) onCreated(res.data);
    } catch (err) {
      const data = err.response?.data;
      const msg =
        data?.name?.[0] || data?.detail || data?.error ||
        (typeof data === "object" ? Object.values(data).flat()[0] : null) ||
        "Failed to create cohort. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setForm({ name: "", start_date: "", end_date: "", max_students: "" });
    setSelectedTracks([]);
    onClose();

  };





  if (!isOpen) return null;




  return (
    <>
      {/* Success modal */}
      {showSuccess && (
        <SuccessOverlay>
          <SuccessModal>
            <SuccessIcon>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </SuccessIcon>
            <SuccessTitle>Successful!!</SuccessTitle>
            <SuccessSub>
              You have successfully created a new Cohort.<br />
              Proceed to open applications for students.
            </SuccessSub>
            <SuccessBtn onClick={handleSuccessClose}>Done</SuccessBtn>
          </SuccessModal>
        </SuccessOverlay>
      )}

      {/* Create form modal */}
      {!showSuccess && (
        <Overlay>
          <Modal>
            <ModalHeader>
              <ModalTitle>Create New Cohort</ModalTitle>
              <CloseBtn onClick={onClose} aria-label="Close">✕</CloseBtn>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              {/* Cohort Name */}
              <FormGroup>
                <Label>Cohort Name <span>*</span></Label>
                <Input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="e.g. Cohort 9" required
                />
              </FormGroup>

              {/* Start & End Date */}
              <Row>
                <FormGroup>
                  <Label>Start Date <span>*</span></Label>
                  <Input type="date" name="start_date" value={form.start_date} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>End Date <span>*</span></Label>
                  <Input type="date" name="end_date" value={form.end_date} onChange={handleChange} />
                </FormGroup>
              </Row>

              {/* Max Students */}
              <FormGroup>
                <Label>Max Students <span>*</span></Label>
                <Input
                  type="number" name="max_students" value={form.max_students}
                  onChange={handleChange} placeholder="e.g. 5000" min="1"
                />
              </FormGroup>

              {/* Training Track selector */}
              <FormGroup>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Label>Select Training Track <span>*</span></Label>
                  <AddTrackBtn type="button">+ Add Learning Track</AddTrackBtn>
                </div>
                <TrackGrid>
                  {availableTracks.map(name => (
                    <TrackChip
                      key={name}
                      type="button"
                      $selected={selectedTracks.includes(name)}
                      onClick={() => toggleTrack(name)}
                    >
                      {name}
                    </TrackChip>
                  ))}
                </TrackGrid>
              </FormGroup>

              {error && <ErrorMsg>{error}</ErrorMsg>}

              <SubmitBtn type="submit" disabled={loading}>
                {loading ? "Creating…" : "Create Cohort"}
              </SubmitBtn>
            </Form>
          </Modal>
        </Overlay>
      )}
    </>
  );
}
