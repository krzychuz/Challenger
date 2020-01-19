// import React, { Component } from 'react';
// import Board, { addCard } from '@lourenci/react-kanban'
// import { Collapse } from 'reactstrap';
// import Button from 'react-bootstrap/Button'
// import './Admin.css';

// export class Admin extends Component {

//     constructor(props) {
//         super(props);
//         this.state = { teamData: [], loading: true, isAddParticipantsOpened: false};

//         this.renderBoard = this.renderBoard.bind(this);
//         this.handleMoveParticipant = this.handleMoveParticipant.bind(this);
//         this.handleAddParticipants = this.handleAddParticipants.bind(this);
//         this.toggleAddParticipants = this.toggleAddParticipants.bind(this);
//     }

//     componentDidMount() {
//         this.renderBoard();
//      }

//     handleMoveParticipant(source, destination) {
//         alert(JSON.stringify(this.board));
//         // fetch("api/Teams/teams/" + destination.toLaneId + "/participants?participantId=" + card.id, {
//         //     method: "POST"
//         //     })
//         // .then(() => {
//         //     this.renderBoard();
//         // });
//     }

//     handleAddParticipants() {
//         fetch("", {
//             method: "POST"
//             })
//         .then(() => {

//         });

//     }

//     toggleAddParticipants() {
//         this.setState({ isAddParticipantsOpened: !this.state.isAddParticipantsOpened });
//     }

// static createLanesParticipantsList(teams) {

//     const cards = teams.map(team =>
//         ({id: team.id,
//             title: "Team " + team.id,
//             cards: team.participants.map(participant => (
//                 {
//                 id: participant.id,
//                 title : participant.displayName,
//                 description : "Score: " + participant.score
//                 }
//             ))
//         })
//     );

//     return(cards);
// }

// renderBoard() {
//     fetch('api/Teams/teams/')
//     .then(response => response.json())
//     .then(data => {
//         this.setState( {teamData: data, loading: false});
//     })
// }

//     render() {

//         let board = this.state.loading ?
//            { lanes: [ {id: 0, title: "Loading...", cards: [] }] } :
//            { lanes: Admin.createLanesParticipantsList(this.state.teamData) };

//         return (
//             <div>
//                 <h1>New paritipants</h1>
//                 <div className ="text-center bottom-spacing-big">
//                     <Button variant="primary" size="lg" onClick={this.toggleAddParticipants}>Add new participants</Button>
//                     &nbsp;
//                 </div>
//                 <Collapse isOpen={this.state.isAddParticipantsOpened}>
//                 <form>
//                     <div class="form-row text-center">
//                         <div class="col">
//                             <input type="text" class="form-control" placeholder="Endomondo challenge ID" ref="trainingDuration"/>
//                         </div>
//                         <div class="col-auto">
//                             <button type="submit" class="btn btn-primary bottom-spacing-big" onClick={this.handleAddParticipants}>Add</button>
//                     </div>
//                     </div>
//                 </form>
//                 </Collapse>
//                 <h1>Participants split</h1>
//                 <div >
//                     <Board children={board} onCardDragEnd={this.handleMoveParticipant} disableLaneDrag />
//                 </div>
//             </div>
//         );
//     }
// }

import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Collapse } from 'reactstrap';
import Button from 'react-bootstrap/Button'
import './Admin.css';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const createParticipantCards = (team) => {

    const cards = team.participants.map(participant =>
        ({
            id: participant.id,
            content: participant.displayName
        })
    );

    return (cards);
}

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
                            className="card bg-column mb-3">
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
                                            className="card bg-light mb-3">
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

/**
 * Moves an item from one list to another list.
 */
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

const grid = 16;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    paddingLeft: grid,
    paddingRight: grid,
    paddingTop: grid,
    width: 250
});

export class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [], teams: [], isAddParticipantsOpened: false};

        this.fetchParticipants = this.fetchParticipants.bind(this);
        this.toggleAddParticipants = this.toggleAddParticipants.bind(this);
    }

    componentDidMount() {
        this.fetchParticipants();
        this.fetchTeams();
    }

    fetchParticipants = () => {
        fetch('api/Teams/teams/2/participants')
            .then(response => response.json())
            .then(data => {
                this.setState({ items: createParticipantCards(data) })
            });
    }

    fetchTeams = () => {
        fetch('api/Teams/teams')
            .then(response => response.json())
            .then(data => {
                this.setState({ teams: createParticipantsList(data) })
            });
    }

        toggleAddParticipants() {
        this.setState({ isAddParticipantsOpened: !this.state.isAddParticipantsOpened });
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
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
                            {this.state.teams}
                        </div>
                    </DragDropContext>
                </div>
            </div>
        );
    }
}