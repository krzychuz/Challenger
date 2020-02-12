import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width / 2} y={y + height / 2} fill="#FFFFFF" textAnchor="middle" dy={5}>{`${parseInt(value, 10)} kcal`}</text>;
};

function formatScores(data) {
    data.forEach(formatScore);
}

function formatScore(teamData) {
    teamData.score = parseInt(teamData.score, 10)
}

export class Chart extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { challengeData: [], loading: true, numberOfTeams: 0 };

        fetch('api/Challenge/TeamsData')
            .then(response => response.json())
            .then(data => {
                formatScores(data);
                this.setState({ challengeData: data, loading: false, numberOfTeams: data.length });
            });

        this.calculateChartHeight = this.calculateChartHeight.bind(this);
    }

    calculateChartHeight() {
        return (this.state.numberOfTeams * 100)
    }

    render() {
        return (
            <div>
                <h1>Teams summary</h1>
                <ResponsiveContainer width="100%" height={this.calculateChartHeight()}>
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
                        <Bar dataKey="score" fill="#00325b" label={renderCustomBarLabel} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
