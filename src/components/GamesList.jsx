import React, { Component } from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';
import GameItem from './GameItem';

class GamesList extends Component {

  render() {
    const { games} = this.props;
    const { owner, name } = this.props.match.params;
    if(games){
      console.log("GAMES: ", games);
      return (
        <ul className="list-group" >
        {games.map(game => (
            <li key={game.id} className={classnames('list-group-item')}>
                <GameItem game={game} key={game.id} />
            </li>
        ))}
    </ul>
      )
    }else {
      return (
        <div>
          
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { owner, name } = ownProps.match.params;
  return {
    games: state.games[owner] && state.games[owner][name] ? Object.values(state.games[owner][name]) : []
  };
};

export default connect(mapStateToProps)(GamesList);