const data = {
    "key": "4",
    "name": "kevin",
    "gender": "男"
}
function loadData(params) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(data)
        }, 1500);
    })
}
export function fetch(options) {
    const opt = Object.assign(options);
    return loadData(opt).then(data);
}