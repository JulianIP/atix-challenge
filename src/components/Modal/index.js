import React from 'react';
import './Modal.scss';

const Modal = props => {
    return (
        !!props.active ?
        [
            <main className={`${props.className} modal d-flex flex-column`}>
                {props.children}
            </main>,
            <div onClick={props.closeModal} className="dark-background"></div>
        ]
        :
        null
    )
}

const ModalHeader = props => (
    <article className={`${props.className} d-flex modal-header`}>
        {props.children}
    </article>
)

const ModalBody = props => (
    <article className={`${props.className} d-flex modal-body`}>
        {props.children}
    </article>
)

const ModalFooter = props => (
    <article className={`${props.className} d-flex modal-footer`}>
        {props.children}
    </article>
)

export { Modal, ModalHeader, ModalBody, ModalFooter };