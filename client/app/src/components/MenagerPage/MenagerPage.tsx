import React, { FC, useRef } from 'react';
import './MenagerPage.scss';
import nodeService from '../../service/node.service';

interface MenagerPageProps {}

const MenagerPage: FC<MenagerPageProps> = () => {
  let categoryRef = useRef<any>()
  const addCategory=()=>{
    try{
      nodeService.addCategory(categoryRef.current.value)
      alert('התווסף בהצלחה!')
    }catch{
      alert('תקלה!')
    }
  }
  return <div className="MenagerPage">
    <label htmlFor="addCategory">הוספת קטגוריה</label>
    <input ref={categoryRef} id='addCategory' type="text" />
      <button onClick={addCategory} className='button'> אישור</button>

</div>
}
  


export default MenagerPage;
