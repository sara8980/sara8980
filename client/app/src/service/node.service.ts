import axios from "axios"
import { useSelector } from "react-redux"
import reponse from '../models/reponse'



export default new class nodeService {
    BASE_URL = "http://localhost:5000"

    logIn(email: string, pasword: string, type: string) {
        const params  = {
            'email': email,
            'password': pasword,
        }
        // type ='customer'
        if (type == 'customer')
            return axios.get(`${this.BASE_URL}/customers/logIn`, {params })
        if (type == 'BusinessMan')
            return axios.get(`${this.BASE_URL}/business_owners/logIn`,{params } )
        //manager
        else return axios.get(`${this.BASE_URL}/manager/logIn`, {params })
    
        //return a response object
    }

    signUp(userName: string, id: string, email: string, phone: string, pasword: string, type: string) {
        const data = {
            'name': userName,
            'code': id,
            'email': email,
            'phone': phone,
            'password': pasword,
        }

        // type = 'customer'
        if (type == 'customer')
            return axios.post(`${this.BASE_URL}/customers/signUp`, data)
        else 
            return axios.post(`${this.BASE_URL}/business_owners/signUp`, data)
        //return a response object
    }


    // isExistEventsNameToCustomer(eventName: string, userCode: number) {
    //     const data = {
    //         'eventName': eventName,
    //         'userCode': userCode
    //     }

    //     return axios.post(`${this.BASE_URL}/isExistEventsNameToCustomer`, data)
    //     //return boolean
    // }
    getCategoties() {
        console.log('get catrgoris')
        return axios.get(`${this.BASE_URL}/categories/`)
        //return a list of categories ([]string)
    }
    getBusinessBelowToBisnessman(codeBusinessman:number)
        {return axios.get(`${this.BASE_URL}/business/getBusinessBelowToBisnessman/${codeBusinessman}`)
        //return a list of categories ([]string)
    }
    getListEvent(userId: string) {
        return axios.get(`${this.BASE_URL}/events/${userId}`,
          )
        //return a list of event object
    }
    deleteEvent(userId: string, eventId: string) {
        return axios.post(`${this.BASE_URL}/deleteEvent`, {
            userId: userId,
            eventId: eventId
        })
        // console.log('deleteClothesFromData axios')
    }
    addEvent(userId: string, eventName: string, eventDate: string) {
          console.log('in event add')
          
          const data = {
            'userId': userId,
            'eventName': eventName,
            'eventDate': eventDate
        }
        return axios.post(`${this.BASE_URL}/events/addEvent`, data)
      

    }
    getCategoriesBusiness(categoryId: string) {
        return axios.get(`${this.BASE_URL}/business/getCategoriesBusiness/${categoryId}`)
        //return a list of event object
    }
    getBusinessProducts(businessId: string) {
        return axios.get(`${this.BASE_URL}/products/${businessId}`)
        //return a list of event object
    }
    getOrderStayiesTobusinesAproval(businessId: number) {
        return axios.get(`${this.BASE_URL}/business_in_event/getOrderStayiesTobusinesAproval/${businessId}`)
        //return a list of event object
    }

    addOrder(eventCode: number, categoryCode: number, businessCode: number ,products:any[]) {
        console.log('in order')
        
        const data = {
          'eventCode': eventCode,
          'categoryCode': categoryCode,
          'businessCode': businessCode,
          'products':products
      }
      return axios.post(`${this.BASE_URL}/business_in_event/addOrder`, data)
    }
    addCategory(categoryName:string) {
        const data = {
          'categoryName': categoryName,
      }
      return axios.post(`${this.BASE_URL}/categories/addCategory`, data)
    }
    
    updateOrderToAprovalByBusiness(aprovalOrders:any[]) {
        console.log('in order')
        
        const data = {
        
          'aprovalOrders':aprovalOrders
      }
      return axios.put(`${this.BASE_URL}/business_in_event/updateOrderToAprovalByBusiness`, data)
    }
    // getClothesData(id: string) {
    //     return axios.get(`${this.BASE_URL}/getClothesData`, {
    //         params: {
    //             id: id
    //         }
    //     })
    // }

    // addClothesToData(currentUser: string, fileList: any[]) {
    //     let formFile = new FormData();
    //     fileList.forEach((f: any) => {
    //         formFile.append("file", f)
    //     })
    //     formFile.append('currentUser', currentUser)

    //     return axios.post(`${this.BASE_URL}/addClothesToData`, formFile, {
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     }).catch(error => {
    //         console.log(error)
    //     })


    // }


}