import  React, {useState, forwardRef, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { SubmitHandler, UseFormRegister } from 'react-hook-form/dist/types';
import { Dialog, DialogContent, DialogTrigger } from "../components/Dialog";
import { AdminContainer, Container, FormContainer, FormNewProduct } from "../styles/pages/admin";
import { categories, SubCategory } from '../utils/option';
import { ProductDto } from '../utils/types/productsType';
import * as Switch from '@radix-ui/react-switch';
import { getProducts } from '../server/lib/products';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import DropMenu from '../components/DropMenu';

import {
  useDisclosure, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select as SelectChakra,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';

export const Select = forwardRef<
HTMLSelectElement,
{ label: string,
  options: string[]
} & ReturnType<UseFormRegister<any>>
>(function SelectComponent({ onChange, onBlur, name, label, options }, ref) {
  return (
    <>
    <label>{label}</label>
    <SelectChakra name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Sem {label}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </SelectChakra>
  </>
  )
});

type SizeListType = {
  size: string
}

type ColorListType = {
  variant: string
}

type ImageListType = {
  url: string
}

export default function Admin({products}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ProductDto>();
  const [codeAccess, setCodeAccess] = useState('')
  const currentCodeAccess = 'A1A2B1B2'
  const isCurrentCodeAccess = codeAccess === currentCodeAccess
  const [sizes, setSizes] = useState<string>('')
  const [sizeList, setSizeList] = useState<SizeListType[]>([])
  const [linksImage, setLinksImage] = useState<string>('')
  const [linksImageList, setLinksImageList] = useState<ImageListType[]>([])
  const [color, setColor] = useState<string>('')
  const [colorList, setColorList] = useState<ColorListType[]>([])
  const [status, setStatus] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  console.log('products', products)
  const spreadFunction = (setFunction: any, params: any, value: any) => {
    setFunction((prev:any) => [...prev, {[params]: value}])
  }
  
  const onSubmit: SubmitHandler<ProductDto> = async (data, event) => {
    event?.preventDefault()

    const dataToPost = {
      price: +data.price,
      shipping: 'Grátis',
      title: data.title,
      variants: colorList,
      sizes: sizeList,
      discount: +data.discount,
      category: data.category,
      ImageUrl: data.ImageUrl,
      shopUrl: data.shopUrl,
      status,
      variantsImage: linksImageList,
      highlighted,
      stripeProductId: data.stripeProductId
    }
    
    await axios.post('/api/products', dataToPost)
    .then(response => {
      onClose()
    })
    .catch(errors => console.error(errors))
    reset()
    setColorList([])
    setHighlighted(false)
    setStatus(false)
    setSizeList([])
    setLinksImageList([])
    onClose()
  }

  if(isCurrentCodeAccess) {
    return(
      <Container>
        <FormContainer autoComplete="off">
          <label htmlFor="codeAccess">Codigo de acesso</label>
          <input type="text" id="codeAccess" onChange={(e)=> setCodeAccess(e.target.value)}/>
        </FormContainer>
      </Container>
    )
  }else {
    return (
      <>
      <AdminContainer>
        <header>
          <h2>Produtos</h2>
          <Button onClick={onOpen}>Adicionar Produto</Button>
        </header>
        <table>
          <thead>
          <tr>
            <th></th>
            <th>nome</th>
            <th>preço</th>
            <th>desconto</th>
            <th>frete</th>
            <th>categoria</th>
            <th>loja</th>
            <th>destaque</th>
            <th>status</th>
            <th>variantes</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id}>
                <td>
                  <Image src={product.ImageUrl} alt="" width={40} height={40}/>
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.discount}</td>
                <td>{product.shipping}</td>
                <td>{product.category}</td>
                <td><a href={product.shopUrl} target='_blank' rel="noreferrer">acessar loja</a></td>
                <td className={product.highlighted ? 'active' : 'disable'}><div className='dot'/></td>
                <td className={product.status ? 'active' : 'disable'}><div className='dot'/></td>
                <td className={product.variants.length > 0 ? 'active' : 'disable'}><div className='dot'/></td>
                <td>
                  <DropMenu product={product}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminContainer>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Produto</ModalHeader>
          <ModalCloseButton />
          <FormNewProduct onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className='boxContainer'>
              <div className='box'>
                <label>Nome do produto</label>
                <Input  {...register("title", { required: true})} />
                <label>preço do produto</label>
                <Input  {...register("price", { required: true})} />
                <label>Desconto</label>
                <Input  type="number" {...register("discount")} />
                <Select label='Categoria' options={categories} {...register("category", { required: true})}/>
                <Select label='Subcategoria' options={SubCategory} {...register("subCategory")}/>
                <label>Link do fornecedor</label>
                <Input  {...register("shopUrl", { required: true})} />
                <label>Link da Imagem principal</label>
                <Input  {...register("ImageUrl", { required: true})} />
                <label>Id do produto na stripe</label>
                <Input  {...register("stripeProductId")} />
              </div>
              <div className='box'>
                <div className='contentArraysItems'>
                  <label>Tamanhos</label>
                  <div className='inputsAdds'>
                    <Input  max={3} onChange={e=> setSizes(e.target.value,)} value={sizes}/>
                    <button type='button' onClick={()=> {
                      spreadFunction(setSizeList, 'size', sizes)
                      setSizes('')
                    }}>+</button>
                  </div>
                  <div className='itemsList'>
                    {
                      sizeList.length > 0 &&
                      sizeList.map((item, index) => (
                        <Tag
                          key={index}
                          size="sm"
                          borderRadius='full'
                          variant='solid'
                          colorScheme='green'
                        >
                          <TagLabel>{item.size}</TagLabel>
                          <TagCloseButton />
                        </Tag>
                      ))
                    }
                  </div>
                </div>

                <div className='contentArraysItems'>
                  <label>cor variantes</label>
                  <div className='inputsAdds'>
                    <Input onChange={e=> setColor(e.target.value,)} value={color}/>
                    <button type='button' onClick={()=>{ 
                      spreadFunction(setColorList, 'variant', color)
                      setColor('')
                    }}>+</button>
                  </div>
                  <div className='itemsList'>
                    {
                      colorList.length > 0 &&
                      colorList.map((item, index) => (
                        <span key={index}>
                          <>
                            {item.variant}
                            <button 
                              type='button'
                              onClick={()=>  {
                                let remove = colorList.filter(color => color.variant !== item.variant)
                                setColorList(remove)
                              }}
                            >
                              X
                            </button>
                          </>
                        </span>
                      ))
                    }
                  </div>
                </div>
                <div className='contentArraysItems'>
                  <label>links de imagens</label>
                  <div className='inputsAdds'>
                    <Input onChange={e=> setLinksImage(e.target.value,)} value={linksImage}/>
                    <button type='button' onClick={()=> {
                      spreadFunction(setLinksImageList, 'url', linksImage)
                      setLinksImage('')
                    }}>+</button>
                  </div>
                  <div className='itemsListImage'>
                    {
                      linksImageList.length > 0 &&
                      linksImageList.map((item, index) => (
                        <span key={index}>
                          <>
                            <button 
                              type='button'
                              onClick={()=> {
                                let remove = linksImageList.filter(image => image.url !== item.url)
                                setLinksImageList(remove)
                              }}
                            >
                              X
                            </button>
                            {item.url}
                          </>
                        </span>
                      ))
                    }
                  </div>
                </div>
                <div className='switch-container'>
                  <div className='switch'>
                    <label htmlFor="highlighted">Destaque</label>
                    <Switch.Root 
                      className="SwitchRoot" 
                      id="highlighted" 
                      onCheckedChange={(e: any) => setHighlighted(e)}
                    >
                      <Switch.Thumb className="SwitchThumb" />
                    </Switch.Root>
                  </div>
                  <div className='switch'>
                    <label htmlFor="status">Disponível</label>
                    <Switch.Root className="SwitchRoot" id="status" onCheckedChange={(e: any) => setStatus(e)}>
                      <Switch.Thumb className="SwitchThumb" />
                    </Switch.Root>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button type='submit' colorScheme="orange">Cadastrar</Button>
          </ModalFooter>
          </FormNewProduct>
        </ModalContent>
      </Modal>
      </>
    )    
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts()

  return {
    props: {
      products
    },
    revalidate: 5
  }
}