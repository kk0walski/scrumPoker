import React, { Component } from 'react'

export default class GameItem extends Component {
    render() {
        const { game } = this.props;
        return (
            <div className="row">
                <div className="col-8">
                    <h3>{game.name}</h3>
                </div>
                <div className="col-4">

                </div>
            </div>
        )
    }
}
