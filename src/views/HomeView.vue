<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3" v-for="(vo,index) in food_list" :key="index">
                <div class="thumbnail">
                <router-link :to="{name:'food_detail',params:{fno:vo.fno}}">
                <img :src="vo.poster" style="width:240px;height: 150px">
                <div class="caption">
                    <p>{{vo.name}}</p>
                </div>
                </router-link>
            </div>
            </div>
        </div>
        <div class="row text-center" style="margin-top: 10px">
            <ul class="pagination">
                <li v-if="startPage>1"><a class="a-link" @click="prev(startPage-1)">&lt;</a></li>
                <li v-for="(i,index) in range(startPage,endPage)" :class="i===curpage?'active':''" :key="index"><a class="a-link" @click="pageChange(i)">{{ i }}</a></li>
                <li v-if="endPage<totalpage"><a class="a-link" @click="next(endPage+1)">&gt;</a></li>
            </ul>
        </div>
    </div>
</template> 
<script>
    export default({
        // Model = 데이터 설정
        data() {
            return {
                food_list:[],
                curpage:1,
                totalpage:0,
                startPage:0,
                endPage:0
            }
        },
        // created - mounted - updated - unmounted
        // mounted = 다른 라이브러리 호환 (jquery, react)
        mounted() {
            // window.onload / $(function(){})
            this.dataRecv()
        },
        // 사용자 정의 메소드
        methods: {
            // 공통 사용 메소드 = 서버를 연결해서 데이터 읽기
            async dataRecv() {
                try {
                     // 데이터 읽기
                    const response=await fetch(
                        `http://localhost:8080/web/food/list_vue.do?page=${this.curpage}`
                    )
                    const result=await response.json()
                    console.log(result)
                    this.food_list=result.list
                    this.curpage=result.curpage
                    this.totalpage=result.totalpage
                    this.startPage=result.startPage
                    this.endPage=result.endPage
                } catch(error) {
                    console.log(error)
                }
            },
            range(start,end) {
                let arr=[]
                let len=end-start
                for(let i=0;i<=len;i++) {
                    arr[i]=start
                    start++
                }
                return arr
            },
            prev(page) {
                this.curpage=page
                this.dataRecv()
            },
            next(page) {
                this.curpage=page
                this.dataRecv()
            },
            pageChange(page) {
                this.curpage=page
                this.dataRecv()
            }
        }
    })
</script>
<style>
.row {
    margin: 0px auto;
    width: 960px;
}
p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.a-link {
    cursor: pointer;
}
</style>