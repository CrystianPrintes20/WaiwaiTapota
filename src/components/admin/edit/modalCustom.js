import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalAdminCustom = ({ toggle, modal, children}) => {
    return (
        <Modal isOpen={modal} toggle={toggle} className="modal-lg">
            <ModalHeader toggle={toggle}>Editar</ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            
        </Modal>
    )
}

export default ModalAdminCustom;