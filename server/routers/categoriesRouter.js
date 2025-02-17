const express =require('express');
const categoriesRouter=express.Router();
const{getCategories,creatCategory,updeteCategory,deleteCategory}=require('../controllers/categoriesController');


categoriesRouter.route('/')
.get(getCategories)


categoriesRouter.route('/addCategory')
.post(creatCategory)

categoriesRouter.route('/:category_code')
.put(updeteCategory)
.delete(deleteCategory)



module.exports=categoriesRouter;

