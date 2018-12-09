export default {
    getallboxes: "SELECT b.* FROM boxes b JOIN branches ba ON b.branchid = ba.id WHERE ba.id=$1",
    getaviableboxes: "SELECT b.* FROM boxes b JOIN branches ba WHERE ba.id=$1 AND b.status=aviable",
    getinuseboxes: "SELECT b.* FROM boxes b JOIN branches ba WHERE ba.id=$1 AND b.status=inuse",
    addbox: "INSERT INTO boxes VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    removebox: "DELETE FROM boxes WHERE id=$1",
    signin: "SELECT * FROM branches WHERE username=$1",
    branchregister: "INSERT INTO branches(id, name, username, password) VALUES (DEFAULT, $1, $2, $3)",
    renting: "INSERT INTO transactions VALUES (DEFAULT, $1, $2, null, 'inuse', $3, $4, $5, $6, (SELECT price FROM boxes WHERE id=$7)) RETURNING *",
    boxrented: "UPDATE boxes SET status='inuse' WHERE id=$1",
    updatecheckout: "UPDATE transactions SET checkout=$1 WHERE id=$2",
    gettransaction: "SELECT * FROM transactions WHERE id=$1",
    checkout: "DELETE FROM transactions WHERE id=$1",
    savelog: "INSERT INTO events VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)",
    getInuseFaceId: "SELECT faceid, boxid, id FROM transactions WHERE status='inuse' AND branchid=$1",
    checkout: "UPDATE transactions SET status='completed', checkout=$2 WHERE id=$1 RETURNING boxid",
    boxrelease: "UPDATE boxes SET status='aviable' WHERE id=$1",
    gettransactionbyid: "SELECT * FROM transactions WHERE boxid=$1 AND status='inuse'",
    gettransactionbyphone: "SELECT * FROM transactions WHERE phonenumber=$1 AND status='inuse'",
    updateBoxInfo: "UPDATE boxes SET price=$2, size=$3 WHERE id=$1",
    deleteBox: "DELETE FROM boxes WHERE id=$1",
    lockBox: "UPDATE status='lock' WHERE id=$1",
    unlockBox: "UPDATE status='aviable' WHERE id=$1"
}