import React, {useEffect} from 'react';
import './App.scss';
import {Buttons, EventData} from "./components/Buttons";
import useLocalStorage from "./hooks/useLocalStorage";


function App() {
    const [lockLive,setLockLive] = useLocalStorage('lockLive',true)
    const [amountOfPresets,setAmountOfPresets] = useLocalStorage('amountOfPresets',10)
    const [delay,setDelay] =  useLocalStorage('delay',1000)
    const [showPreviewVideo,setShowPreviewVideo] = useLocalStorage('showPreviewVideo',true)
    const [buttonWidth,setButtonWidth] = useLocalStorage('buttonWidth',100)

    // Atemvalues
    const [liveInput, setLiveInput] = React.useState(0)
    const [previewInput, setPreviewInput] = React.useState(0)
    useEffect(()=>{
        const websocket = new WebSocket(`ws://localhost:4123/atem-events`)
        websocket.onmessage = (event)=>{
            const data = JSON.parse(event.data) as EventData
            if(data.event === "stateChanged"){
                if(data.data.video.mixEffects[0]){
                    setLiveInput(data.data.video.mixEffects[0]?.programInput)
                    setPreviewInput(data.data.video.mixEffects[0]?.previewInput)
                }
            }
        }
    },[])

  return (
    <div style={{"--width-button":buttonWidth+"px"}as any} className="App">
        {[
            {ip: "192.168.1.161", naam: "Cam 1", inputNumber: 5},
            {ip: "192.168.1.162", naam: "Cam 2", inputNumber: 6},
            {ip: "192.168.1.163", naam: "Cam 3", inputNumber: 7},
            {ip: "192.168.1.164", naam: "Cam 4", inputNumber: 8},
            {ip: "192.168.1.165", naam: "Cam 5", inputNumber: 1},

        ].map((item) => <Buttons {...item} amount={amountOfPresets || 10}  lockLive={lockLive} liveInput={liveInput} previewInput={previewInput} delay={delay} showVideo={showPreviewVideo}/>)}
        <div className={'button-group'}>
            <label>Lock Live: <input type={"checkbox"} checked={lockLive} onChange={event => setLockLive(event.currentTarget.checked)}/></label>
            <label>Aantal presets: <input type={"number"} value={amountOfPresets} onChange={event => setAmountOfPresets(event.currentTarget.valueAsNumber)}/></label>
            <label>Vertraging is screenshots: <input type={"number"} value={delay} onChange={event => setDelay(event.currentTarget.valueAsNumber)}/></label>
            <label>Laat preview tekst zien: <input type={"checkbox"} checked={showPreviewVideo} onChange={event => setShowPreviewVideo(event.currentTarget.checked)}/></label>
            <label>Grote afbeeldingen <input type={"number"} value={buttonWidth} onChange={event => setButtonWidth(event.currentTarget.valueAsNumber)}/></label>
        </div>
    </div>
  );
}

export default App;
