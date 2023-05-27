import React from 'react';

import './ToggleSwitch.css';

interface SwitchProperties {
    id: string;
    label?: string;
    onChange?: (isChecked: boolean) => void;     
    "data-on"?: string;    
    isChecked?: boolean;    
    "data-off"?: string;    
    description?: string;
}

const ToggleSwitch: React.FC<SwitchProperties> = props => {
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event.target.checked);
    };

    const labelId = `label-${props.id}`;
    const descriptionId = `description-${props.id}`;

    const labelBy = labelId + ' ' + descriptionId;
    
    return (
        <label htmlFor={props.id} className="switch">
            <input
                id={props.id}
                type="checkbox"
                className="btn-secondary"
                role="switch"
                data-on={props['data-on']}
                checked={props.isChecked}
                data-off={props['data-off']}
                onChange={onChange}
                aria-checked={props.isChecked}
                aria-labelledby={labelBy}
            />
            <div className="switch-labels">
                <span id={labelId}>{props.label}</span>
                {props.description &&
                    <p id={descriptionId}>{props.description}</p>
                }
            </div>
        </label>
    );
}

ToggleSwitch.defaultProps = {
    "data-on": 'ON',
    "data-off": 'OFF'
}

export default ToggleSwitch;