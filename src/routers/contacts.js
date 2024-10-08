import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getAllContactsController,
  getOneContactByIdController,
  createContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));
contactsRouter.get('/contacts/:id', ctrlWrapper(getOneContactByIdController));
contactsRouter.post('/contacts', ctrlWrapper(createContactController));
contactsRouter.delete('/contacts/:id', ctrlWrapper(deleteContactController));

export default contactsRouter;
