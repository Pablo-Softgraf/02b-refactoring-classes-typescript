import { useState, ReactNode, useEffect } from 'react';
import ReactModal from 'react-modal';


interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: () => void;
}

export function Modal(props: ModalProps) {
  /*
    constructor(props) {
      super(props);
  
      const { isOpen } = this.props;
      this.state = {
        modalStatus: isOpen
      }
    }
  */
  const { isOpen, children, setIsOpen } = props;
  const [modalStatus, setModalStatus] = useState(false);
  /*
    componentDidUpdate(prevProps) {
      const { isOpen } = this.props;
  
      if (prevProps.isOpen !== isOpen) {
        console.log(this.props)
        this.setState({ modalStatus: isOpen })
      }
    }
  */
  useEffect(() => {
    setModalStatus(isOpen)

    return () => {
      setModalStatus(false)
    }
  }, [isOpen])


  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}


export default Modal;
