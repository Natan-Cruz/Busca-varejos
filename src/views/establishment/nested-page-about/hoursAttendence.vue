<template>
    <li class="li-row-info" v-if="opening_hours.length"> 
        <input type="checkbox" name="" id="input-select_hour_atendence" class="input-select" > 
        <label for="input-select_hour_atendence" class="label-select"> 
            <span class="text-medium bold short-text">H. de atendimento</span> 
            <span class="text-medium bold full-text">Horário de atendimento</span> 
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg> 
        </label>
        <div class="content-expand list-hours-atendence">
            <table>
                <tbody>
                    <tr v-for="(item, i) in opening_hours" :key="i">
                        <td class="bold">{{ item.abbreviated_weekday }}</td>    
                        <td :class="{ 'bold': isToday(item) }"> {{ formatHourAttendence(item) }} </td>    
                    </tr>     
                </tbody>
            </table>
        </div>
    </li>
</template>

<script>
export default {
    name: "hours-attendence",
    props: {
        opening_hours:{
            type:Array,
            required: false,
            default: () => []
        }
    },
    methods:{
         formatHourAttendence(item){
            if(item.closed) return "Fechado"
            else return `${item.start}-${item.end}`
        },
        isToday(item){
            const todayDayOfWeek = new Date().getDay()
            if(item.day_of_week === todayDayOfWeek)
                return true;
            else 
                return false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .label-select {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        background: #fff;
        padding-right: 10px;
        margin-bottom: 0;
        transition: 150ms;

        svg {
            transform: rotate(180deg);
            transition: 150ms cubic-bezier(.75, .19, .67, .43);
        }

        &:hover{
            opacity: 0.8;
        }
    }
    .header-list-blocks:active {
        background: rgba(126, 126, 126, 0.2);
    }

    .input-select {
        display: none;
        &:checked+.label-select {
            margin-bottom: 10px;
            border-bottom: solid 1px;
            padding-bottom: 5px;
        }
        &:checked+.label-select>svg {
            transform: rotate(0);
        }
        &:checked~.content-expand {
            height: 210px !important;
        }
    }

    .content-expand {
        width: 100%;
        height: 0;
        overflow: hidden;
        transition: 200ms;
    }
        
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        font-size: 1.7em;
        line-height: 1em;
    }

    tr {
        height: 30px;
        border-bottom: solid 1px rgba(0, 0, 0, 0.22);
        td:first-child {
            width: 60px;
        }
        &:last-child {
            border: none;
        }
    }

</style>