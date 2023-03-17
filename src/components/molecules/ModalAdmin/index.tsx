import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import React from "react"

interface ModalAdminProps {
  isOpen: any
  onClose: any
  titleHeader: string
  children: React.ReactNode
  sizeModal?: string
}

const ModalAdmin: React.FC<ModalAdminProps> = ({
  isOpen,
  onClose,
  titleHeader,
  children,
  sizeModal = "400px",
}) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent maxWidth={sizeModal}>
        <ModalHeader
          bgGradient="linear(to-r, #FEA800, #F07301)"
          borderTopLeftRadius="5"
          borderTopRightRadius="5"
          color="white"
          boxShadow="md"
        >
          {titleHeader}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalAdmin
