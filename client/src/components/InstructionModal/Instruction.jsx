import React, { useState }  from 'react'
import "./Instruction.css"

const Instruction = ({ onClose, onSave, initialInstructions }) => {

        const [text, setText] = useState(initialInstructions || "");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    onSave(text);
  };

  return (
    <div className="cooking-instructions-modal-overlay">
         <button className="close-button" onClick={onClose}>
          X
        </button>
      <div className="cooking-instructions-modal">
        <h2>Add Cooking instructions</h2>
        <textarea
          value={text}
          onChange={handleInputChange}
        />
        <p className="modal-description">
          The restaurant will try its best to follow your request. However,
          refunds or cancellations in this regard won't be possible.
        </p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default Instruction