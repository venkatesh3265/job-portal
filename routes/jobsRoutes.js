import express from 'express';
const router = express.Router();
import  { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controller/jobsController.js';

router.route('/').post(createJob).get(getAllJobs);
// place before :id
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;

