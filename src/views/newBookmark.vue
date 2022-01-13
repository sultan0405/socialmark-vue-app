<template>
     <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Taze Gosh</h3>
      <input v-model="BookMarkList.bookMark_name" type="text" placeholder="Tema" class="input mb-3" />
      <input v-model="BookMarkList.url" type="text" placeholder="URL" class="input mb-3" />
      <select v-model="BookMarkList.categoryId" class="input mb-3">
        <option disabled value="" selected>Kategoriya</option>
        <option
        v-for="category in CategoryList" 
        :key="category.id" 
        :value="category.id" 
        >{{category.name}}</option>
      </select>
      <textarea v-model="BookMarkList.book_description"  placeholder="Description" class="input mb-3" cols="30" rows="10"></textarea>
      <div class="flex items-center justify-end gap-x-1">
        <button class="secondary-button">Otmen</button>
        <button @click="onSave" class="default-button">Yatda Sakla</button>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      CategoryList: [],
      BookMarkList :{
        bookMark_name : null,
        url : null,
        categoryId: null,
        book_description: null
      }
    }
  },
  created(){
    this.$appAxios.get('/categories')
    .then(categ_res=>{
      // console.log(categ_res);
      this.CategoryList = categ_res?.data;
    })
  },
  methods: {
    onSave(){
       const userData ={
         ...this.BookMarkList,
        userId: this._getCurrentUser.id,
        created_at: new Date()
       }
      this.$appAxios.post(`/bookmarks`, userData )
      .then(book_res=>{
        console.log(book_res);
        Object.keys(this.BookMarkList)?.forEach(field => (this.BookMarkList[field]=null))
        this.$router.push('/')
      })
    }
  },
  computed: {
    ...mapGetters(["_getCurrentUser"])
  },
}
</script>