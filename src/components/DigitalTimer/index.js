// Write your code here
// Write your code here
import {Component} from 'react'
import './index.css'

const initial = {
  isRun: true,
  timeInMinutes: 25,
  timeInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initial

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onIncrement = () => {
    this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
  }

  onDecrement = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  minusAndPlusIcons = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isBtnDisable = timeInSeconds > 0

    return (
      <div className="minus-plus-container">
        <p>Set Timer limit</p>
        <div className="minus-plus-sub-container">
          <button
            type="button"
            onClick={this.onDecrement}
            disabled={isBtnDisable}
            className="minus-btn"
          >
            -
          </button>
          <div className="limit-container">
            <p>{timeInMinutes}</p>
          </div>
          <button
            type="button"
            onClick={this.onIncrement}
            disabled={isBtnDisable}
            className="minus-btn"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetButton = () => {
    this.clearTimeInterval()
    this.setState(initial)
  }

  digitalTimerIncrement = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const timeComplete = timeInSeconds === timeInMinutes * 60

    if (timeComplete) {
      this.clearTimeInterval()
      this.setState({isRun: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isRun, timeInMinutes, timeInSeconds} = this.state
    const isTimeComplete = timeInSeconds === timeInMinutes * 60
    if (isTimeComplete) {
      this.setState({timeInSeconds: 0})
    }
    if (!isRun) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.digitalTimerIncrement, 1000)
    }
    this.setState(prevState => ({isRun: !prevState.isRun}))
  }

  StartAndPauseIcon = () => {
    const {isRun} = this.state
    const pauseAndStartImage = isRun
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const pauseAndStartAlt = isRun ? 'play icon' : 'pause icon'
    const pauseAndStartText = isRun ? 'Start' : 'Pause'
    return (
      <div className="icons-container">
        <button
          type="button"
          onClick={this.onStartOrPauseTimer}
          className="timer-control-btn"
        >
          <img
            src={pauseAndStartImage}
            alt={pauseAndStartAlt}
            className="icons"
          />
          <p className="icons-text">{pauseAndStartText}</p>
        </button>
        <button
          onClick={this.onResetButton}
          type="button"
          className="timer-control-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icons"
          />
          <p className="icons-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const remaingTime = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(remaingTime / 60)
    const seconds = Math.floor(remaingTime % 60)
    const StringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const StringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${StringifiedMinutes}:${StringifiedSeconds}`
  }

  render() {
    const {isRun} = this.state
    const LabelText = isRun ? 'Paused' : 'Running'
    return (
      <div className="main-container">
        <h1>Digital Timer</h1>
        <div className="sub-container">
          <div className="img-container">
            <div className="timer-container">
              <h1 className="Timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="TimeText">{LabelText}</p>
            </div>
          </div>
          <div>
            {this.StartAndPauseIcon()}
            {this.minusAndPlusIcons()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
