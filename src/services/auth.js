import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

const createSession = () => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

const createAndSaveSession = async (userId) => {
  const newSession = createSession();

  return await SessionsCollection.create({
    userId,
    ...newSession,
  });
};

export const registerUser = async ({ name, email, password }) => {
  const user = await UsersCollection.findOne({ email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  return await UsersCollection.create({
    name,
    email,
    password: encryptedPassword,
  });
};

export const loginUser = async (email, password) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createHttpError(401, 'Email or password is incorrect');
  }
  const userId = user._id;

  await SessionsCollection.deleteOne({ userId });

  return await createAndSaveSession(userId);
};

export const logoutUser = async (userId) => {
  await SessionsCollection.deleteOne({ _id: userId });
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await SessionsCollection.findById(sessionId);

  if (!session || session.refreshToken !== refreshToken) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  await SessionsCollection.deleteOne({ _id: session._id });

  return await createAndSaveSession(session.userId);
};
