<template>
    <tr>
        <td>{{passingRoom.id}}</td>
        <td>{{passingRoom.name}}</td>
        <td>{{passingRoom.Players[0].name}}</td>
        <td v-if="passingRoom.Players[1]">{{passingRoom.Players[1].name}}</td>
        <td v-else>  </td>
        <td><button @click.prevent='confirmJoin'> join </button></td>
    </tr>

</template>

<script>
export default {
    name: "Room",
    props:['passingRoom', 'index'],
    created(){
        console.log('di room', this.passingRoom)
    },
    methods: {
        confirmJoin(){
            this.$emit('joining',this.index)
        }
    },
}
</script>

<style scoped>

.table{
    background-color:rgba(255, 255, 255,3)
}



</style>