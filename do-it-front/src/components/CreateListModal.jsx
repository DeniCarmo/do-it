import createList from '../globals/request/createList';
import getToken from '../globals/request/getToken';
import { CreateListModalContext } from '../contexts/CreateListModalContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FormLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormButton, FormButtons, FormContainer, FormInput, FormTitle } from '../styles/FormStyles';
import { GeneralText } from '../styles/GeneralStyles';
import { ModalClose, ModalContainer, ModalMask } from '../styles/ModalStyles';

const initialState = {
  name: '',
  description: '',
};

const CreateListModal = ({ refreshList }) => {
  const [formData, setFormData] = useState(initialState);
  const { modalOpen, setModalOpen } = useContext(CreateListModalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) navigate('/');
  }, [navigate]);

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

    formData._id = crypto.randomUUID();

    try {
      await createList(formData);
      refreshList(true);
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

CreateListModal.propTypes = {
  refreshList: PropTypes.func,
};
export default CreateListModal;
