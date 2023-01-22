import  React, {useState, forwardRef, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { SubmitHandler, UseFormRegister } from 'react-hook-form/dist/types';
import { Dialog, DialogContent, DialogTrigger } from "../components/AddProductDialog";
import { AdminContainer, Container, FormContainer, FormNewProduct } from "../styles/pages/admin";
import { categories, SubCategory } from '../utils/option';
import { ProductDto } from '../utils/types/productsType';
import * as Switch from '@radix-ui/react-switch';
import { getProducts, postProducts } from '../server/lib/products';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Image from 'next/image';

const Select = forwardRef<
HTMLSelectElement,
{ label: string,
  options: string[]
} & ReturnType<UseFormRegister<any>>
>(function SelectComponent({ onChange, onBlur, name, label, options }, ref) {
  return (
    <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Sem {label}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
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
      highlighted
    }
    
    await axios.post('/api/products', dataToPost)
    .catch(errors => console.error(errors))
    reset()
    setColorList([])
    setHighlighted(false)
    setStatus(false)
    setSizeList([])
    setLinksImageList([])
  }

  if(!isCurrentCodeAccess) {
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
      <AdminContainer>
        <header>
          <h2>Produtos</h2>
          <Dialog>
          <DialogTrigger asChild><button className='open-dialog'>Adicioanr produto</button></DialogTrigger>
          <DialogContent>
            <h3>Novo produto</h3>
            <FormNewProduct onSubmit={
              handleSubmit(onSubmit)
            }>
              <div className='box'>
                <label>Nome do produto</label>
                <input {...register("title")} />
                <label>preço do produto</label>
                <input {...register("price")} />
               
                <Select label='Categoria' options={categories} {...register("category")}/>
                <div className='contentArraysItems'>
                  <label>Tamanhos</label>
                  <div className='inputsAdds'>
                    <input max={3} onChange={e=> setSizes(e.target.value,)} value={sizes}/>
                    <button type='button' onClick={()=> {
                      spreadFunction(setSizeList, 'size', sizes)
                      setSizes('')
                    }}>+</button>
                  </div>
                  <div className='itemsList'>
                    {
                      sizeList.length > 0 &&
                      sizeList.map((item, index) => (
                        <span key={index}>
                          <>
                            {item.size}
                            <button 
                              type='button'
                              onClick={()=> {
                                let remove = sizeList.filter(size => size.size !== item.size)
                                setSizeList(remove)
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
                    <input onChange={e=> setLinksImage(e.target.value,)} value={linksImage}/>
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
              </div>
              <div className='box'>
                <label>Desconto</label>
                <input type="number" {...register("discount")} />
                <label>Link do fornecedor</label>
                <input {...register("shopUrl")} />
                <label>Link do Imagem principal</label>
                <input {...register("ImageUrl")} />
                <Select label='Subcategoria' options={SubCategory} {...register("subCategory")}/>
               
                <div className='contentArraysItems'>
                  <label>cor variantes</label>
                  <div className='inputsAdds'>
                    <input onChange={e=> setColor(e.target.value,)} value={color}/>
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
              <button type="submit">Cadastrar</button>
            </FormNewProduct>
          </DialogContent>
        </Dialog>
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
                <td>true</td>
                <td>true</td>
                <td>false</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminContainer>
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