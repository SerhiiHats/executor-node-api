import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createOrganization,
  getOrganization,
  removeOrganization,
  updateOrganization
} from "../controllers/OrganizationController.js";


const router = express.Router();

router.post('/organization', isAuthenticated, createOrganization);
router.get('/organization', isAuthenticated, getOrganization);
router.put('/organization', isAuthenticated, updateOrganization);
router.delete('/organization', isAuthenticated, removeOrganization);

export default router;