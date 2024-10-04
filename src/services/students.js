import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactCollection.find();
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Could not fetch contacts');
  }
};

export const getOneContact = async (id) => {
  try {
    const contact = await ContactCollection.findById(id);
    return contact;
  } catch (error) {
    console.error(`Error fetching contact with id ${id}:`, error);
    throw new Error('Could not fetch contact');
  }
};
