const THREE = require('three')

var  GalaxyHelper = require(  '../../../shared/lib/GalaxyHelper' )
var  UnitHelper = require(  '../../../shared/lib/UnitHelper' )

var solarsystems = require('../../../shared/worlddata/solarsystems.json').solarsystems
var celestialtypes = require('../../../shared/worlddata/celestialtypes.json')
let mongoInterface = require('./mongo-interface')

module.exports = class GalaxyState {


constructor(mongoInterface)
{
  this.mongoInterface = mongoInterface


}
//on server boot
async init()
{

    console.log('building world statics...')


    //do not drop these because they are stations!
  /*  try{
     //await this.mongoInterface.deleteMany('units', {isStatic: true} )

   }catch(e)
   {
     console.log('could not drop statics')
   }*/


  for(var i in solarsystems)
  {
    var celestials =   solarsystems[i].celestials
    for(var j in celestials)
    {
      await this.spawnCelestial( solarsystems[i], celestials[j] )
    }
  }


}


  async spawnCelestial( galaxy, celestial )  //each celestial is a grid
  {


   var celestialtypedata = celestialtypes[celestial.type]


   var existingCelestialgrid = await this.mongoInterface.findOne('celestialgrid',{uuid: celestial.uuid})

   if( !existingCelestialgrid  )
   {
     var newCelestialData = {
       galaxy: galaxy.name,
       uuid: celestial.uuid,
       gridLocationVector: new THREE.Vector3( celestial.celestialLocationVector.x, celestial.celestialLocationVector.y, celestial.celestialLocationVector.z ),  //location within solar system.. affects facing direction when you warp  **
        celestialtype: celestialtypedata.celestialtype,
        staticEntities: celestialtypedata.entities,
        gridTick: 0,
        ownedByGridUpdaterId: 1 ,//the grid update process/thread 
        hasActivePlayers: false
        }

      await this.mongoInterface.insertOne('celestialgrid',  newCelestialData )




    var cEntities = celestialtypedata.entities;

      for(var i in cEntities)
      {
        var item = cEntities[i]
            console.log( 'item', item)
        var newUnitData = {

          galaxy: galaxy.name,
          grid: celestial.uuid,
          locationVector: new THREE.Vector3( item.locationVector.x, item.locationVector.y, item.locationVector.z ),// new THREE.Vector3( 0, 1, 0 )  {x: this.getSpawnLocation().x, y: this.getSpawnLocation().y},
          velocityVector: new THREE.Vector3( 0,0,0 ),
          basetype: item.basetype,
          stats: UnitHelper.getInitialStatsForEntityType( item.basetype ),
          active:  true,
          invisible: false,
          unittype: 'celestial',
          isStatic: true,
           }

           console.log('new static',newUnitData )

        var response = await this.mongoInterface.insertOne('units',   newUnitData )


      }

   }




  }



}
