// FormPage.jsx

import React from 'react';
import  { useState, useEffect  } from 'react';


const FormPage = ({ children, setChildren }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    id: '',
    placeOfBirth: '',
    dateOfBirth: '',
    photo: '',
    parent: '',
  });
  
  const [error, setError] = useState('');
  const [existingIds, setExistingIds] = useState([]);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('children'));
    if (data) {
      setChildren(data);
    }
  }, [setChildren]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateOfBirth') {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(value)) {
        setError('Le format de la date de naissance doit être jj/mm/aaaa.');
      } else {
        setError('');
      }
    }
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted.');
    if (validateFormData()) {
      const childrenData = JSON.parse(localStorage.getItem('children'));
      if (childrenData) {
        const isIdExists = childrenData.some((child) => child.id === formData.id);
        if (isIdExists) {
          setError('Cet ID existe déjà. Veuillez en saisir un nouveau.');
          return;
        }
      }
      setExistingIds([...existingIds, formData.id]);
      console.log('Form submitted:', formData);
      const updatedChildren = [...children, formData];
      setChildren(updatedChildren);
      localStorage.setItem('children', JSON.stringify(updatedChildren));
      setFormData({
        firstName: '',
        lastName: '',
        id: '',
        placeOfBirth: '',
        dateOfBirth: '',
        photo: '',
        parent: '',
      });
      console.log(FormData);
    }
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
      setError('Veuillez remplir tous les champs.');
      return false;
    }
  
    if (formData.id.length !== 6) {
      setError('Le matricule doit comporter 6 caractères.');
      return false;
    }
  
    if (existingIds.includes(formData.id)) {
      setError('Cet ID existe déjà. Veuillez en saisir un nouveau.');
      return false;
    }
  
    const dateOfBirthRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateOfBirthRegex.test(formData.dateOfBirth)) {
      setError('Le format de la date de naissance doit être jj/mm/aaaa.');
      return false;
    }
  
    setError('');
    return true;
  };
  
  const parents = ['Parent 1', 'Parent 2', 'Parent 3'];
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Faites quelque chose avec le fichier ici, par exemple, téléchargez-le vers un serveur
  };
  

  
  
  
  
  
  
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* ...autres champs de formulaire */}
        <div>
      <label>
        Prénom:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </label>
    </div>
    <div>
      <label>
        Nom de famille:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </label>
    </div>
    <div>
      <label>
        ID:
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
        />
      </label>
    </div>
    <div>
      <label>
        Lieu de naissance:
        <input
          type="text"
          name="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={handleInputChange}
        />
      </label>
    </div>
    <div>
      <label>
        Date de naissance:
        <input
          type="text"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
      </label>
    </div>
    <div>
  <label>
    Photo:
    <input
      type="file"
      name="photo"
      onChange={handleFileChange}
    />
  </label>
</div>
      
      <div>
        <select name="parent" value={formData.parent} onChange={handleInputChange}>
          <option value="">Sélectionnez un parent</option>
          {parents.map((parent, index) => (
            <option key={index} value={parent}>
              {parent}
            </option>
          ))}
        </select>
        </div>
        <div>
        <button type="submit">Ajouter</button>
        </div>
      </form>
      
    </div>
  ) ;
};

export default FormPage;
