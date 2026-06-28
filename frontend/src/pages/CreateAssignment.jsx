import React, { useState, useEffect } from "react";
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Row,
  TextArea,
  UploadBox,
  UploadIcon,
  UploadText,
  UploadHint,
  ButtonContainer,
  DraftButton,
  PublishButton,
} from "../styles/CreateAssignment.styles";

import { FiX, FiUploadCloud } from "react-icons/fi";

export default function CreateAssignment({ open, onClose }) {


  const [formData, setFormData] = useState({
    title: "",
    track: "",
    startDate: "",
    endDate: "",
    description: "",
    file: null,
  });


  const [tracks, setTracks] = useState([]);



  // récupération des tracks depuis Render
  useEffect(() => {

    if (!open) return;


    const fetchTracks = async () => {

      try {

        const response = await fetch(
          "https://acabridge-hub-1.onrender.com/api/tracks/"
        );


        const data = await response.json();


        setTracks(data);


      } catch (error) {

        console.error("Error loading tracks:", error);

      }

    };


    fetchTracks();


  }, [open]);





  if (!open) return null;




  const handleChange = (e) => {

    const { name, value } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };





  const handleFile = (e) => {

    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));

  };





  const handleDraft = () => {

    console.log("Draft :", formData);

  };





  const handlePublish = () => {

    console.log("Publish :", formData);

  };




  return (
    <Overlay onClick={onClose}>

      <Modal onClick={(e) => e.stopPropagation()}>

        <Header>

          <Title>
            Create Assignment
          </Title>


          <CloseButton onClick={onClose}>

            <FiX size={18} />

          </CloseButton>


        </Header>





        <Form>


          <FormGroup>

            <Label>
              Assignment Title <span>*</span>
            </Label>


            <Input

              type="text"

              name="title"

              placeholder="add a title"

              value={formData.title}

              onChange={handleChange}

            />


          </FormGroup>








          <FormGroup>

            <Label>
              Select Track <span>*</span>
            </Label>




            <Select

              name="track"

              value={formData.track}

              onChange={handleChange}

            >


              <option value="">
                Select Track
              </option>



              {
                tracks.map((track) => (

                  <option

                    key={track.id}

                    value={track.id}

                  >

                    {track.name}

                  </option>


                ))
              }


            </Select>


          </FormGroup>








          <Row>

            <FormGroup>

              <Label>
                Start Date <span>*</span>
              </Label>


              <Input

                type="date"

                name="startDate"

                value={formData.startDate}

                onChange={handleChange}

              />


            </FormGroup>





            <FormGroup>

              <Label>
                End Date <span>*</span>
              </Label>


              <Input

                type="date"

                name="endDate"

                value={formData.endDate}

                onChange={handleChange}

              />


            </FormGroup>


          </Row>







          <FormGroup>

            <Label>
              Description
            </Label>


            <TextArea

              rows={5}

              name="description"

              placeholder="typing..."

              value={formData.description}

              onChange={handleChange}

            />


          </FormGroup>








          <FormGroup>

            <Label>
              File Size <span>*</span>
            </Label>


            <UploadBox>


              <input

                type="file"

                id="upload"

                hidden

                onChange={handleFile}

              />



              <label htmlFor="upload">


                <UploadIcon>

                  <FiUploadCloud size={24} />

                </UploadIcon>



                <UploadText>

                  Click to upload

                  <span>
                    {" "}or drag and drop
                  </span>

                </UploadText>



                <UploadHint>

                  SVG, PNG, JPG or GIF (max. 800×400px)

                </UploadHint>



              </label>


            </UploadBox>


          </FormGroup>







          <ButtonContainer>


            <DraftButton type="button" onClick={handleDraft}>

              Save as Draft

            </DraftButton>





            <PublishButton type="button" onClick={handlePublish}>

              Publish Assignment

            </PublishButton>



          </ButtonContainer>



        </Form>


      </Modal>

    </Overlay>
  );

}