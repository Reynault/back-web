/**
 * Script qui permet d'indexer les collections
 */
db.getCollection('recipies').createIndex({ name: 1 }, { unique: true });
db.getCollection('web_users').createIndex({ login: 1 }, { unique: true });
