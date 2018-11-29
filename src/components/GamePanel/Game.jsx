import React, { Component } from 'react';
import Navigation from "./Navigation";
import Content from "./GameContent";

export default class Game extends Component {

  constructor(props){
    super(props);
    this.state ={
      points: 0
    }
  }

  componentWillReceiveProps(nextProps){
    var sumOfPoints = 0;
     nextProps.issues.forEach(issue => {
       if(!isNaN(issue.finalScore)){
         sumOfPoints += Number(issue.finalScore)
       }
     })
     this.setState({
       points: sumOfPoints
     })
  }
  
  render() {
    const { owner, repo, user, game, issues, dictonary } = this.props;
    const { points } = this.state;
    return (
        <div>
        <Navigation user={user}  game={game}/>
        <div className="container">
            <Content owner={owner} repo={repo} issues={issues} dictonary={dictonary} game={game} sumOfPoints={points} user={user}/>
        </div>
    </div>
    )
  }
}
