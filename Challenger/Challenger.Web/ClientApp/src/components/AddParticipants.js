import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import Button from 'react-bootstrap/Button'
import './style.css'

export class AddParticipants extends Component {

    constructor(props) {
        super(props);

        this.state = { isAddParticipantsOpened: false };
        this.toggleAddParticipants = this.toggleAddParticipants.bind(this);
    }

    toggleAddParticipants() {
        this.setState({ isAddParticipantsOpened: !this.state.isAddParticipantsOpened });
    }

    render() {
        return (
            <div>
                <div className="text-center bottom-spacing-medium">
                    <Button variant="primary" size="lg" onClick={this.toggleAddParticipants}>Add new participants</Button>
                    &nbsp;
            </div>
                <Collapse isOpen={this.state.isAddParticipantsOpened}>
                    <form>
                        <div className="form-row text-center">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Endomondo challenge ID" ref="trainingDuration" />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary bottom-spacing-medium" onClick={this.handleAddParticipants}>Add</button>
                            </div>
                        </div>
                    </form>
                </Collapse>
            </div>
        );
    }

}