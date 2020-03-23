import React, { PureComponent } from 'react';
import GenericProgress, { formatSnapshots }  from './GenericProgress'

export class IndividualProgress extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { individualScoreData: [] };

        fetch('api/ProgressTracking/IndividualScoreProgress')
            .then(response => response.json())
            .then(data => {
                data.forEach(formatSnapshots)
                this.setState({ individualScoreData: data });
            });
    }

    render() {
        return (
            <div>
                <h1>Individuals progress</h1>
                <GenericProgress dataSnapshots={this.state.individualScoreData} dataKey="participantName"/>
            </div>
        );
    }
}