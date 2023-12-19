import React, { useState } from "react";
import './infoButtons.css';

const InfoButton = ({ title, infoTitle, info }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className="info-button" onClick={() => setIsOpen(true)}>
                {title}
            </button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className={"modal-content-title"}>
                            <h3>{infoTitle}</h3>
                        </div>
                        <div className={"modal-content-text"}>
                            <p>{info}</p>
                        </div>
                        <button className="close-button" onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoButton;