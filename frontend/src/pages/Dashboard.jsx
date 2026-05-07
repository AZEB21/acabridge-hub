import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, Award } from "lucide-react";
import { getMe } from "../api/auth";
import {
  Container, Header, Logos, Avatar, Hero, Small,
  ProgressBar, Progress, Stats, StatCard, Title,
  Section, Card, FooterLink,
} from "../styles/Dashboard.styles.jsx";
import LogoImg from "../assets/Logo.PNG";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then(({ data }) => setUser(data))
      .catch(() => {
        // token invalid — send to sign in
        localStorage.clear();
        navigate("/signin");
      });
  }, [navigate]);

  const firstName = user?.full_name?.split(" ")[0] || "Ada";
  const initials = user?.full_name
    ? user.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AL";

  return (
    <Container>
      <Header>
        <Logos>
          <img src={LogoImg} alt="AcaBridge logo" style={{ width: 110, height: "auto" }} />
        </Logos>
        <Avatar>{initials}</Avatar>
      </Header>

      <Hero>
        <p>COHORT 9.0</p>
        <h2>Welcome, {firstName} 👋</h2>
        <p>You're enrolled in your track. Let's start learning.</p>
        <Small>Course progress 0%</Small>
        <ProgressBar><Progress /></ProgressBar>
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
            <div>
              <Title>Live classes</Title>
              <Small>Up next: Orientation — Mon 4:00 PM WAT</Small>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Award size={20} color="#2ec4b6" />
            <div>
              <Title>My certificate</Title>
              <Small>Unlocks when you complete your program</Small>
            </div>
          </div>
        </Card>
      </Section>

      <FooterLink onClick={() => navigate("/application/status")}>
        View application status
      </FooterLink>
    </Container>
  );
}
