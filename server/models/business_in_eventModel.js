const pool=require('../db')

async function getLatOrder() {
try{
    const sql = 'SELECT MAX(business_in_event_code) AS max FROM business_in_event';
    const [rows] = await pool.query(sql);
    return rows[0]; // החזרת השורה הראשונה של התוצאה
}catch (error){
    throw error;
}
    
}


async function addAOrder(eventCode,categoryCode,businessCode, products,price) {
    
    if(!eventCode ||!categoryCode||!businessCode||! products){
        console.error("Error: One or more of the details arenull or empty");
        return "Error: One or more of the details are null or empty";
    }
    else{
        try{
        //business_in_event
        const orders =await getLatOrder();
        const  ordersCode =parseInt(orders.max)+1
        const sql='INSERT INTO business_in_event (business_in_event_code, code_event, code_business, code_category, price, acceptance, business_owner_approval, invited) VALUES(?,?,?,?,?,?,?,?)'
        const [result] = await pool.query(sql, [ordersCode,eventCode,businessCode,categoryCode,price,null,false,false]); // כאן אנו מזינים את ערך הפרמטר לשאילתה
        console.log(`secsses business_in_event  `)
        //prodacts_in_order
       
        products.forEach(async p => {
         let sql1='INSERT INTO prodacts_in_order (code_business_in_event, code_prodact, count) VALUES(?,?,?)'
        let  [result1] = await pool.query(sql1, [ordersCode,p.product_code,p.count]); // כאן אנו מזינים את ערך הפרמטר לשאילתה
        console.log(`secsses prodacts_in_order  `)
        });

    }
   catch (error) {
   console.log (error)
    throw error;
  }
}

}

async function getAOrderStayiesTobusinesAproval(busnessId) {

    if(!busnessId){
        console.error("Error: One or more of the details arenull or empty");
        return "Error: One or more of the details are null or empty";
    }try{
        const sql='SELECT business_in_event_code ,customer_name,event_name ,price,business_name ,the_date FROM business_in_event JOIN business ON business.business_code = business_in_event.code_business JOIN my_events ON business_in_event.code_event = my_events.event_code  JOIN customers ON my_events.code_costomer=customers.customer_code  WHERE code_business=? and business_owner_approval=false;'
        const [rows, fields] = await pool.query(sql, [busnessId]); // כאן אנו מזינים את ערך הפרמטר לשאילתה
        console.log(`secsses getAOrderStayiesTobusinesAproval business_in_event `)
        console.log(rows)
        return rows; // אנו מניחים שיש רק תוצאה אחת
    }
   catch (error) {
   console.log (error)
    throw error;
  }

}
async function updateAOrderToAprovalByBusiness(aprovalOrders) {
    
    if(!aprovalOrders){
        console.error("Error: One or more of the details arenull or empty");
        return "Error: One or more of the details are null or empty";
    }
    else{
    }try{
        aprovalOrders.forEach(async f=>{
            let sql = 'UPDATE business_in_event SET business_owner_approval = true WHERE business_in_event_code =?'
            let  [result] = await pool.query(sql, [f.business_in_event_code]); // כאן אנו מזינים את ערך הפרמטר לשאילתה
           console.log(`secsses prodacts_in_order  `)
        })
    }
   catch (error) {
   console.log (error)
    throw error;
  }
    }


module.exports={addAOrder,getAOrderStayiesTobusinesAproval,updateAOrderToAprovalByBusiness}