import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import {

Page,
CertificateBox,
BlueCorner,
Medal,
MedalStar,
HeaderTitle,
Subtitle,
Name,
Track,
Description,
Signature,
DownloadButton

} from "../styles/Certificate.styles";



const Certificate = ({

name="DANIELLE MABOUANDA",

track="Frontend Developer",

manager="Yanis Petros",

description=

`Your engagement, professionalism,
and commitment to continuous development
are highly appreciated.

We recognize your valuable contribution
and dedication throughout the program.`

}) => {



const downloadPDF =()=>{


const element=document.getElementById("certificate");


html2canvas(element,{
scale:2
})
.then(canvas=>{


const imgData=canvas.toDataURL("image/png");


const pdf=new jsPDF(
"landscape",
"mm",
"A4"
);



pdf.addImage(
imgData,
"PNG",
10,
10,
277,
190
);



pdf.save(
`Certificate_${name}.pdf`
);


});



};




return(


<Page>


<div id="certificate">


<CertificateBox>



<BlueCorner className="topLeft"/>
<BlueCorner className="topRight"/>
<BlueCorner className="bottomLeft"/>
<BlueCorner className="bottomRight"/>



<Medal>

<MedalStar>
★
</MedalStar>

</Medal>




<HeaderTitle>

CERTIFICATE

</HeaderTitle>


<Subtitle>

OF PARTICIPATION

</Subtitle>



<p>
This certificate is presented to
</p>



<Name>

{name}

</Name>



<Track>

{track}

</Track>




<Description>

{description}

</Description>



<Signature>


____________________


<br/>

{manager}

<br/>

Manager


</Signature>




</CertificateBox>


</div>




<DownloadButton
onClick={downloadPDF}
>

Download PDF

</DownloadButton>




</Page>


)


}


export default Certificate;