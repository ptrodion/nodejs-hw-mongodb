import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = () => {
  return ContactCollection.find();
};

export const getOneContact = (id) => {
  return ContactCollection.findById(id);
};

export const createContact = (payload) => {
  return ContactCollection.create(payload);
};

export const deleteContact = (id) => {
  return ContactCollection.findOneAndDelete({ _id: id });
};
