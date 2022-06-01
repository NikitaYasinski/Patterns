class KVDatabase {
  private db: Map<string, string> = new Map();

  public save(key: string, value: string): void {
    this.db.set(key, value);
  }
}

interface IPersistentRecord {
  key: string,
  value: string
}

class PersistentDatabase {
  public savePersistent(record: IPersistentRecord): void {
    console.log(record);
  }
}

class PersisntentDatabaseAdapter extends KVDatabase {
  constructor(public persistentDatabase: PersistentDatabase) {
    super();
  }

  override save(key: string, value: string): void {
    this.persistentDatabase.savePersistent({ key, value });
  }
}

function run(database: KVDatabase) {
  database.save('key', 'myValue');
}

run(new PersisntentDatabaseAdapter(new PersistentDatabase()));