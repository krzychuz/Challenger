import React, { Component } from 'react';
import Board from '@lourenci/react-kanban'

export class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = { participants : [] };
    }

    handleMoveParticipant(board, source, destination) {
        console.log(board);
        console.log(source);
        console.log(destination);

        alert("Moved participant [" + board.lanes[destination.toLaneId].cards[destination.toPosition].title
         + "] to team [" + board.lanes[destination.toLaneId].title + "]");
    }

    static createLanesParticipantsList() {
        const teams = 
        [
            {
                id : 0,
                name : "Team 0",
                score : 1500,
                participants : [
                {
                    "teamNumber": 0,
                    "score": 0,
                    "position": 0,
                    "displayName": "AAA3 bbb3",
                    "first_name": "AAA3",
                    "id": 7,
                    "last_name": "bbb3",
                    "name": "ccc3",
                    "picture": 0,
                    "picture_url": null,
                    "premium_type": null,
                    "premium": null
                },
                {
                    "teamNumber": 0,
                    "score": 0,
                    "position": 0,
                    "displayName": "AAA2 bbb2",
                    "first_name": "AAA2",
                    "id": 8,
                    "last_name": "bbb2",
                    "name": "ccc2",
                    "picture": 0,
                    "picture_url": null,
                    "premium_type": null,
                    "premium": null
                },
                {
                    "teamNumber": 0,
                    "score": 0,
                    "position": 0,
                    "displayName": "AAA bbb",
                    "first_name": "AAA",
                    "id": 9,
                    "last_name": "bbb",
                    "name": "ccc",
                    "picture": 0,
                    "picture_url": null,
                    "premium_type": null,
                    "premium": null
                }]
            },
            {
                id : 1,
                name : "Team 1",
                score : 2500,
                participants : []
            },
            {
                id : 2,
                name : "Team 2",
                score : 2500,
                participants : []
            }
        ];

        const cards = teams.map(team =>
            ({id: team.id,
                title: team.name,
                cards: team.participants.map(participant => (
                    {
                    id: participant.id,
                    title : participant.displayName,
                    description : "Score: " + participant.score
                    }
                ))
            })
        );

        console.log(cards);

        return(cards);
    }



    render() {

        let board = {
            lanes: Admin.createLanesParticipantsList()
        };

        return (
            <div >
                <Board initialBoard={board} onCardDragEnd={this.handleMoveParticipant}/>
            </div>
            
        );
    }
}
