import React, { Component } from 'react';
import Navigation from "./Navigation";
import Content from "./GameContent";

export default class Game extends Component {
  render() {
    const { owner, repo, user, game, issues, dictonary } = this.props
    return (
        <div>
        <Navigation user={user}  game={game}/>
        <div className="container">
            <Content owner={owner} repo={repo} issues={issues} dictonary={dictonary} game={game} user={user}/>
        </div>
    </div>
    )
  }
}
