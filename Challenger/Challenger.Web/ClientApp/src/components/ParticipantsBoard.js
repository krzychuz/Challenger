import { ParticipantsLane } from './ParticipantsLane'
import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './style.css';

const createParticipantsList = (teamsData) => {
    const teams = teamsData.map(team =>
        (
            <div className="margin-grid">
                <h3>Team {team.id}</h3>
                <ParticipantsLane teamId={team.id} teamParticipants={team.participants} />
            </div>
        )
    );

    return (teams);
}

export class ParticipantsBoard extends Component {

    constructor(props) {
        super(props);
        this.state = { participantsList: [] };
    }

    componentDidMount() {
        this.fetchTeams();
    }

    fetchTeams = () => {
        fetch('api/Teams/teams')
            .then(response => response.json())
            .then(data => {
                this.setState({ participantsList: createParticipantsList(data) })
            });
    }

    onDragEnd = result => {
        const { source, destination, draggableId } = result;

        // Participant dropped outside the list, do nothing
        if (!destination) {
            return;
        }

        // Participant moved within its own team, reorder cards
        if (source.droppableId === destination.droppableId) {
            // TODO: Handle reordering without actual API call
        } else {
            this.handleMoveParticipant(draggableId, destination.droppableId)
        }
    };

    handleMoveParticipant(participant, destination) {
        // TODO: Find better way to create query string
        fetch("api/Teams/teams/" + destination + "/participants?participantId=" + participant, {
            method: "POST"
        })
            .then(() => {
                this.fetchTeams();
            });
    }

    render() {
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="row">
                        {this.state.participantsList}
                    </div>
                </DragDropContext>
            </div>
        );
    }
}