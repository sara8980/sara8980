const pool = require('../db')

async function getAllCategories() {
 try{
    const sql = 'SELECT *  FROM  categories'
    const [rows, fields] = await pool.query(sql);
    return rows;
 }catch (error){
    throw error;
 }
   
}
async function getLatCategory() {
   try{
    const sql = 'SELECT MAX(category_code) AS max FROM categories';
    const [rows] = await pool.query(sql);
    return rows[0]; // החזרת השורה הראשונה של התוצאה
   }catch (error){
    throw error;
   }
   
}


async function creatACategory( category_name) {
  try{
    if (!category_name) {
        console.error("Error: One  of the detail are null or empty");
        return "Error: One  of the detail are null or empty";

    }
    else {
        const category =await getLatCategory();
        const  categoryCode =parseInt(category.max)+1
        const sql = 'INSERT INTO categories (category_code, category_name) VALUES(?,?)'
        const [result] = await pool.query(sql, [categoryCode, category_name]);
        if (result.serverStatus == 2) {
            console.log("Added category successfully");
            return "Added category successfully";
        }
        else {
            console.error("Error in adding category");
            return "Error in adding category";
        }
    }
  }catch(error){
    throw error;
  }
    


}
async function updeteACategory(category_code,category_name)
{
try{
    if (!category_code||!category_name) {
        console.error("Error: One  of the detail are null or empty");
        return "Error: One  of the detail are null or empty";

    }
    else{
        const sql = 'UPDATE categories SET  category_name = ? WHERE category_code = ?';
        const [result]=await pool.query(sql,[category_name, category_code]);
        if (result.serverStatus == 2) {
            console.log("Update category successfully");
            return "Update category successfully";
        }
        else {
            console.error("Error in update category");
            return "Error in update category";
        }
    }
   
}catch (error){
 throw error;
}
   
}

async function deleteACategory(category_code)
{

try{
    if (!category_code) {
        console.error("Error: One  of the detail are null or empty");
        return "Error: One  of the detail are null or empty";

    }
    else{
        const sql = 'DELETE FROM categories  WHERE category_code = ?';
        const [result]=await pool.query(sql,[category_code]);
        if (result.serverStatus == 2) {
            console.log("Delete category successfully");
            return "Delete category successfully";
        }
        else {
            console.error("Error in delete category");
            return "Error in delete category";
        }
    }
}catch(error){
    throw error;
}
}

module.exports = { getAllCategories, creatACategory,updeteACategory ,deleteACategory};