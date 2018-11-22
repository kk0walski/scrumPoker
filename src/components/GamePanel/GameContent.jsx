import React, { Component } from 'react';
export default class GameContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIssue: props.issues[0]
        }
    }


    render() {
        const { issues, dictonary } = this.props;
        return (
            <div>

            </div>
        )
    }
}