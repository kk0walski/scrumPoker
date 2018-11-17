import React, { Component } from 'react';
import { connect } from "react-redux";
import ListItem from "./ListItem";

class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            title: ''
        }
    }
    render() {
        const { lists } = this.props
        const { owner, name } = this.props.match.params;
        if (lists) {
            console.log("LISTS: ", lists);
            return (
                <div id="accordion">
                    {lists.map(list => 
                    <ListItem owner={owner} repo={name} id={list.id} title={list.title} issues={list.list} />)
                    }
                </div>
            )
        } else {
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
        lists: state.lists[owner] && state.lists[owner][name] ? Object.values(state.lists[owner][name]) : []
    };
};

export default connect(
    mapStateToProps
)(Lists);