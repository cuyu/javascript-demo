const databaseUrl = 'sqlite:database.sqlite';

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(databaseUrl);
//
// db.serialize(function() {
//     db.run("CREATE TABLE lorem (info TEXT)");
//
//     var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();
//
//     db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//         console.log(row.id + ": " + row.info);
//     });
// });
//
// db.close();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseUrl);
const Lorem = sequelize.define('lorem', {
    info: {
        type: Sequelize.STRING
    },
});

async function createLoremTable() {
    // force: true will drop the table if it already exists
    await Lorem.sync({force: true});
    for (let i = 0; i < 10; ++i) {
        await Lorem.create({
            info: `Ipsum ${i}`,
        });
    }
}

async function main() {
    await createLoremTable();
    const info = await Lorem.findAll();
    info.forEach((item, index) => {
        console.log(index + ":" + item.get('info'));
    });
}

main().catch(error => console.log(error));