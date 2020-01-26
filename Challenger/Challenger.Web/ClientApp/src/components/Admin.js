import React, { Component } from 'react';
import { AddParticipants } from './AddParticipants'
import { AddTeam } from './AddTeam'
import { ParticipantsBoard } from './ParticipantsBoard'
import './style.css';

export class Admin extends Component {

    render() {

        return (

            <div>
                <h1 className="bottom-spacing-medium">New paritipants</h1>
                <AddParticipants />
                <h1 className="bottom-spacing-medium">New teams</h1>
                <AddTeam />
                <h1 className="bottom-spacing-medium">Participants split</h1>
                <ParticipantsBoard />
            </div>
        );
    }
}