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
        ans = window.confirm("OpenSeaでNFTレプリカを確認しましょう\n参考：https://opensea.io/account\n\nOpenSeaを開き、MetaMaskを接続しますか？\n(画像の反映などには数分時間がかかることがあります)");
        if(ans){ window.open("https://opensea.io/account"); }

    });
    }
}



async function loadmm_gasfree(){
    $('#wallet-popup').modal('hide');
    if (typeof web3 == 'undefined'){
        ans = window.confirm("metamaskをインストールしてください\nmetamaskのインストール方法を確認しますか？\n\n参考：https://note.com/ocurima/n/n29e1fd7ecbdd");
        if (ans){
            window.open("https://note.com/ocurima/n/n29e1fd7ecbdd");
        }
        return;
    }
    
    ans = window.confirm("OKを押すと『NFTアートのレプリカ』がMetaMaskに送信されます")
    if ( !ans ){
        return;
    }
    
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const add = await signer.getAddress();

    let result = await $.getJSON( "https://mint.nandemotoken.com/api/v1/0x427444759BB5D100CC7483E9E32bdB32DE577b06/"+ add + "/" )
    console.log(result);
    $('#myinfo').modal('show')
    
    //    window.alert("開発中です。しばらくお待ちください");
}

function explorer(){
    //window.alert("matic")
    ans = window.confirm("ブロックチェーンエクスプローラーを開く\n\nhttps://explorer-mainnet.maticvigil.com/tokens/" +Address + "/inventory\n\nNFTの発行状況を確認しますか？");
        if(ans){ window.open("https://explorer-mainnet.maticvigil.com/tokens/" +Address + "/inventory"); }

}

function opensea(){
    //window.alert("opensea")
    ans = window.confirm("OpenSeaでNFTレプリカを確認する\n\nhttps://opensea.io/account\n\nOpenSeaを開き、MetaMaskを接続しますか？\n(反映には数分時間がかかります。NFTの画像は処理が終わると表示されます)");
        if(ans){ window.open("https://opensea.io/account"); }
}
