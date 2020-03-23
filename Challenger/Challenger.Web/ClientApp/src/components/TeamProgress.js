import React, { PureComponent } from 'react';
import GenericProgress, { formatSnapshots } from './GenericProgress'

export class TeamProgress extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { teamsScoreData: [] };

        fetch('api/ProgressTracking/TeamScoreProgress')
            .then(response => response.json())
            .then(data => {
                data.forEach(formatSnapshots)
                this.setState({ teamsScoreData: data });
            });
    }

    render() {
        return (
            <div>
                <h1>Team progress</h1>
                <GenericProgress dataSnapshots={this.state.teamsScoreData} dataKey="teamName"/>
            </div>
        );
    }
}