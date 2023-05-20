import { FormLabel } from '@mui/material';
import { FormButton, FormButtons, FormContainer, FormInput, FormTitle } from '../styles/FormStyles';
import { GeneralText } from '../styles/GeneralStyles';
import { ModalClose, ModalContainer, ModalMask } from '../styles/ModalStyles';
import { useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { CreateListModalContext } from '../contexts/CreateListModalContext';
import { useNavigate } from 'react-router-dom';
import createList from '../globals/request/createList';

const initialState = {
  name: '',
  description: '',
};

const CreateListModal = () => {
  const [formData, setFormData] = useState(initialState);
  const { modalOpen, setModalOpen } = useContext(CreateListModalContext);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('doitToken');
      const tokenExp = localStorage.getItem('doitTokenExp');
      const dateNow = new Date().getTime();

      if (new Date(tokenExp).getTime() > dateNow) {
        setAccessToken(token);
      } else {
        localStorage.removeItem('doitToken');
        localStorage.removeItem('doitTokenExp');
        navigate('/');
      }
    };

    checkToken();
    return;
  }, []);

  const formHandle = (e) => {
    const { name, value } = e.target;

    setFormData((v) => ({ ...v, [name]: value }));
  };

  const closeModal = (e) => {
    e.preventDefault();

    setModalOpen(0);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { name } = formData;

    if (!name) {
      alert("Field name can't be blank.");
      return;
    }

    try {
      createList(formData);
      setModalOpen(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalMask show={modalOpen}>
      <ModalContainer show={modalOpen}>
        <ModalClose onClick={(e) => closeModal(e)}>
          <CloseIcon />
        </ModalClose>
        <FormContainer modal={1}>
          <FormTitle as="h2" className="mb-2">
            New List
          </FormTitle>
          <GeneralText className="mb-3">Fill in the fields to create a new list.</GeneralText>

          <FormLabel>List Name*:</FormLabel>
          <FormInput
            type="text"
            name="name"
            className="form-control"
            required
            onChange={(e) => formHandle(e)}
          />

          <FormLabel>List Description (optional):</FormLabel>
          <FormInput
            as="textarea"
            name="description"
            className="form-control"
            required
            onChange={(e) => formHandle(e)}
          />

          <FormButtons>
            <FormButton onClick={formSubmit}>Create</FormButton>
            <FormButton onClick={(e) => closeModal(e)}>Cancel</FormButton>
          </FormButtons>
        </FormContainer>
      </ModalContainer>
    </ModalMask>
  );
};
export default CreateListModal;
