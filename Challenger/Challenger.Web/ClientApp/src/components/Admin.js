import React, { Component } from 'react';
import { AddParticipants } from './AddParticipants'
import { ParticipantsBoard } from './ParticipantsBoard'
import './Admin.css';

export class Admin extends Component {

    render() {

        return (

            <div>
                <h1 className="bottom-spacing-medium">New paritipants</h1>
                <AddParticipants />
                <h1 className="bottom-spacing-medium">Participants split</h1>
                <ParticipantsBoard />
            </div>
        );
    }
}