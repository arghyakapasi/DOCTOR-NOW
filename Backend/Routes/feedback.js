import express from 'express';
import FeedbackController from '../Controllers/feedbackController.js';
import { authenticate } from '../auth/verifyToken.js';

const router = express.Router();

router.post('/feedback',authenticate, FeedbackController.submitFeedbackForm);

export default router;
