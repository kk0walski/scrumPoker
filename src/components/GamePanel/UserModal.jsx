import React, { Component } from 'react';
import Modal from 'react-modal';
import { Redirect } from 'react-router-dom';

export default class UserModal extends Component {

    constructor(props) {
        super(props);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            isSeparator: false,
            redirect: false
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    changeName(event) {
        event.preventDefault();
        this.setState({
            name: event.target.value
        })
    }

    changeEmail(event) {
        event.preventDefault();
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const {name, email} = this.state
        if(name !== '' && email !== ''){
            this.props.updateUser(name, email)
        }
    }

    render() {
        if (!this.state.redirect) {
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
                            <label htmlFor="displayName">Display Name:</label>
                            <input id="displayName" name="displayName" type="text" required="required" className="form-control" onChange={this.changeName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input id="email" name="email" type="email" required="required" className="form-control" onChange={this.changeEmail} />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="isSeparator" id="isSeparator" onClick={this.handleChange} />
                            <label className="form-check-label" htmlFor="isSeparator">Join as spectator?</label>
                        </div>
                        <div className="form-group">
                            <button name="cancel" type="cancel" className="btn btn-primary" onClick={() => { this.setState({ redirect: true }) }} >CANCEL</button>
                            <button name="submit" type="submit" className="btn btn-secondary" onClick={this.handleSubmit}>PLAY!</button>
                        </div>
                    </form>
                </Modal >
            )
        }else{
            return (
                <Redirect to="/"/>
            )
        }
    }
}
