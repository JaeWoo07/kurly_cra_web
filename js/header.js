(function($){
    const obj = {
        init: function(){
            this.header();
        },
        header: function(){   // header: 속성 + function(){} => 메소드(함수)

            const headerRow3Top = $('#header .header-row3').offset().top;  // 142

            // console.log('섹션2 슬라이드컨테이너 탑값: ' + $('#section2 .slide-container').offset().top);

            // 스크롤 이벤트 발생하여 헤더 3행인 메인메뉴에 도달하면 헤더 영역 메뉴 고정(fixed)된다.
            // 윈도우 스크롤 이벤트 구현
            $(window).scroll(function(){
                // 스크롤이벤트 발생하면 현재 스크롤 탑값을 보여준다.
                // console.log($(window).scrollTop());
                // 헤더 영역의 3행 탑값 위치 찾기(맨 위에서 여기 까지의 간격)
                // console.log('헤더 로우3 탑값 위치: ' + $('#header .header-row3').offset().top);

                if($(window).scrollTop() >= headerRow3Top){
                    $('#header').addClass('on');  // 헤더에 on클래스를 추가한다.
                }
                else{
                    $('#header').removeClass('on');  // 헤더에 on클래스를 삭제한다.
                }
            });




            // 헤더 //////////////////////////////////////////////////////////////////////////////////
            // $('.custom-center-btn').mouseenter(function(){
            //     $('.custom-center').show();
            // });

            // $('#header .custom-center-btn').on('mouseenter', function(){
            //     $('#header .custom-center').show();
            // });
            
            $('#header .custom-center-btn').on({
                mouseenter: function(){
                    $('#header .custom-center').show();
                }
            });

        // 고객센터 li 마지막 칸 영역을 떠나면 툴팁메뉴 숨기기
            // $('.custom-center-li').mouseleave(function(){
            //     $('.custom-center').hide();
            // });

            // $('.custom-center-li').on('mouseleave', function(){
            //     $('custom-center').hide();
            // });

            $('#header .custom-center-li').on({
                mouseleave: function(){
                    $('#header .custom-center').hide();
                }
            });

            // 배송지 등록 버튼
            $('#header .map-btn').on({
                mouseenter: function(){
                    $('#header .map-tooltip').show();
                }
            });

            // 툴팁 메뉴를 떠나면 툴팁메뉴 숨기기
            $('#header .map-btn-li').on({
                mouseleave: function(){
                    $('#header .map-tooltip').hide();
                }
            });

        }
    }

    obj.init();

})(jQuery);