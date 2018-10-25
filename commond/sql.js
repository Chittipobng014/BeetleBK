export default {
    getallboxes: "SELECT b.* FROM boxes b JOIN branches ba WHERE ba.id=$1",
    getaviableboxes: "SELECT b.* FROM boxes b JOIN branches ba WHERE ba.id=$1 AND b.status=aviable",
    getinuseboxes: "SELECT b.* FROM boxes b JOIN branches ba WHERE ba.id=$1 AND b.status=inuse",
    addbox: "INSERT INTO boxes VALUES ($1, $2, $3, $4, $5, $6, null, null, null. null)",
    removebox: "DELETE FROM boxes WHERE id=$1",
    signin: "SELECT * FROM branches WHERE username=$1",
    branchregister: "INSERT INTO branches(id, name, username, password) VALUES (DEFAULT, $1, $2, $3)",
    renting: "INSERT INTO transactions VALUES (DEFAULT, $1, $2, $3, $4, null, $5)",
    updatecheckout: "UPDATE transactions SET checkout=$1 WHERE id=$2",
    gettransaction: "SELECT * FROM transactions WHERE id=$1",
    checkout: "DELETE FROM transactions WHERE id=$1",
    savelog: "INSERT INTO events VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)"
}