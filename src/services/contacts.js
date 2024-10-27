import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  id,
) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const ContactsQuery = ContactCollection.find();

  if (typeof filter.type !== 'undefined') {
    ContactsQuery.where('contactType').eq(filter.type);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    ContactsQuery.where('isFavourite').eq(filter.isFavourite);
  }

  ContactsQuery.where('userId').equals(id);

  const [totalItems, data] = await Promise.all([
    ContactCollection.countDocuments(ContactsQuery),
    ContactsQuery.sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
};

export const getOneContact = async (id, userId) => {
  return await ContactCollection.findOne({ _id: id, userId });
};

export const createContact = async (payload) => {
  return await ContactCollection.create(payload);
};

export const updateContact = async (id, userId, payload) => {
  return await ContactCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    { new: true },
  );
};

export const deleteContact = async (id, userId) => {
  return await ContactCollection.findOneAndDelete({ _id: id, userId });
};
