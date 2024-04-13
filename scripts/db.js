import Note from "./components/Note.js";
import { initialState } from "./state.js";
import { generateId, select } from "./utils.js";

export const setupDb = async () => {
  const DB_NAME = "dMind-db";
  const connection = new JsStore.Connection(
    new Worker("scripts/lib/jsstore.worker.js")
  );

  var tblNotes = {
    name: "Notes",
    columns: {
      id: { primaryKey: true, autoIncrement: true },
      title: { notNull: true, dataType: "string", default: generateId() },
      body: { notNull: true, dataType: "object" },
      createdAt: { notNull: true, dataType: "date_time", default: new Date() },
      updatedAt: { notNull: true, dataType: "date_time", default: new Date() },
      sortingOrder: { auroincrement: true },
    },
  };

  const db = {
    name: DB_NAME,
    tables: [tblNotes],
  };

  var isDbCreated = await connection.initDb(db);

  if (isDbCreated) {
    console.log("Db Created & connection is opened");
  } else {
    console.log("Connection is opened");
  }

  return connection;
};

export const updateCurrentNote = async () => {
  let noOfRowsUpdated = await initialState.dbConnection.update({
    in: "Notes",
    where: {
      id: initialState.currentNoteId,
    },
    set: {
      updatedAt: new Date(),
      body: initialState.editorData,
    },
  });
  return noOfRowsUpdated;
};

export const insertNewNote = async () => {
  let newlyCreatedNote = await initialState.dbConnection.insert({
    into: "Notes",
    values: [
      {
        body: initialState.editorData,
      },
    ],
    return: true,
  });
  await renderRetrievedNoteList();
  return newlyCreatedNote;
};

export const deleteCurrentNode = async (id) => {
  let rowsDeleted = await initialState.dbConnection.remove({
    from: "Notes",
    where: {
      id,
    },
  });
  await renderRetrievedNoteList();
  return rowsDeleted;
};

export const renderRetrievedNoteList = async () => {
  const results = await initialState.dbConnection.select({
    from: "Notes",
  });

  select(".note_list").innerHTML = "";
  select(".nav_note_list").innerHTML = "";

  results.forEach((note) => {
    select(".note_list").append(Note({ id: note.id, body: note.body }));
    select(".nav_note_list").append(Note({ id: note.id, body: note.body }));
  });
};
