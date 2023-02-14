import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, FormLabel, Heading, Input, Skeleton, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, {useState} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaShippingFast } from 'react-icons/fa'

type CodeInput = {
  code: string
}

export default function Rastreio() {
  const {handleSubmit, register} = useForm<CodeInput>()
  const [tracking, setTracking] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const onSubmit: SubmitHandler<CodeInput> = async data => {
    const {code} = data
    setIsLoading(true)
    try {
      if(code.length > 10 ) {
        const resp = await axios.get(`https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${code}`)
        setTracking(resp.data.eventos)
      }else {
        toast({
          duration: 3000,
          status: 'error',
          title: 'Digite o código de rastreio'
        })
      }
      setIsLoading(false)
    } catch (error) {
      setTracking([])
      console.error(error)
      toast({
        duration: 5000,
        status: 'error',
        title: 'Erro ao fazer a consulta espera um estante e tente novamente'
      })
    }
    setIsLoading(false)
  };

  return (
    <Stack w="100%" minHeight="400px" gap="2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex alignItems="flex-end" justifyContent="center" gap="2">
          <Box w="100%">
            <FormLabel color="gray.500">Código de rastreio</FormLabel>
            <Input placeholder='AA123456789BR' {...register('code')}/>
          </Box>
          <Button type='submit' w="300px" colorScheme="orange" disabled={isLoading} rightIcon={<FaShippingFast />}>Rastrear pedido</Button>
        </Flex>
      </form>
      <Stack w="100%" alignItems="center" justifyContent="center" >
        <Accordion allowToggle w="100%">
          {
            isLoading ? 
            <Stack w="100%" spacing={1}>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>
            :
            tracking.length > 0 && 
            tracking.map((track: any) => (
                <AccordionItem key={track.hora}>
                  <Text color="gray.600">
                    <AccordionButton  _expanded={{ bg: 'orange', color: 'white' }}>
                      <Box as="span" flex='1' textAlign='left'>
                        {track.status}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Text>
                  <AccordionPanel pb={4}>
                    <Stack gap="2">
                      <Heading size="sm" color="gray.600">As {track.hora} de {track.data} Em {track.local}</Heading>
                      {
                        track.subStatus.map((sub: any, index: number)=> (
                          <Text key={index}>{sub}</Text>
                        ))
                      }
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
            ))
          }
        </Accordion>
      </Stack>
    </Stack>

  )
}
