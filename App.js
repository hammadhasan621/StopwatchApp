import React, { useState } from 'react'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './App.css'

function App() {

  const [time,setTime] = useState({msec:0,sec:0,min:0,hour:0})
  const [inter,setInter] = useState()
  const [status,setStatus] = useState(false)
  const [pausestatus,setpauseStatus] = useState(false)


  let updatems = time.msec, updatesec = time.sec, updatemin = time.min, updatehour = time.hour;
  
  const start = () => {
    run()
    setInter(setInterval(run,10))
    setStatus(true)
  }

  const stop = () =>{
    setpauseStatus(true)
    clearInterval(inter)
  }

  const resume = () => {
    setpauseStatus(false)
    run()
    setInter(setInterval(run,10))
  }

  const reset = () => {
    clearInterval(inter)
    setStatus(false)
    setpauseStatus(false)
    setTime({msec:0,sec:0,min:0,hour:0})
  }

  const run = () => {
    if(updatems === 99){
      updatems = 0
      updatesec++
    }
    if(updatesec === 60){
      updatesec = 0
      updatemin++ 
    }
    if(updatemin === 60){
      updatemin = 0
      updatehour++
    }
    updatems++
    return setTime({msec:updatems,sec:updatesec,min:updatemin,hour:updatehour})
  } 

  

  return (
    <>
      <div className="counter">
        <div className="mycounter">
        <div className="counter-display">
          <span>{(time.hour >= 10)? time.hour : "0" + time.hour}:</span> 
          <span>{(time.min >= 10)? time.min : "0" + time.min}:</span>
          <span>{(time.sec >= 10)? time.sec : "0" + time.sec}:</span>
          <span>{(time.msec >= 10)? time.msec : "0" + time.msec}</span>        
        </div>
        <div className="counter-control">
          {(status)?
          <div>
            {(pausestatus)?
              <button onClick={resume} className="resume"><PlayArrowIcon /></button>:
              <button onClick={stop} className="stop"><PauseIcon /></button>
            }
            <button onClick={reset} className="reset"><RotateLeftIcon /></button>
          </div> : 
          <button onClick={start} className="start"><PlayArrowIcon /></button>
          }
          
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
