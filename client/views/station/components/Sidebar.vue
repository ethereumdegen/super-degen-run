<template>
<div class="h-full" style="overflow-y: scroll; max-height:100%">
  <div class="flex items-center justify-center mt-8">
  <div class="flex items-center">
    <svg
      class="h-12 w-12"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
        fill="#4C51BF"
        stroke="#4C51BF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
        fill="white"
      />
    </svg>

    <span class="text-white text-2xl mx-2 font-semibold pr-8">Station</span>
  </div>
</div>




  <div class="mt-10 text-gray-500">

    <div
      @click="clickedButton('ships')"
      class="flex items-center mt-4 py-2 px-6 border-l-4    cursor-pointer"
      :class="(activePanel == 'ships') ? activeClass : inactiveClass"
    >
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z"
        fill="currentColor"
      />
      <path
        d="M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z"
        fill="currentColor"
      />
      <path
        d="M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z"
        fill="currentColor"
      />
    </svg>



      <span class="mx-4">Hangar</span>
    </div>



    <div
      @click="clickedButton('wallet')"
      class="  flex items-center mt-4 py-2 px-6 border-l-4    cursor-pointer"
      :class="(activePanel == 'wallet') ? activeClass : inactiveClass"
    >
    <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M15.123,9.991c-0.944,0-1.71,0.766-1.71,1.71c0,0.945,0.766,1.711,1.71,1.711c0.945,0,1.711-0.766,1.711-1.711
								C16.834,10.756,16.068,9.991,15.123,9.991z M15.703,12.281h-1.141v-1.141h1.141V12.281z M17.984,4.867h-2.288v-0.57h-0.024
								c0.011-0.086,0.025-0.17,0.025-0.26V2.852c0-1.092-0.838-1.977-1.871-1.977H2.745C1.8,0.875,1.027,1.618,0.9,2.58H0.875v15.404
								c0,0.629,0.511,1.141,1.141,1.141h15.969c0.629,0,1.14-0.512,1.14-1.141V6.008C19.124,5.377,18.613,4.867,17.984,4.867z
								 M2.016,2.586c0-0.315,0.255-0.57,0.57-0.57h11.406c0.314,0,0.57,0.255,0.57,0.57v2.275H2.016V2.586z M17.984,17.414
								c0,0.314-0.257,0.57-0.57,0.57H2.586c-0.315,0-0.57-0.256-0.57-0.57V6.578c0-0.315,0.255-0.57,0.57-0.57h14.828
								c0.313,0,0.57,0.255,0.57,0.57V17.414z"></path>
						</svg>

      <span class="mx-4">Wallet </span>
    </div>


    <div
      @click="clickedButton('inventory')"
      class="flex items-center mt-4 py-2 px-6 border-l-4    cursor-pointer"
      :class="(activePanel == 'inventory') ? activeClass : inactiveClass"
    >
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
        fill="currentColor"
      />
      <path
        d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
        fill="currentColor"
      />
      <path
        d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
        fill="currentColor"
      />
      <path
        d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
        fill="currentColor"
      />
    </svg>

      <span class="mx-4">Items</span>
    </div>



    <div
      @click="clickedButton('market')"
      class="flex items-center mt-4 py-2 px-6 border-l-4    cursor-pointer"
      :class="(activePanel == 'market') ? activeClass : inactiveClass"
    >


    <svg class="svg-icon" viewBox="0 0 20 20">
  							<path fill="none" d="M16.227,16.672c0,0.49-0.396,0.889-0.889,0.889H2.883c-0.491,0-0.889-0.398-0.889-0.889V5.107c0-0.491,0.398-0.89,0.889-0.89h7.562V3.328H2.883c-0.982,0-1.779,0.796-1.779,1.779v11.565c0,0.982,0.796,1.779,1.779,1.779h12.455c0.982,0,1.779-0.797,1.779-1.779V10h-0.891V16.672z M15.338,1.549c-1.965,0-3.559,1.593-3.559,3.558c0,1.966,1.594,3.558,3.559,3.558s3.559-1.592,3.559-3.558C18.896,3.142,17.303,1.549,15.338,1.549z M15.338,7.776c-1.475,0-2.668-1.195-2.668-2.669c0-1.474,1.193-2.669,2.668-2.669s2.668,1.195,2.668,2.669C18.006,6.581,16.812,7.776,15.338,7.776z"></path>
  						</svg>


      <span class="mx-4">Market</span>
    </div>





    <div
      @click="clickedButton('production')"
      class="  flex items-center mt-4 py-2 px-6 border-l-4    cursor-pointer"
      :class="(activePanel == 'production') ? activeClass : inactiveClass"
    >

    <svg class="svg-icon" viewBox="0 0 20 20">
              <path fill="none" d="M16.382,15.015h0.455h0.457V4.985h-0.457h-0.455V15.015z M16.837,4.985c1.008,0,1.824-0.816,1.824-1.822c0-1.008-0.816-1.824-1.824-1.824c-1.006,0-1.822,0.816-1.822,1.824C15.015,4.169,15.831,4.985,16.837,4.985z M16.837,2.25c0.504,0,0.913,0.409,0.913,0.913c0,0.502-0.409,0.911-0.913,0.911c-0.502,0-0.911-0.409-0.911-0.911C15.926,2.659,16.335,2.25,16.837,2.25z M15.015,3.618V3.163V2.706H4.986v0.457v0.455H15.015z M3.162,15.01c-1.007,0-1.823,0.816-1.823,1.822c0,1.008,0.816,1.824,1.823,1.824s1.824-0.816,1.824-1.824C4.986,15.831,4.169,15.015,3.162,15.015z M3.162,17.75c-0.503,0-0.911-0.409-0.911-0.913c0-0.502,0.408-0.911,0.911-0.911c0.504,0,0.912,0.409,0.912,0.911C4.074,17.341,3.666,17.75,3.162,17.75z M4.986,16.382v0.455v0.457h10.029v-0.457v-0.455H4.986zM16.837,15.015c-1.006,0-1.822,0.816-1.822,1.822c0,1.008,0.816,1.824,1.822,1.824c1.008,0,1.824-0.816,1.824-1.824C18.661,15.831,17.845,15.015,16.837,15.015z M16.837,17.75c-0.502,0-0.911-0.409-0.911-0.913c0-0.502,0.409-0.911,0.911-0.911c0.504,0,0.913,0.409,0.913,0.911C17.75,17.341,17.341,17.75,16.837,17.75z M3.618,4.985H3.162H2.707v10.029h0.456h0.456V4.985zM4.986,3.163c0-1.008-0.817-1.824-1.824-1.824S1.339,2.155,1.339,3.163c0,1.006,0.816,1.822,1.823,1.822S4.986,4.169,4.986,3.163zM3.162,4.074c-0.503,0-0.911-0.409-0.911-0.911c0-0.504,0.408-0.913,0.911-0.913c0.504,0,0.912,0.409,0.912,0.913C4.074,3.665,3.666,4.074,3.162,4.074z"></path>
            </svg>

      <span class="mx-4">Production</span>
    </div>




                <div
                  @click="clickedButton('salvage')"
                  class="  flex items-center mt-4 py-2 px-6 border-l-4    cursor-pointer"
                  :class="(activePanel == 'salvage') ? activeClass : inactiveClass"
                >

                    <svg class="svg-icon" viewBox="0 0 20 20">
                    							<path d="M12.319,5.792L8.836,2.328C8.589,2.08,8.269,2.295,8.269,2.573v1.534C8.115,4.091,7.937,4.084,7.783,4.084c-2.592,0-4.7,2.097-4.7,4.676c0,1.749,0.968,3.337,2.528,4.146c0.352,0.194,0.651-0.257,0.424-0.529c-0.415-0.492-0.643-1.118-0.643-1.762c0-1.514,1.261-2.747,2.787-2.747c0.029,0,0.06,0,0.09,0.002v1.632c0,0.335,0.378,0.435,0.568,0.245l3.483-3.464C12.455,6.147,12.455,5.928,12.319,5.792 M8.938,8.67V7.554c0-0.411-0.528-0.377-0.781-0.377c-1.906,0-3.457,1.542-3.457,3.438c0,0.271,0.033,0.542,0.097,0.805C4.149,10.7,3.775,9.762,3.775,8.76c0-2.197,1.798-3.985,4.008-3.985c0.251,0,0.501,0.023,0.744,0.069c0.212,0.039,0.412-0.124,0.412-0.34v-1.1l2.646,2.633L8.938,8.67z M14.389,7.107c-0.34-0.18-0.662,0.244-0.424,0.529c0.416,0.493,0.644,1.118,0.644,1.762c0,1.515-1.272,2.747-2.798,2.747c-0.029,0-0.061,0-0.089-0.002v-1.631c0-0.354-0.382-0.419-0.558-0.246l-3.482,3.465c-0.136,0.136-0.136,0.355,0,0.49l3.482,3.465c0.189,0.186,0.568,0.096,0.568-0.245v-1.533c0.153,0.016,0.331,0.022,0.484,0.022c2.592,0,4.7-2.098,4.7-4.677C16.917,9.506,15.948,7.917,14.389,7.107 M12.217,15.238c-0.251,0-0.501-0.022-0.743-0.069c-0.212-0.039-0.411,0.125-0.411,0.341v1.101l-2.646-2.634l2.646-2.633v1.116c0,0.174,0.126,0.318,0.295,0.343c0.158,0.024,0.318,0.034,0.486,0.034c1.905,0,3.456-1.542,3.456-3.438c0-0.271-0.032-0.541-0.097-0.804c0.648,0.719,1.022,1.659,1.022,2.66C16.226,13.451,14.428,15.238,12.217,15.238"></path>
                    						</svg>

                  <span class="mx-4">Salvage</span>
                </div>


        <div
          @click="clickedButton('dev')"
          class="  flex items-center mt-4 py-2 px-6 border-l-4    cursor-pointer"
          :class="(activePanel == 'dev') ? activeClass : inactiveClass"
        >
        <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M10.841,13.784c0-0.232-0.188-0.421-0.42-0.421c-0.116,0-0.222,0.048-0.297,0.124l-2.522,2.521c-0.076,0.077-0.123,0.183-0.123,0.298c0,0.232,0.188,0.421,0.42,0.421h1.508l-1.805,1.805c-0.076,0.076-0.123,0.182-0.123,0.298c0,0.232,0.188,0.42,0.42,0.42c0.116,0,0.222-0.047,0.298-0.123l2.522-2.523c0.076-0.075,0.123-0.181,0.123-0.297c0-0.232-0.188-0.42-0.42-0.42h0H8.913l1.805-1.805C10.794,14.005,10.841,13.9,10.841,13.784 M6.216,14.205c-0.116,0-0.221,0.047-0.297,0.123l-2.522,2.522c-0.077,0.076-0.124,0.181-0.124,0.297c0,0.232,0.188,0.421,0.421,0.421c0.116,0,0.221-0.047,0.297-0.123l2.523-2.523c0.077-0.075,0.123-0.181,0.123-0.297C6.636,14.394,6.448,14.205,6.216,14.205M16.722,5.063c0.001-0.036,0.006-0.072,0.006-0.109c0-1.393-1.13-2.523-2.523-2.523c-0.635,0-1.215,0.237-1.658,0.625C11.648,1.671,10.094,0.75,8.318,0.75c-2.533,0-4.623,1.867-4.985,4.299C1.853,5.401,0.75,6.729,0.75,8.318c0,1.857,1.506,3.363,3.364,3.363h11.773c1.857,0,3.363-1.506,3.363-3.363C19.25,6.75,18.174,5.436,16.722,5.063 M15.887,10.841H4.114c-1.391,0-2.523-1.132-2.523-2.523c0-1.172,0.796-2.18,1.938-2.451c0.334-0.079,0.587-0.354,0.638-0.694c0.303-2.042,2.088-3.582,4.152-3.582c1.425,0,2.321,0.299,3.102,1.502c0.132,0.205,0.768,0.762,1.009,0.796c0.039,0.006,0.117,0.008,0.117,0.008c0.202,0,0.398-0.072,0.554-0.208c0.307-0.269,0.699-0.417,1.104-0.417c0.928,0,1.683,0.755,1.682,1.691l-0.005,0.062c-0.018,0.398,0.246,0.754,0.632,0.853c1.116,0.286,1.896,1.289,1.896,2.44C18.409,9.709,17.277,10.841,15.887,10.841 M15.045,14.205c-0.116,0-0.221,0.047-0.297,0.123l-2.522,2.522c-0.076,0.076-0.123,0.181-0.123,0.297c0,0.232,0.188,0.421,0.42,0.421c0.116,0,0.221-0.047,0.298-0.123l2.522-2.523c0.076-0.075,0.123-0.181,0.123-0.297C15.466,14.394,15.277,14.205,15.045,14.205"></path>
						</svg>

          <span class="mx-4">Dev Tools</span>
        </div>



    <div
      @click="clickedButton('undock')"
      class="flex items-center mt-4 py-2 px-6 border-l-4  bg-yellow-500 text-black  cursor-pointer"
      :class="(activePanel == 'undock') ? activeClass : inactiveClass"
    >



    <svg class="svg-icon" viewBox="0 0 20 20">
  							<path style="fill:#111" d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
  						</svg>


    <span class="mx-4">Undock</span>
  </div>





  </div>

</div>
</template>


<script>


 
import { defineComponent, ref } from "vue";


const activeClass = "bg-blue-600 bg-opacity-25 text-gray-100 border-gray-100 text-gray-200"

const inactiveClass =   "border-gray-900   hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"

const buttons = ['dashboard', 'market', 'ships', 'inventory']

export default {
  setup()
  {


  },


  name: 'StationPanel',
  props: ['buttonClickedCallback'],
  data() {
    return {
      myPlayer: null,
      activePanel: 'ships',
      activeClass: activeClass,
      inactiveClass: inactiveClass
    }
  },
  methods: {


    setHidden: function(hidden){
        this.hidden=hidden
        console.log('station panel is hidden: ', hidden)
    },

    clickedButton: function(buttonName)
    {
      //bubble out to a callback
      this.buttonClickedCallback(buttonName)
    },


    playersChanged: function(myPlayer, playersOnGrid)
    {
     /* if(GalaxyHelper.playerIsDocked(myPlayer ))
      {
        this.setHidden(false)
      }else{
        this.setHidden(true)
      }*/


    },
    setActivePanel: function(panelName)
    {

      this.activePanel= panelName

    }




  }

}
</script>
