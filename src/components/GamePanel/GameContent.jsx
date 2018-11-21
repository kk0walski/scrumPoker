import React, { Component } from 'react';
import { connect } from "react-redux";

class GameContent extends Component {
  render() {
      console.log("GAME: ", this.props.game)
      console.log("LIST: ", this.props.lista)
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps =  (state, ownProps) => {
    const { owner, repo, gameId} = ownProps
    if( state.games[owner] &&
         state.games[owner][repo] &&
        state.games[owner][repo][gameId] ){
            const newGame = state.games[owner][repo][gameId]
            if(state.lists[owner] && 
                state.lists[owner][repo] && 
                state.lists[owner][repo][newGame.selectedList]){
                    return {
                        game: newGame,
                        lista: state.lists[owner][repo][newGame.selectedList]
                    }
                }else {
                    return {
                        game: newGame,
                        lista: {}
                    }
                }
        }else {
            return {
                game: {},
                list: {}
            }
        }
}

export default connect(mapStateToProps)(GameContent);