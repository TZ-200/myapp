export default function flatten(comment) {

    let flats = [comment]
    const replies = comment.replies;
    if(replies.length === 0) return flats

    replies.forEach(reply => {
        if(reply.replies.length > 0){
            flats.push(...flatten(reply))
        } else {
            flats.push(reply)
        }
    })

    return flats
}


// let a = { id: "ida", parentId: null };
// let b = { id: "idb", parentId: null };
// let c = { id: "idc", parentId: "ida" };
// let d = { id: "idd", parentId: "ida" };
// let e = { id: "ide", parentId: "idc" };
// let f = { id: "idf", parentId: "idc" };
// let g = { id: "idg", parentId: "ida" };

// let replies = [a,b,c,d,e,f,g];

// let nestedReplies = replies.reverse().reduce((result,reply) => {
//     if (!reply.replies) {
//         reply.replies = replies.filter(r => r.parentId == reply.id).reverse();
//     }
//     if (reply.parentId == null) {
//         result.push(reply);
//     }
//     return result;
// },[]).reverse();  

// console.log(nestedReplies)