import React from 'react';
import './index.css';

class Stoper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oTimeLeft: 30,
            xTimeLeft: 30,
        };
    }

    reduceByOneSec() {
        if (this.props.xIsNext) {
            this.setState({xTimeLeft: this.state.xTimeLeft - 1})
        }else{
            this.setState({oTimeLeft: this.state.oTimeLeft - 1})
        }
    }
          
    componentDidMount() {
        this.stoperInterval = setInterval(
            () => this.reduceByOneSec(),
            1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.stoperInterval);
    }
    
    render() {
        console.log('[debug] render in Stoper');
        return (
        <div>
            { this.props.xIsNext? this.state.xTimeLeft : this.state.oTimeLeft }
        </div>
        );
    }
}
          
export default Stoper;