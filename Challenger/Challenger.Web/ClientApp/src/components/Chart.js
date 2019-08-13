import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`value: ${value}`}</text>;
};

const challengeData = [
    {
        name: 'Drużyna Kuby', Score: 40000,
    },
    {
        name: 'Drużyna Błażeja', Score: 35000,
    },
    {
        name: 'Drużyna Fredrika', Score: 30000,
    },
    {
        name: 'Drużyna Matta', Score: 25000,
    },
    {
        name: 'Drużyna Michała', Score: 20000,
    },
    {
        name: 'Druzyna Iny', Score: 15000,
    },
    {
        name: 'Drużyna Magdy', Score: 10000,
    },
];

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

    render() {
        return (
            <div>
                <h1>Teams summary</h1>
                <BarChart
                    width={1110}
                    height={250}
                    data={challengeData}
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
                    <Bar dataKey="Score" fill="#00325b"/>
                </BarChart>
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
