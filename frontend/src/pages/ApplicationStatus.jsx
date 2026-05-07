// TODO: Teammate's task
// GET /api/application/status/ (to be added by backend teammate in Week 2)

import {Container, Card,TopIcon, HeaderText, Title, Step, StepNumber, StepLine, StepContainer,  ButtonPrimary, ButtonSecondary, ButtonRow, FooterText,
} from "../styles/ApplicationStatus.styles";

import { Eye, Edit, Check } from "lucide-react";

function ApplicationStatus() {
  return (
    <Container>

      {/* ICON + HEADER OUTSIDE CARD */}
      <div>
        <TopIcon>
          <Check size={40} color="white" />
        </TopIcon>

        <HeaderText>
          <h2>Application received!</h2>
          <p>Thanks for applying to Cohort 9.0</p>
        </HeaderText>
      </div>

      {/* WHITE CARD */}
      <Card>

        <Title>APPLICATION STATUS</Title>

        <StepContainer>

          <Step>
            <StepNumber active>1</StepNumber>

            <div>
              <h4>Applied </h4>
              <p>Your application has been received.</p>
            </div>

            <StepLine />
          </Step>

          <Step>
            <StepNumber active>2</StepNumber>

            <div>
              <h4>Reviewed</h4>
              <p>Your profile is being reviewed.</p>
            </div>

            <StepLine />
          </Step>

          <Step>
            <StepNumber>3</StepNumber>

            <div>
              <h4>Accepted</h4>
              <p>You’ll receive feedback soon.</p>
            </div>
          </Step>

          <Step>
            <StepNumber>4</StepNumber>

            <div>
              <h4>Enrolled</h4>
              <p>You’ll receive</p>
            </div>
          </Step>

        </StepContainer>


        {/* BUTTONS ROW */}
        <ButtonRow>

          <ButtonSecondary>
            <Eye size={16} />
            Preview
          </ButtonSecondary>

          <ButtonSecondary>
            <Edit size={16} />
            Edit
          </ButtonSecondary>

        </ButtonRow>

        <ButtonPrimary>
          Simulate : Mark as reviewed
        </ButtonPrimary>

        <FooterText>
         Back to home
        </FooterText>

      </Card>
    </Container>
  );
}

export default ApplicationStatus;