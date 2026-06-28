import React, { useState, useEffect } from "react";
import {
  Overlay,
  ModalContainer,
  Header,
  Title,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Row,
  SubmitButton,
} from "../styles/CreateCohort.styles";


const CreateCohort = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState({
    cohortName: "",
    trainingTrack: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
  });


  const [tracks, setTracks] = useState([]);
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [trackError, setTrackError] = useState("");


  // Charger les tracks depuis le backend
  useEffect(() => {

    if (!isOpen) return;


    const fetchTracks = async () => {

      try {

        setLoadingTracks(true);
        setTrackError("");


        const response = await fetch(
          "https://acabridge-hub-1.onrender.com/api/tracks/"
        );


        if (!response.ok) {
          throw new Error("Failed to fetch tracks");
        }


        const data = await response.json();


        setTracks(data);


      } catch (error) {

        console.error("Tracks error:", error);
        setTrackError("Unable to load tracks.");

      } finally {

        setLoadingTracks(false);

      }

    };


    fetchTracks();


  }, [isOpen]);





  const handleChange = (e) => {

    const { name, value } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };





  const handleSubmit = (e) => {

    e.preventDefault();


    console.log(formData);


    onClose();

  };





  if (!isOpen) return null;




  return (
    <Overlay>

      <ModalContainer>

        <Header>

          <Title>
            Create New Cohort
          </Title>


          <CloseButton onClick={onClose}>
            ✕
          </CloseButton>


        </Header>





        <Form onSubmit={handleSubmit}>



          <FormGroup>

            <Label>
              Cohort Name <span>*</span>
            </Label>


            <Input

              type="text"

              name="cohortName"

              placeholder="Cohort 6"

              value={formData.cohortName}

              onChange={handleChange}

              required

            />

          </FormGroup>







          <FormGroup>

            <Label>
              Training Track <span>*</span>
            </Label>




            <Select

              name="trainingTrack"

              value={formData.trainingTrack}

              onChange={handleChange}

              required

            >


              <option value="">
                {
                  loadingTracks
                  ? "Loading tracks..."
                  : "Select Track"
                }
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


            {
              trackError && (
                <p className="error">
                  {trackError}
                </p>
              )
            }


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

                required

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

                required

              />


            </FormGroup>


          </Row>



          <FormGroup>

            <Label>
              Max Students <span>*</span>
            </Label>


            <Input

              type="number"

              name="maxStudents"

              placeholder="e.g 5000"

              value={formData.maxStudents}

              onChange={handleChange}

              required

            />


          </FormGroup>


          <SubmitButton type="submit">

            Create Cohort

          </SubmitButton>

        </Form>


      </ModalContainer>

    </Overlay>
  );

};


export default CreateCohort;