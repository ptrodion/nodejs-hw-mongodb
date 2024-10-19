import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getAllContactsController,
  getOneContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidId.js';

import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:id', isValidID, ctrlWrapper(getOneContactByIdController));

contactsRouter.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:id',
  isValidID,
  validateBody(updateContactsSchema),
  ctrlWrapper(updateContactController),
);

contactsRouter.delete('/:id', isValidID, ctrlWrapper(deleteContactController));

export default contactsRouter;
