import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export class Chart extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { challengeData: [], loading: true };

        fetch('Challenge/GetTeamsData')
            .then(response => response.json())
            .then(data => {
                this.setState({ challengeData: data, loading: false });
            });
    }

    render() {
        return (
            <div>
                <h1>Teams summary</h1>
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        data={this.state.challengeData}
                        margin={{
                            top: 10, right: 20, left: 20, bottom: 10,
                        }}
                        layout="vertical"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#00325b"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
