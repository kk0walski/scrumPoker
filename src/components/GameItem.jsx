import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class GameItem extends Component {
    render() {
        const { game } = this.props;
        const { owner, name } = this.props.match.params;
        return (
            <div className="row">
                <div className="col-8">
                    <h3>
                        <Link key={game.id}
                            className="v-align-middle"
                            to={`/${owner}/${name}/play/${game.id}`}>
                            {game.name}
                        </Link>
                    </h3>
                    <footer class="blockquote-footer">
                        <p>Share URL with your players:</p>
                        <p>{`${window.location.origin}/${owner}/${name}/play/${game.id}`}</p>
                        <p>{game.desc}</p>
                    </footer>
                </div>
                <div className="col-4">

                </div>
            </div>
        )
    }
}