<template>
    <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
        <span v-for="element in myArray" :key="element.id">{{element.name}}</span>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
      name: 'scrollImgEditor'
      ,components: {
        draggable,
      }
      ,data () {
        return {
          myArray:[
              {
                  'name':'a'
                  ,'order':'1'
                  ,'fixed':true
              }
              ,{
                  'name':'b'
                  ,'order':'2'
                  ,'fixed':true
              }
              ,{
                  'name':'c'
                  ,'order':'3'
                  ,'fixed':true
              }
              ,{
                  'name':'d'
                  ,'order':'4'
                  ,'fixed':true
              }
              ,{
                  'name':'e'
                  ,'order':'5'
                  ,'fixed':true
              }
          ]
        }
      }
    }

</script>

<style scoped>
span{
    width:100px;height:100px; float:left;
    margin:5px;
    background:#000;
    color:#fff;
    text-align: center;
    line-height: 100px;
}
</style>