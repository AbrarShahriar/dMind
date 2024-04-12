export const setupDb = async () => {
  const DB_NAME = "dMind-db";
  const connection = new JsStore.Connection(
    new Worker("scripts/lib/jsstore.worker.js")
  );

  var tblNotes = {
    name: "Notes",
    columns: {
      // Here "Id" is name of column
      id: { primaryKey: true, autoIncrement: true },
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
  // isDbCreated will be true when database will be initiated for first time

  if (isDbCreated) {
    console.log("Db Created & connection is opened");
  } else {
    console.log("Connection is opened");
  }

  return connection;
};
