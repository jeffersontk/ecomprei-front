import { Box, Button, Flex, ModalFooter, Tag, TagCloseButton, TagLabel, Textarea, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { copyProduct, paragrapher } from 'prisma/prisma-client'
import React, {useState} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { spreadFunction } from '../../pages/admin'
import { postCopyProduct } from '../../server/lib/copy'

interface CopyProductProps {
  productId: string
  closeModal: () => void
}

export default function CopyProduct({closeModal, productId}: CopyProductProps) {
  const [copyParagrapher, setCopyParagrapher] = useState('')
  const [copyParagraphs, setCopyParagraphs] = useState<paragrapher[]>([])

  const {  handleSubmit } = useForm<copyProduct>();

  const onSubmit: SubmitHandler<copyProduct> = async (data, event) => {
    event?.preventDefault()
    const dataPost = {
      paragraphs: copyParagraphs,
      productId
    }
    const result = await axios.post('/api/copy', dataPost)
    .then(response => {})
    .catch(errors => console.error(errors))
  }
  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className='contentArraysItems'>
        <label>Tamanhos</label>
        <Flex gap={2}>
          <Textarea 
            onChange={e=> setCopyParagrapher(e.target.value,)} 
            value={copyParagrapher}
          />
          <Button colorScheme="orange" type='button' onClick={()=> {
            spreadFunction(setCopyParagraphs, 'message', copyParagrapher)
            setCopyParagrapher('')
          }}>+</Button>
        </Flex>
        <VStack gap={1} mt={4}>
          {
            copyParagraphs.length > 0 &&
            copyParagraphs.map((item, index) => {
              return (
                <Tag
                  key={index}
                  size="sm"
                  borderRadius='full'
                  variant='solid'
                  colorScheme='orange'
                >
                  <TagLabel>{item.message}</TagLabel>
                  <TagCloseButton 
                    onClick={()=> {
                      let remove = copyParagraphs.filter(sizes => sizes.message !== item.message)
                      setCopyParagraphs(remove)
                    }}
                  />
                </Tag>
              )
            })
          }
        </VStack>
      </div>

      <ModalFooter paddingX={0}>
        <Button mr={3} onClick={closeModal}>
          Cancelar
        </Button>
        <Button 
          type='submit' 
          colorScheme="orange" 
          
        >
          Cadastrar
        </Button>
      </ModalFooter>
    </form>
  )
}
