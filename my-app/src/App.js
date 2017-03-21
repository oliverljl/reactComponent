import React from 'react'

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'time': new Date() };
    }
    getCurrentTime() {
       var that = this;
        setInterval(function() {
            var date = new Date();
            that.setState({
                'time': date
            });
        }, 1000);
    }
    componentDidMount() {
      this.getCurrentTime();
    }
    render() {
        return ( < p > current time is: {this.state.time.toLocaleTimeString()} < /p>);
    }
}

