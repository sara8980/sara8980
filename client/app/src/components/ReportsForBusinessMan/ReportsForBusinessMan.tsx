import React, { FC, useEffect, useState } from 'react';
import './ReportsForBusinessMan.scss';
import Loadder from '../Loadder/Loadder';
import nodeService from '../../service/node.service';

interface ReportsForBusinessManProps { }

const ReportsForBusinessMan: FC<ReportsForBusinessManProps> = () => {
  const [isDisplayLoadder, setIsDisplayLoadder] = useState(true)
  const [isOrderTable, setIsOrderTable] = useState(false)
  const [listAprovaOrders, setlistAprovalOrder] = useState<any[]>([])
  const [listBusiness, setListBusiness] = useState<any[]>([])
  const [listOrdersToAproval, setListOrdersToAproval] = useState<any[]>([])
  const [isChecked, setIsChecked] = useState(false);

  let codeBisinessMan = 901234567
  useEffect(() => {
    loadBusiness();
  }, [])
  useEffect(() => {

    if (listOrdersToAproval.length > 0) {
      const initialCounts = listOrdersToAproval.map((p: any) => ({
        business_in_event_code: p.business_in_event_code,
        business_owner_approval: false
      }));
      setlistAprovalOrder(initialCounts);
    }
  }, [isOrderTable])

  const loadBusiness = () => {
    setIsDisplayLoadder(true);
    nodeService.getBusinessBelowToBisnessman(codeBisinessMan).then((res) => {

      setListBusiness(res?.data)
      setIsDisplayLoadder(false);
    })

  }
  const loadOrderStayiesTobusinesAproval = (businessId: number) => {
    setIsDisplayLoadder(true);
    nodeService.getOrderStayiesTobusinesAproval(businessId).then((res) => {
      setListOrdersToAproval(res?.data)
      setIsDisplayLoadder(false);
      setIsOrderTable(true);
    })


  }
  const apoveral = () => {
    nodeService.updateOrderToAprovalByBusiness(listAprovaOrders.filter(f => f.business_owner_approval))
    alert('ההזמנות אושרו בהצלחה')
  }

  return <div className="ReportsForBusinessMan">
    {isDisplayLoadder ? <Loadder></Loadder> : ''}
    {listBusiness.map(business => {
      return <div ><button onClick={() => { loadOrderStayiesTobusinesAproval(business.business_code) }} className='button'>לטבלת ההזמנות שמחקות לאישורך מעסק:{business.business_name}</button></div>
    })}
    {isOrderTable ? <div ><table className='table table-striped' >
      <thead>
        <tr>
          <th scope="col"> שם עסק</th>
          <th scope="col">קוד הזמנה</th>
          <th scope="col"> שם לקוח</th>
          <th scope="col">שם אירוע</th>
          <th scope="col"> התאריך </th>
          <th scope="col">מחיר סופי  </th>
          <th scope="col">  פרטי הזמנה</th>
          <th scope="col"> אישור בעל עסק</th>
        </tr>
      </thead>
      <tbody>
        {listOrdersToAproval.map((row: any, i: number) =>
          <tr key={i} >
            <td>{row.business_name}</td>
            <td >{row.business_in_event_code}</td>
            <td >{row.customer_name}</td>
            <td>{row.event_name}</td>
            <td>{new Date(row.the_date).toUTCString()}</td>
            <td >{row.price}</td>
            <td ><button onClick={(event) => { }} className='button'> פרטי הזמנה</button></td>
            <td ><label>
              <input
                type="checkbox"
                onChange={(e) => {
                  let l = listAprovaOrders

                  l[i].business_owner_approval = !l[i].business_owner_approval;
                  setlistAprovalOrder([...l]);
                }}
              />
            </label></td>
          </tr>)}
      </tbody>
    </table>
      <button onClick={(event) => { apoveral() }} className='button'>אישור </button>
    </div> : ''}
  </div>
}

  ;

export default ReportsForBusinessMan;
