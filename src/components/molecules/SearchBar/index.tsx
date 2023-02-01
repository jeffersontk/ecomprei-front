'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import useSWR from 'swr'


import { AiOutlineClose } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import { BsCartPlus } from 'react-icons/bs'
import { fetcher } from '../../../server/lib/SWR'
import { ButtonCloseSearch, ButtonOpenContainer, ButtonOpenSearch, InputContainer, SearchContainer, SuggestionContainer } from './searchbar'
import { Button, Card, CardBody, CardFooter, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, useDisclosure } from '@chakra-ui/react'

export default function SearchBar() {
  const [openSearch, setOpenSearch] = useState<'show' |'hidden'>('hidden')
  const [searchTerm, setSearchTerm] = useState("");
  const [productFilter, setProductFilter] = useState<any[]>([])
  const firstFieldRef = React.useRef(null)
  const { onOpen: onOpenDesktop, onClose: onCloseDesktop, isOpen: isOpenDesktop } = useDisclosure()
  const { onOpen, onClose, isOpen } = useDisclosure()
  

  const { data: products, error } = useSWR(
    searchTerm.length > 3 ? '/api/products' : null,
    fetcher
  )
  
  useEffect(() => {
    if (searchTerm.length <= 3) {
      setProductFilter([])
      return;
    }
    const filteredProducts = products?.data.filter((product: any): any[] =>{
      return  product.title.toLowerCase().includes(searchTerm.toLowerCase())
    });
    setProductFilter(filteredProducts)
  }, [searchTerm, products]);


  return (
    <SearchContainer render={{'@initial': 'desktop'}}>
      <Popover 
        closeOnBlur={true}
        isOpen={isOpenDesktop}
        initialFocusRef={firstFieldRef}
        onOpen={onOpenDesktop}
        onClose={onCloseDesktop}
      >
        <PopoverTrigger >
          <InputContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}} visible={{"@initial": 'hidden', '@bp2': 'show'}}>
            <input ref={firstFieldRef} type="text" placeholder='Encontre aqui' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
            <button>
              <BiSearchAlt/>
            </button>
          </InputContainer>
        </PopoverTrigger>


        <PopoverContent
          width={600}
          maxH={400}
          overflow="auto"
        >
          <PopoverCloseButton />
          <PopoverHeader color="orange.500">Procurando por {searchTerm}</PopoverHeader>
          <PopoverBody>
          {
            productFilter?.length > 0 ? 
            productFilter?.map((product: any) => (
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              key={product.id}
            >
              <Image 
                src={product.ImageUrl}
                alt={product.title}
                width={70}
                height={50}
              />
              <Stack>
                <CardBody>
                  <Heading size='md'>{product.title}</Heading>
                </CardBody>
                <CardFooter>
                  <Button variant='solid' colorScheme='blue'>
                    comprar
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            )) : 
            products?.data.map((product: any)=> (
              <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              key={product.id}
            >
              <Image 
                src={product.ImageUrl}
                alt={product.title}
                width={70}
                height={50}
              />
              <Stack>
                <CardBody>
                  <Heading size='md'>{product.title}</Heading>
                </CardBody>
                <CardFooter>
                  <Button variant='solid' colorScheme='blue'>
                    comprar
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            ))
          }
          </PopoverBody>
        </PopoverContent>
      </Popover>
      
      {
        openSearch !== 'show' &&
          <ButtonOpenContainer visible={{"@initial": 'show', '@bp2': 'hidden'}} render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
            <ButtonOpenSearch
              onClick={()=> setOpenSearch('show')}
            >
              <BiSearchAlt  size={30}/>
            </ButtonOpenSearch>
          </ButtonOpenContainer>
      }

      <SearchContainer visible={openSearch} render={{"@initial": 'mobile'}}>
        <Popover 
          closeOnBlur={true}
          isOpen={isOpen}
          initialFocusRef={firstFieldRef}
          onOpen={onOpen}
          onClose={onClose}
        >
          <div className='headerSearchContainer'>
            <PopoverTrigger>
              <InputContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
              <input ref={firstFieldRef} type="text" placeholder='Encontre aqui' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
                <button>
                  <BiSearchAlt />
                </button>
              </InputContainer>
            </PopoverTrigger>
            <ButtonCloseSearch onClick={()=> setOpenSearch('hidden')}>
              <AiOutlineClose  size={30}/>
            </ButtonCloseSearch>
          </div>

          <PopoverContent
            minWidth="390"
            width="100%"
            maxH={400}
            scrollBehavior="smooth"
            overflowY="scroll"
            inset="0px auto auto 12px"
          >
            <PopoverCloseButton />
            <PopoverHeader width="100%" color="orange.500">Procurando por {searchTerm}</PopoverHeader>
            <PopoverBody>
            {
              productFilter?.length > 0 ? 
              productFilter?.map((product: any) => (
              <Card
                direction={{ base: 'row', sm: 'row' }}
                variant='outline'
                p="2"
                key={product.id}
                sx={{
                  img: {
                    maxHeight: '75px',
                  }
                }}
              >
                <Image 
                  src={product.ImageUrl}
                  alt={product.title}
                  width={50}
                  height={50}
                />
                <Stack 
                  maxW={280}
                  w="100%"
                >
                   <CardBody py="1" px="2">
                    <Heading size='sm'>{product.title}</Heading>
                  </CardBody>
                  <CardFooter m="0" mt="0" p="0" justifyContent="flex-end" gap="2">
                    <Button variant='solid' colorScheme='orange'>
                      Ver detalhes
                    </Button>
                    <Button variant='outline' colorScheme='orange' gap="2">
                      <BsCartPlus />
                      Adicionar
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
              )) : 
                <Stack>
                  <Heading size='xs'>Não encontramos {searchTerm} <br /> aqui algumas sugestões</Heading>
                  {products?.data.map((product: any)=> (
                    <Card
                      direction={{ base: 'row', sm: 'row' }}
                      overflow='hidden'
                      variant='outline'
                      p="2"
                      key={product.id}    
                      sx={{
                        img: {
                          maxHeight: 'auto',
                          objectFit: 'contain'
                        }
                      }}
                    >
                      <Image 
                        src={product.ImageUrl}
                        alt={product.title}
                        width={50}
                        height={50}
                      />
                      <Stack
                        maxW={280}
                        w="100%"
                      >
                        <CardBody py="1" px="2">
                          <Heading size='sm'>{product.title}</Heading>
                        </CardBody>
                        <CardFooter m="0" mt="0" p="0" justifyContent="flex-end" gap="2">
                          <Button variant='solid' colorScheme='orange'>
                            Ver detalhes
                          </Button>
                          <Button variant='outline' colorScheme='orange' gap="2">
                            <BsCartPlus />
                            Adicionar
                          </Button>
                        </CardFooter>
                      </Stack>
                    </Card>
                  ))}
              </Stack>
            }
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </SearchContainer>
    </SearchContainer>
  )
}
