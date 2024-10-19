import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const ContactsQuery = ContactCollection.find();

  if (typeof filter.type !== 'undefined') {
    ContactsQuery.where('contactType').eq(filter.type);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    ContactsQuery.where('isFavourite').eq(filter.isFavourite);
  }

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
