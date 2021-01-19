// @flow

// minimum length = 6
// include at least 1 lowercase and 1 Uppercase

function checkPassword(password: string) {
    // TODO
    let reason = [];
    let sukses = false;
    if(password.length < 6) {
        reason.push('Password to short');
    } else if( !password.match(/[a-z]/g)) {
        reason.push('Password must include 1 lower case');
    } else if( !password.match(/[A-Z]/g)) {
        reason.push('Password must include 1 upper case');
    } else {
        sukses = true;
    }
        
    // return {success: true, reason: 'null'};
    return {success: sukses , reason: reason};
}

let check = checkPassword('indra10');
let {success, reason} = check;

console.log(`status: ${success}, alasan: ${reason}`);


