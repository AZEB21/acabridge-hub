import styled from "styled-components";



export const Container = styled.div`

display:flex;
min-height:100vh;
background:#f3f6fb;

`;



export const Sidebar = styled.div`

width:240px;
background:white;
padding:20px;

`;



export const Logo = styled.div`

img{

width:120px;

}

margin-bottom:40px;

`;



export const Menu = styled.div`

display:flex;
flex-direction:column;
gap:18px;

`;



export const MenuItem = styled.div`

display:flex;
align-items:center;
gap:10px;

font-size:14px;

cursor:pointer;

color:${props=>props.active ? "#00a99d":"#334155"};


`;





export const MainContent = styled.div`

flex:1;

`;



export const Header = styled.div`

height:70px;
background:white;

display:flex;
justify-content:space-between;
align-items:center;

padding:0 25px;


`;



export const HeaderTitle = styled.h4`

font-weight:500;

`;

export const HeaderStatus = styled.div`

display:flex;

gap:8px;

margin-left:auto;

margin-right:25px;

`;


export const StatusButton = styled.span`

padding:8px 18px;

border-radius:8px;

font-size:12px;

background:${props=>props.earned ? "#00b39f":"#f1f5f9"};

color:${props=>props.earned ? "white":"#475569"};

`;



export const IconGroup = styled.div`

display:flex;
gap:18px;

`;





export const Content = styled.div`

padding:40px;

`;



export const Title = styled.h1`

font-size:28px;

`;



export const Description = styled.p`

color:#64748b;

`;





export const RequirementsContainer = styled.div`

display:grid;

grid-template-columns:repeat(3,1fr);

gap:20px;

margin:25px 0;


`;




export const RequirementCard = styled.div`

background:white;

padding:25px;

border-radius:15px;

`;



export const RequirementTitle = styled.div`

display:flex;
justify-content:space-between;

color:#64748b;

`;



export const RequirementNumber = styled.h2`

margin:30px 0;


span{

font-size:16px;
color:#94a3b8;

}

`;



export const ProgressBar = styled.div`

height:7px;

background:#e5e7eb;

border-radius:20px;

`;



export const ProgressFill = styled.div`

height:100%;

width:${props=>props.width};

background:#08b59f;

border-radius:20px;

`;



export const RequirementText = styled.small`

color:#94a3b8;

`;





export const CertificateSection = styled.div`

margin-top:30px;

`;



export const CertificateCard = styled.div`

background:white;

padding:40px;

border-radius:18px;

display:flex;

gap:40px;


`;



export const CertificatePreview = styled.div`

width:45%;

`;



export const CertificateImage = styled.div`

height:170px;

background:#061b55;

color:white;

display:flex;

justify-content:center;

align-items:center;

text-align:center;

border-radius:2px;

position:relative;


.certificate-inner{

border:1px solid rgba(255,255,255,0.4);

width:85%;

height:75%;

display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

}


small{

font-size:8px;

opacity:0.8;

}


h3{

margin:8px 0;

font-size:18px;

}


p{

font-size:9px;

}

`;

export const AwardIcon = styled.div`

font-size:22px;

margin-bottom:5px;

`;



export const CertificateInfo = styled.div`

flex:1;

`;



export const ReadyBadge = styled.span`

background:#dffaf6;

color:#00a99d;

padding:7px 15px;

border-radius:20px;

font-size:11px;

`;



export const CertificateTitle = styled.h1`

margin-top:20px;

`;



export const CertificateDescription = styled.p`

color:#64748b;

line-height:1.6;

`;



export const ButtonContainer = styled.div`

display:flex;

gap:15px;

margin-top:25px;

`;



export const DownloadButton = styled.button`

background:#00b39f;

color:white;

border:none;

padding:14px 25px;

border-radius:8px;

display:flex;

align-items:center;

justify-content:center;

gap:8px;

font-size:14px;

font-weight:600;

cursor:pointer;

`;



export const ShareButton = styled.button`

background:white;

border:1px solid #ddd;

padding:14px 25px;

border-radius:8px;

display:flex;

align-items:center;

justify-content:center;

gap:8px;

font-size:14px;

color:#334155;

cursor:pointer;

`;

