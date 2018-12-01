import React, { Component } from 'react';
import Card from "./Card";
import Backlog from "./Backlog"
import VouteDeck from "./VouteDeck";
import { startSelectStory, startVote, flipCards, resetCards } from "../../actions/Game";
import { connect } from "react-redux";
import StoryPoint from "./StoryPoint";
import { MdRestore, MdFlipToFront, MdArrowBack, MdArrowForward } from "react-icons/md"

class GameContent extends Component {

    constructor(props) {
        super(props);
        this.selectStoryToExam = this.selectStoryToExam.bind(this);
        this.selectNextStory = this.selectNextStory.bind(this);
        this.selectPreviousStory = this.selectPreviousStory.bind(this);
        this.selectNextUnpointed = this.selectNextUnpointed.bind(this);
        this.flipCardsForStory = this.flipCardsForStory.bind(this);
        this.resetCardsForStory = this.resetCardsForStory.bind(this);
        this.vote = this.vote.bind(this);
    }

    selectStoryToExam(node) {
        const { owner, repo, game, issues, user } = this.props;
        if (user.uid === game.firebaseOwner) {
            this.props.startSelectStory(owner, repo, game.id, node, issues[game.selectedStory]);
        }
    }

    selectNextStory() {
        const { game, issues } = this.props;
        const { selectedStory } = game
        const newStory = (selectedStory + 1) % issues.length;
        this.selectStoryToExam(newStory);
    }

    selectPreviousStory() {
        const { game, issues } = this.props;
        const { selectedStory } = game
        const newStory = (selectedStory - 1) >= 0 ? (selectedStory - 1) : (issues.length - 1)
        this.selectStoryToExam(newStory);
    }

    selectNextUnpointed() {
        const { game, issues } = this.props;
        const { selectedStory } = game;
        if (issues.some((story) => story.finalScore === "" ||
            story.finalScore === undefined)
        ) {
            const unpointed = issues.reduce((state, currentStory, index) => {
                if (currentStory.finalScore === "" || currentStory.finalScore === undefined) {
                    return [...state, index]
                }
                else {
                    return state
                }
            }, [])
            if (unpointed.length > 0) {
                const indexOfSelectedStory = unpointed.indexOf(selectedStory)
                const indexOfNewStory = indexOfSelectedStory === (unpointed.length - 1) ? 0 : (indexOfSelectedStory + 1)
                if (unpointed.length > 0) {
                    this.selectStoryToExam(unpointed[indexOfNewStory]);
                } else {
                    this.selectStoryToExam(unpointed[0]);
                }
            }
        }
    }

    vote(issue, card) {
        const { owner, repo, game, user } = this.props;
        if (!game.changeVoteEnabled) {
            if (issue.finalScore === "" || !issue.finalScore || issue.finalScore === null) {
                this.props.startVote(owner, repo, game, issue, user, card)
            }
        } else {
            if (issue.finalScore === "" || !issue.finalScore || issue.finalScore === null) {
                this.props.startVote(owner, repo, game, issue, user, card)
            }
            else {
                this.props.startVote(owner, repo, game, issue, user, card);
            }
        }
    }

    flipCardsForStory(examIssue, changeVoteEnabled) {
        const { owner, repo, game } = this.props;
        if (!changeVoteEnabled) {
            if (!examIssue.flipped) {
                this.props.flipCards(owner, repo, game, examIssue, game.calculateEnabled)
            }
        } else {
            this.props.flipCards(owner, repo, game, examIssue, game.calculateEnabled)
        }
    }

    resetCardsForStory() {
        const { owner, repo, game, issues } = this.props;
        this.props.resetCards(owner, repo, game.id, issues[game.selectedStory])
    }

    componentWillReceiveProps(nextPops) {
        if (nextPops.game.autoFlipEnabled) {
            const { game, issues } = nextPops;
            const nowStory = issues[game.selectedStory];
            const votes = Object.values(nowStory.votes);
            const users = Object.values(game.users);
            const lengthExam = game.creatorCanEstimateEnabled ? users.length : (users.length - 1)
            if (votes.length === lengthExam &&
                 votes.every((vote) => vote.value !== undefined && vote.value !== null && vote.value !== "") &&
                 votes.some((vote) => this.props.issues[game.selectedStory].votes[vote.id].value !== vote.value)
            ) {
                this.flipCardsForStory(nowStory, nextPops.game.changeVoteEnabled)
            }
        }
    }

    render() {
        const { owner, repo, issues, dictonary, game, user, sumOfPoints } = this.props;
        const { selectedStory } = game;
        const playCondition = (user.uid === game.firebaseOwner && game.creatorCanEstimateEnabled) || user.uid !== game.firebaseOwner
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container text-center">
                        <h1 className="display-4">{sumOfPoints}/{game.velocity}</h1>
                        <p className="lead">This is sum of all story points and your team velocity.</p>
                    </div>
                </div>
                <div className="card" style={{ width: "100%", textAlign: "center" }}>
                    <StoryPoint owner={owner} repo={repo} game={game} user={user} story={issues[selectedStory]} />
                    <div className="card-body">
                        <h5 className="card-title">{dictonary[issues[selectedStory].id].title}</h5>
                        <p className="card-text">{dictonary[issues[selectedStory].id].body}</p>
                    </div>
                </div>
                {user.uid === game.firebaseOwner &&
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                        <button type="button" className="btn btn-warning" onClick={this.resetCardsForStory}><MdRestore/> Reset Cards</button>
                        <button type="button" className="btn btn-success" onClick={(e) => this.flipCardsForStory(issues[selectedStory], game.changeVoteEnabled, e)}><MdFlipToFront/> Flip</button>
                        <button type="button" className="btn btn-primary" onClick={this.selectPreviousStory}><MdArrowBack/> Previous</button>
                        <button type="button" className="btn btn-primary" onClick={this.selectNextStory}><MdArrowForward/> Next</button>
                        <button type="button" className="btn btn-primary" onClick={this.selectNextUnpointed}><MdArrowForward /> Next Unpointed</button>
                    </div>
                }
                <VouteDeck selectedStory={selectedStory} storyInfo={issues[selectedStory]} user={user} />
                {playCondition && <div className="d-flex flex-wrap justify-content-center deck">
                    {game.cardSet.map(card =>
                        <Card value={card.value} display={card.display} key={card.value} user={user} vote={this.vote} story={issues[selectedStory]} canChange={game.changeVoteEnabled} />
                    )}
                </div>}
                <div className="accordion" id="accordionExample">
                    <Backlog title="BACKLOG" issues={issues} issuesObject={dictonary} selectedStory={selectedStory} selectStory={this.selectStoryToExam} />
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    startSelectStory: (owner, repo, game, story, previous) => dispatch(startSelectStory(owner, repo, game, story, previous)),
    startVote: (owner, repo, game, story, user, card) => dispatch(startVote(owner, repo, game, story, user, card)),
    flipCards: (owner, repo, game, story, calculateEnabled) => dispatch(flipCards(owner, repo, game, story, calculateEnabled)),
    resetCards: (owner, repo, game, story) => dispatch(resetCards(owner, repo, game, story))
});

export default connect(
    undefined,
    mapDispatchToProps
)(GameContent);