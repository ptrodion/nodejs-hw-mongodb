import {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
} from '../services//contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
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
  const createdContact = await createContact(req.body);

  res.json({
    status: 201,
    message: 'Successfully created a student!',
    data: createdContact,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;

  const deletesContacts = deleteContact(id);

  if (!deletesContacts) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 204,
  });
};
