import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import './style.css';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function formatSnapshots(data) {
    data.dataSnapshots.forEach(formatSnapshot);
}

function formatSnapshot(dataSnapshot) {
    var date = new Date(dataSnapshot.date);
    dataSnapshot.date = date.getDate() + "." + getFormattedMonth(date.getMonth() + 1) 
        + " " + date.getHours() + ":" + date.getMinutes();
    dataSnapshot.score = parseInt(dataSnapshot.score, 10)
}

function getFormattedMonth(month) {
    if (month < 10)
        return "0" + month;
    else
        return month;
}

export class TeamProgress extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { teamScoreData: [], filters: {} };

        fetch('api/ProgressTracking/TeamScoreProgress')
            .then(response => response.json())
            .then(data => {
                data.forEach(formatSnapshots)
                this.setState({ teamScoreData: data });
            });

        this.renderFiltering = this.renderFiltering.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.renderChartLines = this.renderChartLines.bind(this);
    }

    renderChartLines() {

        let data = this.state.teamScoreData;

        return (
            data.map(data => {
                if(this.state.filters[data.teamName] === true)
                    return <Line type="monotone" name={data.teamName} data={data.dataSnapshots} dataKey="score" stroke={getRandomColor()} activeDot={{ r: 8 }} />
            })
        );
    }

    handleFilterChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var newFilters = this.state.filters;
        newFilters[name] = value;

        this.setState({
            filters: {...newFilters}
        });
    }

    renderFiltering() {

        let data = this.state.teamScoreData;

        let listItems = data.map(data =>
            <li key={data.id}>
                <label>
                    <input type="checkbox" onChange={this.handleFilterChange} name={data.teamName} />
                    <span>  {data.teamName}</span>
                </label>
            </li>
        );

        return (
            <div className= "container">
            <div className="row">
                <div className="col-12">
                    <ul className="filter-list">
                        {listItems}
                    </ul>
                </div>
            </div>
            </div>
        );
    }

    render() {

    let lines = this.renderChartLines();
    let filters = this.renderFiltering();

    return (
        <div>
            <h1>Team progress</h1>
            <h2>Filters</h2>
            {filters}
            <h2>Chart</h2>
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
