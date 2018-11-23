import React, { Component } from 'react';
import Card from "./Card";
export default class GameContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIssue: props.issues[0]
        }
    }


    render() {
        const { issues, dictonary, game } = this.props;
        console.log("GAME: ", game)
        return (
            <div className="d-flex flex-wrap justify-content-center">
                {game.cardSet.map(card => 
                    <Card value={card}/>
                )}
            </div>
        )
    }
}