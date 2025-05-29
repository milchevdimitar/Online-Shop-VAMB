import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { getSettings, updateSettings } from '../backend_logic/settingsSrc.js';

const settingsRouter = express.Router();

settingsRouter.get('/:name', getSettings);
settingsRouter.put('/:name', adminAuth, updateSettings);

export default settingsRouter;
