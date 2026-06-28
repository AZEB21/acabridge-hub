import styled from "styled-components";




export const Container = styled.div`

display:flex;

min-height:100vh;

background:#f3f6fb;

`;





export const Sidebar = styled.div`

width:135px;

background:white;

padding:20px;

border-right:1px solid #eee;

`;




export const Logo = styled.div`

margin-bottom:35px;


img{

width:75px;

}

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


font-size:12px;


color:${props=>props.active ? "#00aaa0":"#334155"};


cursor:pointer;


`;








export const MainContent = styled.div`

flex:1;

`;








export const Header = styled.div`

height:40px;

background:white;


display:flex;

align-items:center;


padding:0 25px;


`;





export const HeaderTitle = styled.div`

font-size:11px;

color:#1e293b;

`;






export const HeaderStatus = styled.div`

display:flex;

gap:8px;

margin:auto;


`;







export const StatusButton = styled.div`

padding:6px 18px;


font-size:11px;


border-radius:6px;


background:${props=>props.earned ? "#00b39f":"#f8fafc"};


color:${props=>props.earned ? "white":"#475569"};

`;







export const IconGroup = styled.div`

display:flex;

gap:18px;

align-items:center;

color:#475569;

`;










export const Content = styled.div`

padding:45px 20px;


`;





export const Title = styled.h1`

font-size:26px;

margin-bottom:5px;

`;





export const Description = styled.p`

color:#64748b;

font-size:13px;


`;








export const RequirementsContainer = styled.div`

display:grid;

grid-template-columns:repeat(3,1fr);

gap:18px;

margin-top:25px;


`;







export const RequirementCard = styled.div`

background:white;

border-radius:15px;

padding:20px;


height:150px;


`;








export const RequirementTitle = styled.div`

display:flex;

justify-content:space-between;


font-size:12px;


color:#64748b;


`;






export const RequirementNumber = styled.h2`

margin-top:25px;


font-size:20px;


color:${props=>props.orange ? "#ff7a00":"#111827"};



span{

font-size:14px;

color:#94a3b8;

}

`;








export const ProgressBar = styled.div`

height:6px;

background:#d9dee5;

border-radius:10px;


margin-top:15px;

`;








export const ProgressFill = styled.div`

height:100%;


width:${props=>props.width};


border-radius:10px;


background:${props=>

props.orange ? "#ff7900":

props.purple ? "#9257e8":

"#1685ff"

};

`;








export const RequirementText = styled.small`

font-size:10px;

color:#94a3b8;

display:block;

margin-top:12px;


`;









export const CertificateSection = styled.div`

margin-top:35px;


`;






export const CertificateCard = styled.div`

height:200px;

background:white;

border:1px solid #dce3ea;

border-radius:15px;


display:flex;

align-items:center;

justify-content:center;


`;






export const LockedContent = styled.div`

text-align:center;

width:350px;


`;






export const LockIcon = styled.div`

color:#94a3b8;

margin-bottom:10px;


`;







export const LockedTitle = styled.h2`

font-size:18px;

margin:5px;


`;



export const LockedText = styled.p`

font-size:11px;

color:#64748b;

line-height:1.4;


`;