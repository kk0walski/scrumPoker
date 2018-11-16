import React, { Component } from 'react';
import classnames from 'classnames'
import Modal from 'react-modal';
import IssueItem from './IssueItem';

export default class CreateListModal extends Component {
  render() {
    const { issues, repo } = this.props;
    return (
        <Modal
        isOpen={this.props.modalOpen}
        contentLabel={repo}
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
    >
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <ul className="list-group">
                    {issues.map(node => {
                        return (
                            <li key={node.number} className={classnames('list-group-item')}>
                                <IssueItem issue={node} key={node.number} />
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => this.props.createList(issues)}>Import</button>
            </div>
        </div>
    </Modal>
    )
  }
}
