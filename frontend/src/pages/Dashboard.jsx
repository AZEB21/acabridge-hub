// TODO: Teammate's task
// GET /api/dashboard/ (to be added by backend teammate in Week 2)

import {Container, Header, Logos, Avatar, Hero, Small, ProgressBar, Progress, Stats, StatCard, Title, Section, Card, FooterLink } from "../styles/Dashboard.styles.jsx";
import LogoImg from "../assets/Logo.PNG";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <Container>

      <Header>
        <Logos>
          <img src={LogoImg} alt="Acabridge logo" />
        </Logos>
        <Avatar>AL</Avatar>
      </Header>

      <Hero>
        <p>COHORT 9.0</p>
        <h2>Welcome, Ada </h2>
        <p>You’re enrolled in your track. Let’s start learning.</p>

        <Small>Course progress 0%</Small>
        <ProgressBar>
          <Progress />
        </ProgressBar>
      </Hero>

      <Stats>
        <StatCard>
          <Title>0 / 24</Title>
          <Small>Modules</Small>
        </StatCard>

        <StatCard>
          <Title>2</Title>
          <Small>Live classes</Small>
        </StatCard>

        <StatCard>
          <Title>Locked</Title>
          <Small>Certificate</Small>
        </StatCard>
      </Stats>

      <Section>
        <Card>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <BookOpen size={20} color="#2ec4b6" />
            <div>
              <Title>My courses</Title>
              <Small>Pick up your modules</Small>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Calendar size={20} color="#2ec4b6" />
            <Title>Live classes</Title>
            <div>
            <Small>Next: Mon 4:00 PM</Small>
          </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Award size={20} color="#2ec4b6" />
            <Title>My certificate</Title>
            <div>
            <Small>Unlocks after completion</Small>
          </div>
          </div>
        </Card>
      </Section>

      <FooterLink>
        View application status
      </FooterLink>

    </Container>
  );
}
