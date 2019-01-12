'use strict';
var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var os = require('os');
var fs = require( 'fs');
var sleep = require('sleep');

//

//var tx_id = null;

module.exports = {
    initiateLoc: function( data, callback ){
      callback(createLoc(data));
    }
};


const createLoc = function(data)
{
  var fabric_client = new Fabric_Client();

  // setup the fabric network
  var channel = fabric_client.newChannel('mychannel');


  // Fetch the MSP peer tls certs to sign the query

  var peerCert1 = fs.readFileSync(path.join(__dirname, './endorsercerts/tlsca.buyer.letterofcredit.com-cert.pem'));
  var peer1 = fabric_client.newPeer('grpcs://localhost:7051',{
  	'pem': Buffer.from(peerCert1).toString() , 'ssl-target-name-override': 'peer0.buyer.letterofcredit.com'
  });
  channel.addPeer(peer1);

  var peerCert2 = fs.readFileSync(path.join(__dirname, './endorsercerts/tlsca.seller.letterofcredit.com-cert.pem'));
  var peer2 = fabric_client.newPeer('grpcs://localhost:8051',{
  	'pem': Buffer.from(peerCert2).toString() , 'ssl-target-name-override': 'peer0.seller.letterofcredit.com'
  });
  channel.addPeer(peer2);

  var ordererCert = fs.readFileSync(path.join(__dirname, './endorsercerts/tlsca.letterofcredit.com-cert.pem'));

  var orderer = fabric_client.newOrderer('grpcs://localhost:7050', {
                    'pem': Buffer.from(ordererCert).toString(), 'ssl-target-name-override': 'orderer.letterofcredit.com'
                  });
  channel.addOrderer(orderer);

  //
  var member_user = null;
  var store_path = path.join(__dirname, 'hfc-key-store');
  console.log('Store path:'+store_path);

  // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
  Fabric_Client.newDefaultKeyValueStore({ path: store_path
  }).then((state_store) => {
  	// assign the store to the fabric client
  	fabric_client.setStateStore(state_store);
  	var crypto_suite = Fabric_Client.newCryptoSuite();
  	// use the same location for the state store (where the users' certificate are kept)
  	// and the crypto store (where the users' keys are kept)
  	var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
  	crypto_suite.setCryptoKeyStore(crypto_store);
  	fabric_client.setCryptoSuite(crypto_suite);

  	// get the enrolled user from persistence, this user will sign all requests
  	return fabric_client.getUserContext('user1', true);
  }).then((user_from_store) => {
  	if (user_from_store && user_from_store.isEnrolled()) {
  		console.log('Successfully loaded user1 from persistence');
  		member_user = user_from_store;
  	} else {
  		throw new Error('Failed to get user1.... run registerUser.js');
  	}

    const tx_id = fabric_client.newTransactionID();
  // This request is to initiate LC based on an ID
    const request = {
    		targets : [peer1, peer2], //--- letting this default to the peers assigned to the channel
    		chaincodeId: 'letterofcreditcc',
    		fcn: 'initiate_lc',
    		args: [data.locId, data.description],
     		chainId: 'mychannel',
     		txId: tx_id
    	};

  	// send the transaction to all the endorsing peers.
  	return channel.sendTransactionProposal(request, 30000);
  }).then((query_responses) => {
  	console.log("Query has completed, checking results");
  	console.log( '########Query Response [ 0 ]' + JSON.stringify(query_responses[0]));
  	console.log( '########Query REsponse [ 1 ]' + query_responses[1]);

  	// Send the proposal responses that contain the endorsements of a transaction proposal to the orderer for further processing.
  	channel.sendTransaction({proposalResponses: query_responses[0], proposal: query_responses[1]});
    console.log( 'WE ARE GOOD');
  }).catch((err) => {
  	console.error('Failed to sendTransactionProposal successfully :: ' + err);
  });
}

/*
var data = {
  locId: 'LC0098',
  description: 'testing'
};

createLoc(data);
*/
