import React, {Component} from "react";
import RecordStep1 from "./records/RecordStep1";
import RecordStep2 from "./records/RecordStep2";
import RecordStep4 from "./records/RecordStep4";


// css design


export default class Record extends Component {


    constructor(props) {
        super(props)
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', props)
    }


    render() {

        if (this.props.match.params.component_name === 'step_one') {
            return (
                <div className="main-content">
                    <RecordStep1/>
                </div>
            )
        }

        if (this.props.match.params.component_name === 'step_two') {
            return (
                <div className="main-content">
                    <RecordStep2/>
                </div>
            )
        }

        if (this.props.match.params.component_name === 'step_four') {
            return (
                <div className="main-content">
                    <RecordStep4/>
                </div>
            )
        }

    }


}
