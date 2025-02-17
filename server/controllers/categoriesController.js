const { getAllCategories, creatACategory, updeteACategory, deleteACategory } = require('../models/categoriesModel')

async function getCategories(req, res) {
    try {
        const result = await getAllCategories();  // ממתין לקבלת כל הקטגוריות
        res.status(200).json(result);  // שולח את התוצאה עם קוד סטטוס 200
    } catch (err) {
        console.error("Error fetching categories:", err);  // מדפיס את השגיאה בקונסול
        res.status(500).json({ error: "An error occurred while fetching categories" });  // שולח שגיאה עם קוד סטטוס 500
    }
}
async function creatCategory(req, res) {

    console.log(req.body);
    const { categoryName } = req.body;
    try {
        const result = await creatACategory(categoryName);  // ממתין ליצירת קטגוריה
        res.status(201).json(result);  // שולח את התוצאה עם קוד סטטוס 201 (נוצר בהצלחה)
    } catch (err) {
        console.error("Error creating category:", err);  // מדפיס את השגיאה בקונסול
        res.status(500).json({ error: "An error occurred while creating the category" });  // שולח שגיאה עם קוד סטטוס 500
    }

}
async function updeteCategory(req, res) {

    const category_code = req.params.category_code;
    const category_name = req.body.category_name;
    try {
        const result = await updeteACategory (category_code, category_name);  // ממתין לעדכון הקטגוריה
        res.status(200).json(result);  // שולח את התוצאה עם קוד סטטוס 200 (הצלחה)
    } catch (err) {
        console.error("Error updating category:", err);  // מדפיס את השגיאה בקונסול
        res.status(500).json({ error: "An error occurred while updating the category" });  // שולח שגיאה עם קוד סטטוס 500
    }

}
async function deleteCategory(req, res) {
    const category_code = req.params.category_code
    try {
        const result = await deleteACategory(category_code);  // ממתין למחיקת הקטגוריה
        res.status(200).json(result);  // שולח את התוצאה עם קוד סטטוס 200 (הצלחה)
    } catch (err) {
        console.error("Error deleting category:", err);  // מדפיס את השגיאה בקונסול
        res.status(500).json({ error: "An error occurred while deleting the category" });  // שולח שגיאה עם קוד סטטוס 500
    }
}

module.exports = { getCategories, creatCategory, updeteCategory, deleteCategory }