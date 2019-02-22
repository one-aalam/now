import { db } from "./firebase";

// Message API
export const createMessage = (message) => db.ref(`messages`).push().set({ message, createdAt: new Date(), updatedAt: new Date() });
export const updateMessage = (id, message) => db.ref(`messages/${id}`).set({ message, updatedAt: new Date() });
export const deleteMessage = (id) => db.ref(`messages/${id}`).remove();

export const getMessages = () => db.ref('messages').once('value');
export const getMessage = (id) => db.ref(`messages/${id}`).once('value');

export const subscribeMessages = (cb) => db.ref('messages').on('value', cb);
export const unsubscribeMessages = (cb) => db.ref('messages').off('value', cb);
export const subscribeMessage = (id) => db.ref(`messages/${id}`).on('value', cb);


export const createFolder = ({ title }) => db.ref(`folders`).push().set({ title, createdAt: new Date(), updatedAt: new Date(), notes: [] });
export const createNoteForFolder = (folderId, note) => db
  .ref(`folders/${folderId}/notes`)
  .push()
  .set({ ...note, createdAt: new Date().getTime(), updatedAt: new Date().getTime()});
export const updateFolder = ({ id, title }) => db.ref(`folders/${id}`).set({ title, updatedAt: new Date() });
export const updateNoteForFolder = (folderId, noteId, note) => db
  .ref(`folders/${folderId}/notes/${noteId}`)
  .set({ ...note, updatedAt: new Date().getTime()});
export const deleteFolder = (id) => db.ref(`folders/${id}`).remove();
export const deleteNoteForFolder = (folderId, noteId) => db.ref(`folders/${folderId}/notes/${noteId}`).remove();

export const getFolders = () => db.ref('folders').once('value');
export const getFolder = (id) => db.ref(`folders/${id}`).once('value');

export const subscribeFolders = (cb) => db.ref('folders').on('value', cb);
export const unsubscribeFolders = (cb) => db.ref('folders').off('value', cb);
export const subscribeFolder = (id) => db.ref(`folders/${id}`).on('value', cb);