import Image from 'next/image'
import React from 'react'
import logo from '../../../assets/logo-ecomprei.svg'
import { MenuContainer } from './AsideAdminMenu'
import { RxDashboard } from 'react-icons/rx'
import { BsBoxSeam, BsBagCheck } from 'react-icons/bs'
import { MdOutlineStorefront } from 'react-icons/md'
import { AiOutlineTeam } from 'react-icons/ai'
import { VscSignOut } from 'react-icons/vsc'
import {
  Avatar,
  Divider,
  Flex,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const AsideAdminMenu: React.FC = () => {
  const route = useRouter()
  const isCurrent = (page: string) => {
    return route.asPath.includes(page)
  }

  return (
    <MenuContainer>
      <Stack w="80%" gap="2">
        <Image src={logo} alt="É Comprei" width={100} height={50} />
        <Wrap w="100%" align="center" justifyContent="center">
          <WrapItem w="100%" alignItems="center" justifyContent="center">
            <Avatar size="2xl" name="Jefferson Brito" bg="white" />
          </WrapItem>
          <Text w="100%" textAlign="center" fontSize="3xl">
            Jefferson Brito
          </Text>
        </Wrap>
      </Stack>
      <Stack mt="5" w="80%" height="100%" justifyContent="space-between">
        <List display="flex" flexDirection="column" gap="5">
          <Link href={`/admin/dashboard?sessionId=${route.query.sessionId}`}>
            <ListItem className={isCurrent('dashboard') ? 'current' : ''}>
              <ListIcon as={RxDashboard} />
              Dashboard
            </ListItem>
          </Link>
          <Link href={`/admin/products?sessionId=${route.query.sessionId}`}>
            <ListItem className={isCurrent('products') ? 'current' : ''}>
              <ListIcon as={BsBoxSeam} />
              Produtos
            </ListItem>
          </Link>
          <Link
            href={`/admin/customerorders?sessionId=${route.query.sessionId}`}
          >
            <ListItem className={isCurrent('customerorders') ? 'current' : ''}>
              <ListIcon as={BsBagCheck} />
              Pedidos de Clientes
            </ListItem>
          </Link>
          <Link
            href={`/admin/supplierorders?sessionId=${route.query.sessionId}`}
          >
            <ListItem className={isCurrent('supplierorders') ? 'current' : ''}>
              <ListIcon as={MdOutlineStorefront} />
              Pedidos no Fornecedor
            </ListItem>
          </Link>
          <Link href={`/admin/myteam?sessionId=${route.query.sessionId}`}>
            <ListItem className={isCurrent('myteam') ? 'current' : ''}>
              <ListIcon as={AiOutlineTeam} />
              Meu Time
            </ListItem>
          </Link>
        </List>
        <Stack>
          <Divider />
          <Flex align="center" gap="2">
            <VscSignOut />
            Sair
          </Flex>
        </Stack>
      </Stack>
    </MenuContainer>
  )
}

export default AsideAdminMenu
