import './Admin.css';
import { Draggable } from 'react-beautiful-dnd';
import React, { Component } from 'react';

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});

export class ParticipantCard extends Component {

    render() {
        return (
            <Draggable
            key={this.props.participantId}
            draggableId={this.props.participantId}
            index={this.props.participantId}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    className="card bg-light mb-3 participant-card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.participantDisplayName}</h5>
                        <p className="card-text">Score: {this.props.participantScore}</p>
                    </div>
                </div>
            )}
        </Draggable>
        );
    }

}