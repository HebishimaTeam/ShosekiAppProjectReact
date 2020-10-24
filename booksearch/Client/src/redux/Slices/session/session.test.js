import { SOME_ACTION, authenticated, reducer, initialState } from "./session";

/** 
 * vscodeを利用してjestによるテストを行う場合は、
 * 拡張機能 Jestを入れると便利です。(https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
 * vscodeでClientフォルダを起点に開くと、テストコードが必要に応じて自動で実行されます。
 * 拡張機能を使用しない場合は npm run test を実行してください。
*/

describe('session sliceのアクション', () => {
    //jestによって提供されるテスト関数にテストコードを記述
    it('authenticatedアクションのテスト', () => {
        // アクションが実行される前のsession sliceのstate状態
        const initState = initialState

        // アクション実行によって変化するであろうsession sliceの一部分の状態
        const expected = {
            authenticated: true
        }
        // 実際にreducerによってauthenticatedアクションが実行され、変更されたsession sliceの状態
        const newState = reducer(initState, authenticated(true))

        // reducerによって作られた新しい状態と、想定した状態が一致するか比較
        expect(newState).toMatchObject(expected)
        //expect(オブジェクト).toEqueal(オブジェクト)と書くことでオブジェクトの完全一致の比較もできる
    })
})
