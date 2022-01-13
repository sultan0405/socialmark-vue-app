<template>
    <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Login</h3>
      <input v-model="Userdata.userName" type="text" placeholder="Ulanyjy adyny giriz" class="input mb-3" />
      <input v-model="Userdata.password" type="password" placeholder="Koduny giriz" class="input mb-3" />
      <button @click="getUser"  class="default-button">Girish</button>
      <span class="text-center mt-3 text-sm">
        Agza dal,
        <router-link :to="{name:'RegisterPage'}" class="text-red-900 hover:text-black">
          Agza boljak!
        </router-link>
      </span>
    </div>
</template>

<script>
import CryptoJs from 'crypto-js'
import { mapGetters } from 'vuex'
export default {
 data() {
   return {
     Userdata:{
       userName : null,
       password:null
     }
   }
 },
 methods: {
   getUser(){
      const password = CryptoJs.HmacSHA1(this.Userdata.password, this._saltkey).toString();
      this.$appAxios.get(`/users?username=${this.Userdata.userName}&password=${password}`)
      .then(log_res=>{
        if(log_res?.data?.length > 0  ){
          this.$store.commit('setUser', log_res?.data[0])
          // console.log(log_res.data[0]);
        }
        else{
          alert("Siz agza dal!")
        }
      })
      .catch( e=> console.log(e))
      this.$router.push('/')
   }
 },
 computed: {
   ...mapGetters(["_saltkey"])
 },
}
</script>