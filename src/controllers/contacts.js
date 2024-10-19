import createHttpError from 'http-errors';

import {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
} from '../services//contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const { data, totalItems, totalPages, hasNextPage, hasPreviousPage } =
    await getAllContacts(page, perPage, sortBy, sortOrder, filter);

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data,
      page,
      perPage,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  });
};

export const getOneContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getOneContact(id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id} !`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const createdContact = await createContact(contact);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: createdContact,
  });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const updatedContact = await updateContact(id, contact);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact !`,
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;

  const deletesContacts = await deleteContact(id);

  if (!deletesContacts) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
