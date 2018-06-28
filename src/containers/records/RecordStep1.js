import React, {Component} from "react";
import {Link} from 'react-router-dom';

// ui components
import Chip from '@material-ui/core/Chip';

// view dependencies
import "../_styles/record_step1.scss";






export default class RecordStep1 extends Component {


    state = {
        chipData: [
            {label: 'Angular'},
            {label: 'jQuery'}
        ],
    };


    render() {

        return (

            <div className="row record-step1">

                <div className="offset-sm-3 col-sm-6">

                    <div className="card text-center single">

                        <div className="card-header">

                            <label className="step-count">STEP 1 of 3</label>

                            <h2>Choose your markers</h2>

                        </div>

                        <div className="card-block">

                            <p>Add up to six markers to use throughout your audio recording then begin your
                                interview.</p>

                            <div className="input-group">

                                <label>Add a new marker</label>

                                <input ref="marker" className="form-control" onKeyPress={this.addMarker}/>

                            </div>


                            <div className="chip-sec">

                                {
                                    this.state.chipData.map(data => {

                                        return (
                                            <Chip label={data.label} onDelete={this.handleDelete(data)}
                                                  className='chip'/>
                                        );
                                    })
                                }

                            </div>

                            <button onClick={ () => this.props.history.push('/records/step_two')} className="btn btn-primary">Next Step</button>

                        </div>

                        <div className="card-footer">

                            <Link to='/records/step_two'> Skip this step </Link>

                        </div>

                    </div>

                </div>

            </div>
        );
    }



    handleDelete = data => () => {

        const chipData = [...this.state.chipData];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.setState({chipData});
    };


    addMarker = (e) => {

        if (e.key === 'Enter') {
            this.state.chipData.push({label: this.refs.marker.value});
            this.refs.marker.value = null;
            this.setState(this.state);
        }
    };


}
