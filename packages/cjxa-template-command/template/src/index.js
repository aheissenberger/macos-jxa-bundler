// "export" is required to avoid function to be removed by rollup treeshaking
export function run(argv) {
  hello(argv)
}

function hello(param){
  console.log('Hello World!' + param)
}
