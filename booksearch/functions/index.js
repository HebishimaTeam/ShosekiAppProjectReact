//関数群定義
const funcs = {
    Login: './src/Login',
    BookSearch: './src/BookSearch',
}

//loadFunctions関数定義
loadFunctions = (funcs) => {

    for (let name in funcs) {
        if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
            exports[name] = require(funcs[name]);
        }
    }
}

//locadFunction実行
loadFunctions(funcs);