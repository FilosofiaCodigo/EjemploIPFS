function setFileBuffer(_file_buffer)
{
  file_buffer = _file_buffer
  console.log("File buffer stored", file_buffer)
}

document.querySelector('#image_input').addEventListener('change', function() {
  var reader = new FileReader();
  reader.onload = function() {
    var arrayBuffer = this.result,
      array = new Uint8Array(arrayBuffer),
      binaryString = String.fromCharCode.apply(null, array);

    setFileBuffer(array)
  }
  reader.readAsArrayBuffer(this.files[0]);
}, false);

document.addEventListener('DOMContentLoaded', async () => {
  const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() })
  window.node = node

  const status = node.isOnline() ? 'online' : 'offline'

  console.log(`IPFS node status: ${status}`)
})