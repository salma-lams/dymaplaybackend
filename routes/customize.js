import express from "express";
import { body } from "express-validator";
import { createCustomizeRequest, listCustomizeRequests } from "../controllers/customizeController.js";

const router = express.Router();

// POST /api/customize
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").optional().isEmail().withMessage("Email must be valid"),
    body("template").notEmpty().withMessage("Template is required"),
    body("hosting").notEmpty().withMessage("Hosting selection is required"),
    body("budget").isNumeric().withMessage("Budget must be a number"),
  ],
  createCustomizeRequest
);

// GET /api/customize
router.get("/", listCustomizeRequests);

export default router;
