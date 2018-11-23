import React, { Component } from 'react';
import Card from "./Card";
import Backlog from "./Backlog"
export default class GameContent extends Component {

    constructor(props) {
        super(props);
        this.selectStoryToExam = this.selectStoryToExam.bind(this);
        this.state = {
            activeIssue: props.dictonary[props.issues[0].id]
        }
    }

    selectStoryToExam(e, story){
        this.setState({
            activeIssue: this.props.dictonary[story.id]
        })
    }

    render() {
        const { issues, dictonary, game } = this.props;
        console.log("GAME: ", game);
        const { activeIssue } = this.state;
        return (
            <div>
                <div className="card" style={{width: "100%" , textAlign: "center"}}>
                    <div className="card-body">
                        <h5 className="card-title">{activeIssue.title}</h5>
                        <p className="card-text">{activeIssue.body}</p>
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    {game.cardSet.map(card =>
                        <Card value={card} key={card} />
                    )}
                </div>
                <div className="accordion" id="accordionExample">
                    <Backlog title="Stories to mark" issues={issues} issuesObject={dictonary} selectedStory={this.state.activeIssue} selectStory={this.selectStoryToExam}/>
                </div>
            </div>
        )
    }
}