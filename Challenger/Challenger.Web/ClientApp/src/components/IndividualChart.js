import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';

export class IndividualChart extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { challengeData: [], loading: true };

        fetch('Challenge/GetIndividualScores')
            .then(response => response.json())
            .then(data => {
                this.setState({ individualScores: data, loading: false });
            });
    }

    render() {
        return (
            <div>
                <h1>Individual scores</h1>
                <ResponsiveContainer width="100%" height={3500}>
                    <BarChart
                        data={this.state.individualScores}
                        margin={{
                            top: 10, right: 20, left: 35, bottom: 10,
                        }}
                        layout="vertical"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number"/>
                        <YAxis dataKey="displayName" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#00325b" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
