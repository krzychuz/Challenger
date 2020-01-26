import { Draggable } from 'react-beautiful-dnd';
import React, { Component } from 'react';
import { TiDelete } from "react-icons/ti";
import './style.css';

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});

export class ParticipantCard extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteParticipant = this.handleDeleteParticipant.bind(this);
    }


    handleDeleteParticipant() {
        // TODO: Find better way to create query string
        fetch("api/Teams/teams/" + 0 + "/participants?participantId=" + this.props.participantId, {
            method: "POST"
        })
            .then(() => {
                window.location.reload();
            });
    }

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
                        <h5 className="card-title">
                            {this.props.participantDisplayName}
                            <TiDelete onClick={this.handleDeleteParticipant} className="link"/>
                            </h5>
                        <p className="card-text">Score: {parseInt(this.props.participantScore, 10)}</p>
                    </div>
                </div>
            )}
        </Draggable>
        );
    }

}