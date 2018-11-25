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
        this.selectNextStory = this.selectNextStory.bind(this);
        this.selectPreviousStory = this.selectPreviousStory.bind(this);
        this.selectNextUnpointed = this.selectNextUnpointed.bind(this);
        this.vote = this.vote.bind(this);
    }

    selectStoryToExam(node){
        const { owner, repo, game, user } = this.props;
        if(user.uid === game.firebaseOwner){
            this.props.startSelectStory(owner, repo, game.id, node);
        }
    }

    selectNextStory(){
        const { owner, repo, game, user, issues } = this.props;
        const {selectedStory } = game
        const newStory = (selectedStory + 1)%issues.length;
        if(user.uid === game.firebaseOwner){
            this.props.startSelectStory(owner, repo, game.id, newStory);
        }
    }

    selectPreviousStory(){
        const { owner, repo, game, user, issues } = this.props;
        const {selectedStory } = game
        const newStory = (selectedStory - 1) >= 0 ? (selectedStory - 1) : (issues.length - 1)
        if(user.uid === game.firebaseOwner){
            this.props.startSelectStory(owner, repo, game.id, newStory);
        }
    }

    selectNextUnpointed(){
        const { owner, repo, game, user, issues } = this.props;
        const {selectedStory } = game;
        if(user.uid === game.firebaseOwner && 
            issues.some((story) => story.finalScore === "" || story.finalScore === undefined)
        ){
            const unpointed = issues.reduce((state, currentStory, index) => {
                if(currentStory.finalScore === "" || currentStory.finalScore === undefined){
                    return [...state, index]
                }
            }, [])
            if(unpointed.length > 0){
                const filterMore = unpointed.filter((index) => index > selectedStory)
                if(filterMore.length > 0){
                    this.props.startSelectStory(owner, repo, game.id, filterMore[0])
                }else {
                    this.props.startSelectStory(owner, repo, game.id, unpointed[0])
                }
            }
        }
    }

    vote(card){
        const { owner, repo, game, user } = this.props;
        //this.props.startVote(owner, repo, game.id, user.uid, this.state.activeIssue, card)
    }

    render() {
        const { issues, dictonary, game, user } = this.props;
        const { selectedStory } = game;
        return (
            <div>
                <div className="card" style={{width: "100%" , textAlign: "center"}}>
                    <div className="card-body">
                        <h5 className="card-title">{dictonary[issues[selectedStory].id].title}</h5>
                        <p className="card-text">{dictonary[issues[selectedStory].id].body}</p>
                    </div>
                </div>
                {user.uid === game.firebaseOwner &&
                <div style={{textAlign:"center", margin:"20px 0"}}>
                     <button type="button" className="btn btn-warning">Reset</button>
                     <button type="button" className="btn btn-success">Flip</button>
                     <button type="button" className="btn btn-primary" onClick={this.selectPreviousStory}>Previous</button>
                     <button type="button" className="btn btn-primary" onClick={this.selectNextStory}>Next</button>
                     <button type="button" className="btn btn-primary" onClick={this.selectNextUnpointed}>Next Unpointed</button>
                </div>
                }
                <VouteDeck selectedStory={selectedStory} game={game}  storyInfo={issues[selectedStory]} />
                <div className="d-flex flex-wrap justify-content-center">
                    {game.cardSet.map(card =>
                        <Card value={card} key={card} vote={this.vote}/>
                    )}
                </div>
                <div className="accordion" id="accordionExample">
                    <Backlog title="Stories to mark" issues={issues} issuesObject={dictonary} selectedStory={selectedStory} selectStory={this.selectStoryToExam}/>
                </div>
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