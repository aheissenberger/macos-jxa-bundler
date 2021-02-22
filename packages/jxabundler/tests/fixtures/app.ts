// "export" is required to avoid function to be removed by rollup treeshaking
export function run(argv:string[]) {
    hello(argv)
}

function hello(param:string[]){
    /* info */
    console.log('Hello World!' + param)
}
