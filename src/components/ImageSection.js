// src/components/ImageSection.js
import React from 'react';
import '../App.css';
import defaultimage from '../assets/base/Base_chaos.png';
import defaultbackground from '../assets/base/white.png';
import './ImageSection.css';
import { useEffect, useRef } from 'react';

const ImageSection = ({ settings }) => {
  const { name, cost, might, runeList, text, image } = settings;
  // const [ red, blue, green, purple, orange, yellow ] = runeList ? runeList : [false, false, false, false, false, false];
  // Get the selected base image
  const selectedBaseImage = defaultimage;
  const canvasRef = useRef(null);

  useEffect(() => {
    const logSettings = () => {
      console.log('Settings received:', settings);
      console.log('Rune List:', runeList);
      console.log('Name:', name);
      console.log('Cost:', cost);
      console.log('Might:', might);
      console.log('Text:', text);
    };

    // Call logSettings whenever settings change
    logSettings();
    drawCard();
  });

  const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
  
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
  
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  };

  const drawCard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const backgroundImage = new Image();
    backgroundImage.src = image || defaultbackground;
    const frameImage = new Image();
    frameImage.src = defaultimage;

    backgroundImage.onload = () => {
      frameImage.onload = () => {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the base image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height/2 + 30);

        // Draw the base image
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

        // Add Name
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(name || 'Card Name', 165, 405);

        // Add Cost
        ctx.font = '40px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(cost || '0', 33, 48);

        // Add Might
        ctx.textAlign = 'left';
        ctx.fillText(might || '0', canvas.width - 50, 48);

        // Add Runes
        /*const runeStartX = canvas.width - 120;
        runeList.forEach((rune, index) => {
          if (rune) {
            ctx.fillStyle = rune.color || 'gray';
            ctx.fillRect(runeStartX + index * 25, canvas.height - 60, 20, 20);
            ctx.strokeStyle = 'white';
            ctx.strokeRect(runeStartX + index * 25, canvas.height - 60, 20, 20);
          }
        });*/

        // Add Text
        ctx.textAlign = 'left';
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        wrapText(ctx, text || 'Card text goes here...', 20, 270, 290, 20);
      };
    };
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${name || 'card'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="image-section">
      <div className="image-container-box">
        <div className="title-box">
          <h4>Image Preview:</h4>
        </div>
        <canvas
          ref={canvasRef}
          width={325}
          height={450}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'block',
            margin: '0 auto',
          }}
        />
        <button onClick={downloadCard} style={{ marginTop: '10px', width: '200px' }}>
          Download Card
        </button>
      </div>
    </div>
  );
}

export default ImageSection;