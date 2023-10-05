import { useEffect, useMemo } from 'react';
import Button from '../../UI/Button';
import "./InstructionsModal.css";

const MODAL_ACTIVE_CLASS = 'modal-overlay-active';

const InstructionsModal = (props) => {
    const { isOpen, onClose } = props;
    
    const bodyClassList = useMemo(() => document.body.classList, []);
    
    useEffect(() => {
        isOpen ? bodyClassList.add(MODAL_ACTIVE_CLASS) : bodyClassList.remove(MODAL_ACTIVE_CLASS);
        
        return () => {
            bodyClassList.remove(MODAL_ACTIVE_CLASS);
        };
    }, [isOpen, bodyClassList]);
    
    const handleOverlayClick = () => {
        onClose();
    };
    
    const handleContentClick = (event) => {
        event.stopPropagation();
    };
    
    return (
        isOpen && (
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content" onClick={handleContentClick}>
                    <h2 className="modal-title">How to Use</h2>
                    <ol>
                        <li><span className="keyword">Draw Walls: </span>Click or drag on nodes to make walls.</li>
                        <li><span className="keyword">Remove Walls: </span>Click on walls to remove them.</li>
                        <li><span className="keyword">Visualize Algorithm: </span> Click 'Visualize Path' to run
                            algorithm.
                        </li>
                        <li><span className="keyword">Clear Grid: </span>Click 'Clear Grid' to reset.</li>
                    </ol>
                    <Button variant="modal-close-button button-primary" onClick={onClose}>Close</Button>
                </div>
            </div>
        )
    );
};

export default InstructionsModal;
