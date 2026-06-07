import React from "react";
import {
  Overlay,
  Modal,
  CloseButton,
  Header,
  UserSection,
  Avatar,
  UserInfo,
  Status,
  InfoRow,
  Label,
  Value,
  Bio,
  Goals,
  ButtonContainer,
  InfoButton,
  RejectButton,
  AcceptButton,
} from "../styles/ApplicationReview.styles";

import { FiX } from "react-icons/fi";

export default function ApplicationReview({
  open,
  onClose,
  student,
}) {
  if (!open) return null;

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>
          X
        </CloseButton>

        <Header>Application Review</Header>

        <UserSection>
          <Avatar
            src="https://i.pravatar.cc/300"
            alt="student"
          />

          <UserInfo>
            <h3>{student?.name}</h3>
            <p>{student?.email}</p>
          </UserInfo>

          <Status>Applied</Status>
        </UserSection>

        <InfoRow>
          <div>
            <Label>Track</Label>
            <Value>{student?.track}</Value>
          </div>

          <div>
            <Label>Applied</Label>
            <Value>{student?.period}</Value>
          </div>
        </InfoRow>

        <Bio>
          <Label>Bio:</Label>

          <p>
            Passionate learner from Lagos with 2 years of
            professional experience.
          </p>
        </Bio>

        <Goals>
          <Label>Goals:</Label>

          <p>
            Transition into a product role within the next 12
            months.
          </p>
        </Goals>

        <ButtonContainer>
          <InfoButton>Request Info</InfoButton>

          <RejectButton>Reject</RejectButton>

          <AcceptButton>Accept</AcceptButton>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
}