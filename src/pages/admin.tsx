import Link from "next/link";
import { AdminContainer } from "../styles/pages/admin";

export default function Admin() {
  return (
     <AdminContainer>
      <header>
        <h2>Produtos</h2>
  
        <button>+ Produto</button>
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
         <tr>
            <td>img</td>
            <td>teste</td>
            <td>15.00</td>
            <td>5</td>
            <td>grátis</td>
            <td>teste</td>
            <td><a href="https://pt.aliexpress.com/item/1005004306016246.html?spm=a2g0o.productlist.main.5.37f254e33hL4Ta&algo_pvid=6e48802b-9023-4c1c-a2ae-a48202affbda&aem_p4p_detail=2023011804570910252267570068720000762933&algo_exp_id=6e48802b-9023-4c1c-a2ae-a48202affbda-2&pdp_ext_f=%7B%22sku_id%22%3A%2212000028839535951%22%7D&pdp_npi=2%40dis%21BRL%21213.74%2153.45%21%21%21%21%21%402102172f16740466298084642d0674%2112000028839535951%21sea&curPageLogUid=ANXQtWtryZf7&ad_pvid=2023011804570910252267570068720000762933_3&ad_pvid=2023011804570910252267570068720000762933_3" target='_blank' rel="noreferrer">acessar loja</a></td>
            <td>true</td>
            <td>true</td>
            <td>false</td>
            <td></td>
          </tr>
         <tr>
            <td>img</td>
            <td>teste</td>
            <td>15.00</td>
            <td>5</td>
            <td>grátis</td>
            <td>teste</td>
            <td>acesse.one/K40Vk</td>
            <td>true</td>
            <td>true</td>
            <td>false</td>
            <td></td>
          </tr>
         <tr>
            <td>img</td>
            <td>teste</td>
            <td>15.00</td>
            <td>5</td>
            <td>grátis</td>
            <td>teste</td>
            <td>acesse.one/K40Vk</td>
            <td>true</td>
            <td>true</td>
            <td>false</td>
            <td></td>
          </tr>
         <tr>
            <td>img</td>
            <td>teste</td>
            <td>15.00</td>
            <td>5</td>
            <td>grátis</td>
            <td>teste</td>
            <td>acesse.one/K40Vk</td>
            <td>true</td>
            <td>true</td>
            <td>false</td>
            <td></td>
          </tr>
        </tbody>
      </table>
     </AdminContainer>
  )
}