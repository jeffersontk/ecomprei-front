import React from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { RiAddFill, RiEdit2Fill } from 'react-icons/ri'

import {
  Menu,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { ButtonDropMenu, MenuListDropdown } from './DropMenu'
import { StyledOverlay } from '../Dialog'
import EditProduct from '../Forms/EditProduct'
import CopyProduct from '../Forms/CopyProduct'

const DropMenu = ({ product }: any) => {
  const {
    isOpen: isOpenAddCopy,
    onOpen: onOpenAddCopy,
    onClose: onCloseAddCopy,
  } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton as={ButtonDropMenu}>
          <HiDotsVertical size={20} />
        </MenuButton>
        <MenuList as={MenuListDropdown}>
          <MenuItem onClick={onOpenAddCopy}>
            <RiAddFill /> Adicionar Copy
          </MenuItem>
          <MenuItem onClick={onOpenEdit}>
            <RiEdit2Fill /> Editar
          </MenuItem>
          <MenuItem>
            <IoMdTrash /> Excluir
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpenAddCopy} onClose={onCloseAddCopy} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Copy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CopyProduct productId={product.id} closeModal={onCloseAddCopy} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered size="3xl">
        <ModalOverlay as={StyledOverlay} />
        <ModalContent>
          <ModalHeader>Editar Produto</ModalHeader>
          <ModalCloseButton />
          <EditProduct closeModal={onCloseEdit} product={product} />
        </ModalContent>
      </Modal>
    </>
  )
}

export default DropMenu
