import React from "react";
import {
  Overlay, Modal, CloseButton, Header, UserSection, Avatar,
  UserInfo, Status, InfoRow, Label, Value, Bio, Goals,
  ButtonContainer, InfoButton, RejectButton, AcceptButton,
} from "../styles/ApplicationReview.styles";

export default function ApplicationReview({ open, onClose, student, onAccept, onReject }) {
  if (!open || !student) return null;

  const statusColor = {
    applied: "#f59e0b", reviewed: "#3b82f6",
    accepted: "#16a34a", enrolled: "#0d2137", rejected: "#dc2626",
  };

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <Header>Application Review</Header>

        <UserSection>
          <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || "S")}&background=0d2137&color=fff`} alt="student" />
          <UserInfo>
            <h3>{student.name}</h3>
            <p>{student.email}</p>
          </UserInfo>
          <Status style={{ color: statusColor[student.status] || "#888", fontWeight: 700, fontSize: 13 }}>
            {student.status ? student.status.charAt(0).toUpperCase() + student.status.slice(1) : "Applied"}
          </Status>
        </UserSection>

        <InfoRow>
          <div>
            <Label>Track</Label>
            <Value>{student.track || "—"}</Value>
          </div>
          <div>
            <Label>Applied</Label>
            <Value>{student.period || "—"}</Value>
          </div>
        </InfoRow>

        <Bio>
          <Label>Bio:</Label>
          <p>{student.bio || "No bio provided."}</p>
        </Bio>

        <Goals>
          <Label>Goals:</Label>
          <p>{student.career_goal || "No career goal provided."}</p>
        </Goals>

        <ButtonContainer>
          <InfoButton onClick={onClose}>Close</InfoButton>
          {student.status !== "rejected" && (
            <RejectButton onClick={() => onReject && onReject(student.id)}>Reject</RejectButton>
          )}
          {student.status !== "accepted" && student.status !== "enrolled" && (
            <AcceptButton onClick={() => onAccept && onAccept(student.id)}>Accept</AcceptButton>
          )}
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
}
