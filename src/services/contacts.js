import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  return await ContactCollection.find();
};

export const getOneContact = async (id) => {
  return await ContactCollection.findById(id);
};

export const createContact = async (payload) => {
  return await ContactCollection.create(payload);
};

export const updateContact = async (id, payload) => {
  return await ContactCollection.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const deleteContact = async (id) => {
  return await ContactCollection.findOneAndDelete({ _id: id });
};
