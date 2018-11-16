import React, { Component } from 'react';
import ListIssues from "./IssuesList";

export default class Issues extends Component {

    createList(toMove) {
        var list = prompt("Please enter list name", "Test")
        if(list !== null && list !== ""){
            console.log(list)
        }
    }

    render() {
        const { owner, name } = this.props.match.params;
        const { match } = this.props
        return (
            <div>
                {owner &&
                 name &&
                  <ListIssues owner={owner}
                   repo={name}
                    match={match}
                    filterLabels={[]}
                    buttonText={"Create List"}
                     moveIssues={this.createList}/>
                }
            </div>
        )
    }
}