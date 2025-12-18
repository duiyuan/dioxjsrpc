import { Web3, NET } from '../../lib/commonjs'

describe('Tx unit test', () => {
  const web3 = new Web3(NET.TEST)

  it('test compose & sign & send', async () => {
    const composeResp = await web3.tx.compose({
      function: 'core.coin.transfer',
      args: { Amount: '10000000000', To: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519' },
      sender: 'qebn24p3gaqf0f34b4qvdhwqz9p92j8ebk34kf11f00azkwsqbzq7ebd18:ed25519',
    })

    console.log('composeResp', composeResp)
    expect(composeResp.ret).toMatchObject({
      TxData: expect.any(String),
      GasOffered: expect.any(Number),
    })

    const signResp = await web3.tx.sign({
      sk: ['JKntzEPdFv7W5qnAjHR170onkQdH4trrQLNJAgyrkvS7l1ESw4Ku8DxkWS+2x5f6bJFJDlzGSbwheACvz5m6/w=='],
      txdata: composeResp.ret.TxData,
    })

    console.log('signResp', signResp)
    expect(signResp.ret).toMatchObject({
      TxData: expect.any(String),
    })

    const sendResp = await web3.tx.send({
      txdata: signResp.ret.TxData,
    })
    console.log('sendResp', sendResp)
    expect(sendResp.ret).toMatchObject({
      Hash: expect.any(String),
    })
  })

  it('test sendWithSK', async () => {
    const resp = await web3.tx.sendWithSK({
      privatekey: 'JKntzEPdFv7W5qnAjHR170onkQdH4trrQLNJAgyrkvS7l1ESw4Ku8DxkWS+2x5f6bJFJDlzGSbwheACvz5m6/w==',
      function: 'core.delegation.deploy_contracts',
      delegatee: 'silas:dapp',
      args: {
        code: [
          'contract ProofOfExistence{\r\n\t@shard scattered_map<hash, string> proofs;\r\n\r\n\t@address function new(string key, string content) public export const {\r\n\t\taddress sender = __transaction.get_sender();\r\n\t\thash proof_key = hash(string(sender).append(key));\r\n\t\taddress proof_addr = address(proof_key);\r\n\t\trelay@proof_addr _new(sender, proof_key, content);\r\n\t}\r\n\r\n\t@address function _new(address owner, hash key, string content) {\r\n\t\tproofs[key] = content;\r\n\t\t// __debug.print("New ProofOfExistence success, key:", key, ", content:", content);\r\n\t}\r\n\r\n\t@address function bool check(hash key) public {\r\n\t\treturn proofs.has(key);\r\n\t}\r\n\r\n\t@address function string get(hash proof_key) public {\r\n\t\tstring content = "";\r\n\t\tif (proofs.has(proof_key)) {\r\n\t\t\tcontent = proofs[proof_key];\r\n\t\t}\r\n\t\t// __debug.print("ProofOfExistence get by key: ", proof_key, ", content: ", content);\r\n\t\treturn content;\r\n\t}\r\n\r\n}',
        ],
        cargs: [''],
      },
    })

    console.log('sendWithSKResp', resp)
    expect(resp.ret).toMatchObject({
      Hash: expect.any(String),
    })
  })
})
