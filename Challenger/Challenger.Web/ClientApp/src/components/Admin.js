import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Collapse } from 'reactstrap';
import Button from 'react-bootstrap/Button'
import './Admin.css';

// TODO: Use for nicer UX
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

// TODO: Use for nicer UX
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const createParticipantsList = (teamsData) => {
    const teams = teamsData.map(team =>
        (
            <div className="margin-grid">
                <h3>Team {team.id}</h3>
                <Droppable droppableId={team.id}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            className="card mb-3 participant-column">
                            {team.participants.map(participant => (
                                <Draggable
                                    key={participant.id}
                                    draggableId={participant.id}
                                    index={participant.id}>
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
                                                <h5 className="card-title">{participant.displayName}</h5>
                                                <p className="card-text">Score: {participant.score}</p>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>

        )
    );

    return (teams);
}


const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#007bff' : 'lightgrey',
});

export class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = { teams: [], participantsList: [], isAddParticipantsOpened: false};
        this.toggleAddParticipants = this.toggleAddParticipants.bind(this);
    }

    componentDidMount() {
        this.fetchTeams();
    }

    fetchTeams = () => {
        fetch('api/Teams/teams')
            .then(response => response.json())
            .then(data => {
                this.setState({ teams: data, participantsList: createParticipantsList(data) })
            });
    }

    handleMoveParticipant(participant, destination) {
        fetch("api/Teams/teams/" + destination + "/participants?participantId=" + participant, {
            method: "POST"
            })
        .then(() => {
            this.fetchTeams();
        });
    }

    toggleAddParticipants() {
        this.setState({ isAddParticipantsOpened: !this.state.isAddParticipantsOpened });
    }

    getList = id => this.state.teams[id];

    onDragEnd = result => {
        const { source, destination, draggableId } = result;

        // Participant dropped outside the list, do nothing
        if (!destination) {
            return;
        }

        // Participant moved within its own team, reorder cards
        if (source.droppableId === destination.droppableId) {
            // TODO: Handle reordering without actual API call
            // const items = reorder(
            //     this.getList(source.droppableId),
            //     source.index,
            //     destination.index
            // );
            //
            // this.setState(items: items);
        } else {
            // TODO: Handle moving to actual drop position + API call
            // const result = move(
            //     this.getList(source.droppableId),
            //     this.getList(destination.droppableId),
            //     source,
            //     destination
            // );

            // this.setState({
            //     items: result.droppable,
            //     selected: result.droppable2
            // });
            this.handleMoveParticipant(draggableId, destination.droppableId)
        }
    };

    render() {

        return (

            <div>
                <h1 className="bottom-spacing-medium">New paritipants</h1>
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
                <h1 className="bottom-spacing-medium">Participants split</h1>
                <div >
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="row">
                            {this.state.participantsList}
                        </div>
                    </DragDropContext>
                </div>
            </div>
        );
    }
}