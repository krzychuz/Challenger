import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const data = [
    {
        participant: 'Kuba Błachnio',
        snapshots: [
            {
                date: '2020-02-09', score: 2500
            },
            {
                date: '2020-02-10', score: 2700
            },
            {
                date: '2020-02-11', score: 5100
            },
            {
                date: '2020-02-12', score: 7600
            },
            {
                date: '2020-02-13', score: 8100
            }
        ]
    },
    {
        participant: 'Magda Kuta',
        snapshots: [
            {
                date: '2020-02-09', score: 600
            },
            {
                date: '2020-02-10', score: 950
            },
            {
                date: '2020-02-11', score: 1400
            },
            {
                date: '2020-02-12', score: 1900
            },
            {
                date: '2020-02-13', score: 2900
            }
        ]
    },
    {
        participant: 'Krzysiek Zabawa',
        snapshots: [
            {
                date: '2020-02-09', score: 1600
            },
            {
                date: '2020-02-10', score: 2950
            },
            {
                date: '2020-02-11', score: 3400
            },
            {
                date: '2020-02-12', score: 4900
            },
            {
                date: '2020-02-13', score: 5900
            }
        ]
    }
];

const CustomTooltip = ({ active, payload, label }) => {
if (active) {
    return (
    <div className="recharts-default-tooltip">
        <p className="label">{payload[0].payload.participant}</p>
        <p className="intro">{label}</p>
        <p className="desc">Score: {payload[0].payload.score}</p>
    </div>
    );
}  
return null;
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


export class IndividualProgress extends PureComponent {

    static renderChartLines(data) {
        return (
            data.map(data =>
                <Line type="monotone" name={data.participant} data={data.snapshots} dataKey="score" stroke={getRandomColor()} activeDot={{ r: 8 }} />
            )
        );
    }

    render() {

    let lines = IndividualProgress.renderChartLines(data);

    return (

        <div>
            <h1>Individuals progress</h1>
            <ResponsiveContainer width="100%" height={600}>
                <LineChart
                    margin={{
                    top: 20, right: 10, left: 10, bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" type="category" allowDuplicatedCategory={false}/>
                    <YAxis />
                    <Legend />
                    {lines}
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
    }
}
