import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import Button from 'react-bootstrap/Button'
import './style.css'

export class AddTeam extends Component {

    constructor(props) {
        super(props);

        this.state = { isAddTeamOpened: false };
        this.toggleAddTeams = this.toggleAddTeams.bind(this);
        this.handleAddTeam = this.handleAddTeam.bind(this);
        this.teamName = React.createRef();
    }

    toggleAddTeams() {
        this.setState({ isAddTeamOpened: !this.state.isAddTeamOpened });
    }

    handleAddTeam() {
        fetch("api/Teams/teams", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name: this.teamName.current.value,
              })
        })
            .then(() => {
                // TODO: callback to refresh teams grid
            });
    }

    render() {
        return (
            <div>
                <div className="text-center bottom-spacing-medium">
                    <Button variant="primary" size="lg" onClick={this.toggleAddTeams}>Add new team</Button>
                    &nbsp;
            </div>
                <Collapse isOpen={this.state.isAddTeamOpened}>
                    <form>
                        <div className="form-row text-center">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Team name" ref={this.teamName} />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary bottom-spacing-medium" onClick={this.handleAddTeam}>Add</button>
                            </div>
                        </div>
                    </form>
                </Collapse>
            </div>
        );
    }

}