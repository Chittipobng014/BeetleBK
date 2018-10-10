"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dbHelper = exports.dbHelper = {
    GET_ALLBOXS: "SELECT * FROM boxs WHERE branchid=$1",
    GET_AVAILABLE_BOXS: "SELECT * FROM boxs WHERE branchid=$1 and status=0",
    GET_INUSE_BOXS: "SELECT * FROM boxs WHERE branchid=$1 and status=1",
    UPDATE_BOX_TO_INUSE: "UPDATE TABLE boxs SET status='1', passcode=$3, faceid=$4 WHERE branchid=$1 and id=$2",
    UPDATE_BOX_TO_AVAI: "UPDATE TABLE boxs SET status='0', passcode='', faceid='' WHERE branchid=$1 and id=$2",
    CREATE_TRANSACTION: ""
};