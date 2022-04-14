import { Modal, Button } from "react-bootstrap";

function MessageModal({show, setShow}) {
    const handleClose = () => setShow(false);
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>پیام</Modal.Title>
          </Modal.Header>
          <Modal.Body>حساب کاربری شما با موفقیت ساخته شد</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              بستن
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default MessageModal;