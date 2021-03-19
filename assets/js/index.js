const Address = "0x427444759BB5D100CC7483E9E32bdB32DE577b06";
let replica_contract;

window.onload = async function() {
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
}

function walletmodal(){
    $('#wallet-popup').modal('show');
}


async function loadmm_matic(){
    $('#wallet-popup').modal('hide');
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const add = await signer.getAddress();
    console.log(add);
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log(chainId);
    if (chainId == "0x89" ){
        console.log("MaticNetworkに正しく接続しています")
    } else {
        ans = window.confirm("MetaMaskのネットワークをMaticに切り替えて下さい\n参考：https://note.com/ocurima/n/nd3191fdd7acd\n\n参考サイトを開きますか？");
        if(ans){ window.open("https://note.com/ocurima/n/nd3191fdd7acd"); }
        return;
    }
    replica_contract = await new ethers.Contract( Address , abi , signer );
//    window.alert(replica_contract.address);
    const maticbalance = await signer.getBalance();
//    window.alert(maticbalance);
    if ( maticbalance == 0 ){
        window.alert("maticを入手してください");
    }　else {
        meta = await replica_contract.mint();
//        window.alert(meta);
        window.alert("トランザクションを送信しています。20秒程度お待ちください");
        filter = replica_contract.filters.Transfer(null, add);
        replica_contract.on(filter, (from, to, amount, event) => {
        ans = window.confirm("OpenSeaでNFTレプリカを確認しましょう\n参考：https://opensea.io/account\n\nOpenSeaを開き、MetaMaskを接続しますか？\n(反映には数分時間がかかることがあります)");
        if(ans){ window.open("https://opensea.io/account"); }

    });
    }
}



async function loadmm_gasfree(){
    $('#wallet-popup').modal('hide');
    window.alert("開発中です。しばらくお待ちください");
}

