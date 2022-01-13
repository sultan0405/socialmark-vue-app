<template>
      <app-header/>
    <!-- ! SideBar -->
      <div class="flex flex-row">
    <SideBar @bookMarkChanged="ChangeBookmarkList"/>

      <!--!Bookmark Items -->
      <app-bookmark-list :bookmark="bookmarkItems"/>
    </div>
</template>

<script>
import SideBar from '@/components/Shared/Home/SideBar'
export default{
components:{
      SideBar,
},
data() {
  return {
    bookmarkItems:[]
  }
},
created() {
  this.$appAxios.get('/bookmarks?_expand=category&_expand=user')
  .then(bookmark_res=>{
    // console.log(bookmark_res);
    this.bookmarkItems = bookmark_res?.data || []

  })
},
methods: {
  ChangeBookmarkList(categoryId){
    const url = categoryId ? '/bookmarks?_expand=category&_expand=user&categoryId' : '/bookmarks?_expand=category&_expand=user' 
    this.$appAxios.get(`${url}=${categoryId}`)
    .then(bookmark_res=>{
      // console.log(bookmark_res);
      this.bookmarkItems = bookmark_res?.data || []
  
    })
  }
},
}

</script>