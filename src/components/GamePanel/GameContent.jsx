import React, { Component } from 'react';
import Card from "./Card";
import Backlog from "./Backlog"
import VouteDeck from "./VouteDeck";
import { startSelectStory } from "../../actions/Game";
import { connect } from "react-redux";

class GameContent extends Component {

    constructor(props) {
        super(props);
        this.selectStoryToExam = this.selectStoryToExam.bind(this);
        this.vote = this.vote.bind(this);
    }

    selectStoryToExam(e,node){
        const { owner, repo, game, user } = this.props;
        if(user.uid === game.firebaseOwner){
            this.props.startSelectStory(owner, repo, game.id, node);
        }
    }

    vote(card){
        const { owner, repo, game, user } = this.props;
        //this.props.startVote(owner, repo, game.id, user.uid, this.state.activeIssue, card)
    }

    render() {
        const { issues, dictonary, game, user } = this.props;
        console.log("GAME: ", game)
        const { selectedStory } = game;
        return (
            <div>
                <div className="card" style={{width: "100%" , textAlign: "center"}}>
                    <div className="card-body">
                        <h5 className="card-title">{dictonary[selectedStory].title}</h5>
                        <p className="card-text">{dictonary[selectedStory].body}</p>
                    </div>
                </div>
                <VouteDeck selectedStory={selectedStory} game={game}  storyInfo={game.storyList[selectedStory]} />
                <div className="d-flex flex-wrap justify-content-center">
                    {game.cardSet.map(card =>
                        <Card value={card} key={card} vote={this.vote}/>
                    )}
                </div>
                <div className="accordion" id="accordionExample">
                    <Backlog title="Stories to mark" issues={issues} issuesObject={dictonary} selectedStory={selectedStory} selectStory={this.selectStoryToExam}/>
                </div>
                {user.uid === game.firebaseOwner && <p>You are owner</p>}
            </div>
        )
    }
}


  const mapDispatchToProps = dispatch => ({
    startSelectStory: (owner, repo, game, story) => dispatch(startSelectStory(owner, repo, game, story))
  });
  
  export default connect(
    undefined,
    mapDispatchToProps
  )(GameContent);