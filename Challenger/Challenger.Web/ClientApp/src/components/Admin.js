import React, { Component } from 'react';
import Board from '@lourenci/react-kanban'
import { Collapse } from 'reactstrap';
import Button from 'react-bootstrap/Button'
import './Admin.css';

export class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = { teamData: [], loading: true, isAddParticipantsOpened: false};

        this.renderBoard = this.renderBoard.bind(this);
        this.handleMoveParticipant = this.handleMoveParticipant.bind(this);
        this.handleAddParticipants = this.handleAddParticipants.bind(this);
        this.toggleAddParticipants = this.toggleAddParticipants.bind(this);
    }

    componentDidMount() {
        this.renderBoard();
     }

    // handleMoveParticipant(board, card, source, destination) {
    //     console.log(board);
    //     console.log(card);
    //     console.log(source);
    //     console.log(destination);

    //     alert("Moved participant [" + board.lanes[destination.toLaneId].cards[destination.toPosition].title
    //      + "] to team [" + board.lanes[destination.toLaneId].title + "]");
    // }

    handleMoveParticipant(card, source, destination) {
        fetch("api/Teams/teams/" + destination.toLaneId + "/participants?participantId=" + card.id, {
            method: "POST"
            })
        .then(() => {
            this.renderBoard();
        });
    }

    handleAddParticipants() {
        fetch("", {
            method: "POST"
            })
        .then(() => {

        });

    }

    toggleAddParticipants() {
        this.setState({ isAddParticipantsOpened: !this.state.isAddParticipantsOpened });
    }

    static createLanesParticipantsList(teams) {

        const cards = teams.map(team =>
            ({id: team.id,
                title: "Team " + team.id,
                cards: team.participants.map(participant => (
                    {
                    id: participant.id,
                    title : participant.displayName,
                    description : "Score: " + participant.score
                    }
                ))
            })
        );

        return(cards);
    }

    renderBoard() {
        fetch('api/Teams/teams/')
        .then(response => response.json())
        .then(data => {
            this.setState( {teamData: data, loading: false});
        })
    }

    render() {

        let board = this.state.loading ?
           { lanes: [ {id: 0, title: "Loading...", cards: [] }] } :
           { lanes: Admin.createLanesParticipantsList(this.state.teamData) };

        return (
            <div>
                <h1>New paritipants</h1>
                <div className ="text-center bottom-spacing-big">
                    <Button variant="primary" size="lg" onClick={this.toggleAddParticipants}>Add new participants</Button>
                    &nbsp;
                </div>
                <Collapse isOpen={this.state.isAddParticipantsOpened}>
                <form>
                    <div class="form-row text-center">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Endomondo challenge ID" ref="trainingDuration"/>
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary bottom-spacing-big" onClick={this.handleAddParticipants}>Add</button>
                    </div>
                    </div>
                </form>
                </Collapse>
                <h1>Participants split</h1>
                <div >
                    <Board children={board} onCardDragEnd={this.handleMoveParticipant} disableLaneDrag/>
                </div>
            </div>
        );
    }
}
