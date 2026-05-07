import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../assets/Logo.PNG";

/* ─── NAV ─────────────────────────────────────────────────────────────────── */
const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  height: 60px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const NavLogo = styled.img`
  width: 110px;
  height: auto;
`;

const NavCenter = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 768px) { display: none; }
`;

const NavLink = styled.a`
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  text-decoration: none;
  &:hover { color: #fff; }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavSignIn = styled(Link)`
  color: rgba(255,255,255,0.85);
  font-size: 14px;
  text-decoration: none;
  &:hover { color: #fff; }
`;

const NavGetStarted = styled(Link)`
  background: #2ec4b6;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 6px;
  text-decoration: none;
  &:hover { opacity: 0.88; }
`;

/* ─── HERO ────────────────────────────────────────────────────────────────── */
const HeroSection = styled.section`
  background: linear-gradient(160deg, #0a192f 0%, #0d3b5e 50%, #0a4a4a 100%);
  min-height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px 60px;

  @media (max-width: 768px) {
    padding: 60px 20px 48px;
    min-height: auto;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.9);
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 28px;

  &::before {
    content: "✦";
    color: #2ec4b6;
    font-size: 10px;
  }
`;

const HeroH1 = styled.h1`
  font-size: 56px;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  max-width: 700px;
  margin-bottom: 0;

  span {
    color: #2ec4b6;
    display: block;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSub = styled.p`
  font-size: 16px;
  color: rgba(255,255,255,0.75);
  max-width: 520px;
  line-height: 1.6;
  margin: 20px auto 36px;
`;

const HeroBtns = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const BtnPrimary = styled(Link)`
  background: #2ec4b6;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 28px;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover { opacity: 0.88; }
`;

const BtnGhost = styled(Link)`
  background: transparent;
  color: rgba(255,255,255,0.85);
  font-size: 15px;
  padding: 13px 28px;
  border-radius: 8px;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.25);
  &:hover { background: rgba(255,255,255,0.08); }
`;

/* ─── STATS ───────────────────────────────────────────────────────────────── */
const StatsRow = styled.div`
  background: rgba(255,255,255,0.08);
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: center;
  gap: 0;
  padding: 0;
`;

const StatItem = styled.div`
  flex: 1;
  max-width: 200px;
  text-align: center;
  padding: 24px 16px;
  border-right: 1px solid rgba(255,255,255,0.1);
  &:last-child { border-right: none; }
`;

const StatNum = styled.div`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 4px;
`;

/* ─── SECTION WRAPPER ─────────────────────────────────────────────────────── */
const Section = styled.section`
  padding: 80px 48px;
  background: ${({ $bg }) => $bg || "#fff"};

  @media (max-width: 768px) {
    padding: 56px 20px;
  }
`;

const SectionTag = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2ec4b6;
  margin-bottom: 12px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 800;
  color: #0d2137;
  margin-bottom: 12px;

  @media (max-width: 768px) { font-size: 26px; }
`;

const SectionSub = styled.p`
  text-align: center;
  font-size: 15px;
  color: #666;
  max-width: 560px;
  margin: 0 auto 48px;
  line-height: 1.6;
`;

/* ─── WHY ACABRIDGE CARDS ─────────────────────────────────────────────────── */
const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 28px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
`;

const FeatureIcon = styled.div`
  font-size: 28px;
  margin-bottom: 14px;
`;

const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0d2137;
  margin-bottom: 8px;
`;

const FeatureDesc = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

/* ─── HOW IT WORKS ────────────────────────────────────────────────────────── */
const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 24px 20px;
`;

const StepNum = styled.div`
  display: inline-block;
  background: #0d2137;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 14px;
  letter-spacing: 0.05em;
`;

const StepTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0d2137;
  margin-bottom: 8px;
`;

const StepDesc = styled.p`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
`;

/* ─── TESTIMONIAL ─────────────────────────────────────────────────────────── */
const TestimonialCard = styled.div`
  max-width: 680px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 40px 48px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);

  @media (max-width: 768px) {
    padding: 28px 24px;
  }
`;

const Stars = styled.div`
  color: #f59e0b;
  font-size: 18px;
  margin-bottom: 16px;
`;

const Quote = styled.p`
  font-size: 18px;
  color: #0d2137;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 20px;

  @media (max-width: 768px) { font-size: 15px; }
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2ec4b6;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthorInfo = styled.div`
  p:first-child { font-size: 14px; font-weight: 700; color: #0d2137; }
  p:last-child { font-size: 13px; color: #888; }
`;

/* ─── CTA BANNER ──────────────────────────────────────────────────────────── */
const CTABanner = styled.section`
  background: linear-gradient(135deg, #0d2137, #0a4a4a);
  padding: 80px 48px;
  text-align: center;

  @media (max-width: 768px) { padding: 56px 20px; }
`;

const CTATitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;

  @media (max-width: 768px) { font-size: 28px; }
`;

const CTASub = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,0.75);
  margin-bottom: 32px;
`;

const CTAChecks = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const CTACheck = styled.span`
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  gap: 6px;
  &::before { content: "✓"; color: #2ec4b6; font-weight: 700; }
`;

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
const Footer = styled.footer`
  background: #f8f7f4;
  border-top: 1px solid #e8e6e1;
  padding: 48px 48px 24px;

  @media (max-width: 768px) { padding: 40px 20px 20px; }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterBrand = styled.div``;
const FooterLogoImg = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 10px;
`;
const FooterTagline = styled.p`
  font-size: 13px;
  color: #888;
  line-height: 1.5;
`;

const FooterCol = styled.div``;
const FooterColTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #0d2137;
  margin-bottom: 12px;
`;
const FooterColLink = styled.a`
  display: block;
  font-size: 13px;
  color: #666;
  text-decoration: none;
  margin-bottom: 8px;
  &:hover { color: #0d2137; }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #e8e6e1;
  padding-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #aaa;
  max-width: 1100px;
  margin: 0 auto;
`;

/* ─── COMPONENT ───────────────────────────────────────────────────────────── */
export default function Landing() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fff" }}>

      {/* NAV */}
      <Nav>
        <NavLogo src={LogoImg} alt="AcaBridge" />
        <NavCenter>
          <NavLink href="#how-it-works">How it works</NavLink>
          <NavLink href="#why-acabridge">Why AcaBridge</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavCenter>
        <NavRight>
          <NavSignIn to="/signin">Sign in</NavSignIn>
          <NavGetStarted to="/register">Get started</NavGetStarted>
        </NavRight>
      </Nav>

      {/* HERO */}
      <HeroSection>
        <HeroBadge>Cohort 9.0 · Now accepting applications</HeroBadge>
        <HeroH1>
          Africa's next generation of
          <span>tech talent starts here.</span>
        </HeroH1>
        <HeroSub>
          One classroom. Real mentors. Live cohorts. Career-ready outcomes —
          built for ambitious African learners who refuse to be average.
        </HeroSub>
        <HeroBtns>
          <BtnPrimary to="/register">Apply for Cohort 9.0 →</BtnPrimary>
          <BtnGhost to="/signin">I already have an account</BtnGhost>
        </HeroBtns>

        <StatsRow>
          <StatItem>
            <StatNum>8</StatNum>
            <StatLabel>Cohorts delivered</StatLabel>
          </StatItem>
          <StatItem>
            <StatNum>2,500+</StatNum>
            <StatLabel>Learners trained</StatLabel>
          </StatItem>
          <StatItem>
            <StatNum>30+</StatNum>
            <StatLabel>African countries</StatLabel>
          </StatItem>
        </StatsRow>
      </HeroSection>

      {/* WHY ACABRIDGE */}
      <Section $bg="#f8f7f4" id="why-acabridge">
        <SectionTag>Why AcaBridge</SectionTag>
        <SectionTitle>Built different. Built for Africa.</SectionTitle>
        <SectionSub>
          Not another video library. AcaBridge HUB is a live, mentor-led learning experience
          designed around outcomes that matter.
        </SectionSub>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🎓</FeatureIcon>
            <FeatureTitle>Live, cohort-based</FeatureTitle>
            <FeatureDesc>
              Learn in real time with a community moving at the same pace.
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>Mentors who've done it</FeatureTitle>
            <FeatureDesc>
              Get matched with operators from Africa & the diaspora — not just teachers.
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>Career launchpad</FeatureTitle>
            <FeatureDesc>
              Projects, certificates and intros that open doors to real opportunities.
            </FeatureDesc>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works">
        <SectionTag>How it works</SectionTag>
        <SectionTitle>From application to hired.</SectionTitle>
        <SectionSub />
        <StepsGrid>
          <StepCard>
            <StepNum>STEP 01</StepNum>
            <StepTitle>Apply</StepTitle>
            <StepDesc>Create an account & tell us your goals.</StepDesc>
          </StepCard>
          <StepCard>
            <StepNum>STEP 02</StepNum>
            <StepTitle>Get accepted</StepTitle>
            <StepDesc>Track your status in real time — by email & SMS.</StepDesc>
          </StepCard>
          <StepCard>
            <StepNum>STEP 03</StepNum>
            <StepTitle>Learn live</StepTitle>
            <StepDesc>Join classes, build projects, meet mentors.</StepDesc>
          </StepCard>
          <StepCard>
            <StepNum>STEP 04</StepNum>
            <StepTitle>Get certified</StepTitle>
            <StepDesc>Earn your certificate & launch your career.</StepDesc>
          </StepCard>
        </StepsGrid>
      </Section>

      {/* TESTIMONIAL */}
      <Section $bg="#f8f7f4">
        <TestimonialCard>
          <Stars>★★★★★</Stars>
          <Quote>
            "AcaBridge gave me more than skills — it gave me confidence, mentors,
            and a community that believed in me. I landed my first tech role
            4 months after Cohort 7."
          </Quote>
          <AuthorRow>
            <AuthorAvatar>CM</AuthorAvatar>
            <AuthorInfo>
              <p>Chiamaka M.</p>
              <p>Product Designer · Cohort 7 alumna</p>
            </AuthorInfo>
          </AuthorRow>
        </TestimonialCard>
      </Section>

      {/* CTA BANNER */}
      <CTABanner>
        <CTATitle>Your seat at Cohort 9.0 is waiting.</CTATitle>
        <CTASub>Applications close soon. Take the first step toward the career you actually want.</CTASub>
        <BtnPrimary to="/register" style={{ display: "inline-flex", margin: "0 auto" }}>
          Start your application →
        </BtnPrimary>
        <CTAChecks>
          <CTACheck>No experience required</CTACheck>
          <CTACheck>Mentor-led</CTACheck>
          <CTACheck>Recognised certificate</CTACheck>
        </CTAChecks>
      </CTABanner>

      {/* FOOTER */}
      <Footer id="contact">
        <FooterGrid>
          <FooterBrand>
            <FooterLogoImg src={LogoImg} alt="AcaBridge" />
            <FooterTagline>The learning platform of Africa Agility Foundation.</FooterTagline>
          </FooterBrand>
          <FooterCol>
            <FooterColTitle>Africa Agility</FooterColTitle>
            <FooterColLink href="#">About</FooterColLink>
            <FooterColLink href="#">Our mission</FooterColLink>
            <FooterColLink href="#">Programs</FooterColLink>
            <FooterColLink href="#">Contact</FooterColLink>
          </FooterCol>
          <FooterCol>
            <FooterColTitle>Policies</FooterColTitle>
            <FooterColLink href="#">Privacy policy</FooterColLink>
            <FooterColLink href="#">Terms of service</FooterColLink>
            <FooterColLink href="#">Code of conduct</FooterColLink>
            <FooterColLink href="#">Accessibility</FooterColLink>
          </FooterCol>
          <FooterCol>
            <FooterColTitle>Connect</FooterColTitle>
            <FooterColLink href="mailto:hello@africaagility.org">hello@africaagility.org</FooterColLink>
            <FooterColLink href="https://www.linkedin.com/company/africa-agility/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LinkedIn</FooterColLink>
          </FooterCol>
        </FooterGrid>
        <FooterBottom>
          © 2026 Africa Agility Foundation · AcaBridge HUB
        </FooterBottom>
      </Footer>

    </div>
  );
}
