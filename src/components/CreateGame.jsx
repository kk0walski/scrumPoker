import React, { Component } from 'react';
import { connect } from "react-redux";
import { startAddGame } from "../actions/Game";
import { Redirect } from 'react-router-dom';

class CreateGame extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      gameCreated: false
    }
  }

  getCardsDeck(selectedCards) {
    var cardsSet = []
    switch (selectedCards) {
      case "1":
        cardsSet = [{ display: "0", value: 0 }, { display: "1", value: 1 }, { display: "2", value: 2 },
        { display: "3", value: 3 }, { display: "5", value: 5 }, { display: "8", value: 8 }, { display: "13", value: 13 },
        { display: "21", value: 21 }, { display: "34", value: 34 }, { display: "55", value: 55 }, { display: "89", value: 89 },
        { display: "?", value: "?" }, { display: "Pass", value: "Pass" }]
        break;
      case "2":
        cardsSet = [{ display: "0", value: 0 }, { display: "1/2", value: 0.5 }, { display: "1", value: 1 },
        { display: "2", value: 2 }, { display: "3", value: 3 }, { display: "5", value: 5 }, { display: "8", value: 8 },
        { display: "13", value: 13 }, { display: "20", value: 20 }, { display: "40", value: 40 }, { display: "100", value: 100 },
        { display: "?", value: "?" }, { display: "Pass", value: "Pass" }]
        break;
      case "3":
        cardsSet = [{ display: "xxs", value: 1 }, { display: "xs", value: 3 }, { display: "s", value: 8 },
        { display: "m", value: 13 }, { display: "l", value: 20 }, { display: "xl", value: 40 }, { display: "xxl", value: 100 },
        { display: "?", value: "?" }, { display: "Pass", value: "Pass" }]
        break;
      case "4":
        cardsSet = [{ display: "0", value: 0 }, { display: "1", value: 1 }, { display: "2", value: 2 },
        { display: "4", value: 4 }, { display: "8", value: 8 }, { display: "16", value: 16 }, { display: "32", value: 32 },
        { display: "64", value: 64 }, { display: "?", value: "?" }, { display: "Pass", value: "Pass" }]
        break;
      default:
        cardsSet = []
        break;
    }
    return cardsSet;
  }


  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.props;
    const data = new FormData(event.target);
    const { owner, name } = this.props.match.params;
    const storyListToPush = this.props.lists[Number(data.get("listChose"))].list.map(listNumber => {
      return {
        id: listNumber,
        owner,
        flipped: false,
        project: name,
        finalScore: "",
        votes: {},
      }
    });
    const reasult = {
      name: data.get('gameName'),
      selectedStory: 0,
      firebaseOwner: user.uid,
      desc: data.get('gameDescription'),
      velocity: Number(data.get("teamVelocity")),
      shareVelocityEnabled: (data.get("shareVelocityWithAllPlayers") === "true"),
      creatorCanEstimateEnabled: (data.get("isCreatorEffortPointing") === "true"),
      cardSet: this.getCardsDeck(data.get("selectedCardSet")),
      autoFlipEnabled: (data.get("isAutoFlipEnabled") === "true"),
      changeVoteEnabled: (data.get("isChangeVoteEnabled") === "true"),
      calculateEnabled: (data.get("calculateScore") === "true"),
      issuesCount: storyListToPush.length,
      users: {
        [user.uid]: {
          email: user.email,
          isAnonymous: user.isAnonymous,
          id: user.uid,
          name: user.displayName,
          online: true
        }
      }
    }
    this.props.startAddGame(owner, name, reasult, storyListToPush);
    this.setState({ gameCreated: true })
  }

  render() {
    const { lists } = this.props;
    const { gameCreated } = this.state;
    const { url } = this.props.match;
    if (lists && lists.length > 0) {
      if (!gameCreated) {
        return (
          <div>
            <h3>Create Games</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="gameName">Game Name:</label>
                <input id="gameName" name="gameName" type="text" aria-describedby="gameNameHelpBlock" required="required" className="form-control here" />
                <small id="gameNameHelpBlock" className="form-text text-muted">75 characters max</small>
              </div>
              <div className="form-group">
                <label htmlFor="gameDescription">Description:</label>
                <textarea id="gameDescription" name="gameDescription" cols="40" rows="5" aria-describedby="gameDescriptionHelpBlock" className="form-control" />
                <small id="gameDescriptionHelpBlock" className="form-text text-muted">250 characters max</small>
              </div>
              <div className="form-group">
                <label htmlFor="teamVelocity">Team Velocity</label>
                <input id="teamVelocity" name="teamVelocity" type="number" aria-describedby="teamVelocityHelpBlock" min="0" className="form-control here" />
                <small id="teamVelocityHelpBlock" className="form-text text-muted">
                  Agile teams can often predict how many effort points can be completed in one sprint. Enter your team's velocity here,
             and we'll let you know when your estimates hit their max.</small>
              </div>
              <div className="form-group">
                <label>Share the velocity with all players?</label>
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="shareVelocityWithAllPlayers" id="shareVelocityWithAllPlayers-true" value={true} defaultChecked />
                    <label className="form-check-label" htmlFor="shareVelocityWithAllPlayers-true">
                      Yes
            </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="shareVelocityWithAllPlayers" id="shareVelocityWithAllPlayers-false" value={false} />
                    <label className="form-check-label" htmlFor="shareVelocityWithAllPlayers-false">
                      No
            </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Are you also effort pointing?</label>
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="isCreatorEffortPointing" id="isCreatorEffortPointing-true" value={true} defaultChecked />
                    <label className="form-check-label" htmlFor="isCreatorEffortPointing-true">
                      Yes
            </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="isCreatorEffortPointing" id="isCreatorEffortPointing-false" value={false} />
                    <label className="form-check-label" htmlFor="isCreatorEffortPointing-false">
                      No
            </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Choose your card set</label>
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="selectedCardSet" id="selectedCardSet-1" value="1" defaultChecked />
                    <label className="form-check-label" htmlFor="selectedCardSet-1">
                      Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, Pass )
            </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="selectedCardSet" id="selectedCardSet-2" value="2" />
                    <label className="form-check-label" htmlFor="selectedCardSet-2">
                      Modified Fibonacci ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, Pass )
              </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="selectedCardSet" id="selectedCardSet-3" value="3" />
                    <label className="form-check-label" htmlFor="selectedCardSet-3">
                      T-shirts ( xxs, xs, s, m, l, xl, xxl, ?, Pass )
              </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="selectedCardSet" id="selectedCardSet-4" value="4" />
                    <label className="form-check-label" htmlFor="selectedCardSet-4">
                      Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64, ?, Pass )
              </label>
                  </div>
                </div>
                <small id="teamVelocityHelpBlock" className="form-text text-muted">
                  Many established teams have a preference for story pointing and estimation style.
                  Teams that are new to agile may find the concept of pointing complex and may
                   confuse story points with the number of hours required to complete a task.
                  In this case, you can use the non-numerical pointing system of t-shirt sizing.</small>
              </div>
              <div className="form-group">
                <label>Would you like to auto-flip the cards after everyone has voted?</label>
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="isAutoFlipEnabled" id="isAutoFlipEnabled-true" value={true} defaultChecked />
                    <label className="form-check-label" htmlFor="isAutoFlipEnabled-true">
                      Yes
            </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="isAutoFlipEnabled" id="isAutoFlipEnabled-false" value={false} />
                    <label className="form-check-label" htmlFor="isAutoFlipEnabled-false">
                      No
              </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Would you like to allow players to change their vote after reveal?</label>
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="isChangeVoteEnabled" id="isChangeVoteEnabled-true" value={true} defaultChecked />
                    <label className="form-check-label" htmlFor="isChangeVoteEnabled-true">
                      Yes
            </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="isChangeVoteEnabled" id="isChangeVoteEnabled-false" value={false} />
                    <label className="form-check-label" htmlFor="isChangeVoteEnabled-false">
                      No
              </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Would you like Planning Poker to calculate the score?</label>
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="calculateScore" id="calculateScore-true" value={true} defaultChecked />
                    <label className="form-check-label" htmlFor="calculateScore-true">
                      Yes
            </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="calculateScore" id="calculateScore-false" value={false} />
                    <label className="form-check-label" htmlFor="calculateScore-false">
                      No
              </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="listChose">ChoseList</label>
                <div>
                  <select id="listChose" name="listChose" className="form-control">
                    {lists.map((list, index) => <option key={list.id} value={index}>{list.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <button name="submit" type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        )
      } else {
        return <Redirect to={{
          pathname: url.replace("create_game", "saved_games"),
        }} />
      }
    } else {
      return <Redirect to={{
          pathname: url.replace("create_game", "issues"),
          state: { reason: "Lack of list" }
        }} />
    }
  }
}


const mapStateToProps = (state, ownProps) => {
  const { owner, name } = ownProps.match.params;
  return ({
    lists: state.lists[owner] && state.lists[owner][name] ? Object.values(state.lists[owner][name]) : undefined,
    user: state.user
  });
};

const mapDispatchToProps = dispatch => ({
  startAddGame: (owner, repo, gameData, storyList) => dispatch(startAddGame(owner, repo, gameData, storyList))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGame);