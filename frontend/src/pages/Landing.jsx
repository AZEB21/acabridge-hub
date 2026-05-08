import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../assets/Logo.PNG";

/* ─── NAV ─────────────────────────────────────────────────────────────────── */
const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  border-bottom: 1px solid #eee;
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
  color: #444;
  font-size: 14px;
  text-decoration: none;
  &:hover { color: #0d2137; }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavSignIn = styled(Link)`
  color: #0d2137;
  font-size: 14px;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const NavGetStarted = styled(Link)`
  background: #0d2137;
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
  background: linear-gradient(120deg, #0d2137 0%, #0a3d5c 50%, #0a6b5a 100%);
  min-height: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px 140px;
  position: relative;
  overflow: hidden;

  /* Large square grid overlay */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 100px 100px;
    pointer-events: none;
    z-index: 0;
  }

  /* Wave at bottom — gentle curve low-left to high-right */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' preserveAspectRatio='none'%3E%3Cpath d='M0,80 C360,20 1080,90 1440,30 L1440,100 L0,100 Z' fill='%23f5f4ef'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 1;
  }

  > * { position: relative; z-index: 2; }

  @media (max-width: 768px) {
    padding: 60px 20px 140px;
    min-height: auto;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.9);
  font-size: 12px;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 28px;

  &::before {
    content: "✦";
    color: #2ec4b6;
    font-size: 9px;
  }
`;

const HeroH1 = styled.h1`
  font-size: 60px;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  max-width: 760px;
  margin-bottom: 0;

  span {
    display: block;
    background: linear-gradient(90deg, #f5c842 0%, #2ec4b6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 38px;
  }
`;

const HeroSub = styled.p`
  font-size: 16px;
  color: rgba(255,255,255,0.7);
  max-width: 500px;
  line-height: 1.6;
  margin: 20px auto 36px;
`;

const HeroBtns = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 48px;
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
  border: 1px solid rgba(255,255,255,0.3);
  &:hover { background: rgba(255,255,255,0.08); }
`;

/* ─── STATS ───────────────────────────────────────────────────────────────── */
const StatsRow = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 0;
`;

const StatItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 20px 16px;
  border-right: 1px solid rgba(255,255,255,0.15);
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
            <FooterColLink href="mailto:hello@africaagility.org" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              hello@africaagility.org
            </FooterColLink>
            <div style={{ display: "flex", gap: 10 }}>
              {/* Website */}
              <a href="https://africaagility.org/" target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, borderRadius: "50%", background: "#f0eee9", display: "flex", alignItems: "center", justifyContent: "center", color: "#0d2137", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/africa-agility/posts/?feedView=all" target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, borderRadius: "50%", background: "#f0eee9", display: "flex", alignItems: "center", justifyContent: "center", color: "#0d2137", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/africaagility/" target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, borderRadius: "50%", background: "#f0eee9", display: "flex", alignItems: "center", justifyContent: "center", color: "#0d2137", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@AfricaAgilityGIT" target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, borderRadius: "50%", background: "#f0eee9", display: "flex", alignItems: "center", justifyContent: "center", color: "#0d2137", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            </div>
          </FooterCol>
        </FooterGrid>
        <FooterBottom>
          © 2026 Africa Agility Foundation · AcaBridge HUB
        </FooterBottom>
      </Footer>

    </div>
  );
}
