import styled from "styled-components";



export const Page = styled.div`

display:flex;

flex-direction:column;

align-items:center;

padding:40px;

background:#eef2f8;

`;





export const CertificateBox = styled.div`

position:relative;


width:1000px;

height:700px;



background:

linear-gradient(
135deg,
#ffffff,
#fafafa
);



border:12px solid #1d3f91;


outline:3px solid #d4af37;


display:flex;

flex-direction:column;

align-items:center;

justify-content:center;


text-align:center;


overflow:hidden;


box-shadow:

0 25px 60px rgba(0,0,0,.18);


`;






export const BlueCorner = styled.div`


position:absolute;


width:160px;

height:160px;


background:#1d3f91;



&.topLeft{

top:-60px;

left:-60px;

border-radius:50%;

}



&.topRight{

top:-60px;

right:-60px;

border-radius:50%;

}



&.bottomLeft{

bottom:-60px;

left:-60px;

border-radius:50%;

}



&.bottomRight{

bottom:-60px;

right:-60px;

border-radius:50%;

}


`;







/* MEDAILLE */


export const Medal = styled.div`


position:absolute;


top:35px;


width:95px;

height:95px;


background:

linear-gradient(
145deg,
#f7d774,
#c89419
);



border-radius:50%;


border:5px solid #fff;


box-shadow:

0 8px 20px rgba(0,0,0,.25);



display:flex;

align-items:center;

justify-content:center;


`;






export const MedalStar = styled.div`


font-size:45px;


color:white;


text-shadow:

0 2px 5px #8a6200;


`;







export const HeaderTitle = styled.h1`

margin-top:120px;


font-family:"Times New Roman";


font-size:65px;


letter-spacing:10px;


color:#1d3f91;


`;







export const Subtitle = styled.h2`

font-size:25px;


letter-spacing:8px;


color:#777;


`;







export const Name = styled.h1`

font-size:58px;


font-family:cursive;


font-style:italic;


color:#162d72;


margin:25px;


`;







export const Track = styled.h3`

font-size:28px;


color:#333;


`;







export const Description = styled.p`

width:650px;


font-size:18px;


line-height:1.7;


color:#555;


`;








export const Signature = styled.div`

margin-top:35px;


font-size:20px;


color:#222;


`;







export const DownloadButton = styled.button`


margin-top:30px;


padding:15px 40px;


background:#1d3f91;


color:white;


border:none;


border-radius:10px;


font-size:17px;


cursor:pointer;



`;