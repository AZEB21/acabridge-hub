// TODO: Teammate's task
// POST /api/auth/signin/ (to be added by backend teammate in Week 2)
// On success: save tokens, redirect to /dashboard

// export default function SignIn() {
//   return <div className="page"><h1>Sign In — TODO</h1></div>;
// }

import {Container, Card, Header, Logos, Redirection, Title, Subtitle, Label, Input, Options, Button, Footer } from "../styles/SignIn.styles.jsx";
import LogoImg from "../assets/Logo.PNG";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function SignIn() {
    const navigate = useNavigate();

  return (
    <Container>

        <Card>

            <Header>
                <Logos>
                    <img src={LogoImg} alt="Acabridge logo" />
                </Logos>
                <Redirection as={Link} to="/register">
                    Create account
                </Redirection>
            </Header>

            <Title>
                Welcome back
            </Title>
            <Subtitle>
                Sign in to continue your learning journey.
            </Subtitle>

            <Label>Email address</Label>
            <Input placeholder = "you@gmail.com ou you@yahoo.fr"/>

            <Label>Password</Label>
            <Input type="password" placeholder="Your password"/>

            <Options>
                <label>
                    <input type="checkbox" />
                    remember me
                </label>
                <a href="#" style={{color :"#0d2137", textDecoration :"none"}}>
                    Forgot password
                </a>
            </Options>
            
            <Button onClick={() =>  {localStorage.setItem("access_token", "fake-token"); 
              navigate("/application/status");
              }}
              >
                Sign in
            </Button>

            <Footer>
                New to Acabridge? Create an account
            </Footer>

        </Card>


    </Container>

  );
}
