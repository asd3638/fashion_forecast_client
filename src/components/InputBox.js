import styled from "styled-components/macro";
import { useState, useRef } from "react";
// import { Link } from "react-router-dom";
import Modal from "react-modal";
import Capture from "./Capture";
import { StyledBase } from "../global-styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & + & {
    margin-left: 1rem;
  }
  & .input-title {
    font-size: 1.4rem;
    letter-spacing: 0.2rem;
  }
`;
const Button = styled(StyledBase)`
  display: inline-flex;
  padding: 1rem 2rem;
  & + & {
    margin-left: 1rem;
  }
  & > i {
    margin-right: 1rem;
  }
`;
const ImageShow = styled(StyledBase)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 12rem;
  margin-bottom: 0.4rem;
  overflow: hidden;
  & .bg-img {
    position: absolute;
    width: inherit;
    height: inherit;
  }
`;
const UploadBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: black;
  border-radius: 50%;
  & .fa-plus {
    color: white;
  }
`;
const customStyles = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35rem",
    height: "15rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    border: "2.5px solid black",
    borderRadius: "1rem",
  },
};

const CameraModal = (props) => {
  const { isOpen } = props;
  return isOpen ? <Modal {...props} /> : null;
};

function InputBox({ title, kind }) {
  const imageInputRef = useRef();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [cameraModalIsOpen, setIsCameraOpen] = useState(false);
  const [preview, setPreview] = useState();

  function onImageInput(e) {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);
    // console.log(formData);
    // for (const keyValue of formData) console.log(keyValue); // ["img", File] File은 객체
    const obj = {
      image: formData,
      userId: "",
      kind: kind,
    };
    // 이미지 미리보기
    let reader = new FileReader();
    reader.onloadend = () => {
      setPreview({
        file: img,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(img);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function onImageInputBtnClick(e) {
    imageInputRef.current.click();
    closeModal();
  }
  function openCameraModal(e) {
    closeModal();
    setIsCameraOpen(true);
  }
  function closeCameraModal(e) {
    setIsCameraOpen(false);
  }
  return (
    <>
      <Wrapper>
        <input
          ref={imageInputRef}
          style={{ display: "none" }}
          type="file"
          accept="image/jpg,impge/png,image/jpeg,"
          name="image"
          onChange={onImageInput}
        />
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h1>사진을 어떻게 추가하시겠어요?</h1>
          <div>
            <Button buttonStyle onClick={onImageInputBtnClick}>
              <i class="far fa-image"></i>
              <span>앨범</span>
            </Button>
            <Button buttonStyle onClick={openCameraModal}>
              <i class="fas fa-camera"></i>
              <span>카메라</span>
            </Button>
          </div>
        </Modal>

        <CameraModal
          isOpen={cameraModalIsOpen}
          onRequestClose={closeCameraModal}
        >
          <Capture kind={kind} />
        </CameraModal>

        <ImageShow onClick={openModal}>
          {preview ? (
            <img class="bg-img" src={preview.previewURL} alt="preview" />
          ) : null}
          <UploadBtn>
            <i class="fas fa-plus"></i>
          </UploadBtn>
        </ImageShow>
        <span class="input-title">{title}</span>
      </Wrapper>
    </>
  );
}

export default InputBox;
