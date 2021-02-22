// "export" is required to avoid function to be removed by rollup treeshaking
export function run(argv) {
    hello(argv)
}

// "export" is required to avoid function to be removed by rollup treeshaking
export function openDocuments(docs){
    hello(...(docs??{}))
}
function hello(param){
    /* info */
    console.log('Hello World!' + param)
}
