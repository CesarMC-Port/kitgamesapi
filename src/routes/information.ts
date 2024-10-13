import express from 'express';
var router = express.Router();
//importe controladores usuario

import { createUser, confirmarGoogle } from '../controllers/information.controller';

//importe QRProduct
import { addQRProduct, editQRProduct, deleteQRProduct, getQRProduct, getOneQRProduct, getAllProduct } from '../controllers/information.controller';

//importe get special
// import { getData } from '../controllers/information.controller';

// urls post de la aplicacion

router.post('/create',createUser);
router.post('/confirmarGoogle', confirmarGoogle)
router.post('/private/addQRProduct', addQRProduct)
router.post('/private/editQRProduct', editQRProduct)
router.post('/private/deleteQRProduct', deleteQRProduct)

// urls get de la aplicacion

// router.get('/getData', getData)
router.get('/private/getQRProduct', getQRProduct)
router.get('/private/getOneQRProduct', getOneQRProduct)
router.get('/private/getAllProduct', getAllProduct)

export default router;