import React, {Component} from "react";
import AudioRecorder from 'react-audio-recorder';
import Timer from '../../../node_modules/easytimer.js/dist/easytimer';
import {connect} from "react-redux";
import {saveRecord} from "../../actions/records";

// ui components
import Chip from '@material-ui/core/Chip';

// css design
import "../_styles/record_step4.scss";





class RecordStep4 extends Component {


    timerInstance = null;


    constructor(props) {
        super(props);
        this.state = {
            recordTimer: `00:00`,
            audioStr: null,
            timeStamps: localStorage.chipData?JSON.parse(localStorage.chipData):[],
            audioUrl: null
        };
    }


    componentDidMount() {

        this.timerInstance = new Timer();
        const $this = this;

        this.timerInstance.addEventListener('secondsUpdated', function (e) {

            let timeVal = e.detail.timer.getTimeValues();

            $this.setState({
                ...this.state, ...{recordTimer: `${(timeVal.minutes >= 10) ? timeVal.minutes : '0' + timeVal.minutes}:${(timeVal.seconds >= 10) ? timeVal.seconds : '0' + timeVal.seconds}`}
            })
        });
    }


    componentWillReceiveProps(props) {

        console.log('---------------------PRPOD-', props)


        if(props.record.success) {
            props.history.push(`/docs/${props.record.data._id}`)
        }
    }


    render() {
        
        const {recordTimer, timeStamps, audioStr} = this.state;

        return (

            <div className="main-content">

                <div className="row record-step4">

                    <div className="offset-sm-3 col-sm-6">

                        <div className="card text-center single">

                            <div className="beta-tag">Beta</div>

                            <div className="card-header">

                                <label className="step-count">STEP 4 of 4</label>

                                <h2>Record your interview</h2>

                            </div>

                            <div className="card-block">

                                <div className="form-group d-flex justify-content-center mt-3">

                                <div className="record-sec">

                                    <AudioRecorder
                                        onRecordStart={this.onRecordingStart}
                                        onChange={this.recordingBufferEvent}
                                        recordingLabel='✖ Stop'
                                        removeLabel={false}
                                        downloadLabel={false}
                                        playLabel={false}
                                    />
                                </div>

                                    <div className="timer">{recordTimer}</div>
                                </div>

                                    <div className="input-group mt-4">

                                        <label>Add a new marker</label>

                                        <input ref="marker" className="form-control" onKeyPress={this.addMarker} placeholder="Enter text to add a new marker" />

                                        <span><i className="material-icons">add</i></span>

                                    </div>


                                    <div className="chip-sec">

                                        {
                                            timeStamps.map(data => {

                                                return (
                                                    <Chip label={data.label} onClick={this.addTimestamp(data.label)} onDelete={this.deleteMarker(data)}
                                                          className='chip'/>
                                                );
                                            })
                                        }

                                    </div>


                                </div>

                                <button disabled={!audioStr} onClick={ ()=> this.props.dispatch(saveRecord(this.state))} className="btn btn-primary">Save my interview</button>

                                <div className="card-footer">

                                    <a href="">Skip this step</a>

                                </div>

                            </div>


                        </div>

                    </div>

                </div>

        );

    }


    onRecordingStart = () => this.timerInstance.start();


    recordingBufferEvent = (AudioRecorderChangeEvent) => {

        const fileReader = new FileReader();
        fileReader.readAsDataURL(AudioRecorderChangeEvent.audioData);

        fileReader.onload = () => {
            this.setState({
                ...this.state, ...{audioStr: fileReader.result, audioUrl: URL.createObjectURL(AudioRecorderChangeEvent.audioData)}
            });
            this.timerInstance.stop();
        }
    };


    addMarker = (e) => {

        const chipValues = [...this.state.timeStamps, ...[{ timeConstraint: this.state.recordTimer, label: this.refs.marker.value }]];

        if (e.key === 'Enter') {

            this.setState({...this.state, ...{timeStamps: chipValues}});
            this.refs.marker.value = null;
        }
    };

    addTimestamp = data => () => {
        //For adding timestamp with the marker
        console.log(data)
    }


    deleteMarker = data => () => {
        this.state.timeStamps.splice(this.state.timeStamps.indexOf(data), 1);
        this.setState(this.state)
    }


}


function mapStateToProps(state) {

    const {records} = state;

    if (records) {
        return records
    }
    return {success: false};
}


export default connect(mapStateToProps)(RecordStep4);