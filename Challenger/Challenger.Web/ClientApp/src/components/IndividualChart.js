import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width / 2} y={y + height / 2} fill="#FFFFFF" textAnchor="middle" dy={5}>{`${parseInt(value, 10)} kcal`}</text>;
};

export class IndividualChart extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { challengeData: [], loading: true, numberOfParticipants: 0 };

        fetch('api/Challenge/IndividualScores')
            .then(response => response.json())
            .then(data => {
                this.setState({ individualScores: data, loading: false, numberOfParticipants: data.length });
            });

        this.calculateChartHeight = this.calculateChartHeight.bind(this);
    }

    calculateChartHeight() {
        return (this.state.numberOfParticipants * 60)
    }

    render() {
        return (
            <div>
                <h1>Individual scores</h1>
                <ResponsiveContainer width="100%" height={this.calculateChartHeight()}>
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
                        <Bar dataKey="score" fill="#00325b" label={renderCustomBarLabel} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
