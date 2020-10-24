import { SOME_ACTION, login, reducer, initialState } from "./session";

/** 
 * vscodeを利用してjestによるテストを行う場合は、
 * 拡張機能 Jestを入れると便利です。(https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
 * vscodeでClientフォルダを起点に開くと、テストコードが必要に応じて自動で実行されます。
 * 拡張機能を使用しない場合は npm run test を実行してください。
*/

//describe()の内部にテストを書くと、テスト結果出力が読みやすいです
//記載しないで テスト関数のit()だけ記載しても問題ありません。
describe('単純な関数をテストするデモ', () => {
    /**テスト対象の関数 */
    function plus(a, b) {
        return a + b
    }
    it('1 + 1 = ?', () => {
        //plus関数を実行します
        const result = plus(1,1)
        //expect()の引数に計算結果を与えます。
        //expect()の戻り値から、比較を行う関数を呼び出します。
        //今回は、"plus(1,1)は、2になるか"のテストを実行します。
        expect(result).toBe(2)
    })
})

describe('session sliceのアクション', () => {
    it('authenticatedアクションのテスト', () => {
        // アクションが実行される前のsession sliceのstate状態
        const initState = initialState

        // アクション実行によって変化するであろうsession sliceの一部分の状態
        const expected = {
            isAuthorized: true
        }
        // 実際にreducerによってloginアクションが実行され、変更されたsession sliceの状態
        const newState = reducer(initState, login(true))

        // reducerによって作られた新しい状態と、想定した状態が一致するか比較
        expect(newState).toMatchObject(expected)
        //expect(オブジェクト).toEqueal(オブジェクト)と書くことでオブジェクトの完全一致の比較もできる
    })
})
