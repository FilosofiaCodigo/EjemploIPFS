const getWeb3 = async () => {
  return new Promise((resolve, reject) => {
    console.log(document.readyState)
    if(document.readyState=="complete")
    {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // ask user permission to access his accounts
          (async function(){
            await window.ethereum.request({ method: "eth_requestAccounts" });
          })()
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("must install MetaMask");
      }
    }else
    {
      window.addEventListener("load", async () => {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            // ask user permission to access his accounts
            await window.ethereum.request({ method: "eth_requestAccounts" });
            resolve(web3);
          } catch (error) {
            reject(error);
          }
        } else {
          reject("must install MetaMask");
        }
      });
    }
  });
};

function handleRevertError(message) {
  alert(message);
}

async function getRevertReason(txHash) {
  const tx = await web3.eth.getTransaction(txHash);
  await web3.eth
    .call(tx, tx.blockNumber)
    .then((result) => {
      throw Error("unlikely to happen");
    })
    .catch((revertReason) => {
      var str = "" + revertReason;
      json_reason = JSON.parse(str.substring(str.indexOf("{")));
      handleRevertError(json_reason.message);
    });
}

const getContract = async (web3) => {
  const data = await getJSON("./contracts/MyContract.json");
  const netId = await web3.eth.net.getId();
  const deployedNetwork = data.networks[netId];
  const contract = new web3.eth.Contract(
    data.abi,
    deployedNetwork && deployedNetwork.address
  );
  return contract;
};

function getJSON(url) {
  return new Promise(resolve => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.send();
  });
}

async function loadApp() {
  var awaitWeb3 = async function () {
    web3 = await getWeb3();
    web3.eth.net.getId((err, netId) => {
      var awaitContract = async function () {
        contract = await getContract(web3);
        var awaitAccounts = async function () {
          accounts = await web3.eth.getAccounts()
          console.log("Web3 loaded")
        };
        awaitAccounts()
      };
      awaitContract();
    });
  };
  awaitWeb3();
}

loadApp()