<template>
  <div    class="absolute  py-4 px-6 right-0 top-0" style="background:#111a">

  <div @click="hidden=!hidden" class="text-centered w-full text-gray-100  cursor-pointer">  OVERVIEW </div>

    <table class="table-fixed text-xs text-gray-100 mt-4" v-if="!hidden" >

      <thead>
       <tr>
         <th class="px-1 py-1">Name</th>
         <th class="px-1 py-1">Distance</th>
       </tr>
     </thead>
     <tbody>
      <tr v-for="item in entityList" v-bind:key="item._id">
        <td class="border px-1 py-1 capitalize"> {{ item.name }}</td>
        <td class="border px-1 py-1"> {{ item.distance }} </td>
      </tr>
    </tbody>

    </table>


  </div>

</template>
<script>
import * as THREE from 'three'

import GalaxyHelper from '../../shared/lib/GalaxyHelper'

export default {
  name: 'StarMap',
  data() {
    return {
      hidden: false,
      entityList: [],
      myPossessedUnit: null
    }
  },
  methods: {

    ping: function( ){
      console.log('pong' )


    },


    entitiesChanged: function(myPossessedUnit, entities){

      if(myPossessedUnit)
      {
        this.myPossessedUnit=myPossessedUnit;

        this.entityList = []
        for(var i in entities)
        {

          this.entityList.push(  this.getTableDataForEntity( entities[i] ,myPossessedUnit ))
        }
      }


    //  console.log('overview entities', this.entityList)

    },

    getTableDataForEntity(entity, myPossessedUnit)
    {
      var data = {}
      data._id = entity._id
      data.name =   UnitHelper.getNameForEntity( entity.basetype )

      /*console.log('meep', entity )
      if(entity.unittype == 'celestial' ) //is celestial
      {
        data.name = GalaxyHelper.getEntityData( entity ).name

      }*/


      //distance is broken ?
      if(myPossessedUnit){
        var loc = new THREE.Vector3(entity.locationVector.x,entity.locationVector.y,entity.locationVector.z)
        data.distance = (loc.distanceTo( myPossessedUnit.locationVector )).toFixed(2)
        if(data.distance < 10){ data.distance = '--'}
      }

      return data
    }


  }

}
</script>
