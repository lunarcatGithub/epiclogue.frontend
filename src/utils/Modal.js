import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Portal from './Portal';

function Modal({ onClose, maskClosable, closable, visible, children }) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(!maskClosable);
    }
  };

  // useEffect(() => {
  //   document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; width: -webkit-fill-available;`;
  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = `position: ""; top: ""; width:"`;
  //     window.scrollTo(0, parseInt(scrollY || '0') * -1);
  //   };
  // }, []);

  return (
    // <Portal elementId="modal-root">
    //   <ModalOverlay visible={true} />
    //     <ModalWrapper className={className} tabIndex={-1} visible={visible} onClick={maskClosable ? onMaskClick : null}>
    //       {children}
    //     </ModalWrapper>
    // </Portal>
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper tabIndex={-1} visible={visible} onClick={maskClosable ? onMaskClick : null}>
        {children}
      </ModalWrapper>
    </>
  );
}

Modal.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
};

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ModalOverlay = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  box-sizing: border-box;
  position: fixed;
  /* display: flex; */

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.blackOpacity};
  z-index: 99999;
`;

const ModalWrapper = styled.section`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  position: fixed;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 100000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

const PopupClose = styled.button.attrs({ type: 'submit' })`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 0;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
`;

export default Modal;
