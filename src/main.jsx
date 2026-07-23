import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Counteract device-level text zoom (e.g., 125%) before rendering
if (typeof window !== 'undefined') {
  const forceAbsoluteTextScale = () => {
    // 1. Create a temporary element to measure real rendered pixel size
    const testDiv = document.createElement('div');
    testDiv.style.fontSize = '100px';
    testDiv.style.position = 'absolute';
    testDiv.style.visibility = 'hidden';
    document.body.appendChild(testDiv);

    // 2. Read what the device zoom scaled our 100px up to (e.g., 125px)
    const renderedSize = parseFloat(window.getComputedStyle(testDiv).fontSize);
    document.body.removeChild(testDiv);

    if (renderedSize && renderedSize !== 100) {
      // 3. Calculate the inverse multiplier (e.g., 100 / 125 = 0.8)
      const multiplier = 100 / renderedSize;
      
      // 4. Multiply target base size (16px) by the inverse zoom multiplier
      const forcedRootPixelSize = 16 * multiplier;
      
      // 5. Inject the exact pixel layout calculation directly into the root element
      document.documentElement.style.setProperty('font-size', `${forcedRootPixelSize}px`, 'important');
    } else {
      // Fallback if no device zoom distortion is detected
      document.documentElement.style.setProperty('font-size', '16px', 'important');
    }
  };

  // Run the calculation immediately on script load
  if (document.body) {
    forceAbsoluteTextScale();
  } else {
    window.addEventListener('DOMContentLoaded', forceAbsoluteTextScale);
  }
  
  // Re-verify sizing scale if the screen rotates or resizes
  window.addEventListener('resize', forceAbsoluteTextScale);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
