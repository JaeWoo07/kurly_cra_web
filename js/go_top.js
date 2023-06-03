(function($){
    const obj = {
        init: function(){
            this.goTop();
        },
        goTop: function(){
            /* goTop 버튼 */

            let sec4Top = 198;

            // 예외 처리
            try {  // 실행
                sec4Top = $('#section4').offset().top;
            }
            catch(e) {  // 위 try 영역에서 오류가 발생하면 catch 실행   
                sec4Top = 198;
            }

            /* 스크롤 탑값이 섹션4의 탑값에 도달하면 고탑 버튼이 부드럽게 보인다. */
            /* 스크롤 탑값이 섹션4의 탑값의 미만이면 고탑 버튼이 부드럽게 숨긴다. */

            $(window).scroll(function(){
                if($(window).scrollTop() >= sec4Top){
                    $('#goTop').stop().fadeIn(250);
                }
                else{
                    $('#goTop').stop().fadeOut(250);
                }
            });
            // 스무스 스크롤 이벤트
            // 고탑 버튼을 클릭하면 맨 위로 부드럽게 이동한다.
            $('#goTop .gotop-btn').on({
                click: function(e){
                    e.preventDefault();
                    $('html, body').stop().animate({scrollTop: 0}, 450);
                }
            });

        }
    }
    obj.init();

})(jQuery);