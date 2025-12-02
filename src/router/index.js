import HomeView from "@/components/views/HomeView.vue";
import FoodDetailView from "@/components/views/FoodDetailView.vue";
import FoodView from "@/components/views/FoodView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes=[
    {
        path:'/',
        name:'home',
        component:HomeView
    },
    {
        path:'/food',
        name:'food',
        component:FoodView
    },
    {
        path:'/food/detail/:fno',
        name:"food_detail",
        component:FoodDetailView
    }
]
    // /food/detail/1 PathVariable
    // 문제점 : localhost:8081 => 스프링과 연결이 안된다
    const router=createRouter({
        history:createWebHistory(process.env.BASE_URL),
        routes
    })
    /*
        vue Router 생성 : createRouter
        createWebHistory : HTML5 history모드 사용
        설정된 기반으로 네비게이션 관리
    */
    export default router;
