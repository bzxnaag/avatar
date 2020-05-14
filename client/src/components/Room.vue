<template>
    <div class= 'table'>
        
        <div v-if=!statusjoin>
            {{passingRoom.RoomId}} {{passingRoom.name}}
            <button @click.prevent='confirmJoin'> join </button>
        </div>
        <div>
            BERANTEM DISINI

        </div>
    </div>

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
    background-color:chocolate
}



</style>