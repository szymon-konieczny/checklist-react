import React from 'react';
import Option from './Option';

const Action = (props) => (
        <div>
            <button 
                onClick = { props.handlePick } 
                disabled = { !props.hasOptions }
                className = "big-button"
            >
                Get the task to do first!
            </button>
        </div>   
    );
    
export default Action;