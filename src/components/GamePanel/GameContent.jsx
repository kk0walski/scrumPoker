import React, { Component } from 'react';
import Card from "./Card";
import ListItem from "./Backlog"
export default class GameContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIssue: props.issues[0]
        }
    }


    render() {
        const { issues, dictonary, game } = this.props;
        console.log("ISSUES: ", issues)
        return (
            <div>
                <div className="d-flex flex-wrap justify-content-center">
                    {game.cardSet.map(card =>
                        <Card value={card} key={card} />
                    )}
                </div>
                <div class="accordion" id="accordionExample">
                        <ListItem title="Stories to mark" issues={issues} issuesObject={dictonary} />
                </div>
            </div>
        )
    }
}