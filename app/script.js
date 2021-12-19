import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  startTimer = this.startTimer.bind(this);
  step = this.step.bind(this);
  stopTimer = this.stopTimer.bind(this);
  state = {
    status: 'off',
    time: '',
    timer: '',
  }

  formatTime(time){
    let mins = '';
    let secs = '';

    mins = Math.floor(time / 60);
    if (mins < 10 ){
      mins = '0' + mins;
    }
    secs = time - (mins * 60);
    if (secs < 10){
      secs = '0' + secs;
    }

    const displayTime = mins + ':' + secs;
    return displayTime;
  }

  startTimer(){
    this.setState({ 
      timer: setInterval(this.step, 1000),
      status: 'on',
      time: 1200
    });
  }

  stopTimer(){
    this.setState({
      status: 'off',
      time: ''
    });
    clearInterval(this.state.timer);
  }

  step(){
    let currentTime = this.state.time;
    let currentStatus = this.state.status;
    this.setState({ time: currentTime -1 });
    if(currentTime == 0 && currentStatus == 'on') {
      this.setState({
        time: 20,
        status: 'rest',
      })
      this.playAudio();
    } else if(currentTime == 0 && currentStatus == 'rest') {
      this.setState({
        time: 1200,
        status: 'on'
      })
      this.playAudio();
    }
  }

  playAudio(){
    const sound = new Audio('./sounds/bell.wav')

    sound.play();
  }

  closeApp(){
    window.close();
  }

  render() {
    const { status } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <div><p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>}
        {(status === 'on') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));