<template>
    <div class="container">
        <div class="row">
            <table class="table">
                <tbody>
                    <tr>
                        <td width=30% class="text-center" rowspan="9">
                            <img :src="food_detail.poster" style="width:100%">
                        </td>
                        <td colspan="2">
                            <h3><span id="name">{{food_detail.name}}</span>&nbsp;<span
                                    style="color:orange">{{food_detail.score}}</span></h3>
                        </td>
                    </tr>
                    <tr>
                        <td width=15% style="color:gray">주소</td>
                        <td width=55% class="text-left">{{food_detail.address}}</td>
                    </tr>
                    <tr>
                        <td width=15% style="color:gray">전화</td>
                        <td width=55% class="text-left">{{food_detail.phone}}</td>
                    </tr>
                    <tr>
                        <td width=15% style="color:gray">음식종류</td>
                        <td width=55% class="text-left">{{food_detail.type}}</td>
                    </tr>
                    <tr>
                        <td width=15% style="color:gray">가격대</td>
                        <td width=55% class="text-left">{{food_detail.price}}</td>
                    </tr>
                    <tr>
                        <td width=15% style="color:gray">주차</td>
                        <td width=55% class="text-left">{{food_detail.parking}}</td>
                    </tr>
                    <tr>
                        <td width=15% style="color:gray">영업시간</td>
                        <td width=55% class="text-left">{{food_detail.time}}</td>
                    </tr>
                    <tr>
                        <td width=15% style="color:gray">테마</td>
                        <td width=55% class="text-left">{{food_detail.theme}}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table">
                <tbody>
                    <tr>
                        <td>{{food_detail.content}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">
                            <a href="javascript:history.back()" class="btn btn-sm btn-danger">목록</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table">
                <tbody>
                    <tr>
                        <td>
                            <div id="map" style="width:100%;height:350px;"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
// List:[] VO:{} Map:{}
import axios from 'axios'
export default({
    data() {
        return {
            fno:0,
            food_detail:{}
        }
    },
    // Vue 객체 생성시에 fno를 받는다
    created() {
        this.fno=this.$route.params.fno
    },
    // 브라우저에서 HTML이 파싱이 된다 (화면이 완료)
    mounted() {
        /*
            생명주기 함수 = 자동 호출
            ***created : Vue객체 생성완료 : params를 받는 경우
                => this.$route.params.키명
                    params:{fno:1,id:'aaa',name:'bbb'}
            
            ***mounted : 시작과 동시에 서버로부터 값을 읽어오는 경우
            updated : 사용자가 데이터값을 변경한 경우
                    <input type=text> : 검색
            unmouted : 다른 화면으로 이동시에 vue객체를 메모리 해제

            MVVM(vue 패턴) / 가상돔
        */
       // 사용자 요청
        axios.get('http://localhost:8080/web/food/detail_vue.do',{
            params: {
                fno:this.fno
            }
        }).then(response=>{
            // 요청 처리 결과를 받는다 = 자동 처리
            // response에 값을 채워준다
            console.log(response.data)
            this.food_detail=response.data
            if(window.kakao && window.kakao.maps)
                {
                    this.initMap()
                }
                else
                {
                this.addScript()
                }

        })
    },
    methods:{
                addScript(){
                    const script=document.createElement("script")
                    /* global kakao */
                    script.onload=()=>kakao.maps.load(this.initMap)
                    script.src="http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=72fa81817487692b6dc093004af97650&libraries=services"
                    document.head.appendChild(script)
                },
                initMap(){
                    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };  

                // 지도를 생성합니다    
                var map = new kakao.maps.Map(mapContainer, mapOption); 

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(this.food_detail.address, (result, status) => {

                    // 정상적으로 검색이 완료됐으면 
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+this.food_detail.name+'</div>'
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    } 
                });    
                }
            }
})
</script>
<style>
.row {
    margin: 0px auto;
    width: 900px;
}
</style>