import React, { Component } from 'react';

export class TeamsSplit extends Component {
    static displayName = TeamsSplit.name;

    constructor(props) {
        super(props);
        this.state = { challengeData: [], loading: true };

        fetch('api/Challenge/GetTeamsSplit')
            .then(response => response.json())
            .then(data => {
                this.setState({ challengeData: data, loading: false });
            });
    }

    static renderchallengeDataTable(challengeData) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>First name</th>
                        <th>Last name</th>
                    </tr>
                </thead>
                <tbody>
                    {challengeData.map(challengeData =>
                        <tr key={challengeData.teamNumber}>
                            <td>{challengeData.teamNumber}</td>
                            <td>{challengeData.first_name}</td>
                            <td>{challengeData.last_name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TeamsSplit.renderchallengeDataTable(this.state.challengeData);

        return (
            <div>
                <h1>Teams split</h1>
                {contents}
            </div>
        );
    }
}
