import React from 'react';
import './index.css';

class StarterButton extends React.Component {
    render() {
        return(
            <button
                onClick = { () => this.props.onClick() }
            >
                Start!
            </button>
        );
    }
}

export default StarterButton;