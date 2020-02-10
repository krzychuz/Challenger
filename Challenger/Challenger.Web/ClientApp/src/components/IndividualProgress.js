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

export class IndividualProgress extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { individualScoreData: [], filters: {} };

        fetch('api/ProgressTracking/IndividualScoreProgress')
            .then(response => response.json())
            .then(data => {
                this.setState({ individualScoreData: data });
            });

        this.renderFiltering = this.renderFiltering.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.renderChartLines = this.renderChartLines.bind(this);
    }

    renderChartLines() {

        let data = this.state.individualScoreData;

        return (
            data.map(data => {
                if(this.state.filters[data.participantName] == true)
                    return <Line type="monotone" name={data.participantName} data={data.dataSnapshots} dataKey="score" stroke={getRandomColor()} activeDot={{ r: 8 }} />
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

        let data = this.state.individualScoreData;
        let filters = this.state.filters;

        let listItems = data.map(data =>
            <li key={data.id}>
                <label>
                    <input type="checkbox" onChange={this.handleFilterChange} name={data.participantName} />
                    <span>  {data.participantName}</span>
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
            <h1>Individuals progress</h1>
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
