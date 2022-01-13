<template>
     <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Register</h3>
      <input    v-model="Userdata.fullname" type="text" placeholder="Doly adynyz" class="input mb-3" />
      <input    v-model="Userdata.userName" type="text" placeholder="Ulanyjy adynyz" class="input mb-3" />
      <input    v-model="Userdata.password" type="password" placeholder="Kodunyz" class="input mb-3" />
      <button  @click='onSave'  class="default-button">Agza bol</button>
      <span class="text-center mt-3 text-sm">
        Agza men eyyam,
          <router-link :to="{name: 'LoginPage'}" class="text-red-900 hover:text-black">
            Girish!
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
      Userdata: [
        {
          fullname: null,
          userName: null,
          password: null
        }
      ]
    }
  },
  methods: {
    onSave(){
      const password = CryptoJs.HmacSHA1(this.Userdata.password, this._saltkey).toString();
      this.$appAxios.post('/users', {...this.Userdata, password})
      .then(save_res=>{
        console.log(save_res);
      })
      this.$router.push('/')
      // this.$router.push('/')
      // const decryptedPassword = cryptoJS.AES.decrypt(cryptedPassword, key).toString(cryptoJS.enc.Utf8)
      // console.log('deryptedPassword=>'  ,decryptedPassword);
    }
  },
  computed: {
   ...mapGetters(["_saltkey"])
 },
}
</script>