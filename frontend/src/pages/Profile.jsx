import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/auth";
import styled from "styled-components";
import LogoImg from "../assets/Logo.PNG";

const Wrap = styled.div`
  min-height: 100vh;
  background: #f5f4ef;
  font-family: Arial, sans-serif;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px 80px;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #0d2137;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const AvatarLarge = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #0d2137;
  color: white;
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const Name = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  color: #0d2137;
  margin: 0 0 4px;
`;

const Email = styled.p`
  text-align: center;
  font-size: 13px;
  color: #888;
  margin: 0 0 28px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e8e6e1;
  margin-bottom: 16px;
`;

const CardTitle = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 14px 16px 8px;
  margin: 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #f5f4ef;
  font-size: 14px;
  span:first-child { color: #888; }
  span:last-child { color: #0d2137; font-weight: 500; }
`;

const VerifiedBadge = styled.span`
  background: #dcfce7;
  color: #16a34a;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
`;

const UnverifiedBadge = styled.span`
  background: #fef9c3;
  color: #b45309;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
`;

const SignOutBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: none;
  border: 1.5px solid #e8e6e1;
  border-radius: 10px;
  font-size: 14px;
  color: #dc2626;
  cursor: pointer;
  font-family: Arial;
  margin-top: 8px;
  &:hover { background: #fef2f2; }
`;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then(({ data }) => { setUser(data); setLoading(false); })
      .catch(() => { localStorage.clear(); navigate("/signin"); });
  }, [navigate]);

  const initials = user?.full_name
    ? user.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/signin");
  };

  if (loading) {
    return (
      <Wrap>
        <TopBar>
          <Logo src={LogoImg} alt="AcaBridge" />
          <BackBtn onClick={() => navigate("/dashboard")}>← Dashboard</BackBtn>
        </TopBar>
        <p style={{ textAlign: "center", color: "#888", marginTop: 60 }}>Loading profile…</p>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <TopBar>
        <Logo src={LogoImg} alt="AcaBridge" />
        <BackBtn onClick={() => navigate("/dashboard")}>← Dashboard</BackBtn>
      </TopBar>

      {/* Avatar + name */}
      <AvatarLarge>
        {user?.profile_photo
          ? <img src={user.profile_photo} alt="profile" />
          : initials
        }
      </AvatarLarge>
      <Name>{user?.full_name || "—"}</Name>
      <Email>{user?.email || "—"}</Email>

      {/* Account info */}
      <Card>
        <CardTitle>Account</CardTitle>
        <Row>
          <span>Email</span>
          <span>{user?.email || "—"}</span>
        </Row>
        <Row>
          <span>Email verified</span>
          {user?.is_email_verified
            ? <VerifiedBadge>Verified ✓</VerifiedBadge>
            : <UnverifiedBadge>Not verified</UnverifiedBadge>
          }
        </Row>
      </Card>

      {/* Profile info */}
      <Card>
        <CardTitle>Profile</CardTitle>
        <Row>
          <span>Full name</span>
          <span>{user?.full_name || "—"}</span>
        </Row>
        <Row>
          <span>Age</span>
          <span>{user?.age || "—"}</span>
        </Row>
        <Row>
          <span>Nationality</span>
          <span>{user?.nationality || "—"}</span>
        </Row>
        <Row>
          <span>Location</span>
          <span>{user?.location || "—"}</span>
        </Row>
        <Row>
          <span>Bio</span>
          <span style={{ maxWidth: "60%", textAlign: "right" }}>{user?.bio || "—"}</span>
        </Row>
        <Row>
          <span>Career goal</span>
          <span style={{ maxWidth: "60%", textAlign: "right" }}>{user?.career_goal || "—"}</span>
        </Row>
      </Card>

      <SignOutBtn onClick={handleSignOut}>Sign out</SignOutBtn>
    </Wrap>
  );
}
