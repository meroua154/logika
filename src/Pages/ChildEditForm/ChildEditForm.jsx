import React, { useState } from 'react';

const ChildEditForm = ({ child, handleUpdate }) => {
  const [formData, setFormData] = useState(child);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFormData()) {
      handleUpdate(formData);

    }
    console.log('Form submitted:', formData);
  };

  const validateFormData = () => {
    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.id === '' ||
      formData.placeOfBirth === '' ||
      formData.dateOfBirth === '' ||
      formData.parent === ''
    ) {
      alert('Veuillez remplir tous les champs.');
      return false;
    }

    if (formData.id.length !== 6) {
      alert('Le matricule doit comporter 6 caractères.');
      return false;
    }

    const dateOfBirthRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateOfBirthRegex.test(formData.dateOfBirth)) {
      alert('Le format de la date de naissance doit être jj/mm/aaaa.');
      return false;
    }

    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {/* Ajoutez les autres champs du formulaire ici */}
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default ChildEditForm;
