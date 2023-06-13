const Database = {};

Database.Forum = [];
Database.ForumDiscussion = [];

export default Database;

export function Save(model, data) {
    Database[model].push(data);
}

