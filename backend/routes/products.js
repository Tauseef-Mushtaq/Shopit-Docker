import express from 'express';
const router = express.Router();
import {
  canUserReview,
  createProductReview,
  deleteProduct,
  deleteProductImage,
  deleteProductReview,
  getAdminProducts,
  getProductDetails,
  getProductReviews,
  getProducts,
  newProduct,
  updateProductDetails,
  uploadProductImages,
} from '../controllers/productControllers.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

router.route('/products').get(getProducts);

router
  .route('/admin/products')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

router.route('/products/:id').get(getProductDetails);

router
  .route('/admin/products/:id/upload_images')
  .put(isAuthenticatedUser, authorizeRoles('admin'), uploadProductImages);

router
  .route('/admin/products/:id/delete_image')
  .put(isAuthenticatedUser, authorizeRoles('admin'), deleteProductImage);

router
  .route('/admin/products/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProductDetails);

router
  .route('/admin/products/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

//REVIEWS

router
  .route('/reviews')
  .get(isAuthenticatedUser, getProductReviews)
  .put(isAuthenticatedUser, createProductReview);

router
  .route('/admin/reviews')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProductReview);

router.route('/can_review').get(isAuthenticatedUser, canUserReview);

export default router;
