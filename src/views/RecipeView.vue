<template>
    <div class="container">
        <div class="row">
            총 <span style="color:green;font-size: 35px;">{{ counts }}</span>개의 맛있는 레시피가 있습니다.
        </div>
        <div class="row" style="margin-top:10px ;">
            <div class="col-md-3" v-for="(vo, index) in recipe_list" :key="index">
                <div class="thumbnail">
                    <router-link to="/">
                        <img :src="vo.poster" style="width:240px;height: 160px">
                        <div class="caption">
                            <p>{{ vo.title }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row text-center" style="margin-top:10px ;">
            <ul class="pagination">
                <li v-if="startPage > 1"><a class="a-link" @click="prev(startPage - 1)">&lt;</a></li>
                <li v-for="(i, index) in range(startPage, endPage)" :class="i === curpage ? 'active' : ''" :key="index">
                    <a class="a-link" @click="pageChange(i)">{{ i }}</a></li>
                <li v-if="endPage < totalpage"><a class="a-link" @click="next(endPage + 1)">&gt;</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default ({
    // HTML 제어
    data() {
        return {
            recipe_list: [], // List = [] , VO = {}
            curpage: 1,
            totalpage: 0,
            startPage: 0,
            endPage: 0,
            count: 0
        }
    },
    mounted() {
        this.dataRecv()
    },
    computed: {
        counts() {
            return this.count.toLocaleString()
        }
    },
    methods: {
        // axios.post('url',null,{name:'',subject:''...})
        dataRecv() {
            axios.get('http://localhost:8080/web/recipe/list_vue.do', {
                params: {
                    page: this.curpage
                }
            }).then(response => {
                console.log(response.data)
                this.count = response.data.count
                this.recipe_list = response.data.list
                this.curpage = response.data.curpage
                this.totalpage = response.data.totalpage
                this.startPage = response.data.startPage
                this.endPage = response.data.endPage
            })
        },
        range(start, end) {
            let arr = []
            let len = end - start
            for (let i = 0; i <= len; i++) {
                arr[i] = start
                start++
            }
            return arr
        },
        prev(page) {
            this.curpage = page
            this.dataRecv()
        },
        next(page) {
            this.curpage = page
            this.dataRecv()
        },
        pageChange(page) {
            this.curpage = page
            this.dataRecv()
        }
    }

})
</script>
<style>
p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.row {
    margin: 0px auto;
    width: 960px;
}
</style>