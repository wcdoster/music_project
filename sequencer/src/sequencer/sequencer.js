import React, { Component } from 'react'
import './sequencer.css'
import Sequence from './sequence'
// const Sound = require('react-sound').default

export default class Sequencer extends Component {

    state = {
        beat: [],
        highHat: [],
        snare: [],
        kick: [],
        tom: [],
        crash: [],
        ride: [],
        buttonText: "Play",
        interval: "",
        i: 0,
        bpm: 120,
        beats: 8
    }

    componentDidMount(){
        this.setBeats()
    }

    buttonFunctionToggle = function () {
        if (this.state.buttonText === "Play") {
            return this.play
        } else {
            return this.stop
        }
    }.bind(this)

    interval = function (stateItems, audioFiles) {
        let i = 0
        const beatIndex = this.state.beats - 1
        const interval = setInterval(() => {
            this.setState({
                i: i
            })
            let dot = document.getElementById(`dot_${i}`)
            if (i === 0) {
                if (document.getElementById(`dot_${beatIndex}`).textContent) {
                    document.getElementById(`dot_${beatIndex}`).textContent = ''
                }
            } else {
                if (document.getElementById(`dot_${i - 1}`).textContent) {
                    document.getElementById(`dot_${i - 1}`).textContent = ''
                }
            }
            dot.textContent = '.'
            stateItems.forEach(item => {
                if (this.state[item][i] === true) {
                    const audio = new Audio(audioFiles[item])
                    // audio.play()
                    // console.log(audio)
                    console.log(audio)
                }
            })
            if (i === this.state.beats - 1) {
                i = 0
            } else {
                i++
            }
        }, 60000 / this.state.bpm)
        this.setState({
            interval: interval,
        })
    }

    play = function () {
        document.getElementById("bpm").disabled = true
        document.getElementById("beats").disabled = true
        this.setState({
            buttonText: "Stop"
        })
        const stateItems = ["highHat", "snare", "kick", "tom", "crash", "ride"]
        const audioFiles = {
            "highHat": './sounds/hihat.wav',
            "snare": 'sounds/Acoustic_Snare-01.wav.wav',
            "kick": './sounds/kick.wav',
            "tom": './sounds/tom.wav',
            "ride": './sounds/ride.wav'
        }
        this.interval(stateItems, audioFiles)
    }.bind(this)

    stop = function () {
        document.getElementById("bpm").disabled = false
        document.getElementById("beats").disabled = false
        clearInterval(this.state.interval)
        document.getElementById(`dot_${this.state.i}`).textContent = ''
        this.setState({
            buttonText: "Play"
        })
    }.bind(this)

    radioClick = function (e) {
        const item = e.target
        const parentIdSplit = item.parentNode.id.split('_')
        const stateItem = parentIdSplit[0]
        const index = parentIdSplit[1]
        if (item.checked === true) {
            let array = this.state[stateItem]
            array[index] = true
            this.setState({
                [stateItem]: array
            })
        } else {
            let array = this.state[stateItem]
            array[index] = false
            this.setState({
               [stateItem]: array
            })
        }
    }.bind(this)

    setBPM = function () {
        const value = document.getElementById("bpm").value
        this.setState({
            bpm: value
        })
    }.bind(this)

    setBeats = function () {
        const beats = document.getElementById("beats").value
        // let array = []
        let beatArray = []
        for (let i = 1; i <= beats; i++) {
            beatArray.push(i)
        }
        this.setState({
            beats: parseInt(beats),
            beat: beatArray
        })
        const stateItems = ["highHat", "snare", "kick", "tom", "crash", "ride"]
        for (let item in this.state) {
            if (stateItems.indexOf(item) > -1) {
                let newArray = this.state[item].slice()
                if (newArray.length < parseInt(beats) - 1) {
                    for (let i = newArray.length; i < parseInt(beats); i++) {
                        newArray.push(false)
                    }
                    this.setState({
                        [item]: newArray
                    })
                } else {
                    const newerArray = newArray.slice(0, parseInt(beats))
                    this.setState({
                        [item]: newerArray
                    })
                }
            }
        }
    }.bind(this)

    render() {
        return (

            <div id="sequencer">
                <audio id="audio_highHat" src="./sounds/hihat.wav" />
                <audio id="audio_kick" src="sounds/kick.wav"></audio>
                <audio id="audio_ride" src="sounds/ride.wav"></audio>
                <audio id="audio_snare" src="sounds/Acoustic_Snare-01.wav"></audio>
                <audio id="audio_tom" src="sounds/tom.wav"></audio>
                <div id="beat">
                    <h6></h6>
                    {this.state.beat.map(beat => {
                        return (
                            <p>{beat}</p>
                        )
                    })}
                </div>
                <div id="dot">
                    <h6></h6>
                    {this.state.beat.map((beat, i) => {
                        return (
                            <p id={'dot_' + i} key={i}></p>
                        )
                    })}
                </div>
                <Sequence state={this.state.highHat} instrument="highHat" title="High Hat" radioClick={this.radioClick} />
                <Sequence state={this.state.snare} instrument="snare" title="Snare" radioClick={this.radioClick} />
                <Sequence state={this.state.kick} instrument="kick" title="Kick" radioClick={this.radioClick} />
                <Sequence state={this.state.tom} instrument="tom" title="Tom" radioClick={this.radioClick} />
                <Sequence state={this.state.crash} instrument="crash" title="Crash" radioClick={this.radioClick} />
                <Sequence state={this.state.ride} instrument="ride" title="Ride" radioClick={this.radioClick} />

                <button type="play" onClick={this.buttonFunctionToggle()}>{this.state.buttonText}</button>
                <input id="bpm" type="text" defaultValue="120" onChange={this.setBPM} />
                <select id="beats" onChange={this.setBeats}>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="24">24</option>
                    <option value="32">32</option>
                </select>
            </div>
        )
    }
}