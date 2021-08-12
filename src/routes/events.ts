import express from 'express';
import events from '../controllers/events';

const router = express.Router()

router.get('/', events.createAll);
router.get('/data', events.getCal);

export default router