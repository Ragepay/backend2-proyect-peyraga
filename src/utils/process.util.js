function sum() {
    let result = 0;
    for (let i = 0; i < 5e10; i++) {
        result += 1;
    }
    console.log(result);
    return result;
}

/*
function sendEmail(emails) {
    
}
*/

export default sum;

process.on("message", () => process.send(sum()));