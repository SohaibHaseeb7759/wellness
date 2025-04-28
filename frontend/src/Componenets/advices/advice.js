import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdvice } from "../../Reducers/progressSlice";
import "../../CSS/PersonalAdvice/advice.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
const Advice = () => {
  const dispatch = useDispatch();
  const advice = useSelector((state) => state.progress.advice);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(fetchAdvice());
  }, [dispatch]);

  return (
    <>
      <button className="button" onClick={onOpen}>
        Check updated Advice
      </button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Personalized Advice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{advice}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Advice;
