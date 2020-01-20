import { Droppable } from 'react-beautiful-dnd';
import { ParticipantCard } from './ParticipantCard'
import React, { Component } from 'react';
import './style.css';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#007bff' : 'lightgrey',
});


export class ParticipantsLane extends Component {

    render() {
        return (
            <Droppable droppableId={this.props.teamId}>
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
                </div>
            )}
        </Droppable>
        );
    }
    
}