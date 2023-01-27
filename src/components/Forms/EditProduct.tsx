import axios from 'axios';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Switch from '@radix-ui/react-switch';
import { ColorListType, ImageListType, Select, SizeListType, spreadFunction } from '../../pages/admin';
import { ProductDto, ProductUpdate } from '../../utils/types/productsType';

import {
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select as SelectChakra,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { FormNewProduct } from '../../styles/pages/admin';
import { categories, SubCategory } from '../../utils/option';

interface CreateProductProps {
  closeModal: () => void,
  product: ProductUpdate
}

export default function EditProduct({closeModal, product}: CreateProductProps) {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ProductDto>({
    defaultValues: {
      category: product.category,
      title: product.title,
      discount: product.discount,
      highlighted: product.highlighted,
      ImageUrl: product.ImageUrl,
      price: product.price,
      shopUrl: product.shopUrl,
      stripeProductId: product.stripeProductId,
      subCategory: product.subCategory,
    }
  });
  const [sizes, setSizes] = useState<string>('')
  const [sizeList, setSizeList] = useState<SizeListType[]>(product.sizes)
  const [linksImage, setLinksImage] = useState<string>('')
  const [linksImageList, setLinksImageList] = useState<ImageListType[]>(product.variantsImage)
  const [color, setColor] = useState<string>('')
  const [colorList, setColorList] = useState<ColorListType[]>(product.variants)
  const [status, setStatus] = useState(product.status)
  const [highlighted, setHighlighted] = useState(product.highlighted)
  const [isLoading, setIsLoading] = useState(false)
  const [itemRemoved, setItemRemoved] = useState<ImageListType[]>([])

  const onSubmit: SubmitHandler<ProductDto> = async (data, event) => {
    event?.preventDefault()
    setIsLoading(true)
    const dataToPut = {
      id: product.id,
      price: +data.price,
      shipping: 'Grátis',
      title: data.title,
      variants: colorList,
      sizes: sizeList,
      discount: +data.discount,
      category: data.category,
      ImageUrl: data.ImageUrl,
      shopUrl: data.shopUrl,
      subCategory: data.subCategory,
      status,
      variantsImage: linksImageList,
      highlighted,
      stripeProductId: data.stripeProductId,
      itemRemoved
    }

    await axios.put('/api/products', dataToPut)
    .then(async response => {
      reset()
      setColorList([])
      setHighlighted(false)
      setStatus(false)
      setSizeList([])
      setLinksImageList([])
      setIsLoading(false)

      closeModal()
    })
    .catch(errors => {
      console.error(errors)
    })
    
    setIsLoading(false)
  }

  return (
    <FormNewProduct onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className='boxContainer'>
              <div className='box'>
                <label>Nome do produto</label>
                <Input  {...register("title", { required: true})} />
                {errors.title?.type === 'required' && <p role="alert" className='error'>Nome obrigatório</p>}
                <label>preço do produto</label>
                <Input  {...register("price", { required: true, pattern: /^-?\d+\.?\d*$/})} />
                {errors.price?.type === 'required' && <p role="alert" className='error'>Preço obrigatório</p>}
                {errors.price?.type === 'pattern' && <p role="alert" className='error'>Preço deve ser um numero e com . não ,</p>}
                <label>Desconto</label>
                <Input  type="number" {...register("discount")} />
                <Select label='Categoria' options={categories} {...register("category", { required: true})}/>
                {errors.category?.type === 'required' && <p role="alert" className='error'>Categoria obrigatório</p>}
                <Select label='Subcategoria' options={SubCategory} {...register("subCategory")}/>
                <label>Link do fornecedor</label>
                <Input  {...register("shopUrl", { required: true})} />
                {errors.shopUrl?.type === 'required' && <p role="alert" className='error'>Link do fornecedor obrigatório</p>}
                <label>Link da Imagem principal</label>
                <Input  {...register("ImageUrl", { required: true})} />
                {errors.ImageUrl?.type === 'required' && <p role="alert" className='error'>Link de image obrigatório</p>}
                <label>Id do produto na stripe</label>
                <Input  {...register("stripeProductId")} />
              </div>
              <div className='box'>
                <div className='contentArraysItems'>
                  <label>Tamanhos</label>
                  <div className='inputsAdds'>
                    <Input  max={3} onChange={e=> setSizes(e.target.value,)} value={sizes}/>
                    <button type='button' onClick={()=> {
                      spreadFunction(setSizeList, 'size', sizes, product.id)
                      setSizes('')
                    }}>+</button>
                  </div>
                  <div className='itemsList'>
                    {
                      sizeList.length > 0 &&
                      sizeList.map((item, index) => {
                        return (
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
                        )
                      })
                    }
                  </div>
                </div>

                <div className='contentArraysItems'>
                  <label>cor variantes</label>
                  <div className='inputsAdds'>
                    <Input onChange={e=> setColor(e.target.value,)} value={color}/>
                    <button type='button' onClick={()=>{ 
                      spreadFunction(setColorList, 'variant', color, product.id)
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
                                let itemRemoved = colorList.find(color => color.variant === item.variant)
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
                      spreadFunction(setLinksImageList, 'url', linksImage, product.id)
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
                                let findItemRemoved = linksImageList.find(image => image.url === item.url)
                                setItemRemoved((prev:any) => [...prev, findItemRemoved])
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
                      checked={highlighted}  
                      onCheckedChange={(e: any) => setHighlighted(e)}
                    >
                      <Switch.Thumb className="SwitchThumb" />
                    </Switch.Root>
                  </div>
                  <div className='switch'>
                    <label htmlFor="status">Disponível</label>
                    <Switch.Root 
                      className="SwitchRoot" 
                      id="status"
                      checked={status}  
                      onCheckedChange={(e: any) => setStatus(e)}
                    >
                      <Switch.Thumb className="SwitchThumb" />
                    </Switch.Root>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={closeModal}>
              Cancelar
            </Button>
            <Button 
              type='submit' 
              colorScheme="orange" 
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              Editar
            </Button>
          </ModalFooter>
          </FormNewProduct>
  )
}
