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

export function formatSnapshots(data) {
    data.dataSnapshots.forEach(formatSnapshot);
}

function formatSnapshot(dataSnapshot) {
    var date = new Date(dataSnapshot.date);
    dataSnapshot.date = getFormattedNumber(date.getDate()) + "." + getFormattedNumber(date.getMonth() + 1) 
        + " " + getFormattedNumber(date.getHours()) + ":" + getFormattedNumber(date.getMinutes());
    dataSnapshot.score = parseInt(dataSnapshot.score, 10)
}

function getFormattedNumber(number) {
    if (number < 10)
        return "0" + number;
    else
        return number;
}

export default class GenericProgress extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { filters: {} };


        this.renderFiltering = this.renderFiltering.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.renderChartLines = this.renderChartLines.bind(this);
    }

    renderChartLines() {
        if(this.props.dataSnapshots.length == 0)
            return;

        let data = this.props.dataSnapshots;

        return (
            data.map(data => {
                if(this.state.filters[data[this.props.dataKey]] === true)
                    return <Line type="monotone" name={data[this.props.dataKey]} data={data.dataSnapshots} dataKey="score" stroke={getRandomColor()} activeDot={{ r: 8 }} />
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

        if(this.props.dataSnapshots.length == 0)
            return;

        let data = this.props.dataSnapshots;

        let listItems = data.map(data =>
            <li key={data.id}>
                <label>
                    <input type="checkbox" onChange={this.handleFilterChange} name={data[this.props.dataKey]} />
                    <span>  {data[this.props.dataKey]}</span>
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
