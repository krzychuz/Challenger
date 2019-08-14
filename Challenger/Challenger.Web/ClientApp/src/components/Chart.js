import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const top3WomanData = [
    {
        name: 'Ina', Score: 10000,
    },
    {
        name: 'Viktoria', Score: 8500,
    },
    {
        name: 'Magda', Score: 7000,
    },
];

const top3ManData = [
    {
        name: 'Kuba', Score: 10000,
    },
    {
        name: 'Błażej', Score: 8500,
    },
    {
        name: 'Kamil', Score: 7000,
    },
];

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
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={this.state.challengeData}
                        width={1110}
                        height={150}
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
                <h1>Top 3 - Woman</h1>
                <BarChart
                    width={1110}
                    height={150}
                    data={top3WomanData}
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
                    <Bar dataKey="Score" fill="#00325b" />
                </BarChart>
                <h1>Top 3 - Man</h1>
                <BarChart
                    width={1110}
                    height={150}
                    data={top3ManData}
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
                    <Bar dataKey="Score" fill="#00325b" />
                </BarChart>
            </div>
        );
    }
}
