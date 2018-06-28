import React, {Component} from "react";
import {connect} from "react-redux";
import {getRecord} from "../actions/records";


// css dependencies
import './_styles/docs.scss';


class Docs extends Component {


    constructor(props) {

        super(props);

        this.state = {
            record: {
                markers: []
            }
        }
    }


    componentDidMount() {

        this.props.dispatch(getRecord(this.props.match.params.id));
    }


    componentWillReceiveProps(nextProps, props) {

        if (nextProps !== props) {

            this.state = {
                record: nextProps.record
            };
            this.setState(...this.state);
        }
    }

    render() {

        const {record} = this.state;

        return (

            <div className="main-content">

                <div className="row">

                    <div className="col-sm-7 sidearea player-div">

                        <div className="back">

                            <a href=""><i className="fa fa-angle-left"> </i></a>

                        </div>

                        <div className="player">

                            <audio src={`http://localhost:3001/${record.blob_str}`} controls>

                                <source type="audio/wav" />

                                Your Browser doesn't support this HTML Tag

                            </audio>

                        </div>

                    </div>

                </div>

                <div className="row">

                    <div className="col-sm-7 sidearea">

                        <div className="docs-wrapper">

                            <h1>Untitled Document</h1>

                            <a href="" className="dropToggle"><i className="fa fa-ellipsis-h"> </i></a>

                            <div className="timers">

                                {
                                    // console.log(record.markers)
                                    record.markers.map((value, index) => {
                                        return (
                                            <div className="timeline">
                                                <span>{value.timeConstraint}</span>{value.label}
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>

                    </div>

                    <div className="col-sm-3">

                        <div className="quicktip greenbg">

                            <a href="" className="close">x</a>

                            <h4>Quick tips:</h4>

                            <ul>

                                <li>-Ctrl+I adds italic formatting and Ctrl+B adds bold formatting</li>

                                <li>-Press ESC to play/pause, and Ctrl+j to insert the current timestamp</li>

                            </ul>

                        </div>

                        <div className="quicktip">

                            <a href="" className="close">x</a>

                            <h4>Quick tips:</h4>

                            <ul>

                                <li>-Ctrl+I adds italic formatting and Ctrl+B adds bold formatting</li>

                                <li>-Press ESC to play/pause, and Ctrl+j to insert the current timestamp</li>

                            </ul>

                        </div>

                    </div>

                    <div className="col-sm-2 sharebox">

                        <ul>

                            <li>History <span> <i className=""> </i> </span></li>

                            <li>Save to Google Drive <span> <i className=""> </i> </span></li>

                            <li>Quick tips <span> <i className=""> </i> </span></li>

                        </ul>

                    </div>

                </div>

            </div>

        );

    }


    handleError = (error) => {
        throw (error.message)
    }

}


function mapStateToProps(state) {

    const {records} = state;

    console.log(state)

    if (records) {
        return records
    }
    return {success: false};
}

export default connect(mapStateToProps)(Docs);
