import express from 'express';
import ruleController from '../controllers/ruleController';

const router = express.Router();

/**
 * @route GET /api/rules/:id
 * @desc Get a rule by ID
 * @access Public
 */
router.get('/:id', ruleController.getRuleById);

/**
 * @route GET /api/rules/search
 * @desc Search for rules by query
 * @access Public
 */
router.get('/search', ruleController.searchRules);

/**
 * @route GET /api/rules/categories
 * @desc Get all rule categories
 * @access Public
 */
router.get('/categories', ruleController.getCategories);

/**
 * @route GET /api/rules/category/:category
 * @desc Get rules by category
 * @access Public
 */
router.get('/category/:category', ruleController.getRulesByCategory);

export default router;