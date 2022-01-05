/* -------------------------------------------------------------------------- */
/*                               DEpartement Model                              */
/* -------------------------------------------------------------------------- */

module.exports = (db , type) => {
    // Define Table
    return db.define('departements',{ // Table name
        // Attributes , Type
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: type.STRING
        },
        description: {
            type: type.TEXT
        }
    })
}