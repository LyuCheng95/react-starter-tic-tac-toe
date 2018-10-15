import React from 'react';
import './index.css';

class StopButton extends React.Component {
    render() {
        return(
            <button
                onClick = { () => this.props.onClick() }
            >
                Stop!
            </button>
        );
    }
}

export default StopButton;