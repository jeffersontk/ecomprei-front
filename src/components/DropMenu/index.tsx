import React from 'react';
import {HiDotsVertical} from 'react-icons/hi'
import {IoMdTrash} from 'react-icons/io'
import {RiAddFill, RiEdit2Fill} from 'react-icons/ri'

import { 
  Menu, 
  useDisclosure, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react';
import { MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { ButtonDropMenu, MenuListDropdown } from './DropMenu';
import { StyledOverlay } from '../Dialog';

const DropMenu = ({product}: any) => {
  const { isOpen: isOpenAddCopy, onOpen: onOpenAddCopy, onClose: onCloseAddCopy } = useDisclosure()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton as={ButtonDropMenu}>
          <HiDotsVertical size={20}/>
        </MenuButton>
        <MenuList as={MenuListDropdown}>
          <MenuItem onClick={onOpenAddCopy}><RiAddFill /> Adicionar Copy</MenuItem>
          <MenuItem  onClick={onOpenEdit}><RiEdit2Fill /> Editar</MenuItem>
          <MenuItem><IoMdTrash /> Excluir</MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpenAddCopy} onClose={onCloseAddCopy} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onCloseAddCopy}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered>
        <ModalOverlay as={StyledOverlay} />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onCloseEdit}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DropMenu;