import React, { Component } from 'react';
import Modal from 'react-modal';

export default class UserModal extends Component {

    constructor(props){
        super(props);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.state = {
            name: '',
            email: '',
            isSeparator: false
        }
    }

    changeName(event){
        event.preventDefault();
        this.setState({
            name: event.target.value
        })
    }

    changeEmail(event){
        event.preventDefault();
        this.setState({
            email: event.target.value
        })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modalOpen}
                contentLabel="User"
                className="myModal"
                closeTimeoutMS={200}
            >
                <h3>Join Game</h3>
                <form>
                    <div className="form-group">
                        <label for="displayName">Display Name:</label>
                        <input id="displayName" name="displayName" type="text" required="required" className="form-control" onChange={this.changeName} />
                    </div>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" required="required" className="form-control" onChange={this.changeEmail} />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="isSeparator" />
                        <label className="form-check-label" for="isSeparator">Join as spectator?</label>
                    </div>
                    <div className="form-group">
                        <button name="cancel" type="cancel" className="btn btn-primary">CANCEL</button>
                        <button name="submit" type="submit" className="btn btn-secondary">PLAY!</button>
                    </div>
                </form>
            </Modal >
        )
    }
}
