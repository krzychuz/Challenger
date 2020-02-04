import { Droppable } from 'react-beautiful-dnd';
import { ParticipantCard } from './ParticipantCard'
import React, { Component } from 'react';
import './style.css';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#007bff' : 'lightgrey',
});

export class ParticipantsLane extends Component {

    constructor(props) {
        super(props);
        this.handleRemoveTeam = this.handleRemoveTeam.bind(this);
    }

    handleRemoveTeam() {
        fetch("api/Teams/teams/" + this.props.teamId, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
        })
            .then(() => {
                // TODO: callback to refresh teams grid instead of reloading the page
                window.location.reload();
            });
    }

    render() {
        return (
            <Droppable droppableId={String(this.props.teamId)}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="card mb-3 participant-column">
                    {this.props.teamParticipants.map(participant => (
                        <ParticipantCard
                            participantId = {participant.id}
                            participantDisplayName = {participant.displayName}
                            participantScore = {participant.score}
                        />
                    ))}
                    {provided.placeholder}
                    <button type="submit" className="btn btn-danger bottom-spacing-medium" onClick={this.handleRemoveTeam}>Delete</button>
                </div>
            )}
        </Droppable>
        );
    }
    
}