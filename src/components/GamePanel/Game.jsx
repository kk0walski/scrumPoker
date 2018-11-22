import React, { Component } from 'react';
import Navigation from "./Navigation";
import Content from "./GameContent";

export default class Game extends Component {
  render() {
    const { user, game, issues, dictonary } = this.props
    return (
        <div>
        <Navigation user={user}  game={game}/>
        <div className="container">
            <Content issues={issues} dictonary={dictonary} game={game}/>
        </div>
    </div>
    )
  }
}
