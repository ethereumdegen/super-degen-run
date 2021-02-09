
var web3utils = require('web3-utils');

const ethJsUtil = require('ethereumjs-util')

let mongoInterface = require('./mongo-interface')
let redisInterface = require('./redis-interface')


const geckos = require('@geckos.io/server').default
const { iceServers } = require('@geckos.io/server')

var io;

var broadcastGridsWorker;

var clientSocketChannels = new Map();

const GRID_UPDATE_RATE = 500;



module.exports = class SocketServ {

  constructor(expressServer, gameState)
  {
    this.gameState = gameState;

    this.gameState.setClientChangedGridCallback( this.forceClientIntoGridCommsChannel )


    redisInterface.init()

    var options = {

      //iceServers: process.env.NODE_ENV === 'production' ? iceServers : [],
    }

      io = geckos(options)

    broadcastGridsWorker =  setInterval( function(){ this.broadcastGridDataToRooms(gameState) }.bind(this)  , GRID_UPDATE_RATE)


  io.onConnection(channel => {
   //  console.log('meep ', channel )
  //  console.log(channel.userData) // { username: 'Yannick', level: 13, points: 8987 }


    channel.onDisconnect(() => {
      console.log(`${channel.id} got disconnected`)
    })


    channel.on('connect', async (data) => {
      console.log(`got ${data} from "connect"`)


      var publicAddress = data.publicAddress;
      var randomChallenge =  web3utils.randomHex(32 )    //make this prettier ?
      console.log('meep', publicAddress)
      console.log('sending randomChallenge ', randomChallenge  )

      /*try{
        var existing = await redisInterface.findHashInRedis('socket_challenge',publicAddress )
        console.log('found existing ', existing)
      }catch(e)
      {
        console.log(e)
      }*/

      let newdata = JSON.stringify({  publicAddress: publicAddress, challenge: randomChallenge})
      //store random challenge along w public address -- in redis
      var store = await redisInterface.storeRedisHashData('socket_challenge',publicAddress,newdata)

      io.emit('challenge', {challenge: randomChallenge})
    })


    channel.on('signature', async (data) => {
      console.log(`got ${data.signature} from "signature"`)

      var existingJSON  = await redisInterface.findHashInRedis('socket_challenge',data.publicAddress )
      var existing = JSON.parse(existingJSON)
      console.log('found record ', existing)

      if(data.publicAddress != existing.publicAddress )
      {
        //throw error
        console.log('error - address mismatch during signature checking')
        return;
      }


      var recoveredAddress = await this.ethJsUtilecRecover(existing.challenge, data.signature)

      if(recoveredAddress != existing.publicAddress )
      {
        //throw error
        console.log('error - recovered address mismatch',recoveredAddress, existing.publicAddress )
        return;
      }

      var authToken = web3utils.randomHex(20).toString()

      var newdata = JSON.stringify({  publicAddress: recoveredAddress, authToken: authToken})
      var store = await redisInterface.storeRedisHashData('auth_token',recoveredAddress,newdata)



         clientSocketChannels.set(recoveredAddress , channel  );

      //auth token should expire after some time...?
      io.emit('authorized', {publicAddress: recoveredAddress, authToken: authToken})

    })

    channel.on('chat message', data => {
      console.log(`got ${data} from "chat message"`)
      // emit the "chat message" data to all channels in the same room
       io.room(channel.roomId).emit('chat message', data)

    })



    //client wants to spawn in... lets do that
    channel.on('spawn', async (data) => {
      console.log(`got ${data.publicAddress} from "spawn"`)

      var authed = this.verifyAuthToken(data)

      if(authed)
      {

        var shiptype = 'corvette' //starter ship

        var loc = this.gameState.getNewPlayerSpawnLocation()

        var result = await this.gameState.spawnPlayerShip( data, shiptype, loc  )

        if(result.error)
        {
            io.emit('errormessage', {message: result.error})
        }else{




          //  io.emit('setGrid', {gridUUID: result.gridUUID }, {reliable:true })

            clientSocketChannels.set(data.publicAddress , channel  );

            this.forceClientIntoGridCommsChannel(data.publicAddress  , result.gridUUID )

        }
      }else{
        io.emit('errormessage', {message: 'unauthorized'})
      }


    })


    //receive client commands - every 1 second .. queue, turn based ticks
    channel.on('clientCommand', async data => {
      console.log(`got ${data} from "clientCommands"`)

      var authed = this.verifyAuthToken(data)

      if(authed)
      {
        var result = await this.gameState.handleClientCommand( data  )



      }else{
        io.emit('errormessage', {message: 'unauthorized'})
      }

    })




    //send the client the updated state of his grid
  /*  channel.on('getGridState', async (data) => {
      console.log(`got ${data} from "getGridState"`)

      var authed = this.verifyAuthToken(data)

      var result = await this.gameState.getGridState( data  )

      io.emit('gridState', result )
      //make this a broadcast to a channel -- the channel belongs to the grid
    //  io.emit('authorized', {publicAddress: recoveredAddress, authToken: authToken})


      if(result.error)
      {
          io.emit('errormessage', {message: result.error})
      }
    })*/




  })


/*
  io.onConnection((channel: ServerChannel) => {
    console.log(channel.userData) // { username: 'Yannick', level: 13, points: 8987 }
  })*/

    io.addServer(expressServer)

   // io.listen(9208) // default port is 9208

  }


  async forceClientIntoGridCommsChannel(clientPublicAddress, newGridUUID)
  {
        var channel = clientSocketChannels.get( clientPublicAddress )
        channel.join( newGridUUID  )//throw the client in the grids room
  }

  async broadcastGridDataToRooms(gamestate){

    //update player queued actions
      await gamestate.update();


    await gamestate.updateGridActivity();

    var activeGrids = await gamestate.getListOfGridsWithPlayers();

    //console.log('broadcasting active grids ', activeGrids )
    for(var i in activeGrids)
    {


      var gridUUID = activeGrids[i].uuid

      //this is done using the gridupdaters now
      //await gamestate.updateGrid( gridUUID, GRID_UPDATE_RATE);

      var gridState = await gamestate.getEntitiesOnGrid(gridUUID);



      io.room(gridUUID).emit('gridState', gridState)
    }

  }

  //check the redis db
  async verifyAuthToken(credentials)
  {
    var token = credentials.authToken;
    var publicAddress = credentials.publicAddress;

    console.log('checking credentials', credentials)

    var existingJSON  = await redisInterface.findHashInRedis('auth_token',publicAddress )
    var existing = JSON.parse(existingJSON)
    console.log('found record ', existing)

    if(existing.authToken == token)
    {
      return true
    }

    return false;
  }


async web3ecRecover(challenge,signature)
{
 console.log('ecrecover ', challenge, signature)

 var addr =   await new Promise(async (resolve,reject) => {

    this.web3.personal.ecRecover( challenge , signature, function (err,result){
          if (err) {return console.error(err)}
          console.log('ecrecover:' + result)
          resolve(result);
   })

 })

 return addr;

}

//https://ethereum.stackexchange.com/questions/12033/sign-message-with-metamask-and-verify-with-ethereumjs-utils

  async ethJsUtilecRecover(msg,signature)
  {



    console.log('ecrecover ', msg, signature)
      var res = ethJsUtil.fromRpcSig(signature)

      const msgHash = ethJsUtil.hashPersonalMessage(Buffer.from( msg ) );


      var pubKey = ethJsUtil.ecrecover( ethJsUtil.toBuffer(msgHash) , res.v, res.r, res.s);
      const addrBuf = ethJsUtil.pubToAddress(pubKey);
      const recoveredSignatureSigner    = ethJsUtil.bufferToHex(addrBuf);
      console.log('rec:', recoveredSignatureSigner)


    return recoveredSignatureSigner;

   }


  init()
  {

  }

  async shutdown()
  {
    clearInterval( broadcastGridsWorker );
  }

}