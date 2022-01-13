<template>
     <div>
        <div class="p-2 grid grid-cols-8 gap-4">
            <bookmark-items v-for="item in bookmark" :key="item.id" :item="item"/>
        </div>
      </div>
</template>
<script>
import BookmarkItems from '@/components/Shared/appBookmarkList/BookmarkItems'
    export default{
         components:{
             BookmarkItems,
         },
         props:{
    bookmark:{
      type: Array,
      required: true
    }
  }
    }
</script>