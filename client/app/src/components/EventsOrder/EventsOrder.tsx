import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import nodeService from '../../service/node.service';
import Loadder from '../Loadder/Loadder';
import './EventsOrder.scss';
import { number } from 'yup';

interface EventsOrderProps {
  
}

const EventsOrder: FC<EventsOrderProps> = () => {
  const [isDisplayLoadder, setIsDisplayLoadder] = useState(true)
  const [isDisplayProductTable, setIsDisplayProductTable] = useState(false)
  const [listsCategories, setListsCategories] = useState<any[]>([])
  const [listsbusiness, setListsbusiness] = useState<any[]>([])
  const [listsProducts, setListProducts] = useState<any[]>([])
  const [listsCountProducts, setListsCountProducts] = useState<any[]>([])
  const [correntCategory, setCorrentCategory] = useState<number>(0)
  const [correntBusiness, setCorrentBusiness] = useState<number>(0)


  let eventNumber=1
  const userSlice = useSelector((myStore: any) => myStore.userSlice)

  useEffect(() => {

    loadCategories();
  }, [])
  useEffect(() => {

    if (listsProducts.length > 0) {
      const initialCounts = listsProducts.map((p: any) => ({
        product_code: p.product_code,
        price:p.price,
        count: 0
      }));
      setListsCountProducts(initialCounts);
    }
  }, [listsProducts])
 
 

  const loadCategories = () => {
    setIsDisplayLoadder(true);
    nodeService.getCategoties().then((res) => {
      setListsCategories(res?.data)
      setIsDisplayLoadder(false);
    })

  }
  const loadBusiness = (category_code:any) => {
    setIsDisplayLoadder(true);
    nodeService.getCategoriesBusiness(category_code).then((res) => {
      setListsbusiness(res?.data)
      setListProducts([...[]])
      setIsDisplayProductTable(false)
      setIsDisplayLoadder(false);
      setCorrentCategory(category_code)
      
      
    })

  }
  const loadProducts = (business_code:any) => {
    setIsDisplayLoadder(true);
    nodeService.getBusinessProducts(business_code).then((res) => {
      setListProducts(res?.data)
      setIsDisplayProductTable(true)
      setIsDisplayLoadder(false);
      setCorrentBusiness(business_code)
     
    })
      
  }
  const addOrder=()=>{
    let filterList=listsCountProducts.filter(f=>f.count>0)
    nodeService.addOrder(eventNumber,correntCategory,correntBusiness,filterList)
    setIsDisplayProductTable(false)
  }
const toApoveral=()=>{
  
}

  return <div className="EventsOrder">
  {isDisplayLoadder ? <Loadder></Loadder> : ''}
   
   <div dir="rtl" className='cardsSetsGroup grid-container'>
    {listsCategories.map(category => {
      return <div className='grid-item'><button onClick={ (event) => {loadBusiness(category.category_code) }} className='button'>{category.category_name}</button></div>
    })}
  </div> 
  
    {listsbusiness.map(business => {
      return <div ><button onClick={ (event) => {loadProducts(business.business_code)}} className='button'>{business.business_name}לטבלת המחירים של עסק: </button></div>
    })}
    {isDisplayProductTable? <div ><table className='table table-striped' >
          <thead>
            <tr>
              <th scope="col">קוד מוצר </th>
              <th scope="col">שם מוצר</th>
              <th scope="col"> מחיר</th>
              <th scope="col">כמות רצויה </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listsProducts.map((row: any, i:number) =>
              <tr key={i} >
                <td >{row.product_code}</td>
                <td>{row.product_name}</td>
                <td>{row.price.toString()}</td>
                {/* <td><input type="number" id="quantity" name="quantity" min="1" max="500" step="1"/></td> */}
                <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="400"
                        step="1"
                        
                        onChange={(e) => {
                          const count = parseInt(e.target.value, 10);
                          let l=listsCountProducts
                          l[i].count=count;
                          setListsCountProducts([...l]);
                        }}
                      />
              </tr>)}
          </tbody>
        </table>
         <button onClick={ (event) => {addOrder()}} className='button'>אישור הזמנה</button>
      </div> :''}

    <label>קוד אירוע {eventNumber}</label>
    <button onClick={ (event) => {toApoveral()}} className='button'>אישור כל ההזמנות באירוע</button>
      </div>
 
   
  
};

// return <div className='SelfCatalog'>
//     <p className='point'>.</p>
//     <div className="row">
//       <NavBar></NavBar>
//       {isDisplayLoadder ? <Loadder></Loadder> : ''}
//       {!isDisplayLoadder ?
//         <div>
//           {isEmpty() ? <p className='empty'>ארון הבגדים שלך ריק!</p> :
//             typesList.map((type) => {
//               return <div style={{ direction: 'rtl' }}>
//                 {/* <div className='title'>{type == 'dresses' ? <p>שמלות</p> : type == 'shirts' ? <p>חולצות</p> : type == 'skirts' ? <p>חצאיות</p> : <p>נעליים</p>}</div> */}
//                 <div className='type_group grid-container col-sm-8 m-auto'>
//                   {listsClothes[type]?.map((s: any, index: number) => {
//                     return <div className="card grid-item" >
//                       <img className="card-img-top" width={200} height={200} src={`data:image/jpeg;base64,${s.img}`} alt="Card image cap" />
//                       <div className="card-body">
//                         <h5 className="card-title">{s.name}</h5>
//                         <button className="button" onClick={() => { deleteFromCatalog(userSlice.user.Id, type, s.name) }}>הסר מארון הבגדים </button>
//                       </div>
//                     </div>
//                   })}
//                   <br></br>
//                 </div>
//                 <hr className='m-5'></hr>

//               </div>

//             })}

export default EventsOrder;
