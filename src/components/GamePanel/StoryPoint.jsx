import React, { Component } from 'react';
import { FaPen, FaSave } from "react-icons/fa";
import { connect } from "react-redux";
import { startEditStoreScore } from "../../actions/Game";

class StoryPoint extends Component {

    constructor(props) {
        super(props);
        this.editScore = this.editScore.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.submitScore = this.submitScore.bind(this);
        this.state = {
            editOpen: false,
            editValue: props.story.finalScore
        }
    }

    editScore(){
        this.setState({
            editOpen: !this.state.editOpen
        })
    }

    submitScore(){
        const { owner, repo, game, story } = this.props;
        const { editValue } = this.state;
        console.log("EDIT VALUE: ", editValue)
        if(!isNaN(editValue)){
            this.props.startEditStoreScore(owner, repo, game.id, story.id, Number(editValue));
        }
        this.editScore()
    }

    handleKeyPress(event){
        if(event.key === 'Enter'){
            this.editScore();
        }
    }

    changeValue(event){
        this.setState({
            editValue: event.target.value
        })
    }

    render() {
        const { story } = this.props
        const { editOpen, editValue } = this.state;
        if (editOpen) {
            return (
                <div className="card-header d-flex justify-content-center">
                    <div className="deck">
                        <div className="card">
                            <input type="text" value={editValue} onKeyPress={this.handleKeyPress} onChange={this.changeValue}/>
                            <button type="button" className="btn btn-outline-primary scoreEdit " onClick={this.submitScore}><FaSave />Save score</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="card-header d-flex justify-content-center">
                    <div className="deck">
                        <div className="card">
                            {story.finalScore}
                            <button type="button" className="btn btn-outline-primary scoreEdit" onClick={this.editScore}><FaPen />Edit card</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => ({
    startEditStoreScore: (owner, repo, game, story, score) => dispatch(startEditStoreScore(owner, repo, game, story, score))
});

export default connect(
    undefined,
    mapDispatchToProps
)(StoryPoint);