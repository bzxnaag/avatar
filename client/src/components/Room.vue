<template>
    <tr v-if=!statusjoin>
        <td>{{passingRoom.RoomId}}</td>
        <td>{{passingRoom.name}}</td>
        <td><button @click.prevent='confirmJoin'> join </button></td>
     

    </tr>

</template>

<script>
export default {
    name: 'Room',
    props:['passingRoom'],
    data(){
        return{
            statusjoin:''
        };
    },
    components: {

    },
    methods: {
        confirmJoin(){
            this.statusjoin=true
            this.$emit('statusjoin',this.statusjoin)
        }
    },





}
</script>

<style scoped>

.table{
    background-color:rgba(255, 255, 255,3)
}



</style>