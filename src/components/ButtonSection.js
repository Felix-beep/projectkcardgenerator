import React, { useState, useEffect } from 'react';
import './ButtonSection.css';

const ButtonSection = ({ onSettingsChange }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [might, setMight] = useState('');
  const [selectedButtons, setSelectedButtons] = useState([false, false, false, false, false, false]);
  const [textField, setTextField] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const Runes = [
    { name: 'Calm', color: '#2ecc71', greyed: '#88b78b' }, // Green
    { name: 'Mental', color: '#3498db', greyed: '#7fa8b5' }, // Blue
    { name: 'Chaotic', color: '#8e44ad', greyed: '#8c5f8b' }, // Purple
    { name: 'Physical', color: '#f37712', greyed: '#f3bd94' }, // Orange
    { name: 'Order', color: '#f39c12', greyed: '#d1a35b' }, // Yellow
    { name: 'Fury', color: '#e74c3c', greyed: '#b76b6b' }, // Red
  ];

  // Update the parent settings whenever any local state changes
  useEffect(() => {
    onSettingsChange({
      name,
      cost,
      might,
      runeList: selectedButtons,
      text: textField,
      image: uploadedImage,
    });
  }, [name, cost, might, selectedButtons, textField, uploadedImage, onSettingsChange]);

  const handleButtonClick = (index, event) => {
    event.preventDefault();
    const updatedSelection = [...selectedButtons];
    updatedSelection[index] = !updatedSelection[index]; // Toggle the selected state
    setSelectedButtons(updatedSelection);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/png', 'image/jpeg'];
      if (!validImageTypes.includes(file.type)) {
        alert('Please upload a valid image file (PNG or JPG).');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Store the uploaded image as a data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="button-section">
      <form>
        {/* Box for Name Input */}
        <div className="container-box">
          <div className="title-box">
            <h4>Name</h4>
          </div>
          <div className="input-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
        </div>

        {/* Box for Cost Input */}
        <div className="container-box">
          <div className="title-box">
            <h4>Cost</h4>
          </div>
          <div className="input-box">
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="Enter cost"
            />
          </div>
        </div>

        {/* Box for Might Input */}
        <div className="container-box">
          <div className="title-box">
            <h4>Might</h4>
          </div>
          <div className="input-box">
            <input
              type="number"
              value={might}
              onChange={(e) => setMight(e.target.value)}
              placeholder="Enter might"
            />
          </div>
        </div>

        {/* Box for Checkboxes */}
        <div className="container-box">
          <div className="title-box">
            <h4>Colour</h4>
          </div>
          <div className="input-box list">
            {selectedButtons.map((selected, index) => (
              <div className="button" key={index} style={{ marginBottom: '10px' }}>
                <button
                  onClick={(event) => handleButtonClick(index, event)}
                  style={{
                    backgroundColor: selected ? Runes[index].color : Runes[index].greyed, // Grey if not selected
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s', // Smooth transition
                  }}
                >
                  {Runes[index].name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Box for Text Field */}
        <div className="container-box">
          <div className="title-box">
            <h4>Text</h4>
          </div>
          <div className="input-box">
            <input
              type="text"
              value={textField}
              onChange={(e) => setTextField(e.target.value)}
              placeholder="Enter additional text"
            />
          </div>
        </div>

        {/* Box for Image Upload */}
        <div className="container-box">
          <div className="title-box">
            <h4>Upload Image</h4>
          </div>
          <div className="input-box">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ButtonSection;
