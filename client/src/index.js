var contract
var accounts
var web3
var file_buffer

const getImage = async () => {
  image = await contract.methods.image().call()
  console.log(image)
  document.getElementById("img_image").src = "https://ipfs.io/ipfs/" + image;
}

const setImage = async () => {
  const { cid } = await node.add(file_buffer)
  const result = await contract.methods.setImage(cid["string"])
  .send({ from: accounts[0], gas: 400000 })
  .catch((revertReason) => {
    getRevertReason(revertReason.receipt.transactionHash);
  });
};