import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, FormLabel, Heading, Input, Skeleton, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaShippingFast } from 'react-icons/fa'

type SubStatus = {
  nome: string;
  categoria: string;
  observacao: string;
};

type Evento = {
  hora: string;
  data: string;
  status: string;
  local: string;
  subStatus: SubStatus[];
};

type RastreioResponse = {
  eventos: Evento[];
};


type CodeInput = {
  code: string
}

export default function Rastreio() {
  const {query} = useRouter()
  
  const queryCode = query?.code;
  const codeDefaultValue = queryCode !== undefined && queryCode !== null ? String(queryCode) : '';

  const {handleSubmit, register, setValue} = useForm<CodeInput>({
    defaultValues: {
      code: codeDefaultValue
    }
  })

  const [tracking, setTracking] = useState<Evento[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const baseURL = process.env.NEXT_TRACKING_API
  const userAPI = process.env.NEXT_TRACKING_API_USER
  const tokenAPI = process.env.NEXT_TRACKING_API_TOKEN

  const getTrackingInfo = async (code: string) => {
    const url = `${baseURL}/track/json?user=${userAPI}&token=${tokenAPI}&codigo=${code}`
    try {
      const resp = await axios.get(`${url}`)
      setTracking(resp.data.eventos)
    } catch (error) {
      console.error(error)
      toast({
        duration: 5000,
        status: 'error',
        title: 'Erro ao fazer a consulta espera um instante e tente novamente'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=> {
    if(String(query.code).length > 10){
      getTrackingInfo(String(query.code))
    }
  }, [query.code])

  useEffect(() => {
    setValue('code', codeDefaultValue);
  }, [codeDefaultValue, setValue]);

  const onSubmit: SubmitHandler<CodeInput> = async data => {
    const {code} = data
    setIsLoading(true)
    await getTrackingInfo(code)
    setIsLoading(false)
  };

  return (
    <Stack w="100%" minHeight="400px" gap="2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex alignItems="flex-end" justifyContent="center" gap="2">
          <Box w="100%">
            <FormLabel color="gray.500">Código de rastreio</FormLabel>
            <Input placeholder='AA123456789BR' {...register('code')} defaultValue={codeDefaultValue}/>
          </Box>
          <Button 
            type='submit' 
            w="300px" 
            colorScheme="orange" 
            disabled={isLoading} 
            isLoading={isLoading} 
            rightIcon={<FaShippingFast />}
          >
            Rastrear pedido
          </Button>
        </Flex>
      </form>
      <Stack w="100%" alignItems="flex-start" justifyContent="center" >
        <Accordion allowToggle w="100%">
          {
            isLoading ? 
            <Stack w="100%" spacing={1}>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Link href="https://linketrack.com" target="_blank">
                <Flex w="100%"  gap="2"  alignItems="center"justifyContent="center" mt="5">
                  <Text>API BY </Text> 
                  <Text fontWeight="bold" color="#009688"> LINK </Text> 
                  <Text fontWeight="bold" color="#ffa500"> & </Text> 
                  <Text fontWeight="bold" color="#009688">TRACK</Text>
                </Flex>
              </Link>
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
