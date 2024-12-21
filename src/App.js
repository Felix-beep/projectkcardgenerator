import ImageSection from './components/ImageSection';
import ButtonSection from './components/ButtonSection';
import { useState } from 'react';
import './App.css';

function App() {
  const [imageSettings, setImageSettings] = useState({
    baseImage: null,
    name: '',
    cost: '',
    text: ''
  });

  // Handle setting image information from the ButtonToggle section
  const handleImageSettings = (settings) => {
    setImageSettings(settings);
  };

  return (
    <div className="App-header App">
      <div className="container">
        <ImageSection settings={imageSettings}/>
        <ButtonSection onSettingsChange={handleImageSettings}/>
      </div>
    </div>
  );
}

export default App;
