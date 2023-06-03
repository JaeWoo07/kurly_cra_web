(($, window, document)=>{

    // 회원가입 객체 생성
    const signUp = {
        회원: {
            아이디: "", // String
            아이디중복확인: false,  // Boolean
            비밀번호: "",  // String
            비밀번호확인: false,  // Boolean
            이름: "",  // String
            이메일: "",  // String
            이메일중복확인: false,  // Boolean
            휴대폰: "",  // String
            휴대폰인증확인: false,  // Boolean
            인증번호: 0,  // Number
            주소1: "",  // String
            주소2: "",  // String
            성별: "",  // String
            생년월일: "",  // String
            추가입력사항: "",
            약관동의목록: [
                "이용약관 동의(필수)",
                "개인정보 수집∙이용 동의(필수)",
                "개인정보 수집∙이용 동의(선택)",
                "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
                "SMS",
                "이메일",
                "본인은 만 14세 이상입니다.(필수)"
            ],
            이용약관동의: []
        },
        init(){
            this.main();
        },
        main(){
            const _this = this;

            // 모달창
            $('.modal-close-btn').on({
                click(e){
                    e.preventDefault();
                    $('#modal').stop().fadeOut(200);
                }
            });




            // 회원가입 유효성 체크

            // 1-1. 아이디: 6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합
            // 1) 6자 이상 ~ 16자 이하  /.{6,16}/g;
            // 2) 영문 또는 숫자 조합   /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
            // 3) 공백 사용 불가   /[^\s]/g; 공백이 아닌 것이 true
            // 4) 특수문자는 입력과 동시에 삭제 
            // 키보드로 입력하면 즉시 판단하도록 하는 이벤트 구현
            $('#inputId').on({
                keyup: function(){
                    const regExp1 = /.{6,16}/g;  // true이면 정상
                    const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
                    const regExp3 = /\s/g;  // true면 공백
                    const regExp4 = /[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<]/g;
                    const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g;  // 한글 오류

                    // 특수문자면 삭제
                    if(regExp4.test($(this).val()) === true){
                        $(this).val($(this).val().replace(regExp4, ""));                             
                    }

                    // 정규표현식 1, 2, 3, 5 어느 하나라도 오류가 발생하면
                    if(regExp1.test($(this).val()) === false || regExp2.test($(this).val()) === false || regExp3.test($(this).val()) === true || regExp5.test($(this).val()) === true){
                        $(this).parent().next().addClass('on').text('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
                        _this.회원.아이디 = "";
                    }
                    else{
                        $(this).parent().next().removeClass('on');
                        $('.id-ok-btn').removeClass('on').attr('disabled', false);
                        _this.회원.아이디 = $(this).val();
                    }                                     
                }
            });

            // 1-2. 아이디 중복확인
            $('.id-ok-btn').attr('disabled', false);

            $('.id-ok-btn').on({
                click(e){
                    e.preventDefault();
                    const regExp1 = /.{6,16}/g;  // true이면 정상
                    const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
                    const regExp3 = /\s/g;  // true면 공백
                    const regExp4 = /[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<]/g;
                    const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g;  // 한글 오류

                    // 정규표현식 1, 2, 3, 5 어느 하나라도 오류가 발생하면
                    if(regExp1.test($('#inputId').val()) === false || regExp2.test($('#inputId').val()) === false || regExp3.test($('#inputId').val()) === true || regExp5.test($('#inputId').val()) === true){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합`);
                        _this.회원.아이디중복확인 = false;
                    }
                    else{
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`사용할 수 있는 아이디입니다.`);
                        $('.id-ok-btn').addClass('on').attr('disabled', true);
                        _this.회원.아이디중복확인 = true;
                    }                                     
                    
                }
            });


            // 2. 비밀번호
            // 1) 최소 10자 이상 입력  /.{10,}/g;  . => 글자
            // 2) 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합 (영문 숫자 / 영문 특수문자 /  숫자 특수문자)
            // 3) 공백 제외
            // 4) 동일한 숫자 3개 이상 연속 사용 불가
            $('#inputPw').on({
                keyup: function(){
                    const regExp1 = /.{10,}/g;  // true이면 정상
                    const regExp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)|((?=.*[0-9])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)/g;
                    const regExp3 = /\s/g;  // true면 공백
                    const regExp4 = /(.)\1\1/g;  // 동일한 문자 연속 3자 이상이면 오류
                    const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g;  // 한글 오류

                    if($(this).val() !== ""){
                        if(regExp1.test($(this).val()) === false){
                            $(this).parent().next().addClass('on').text('최소 10자 이상 입력');
                            _this.회원.비밀번호 = "";
                        }
                        else if(regExp2.test($(this).val()) === false || regExp3.test($(this).val()) === true || regExp5.test($(this).val()) === true){
                            $(this).parent().next().addClass('on').text('영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합');
                            _this.회원.비밀번호 = "";
                        }
                        else if(regExp4.test($(this).val()) === true){
                            $(this).parent().next().addClass('on').text('동일한 숫자 3개 이상 연속 사용 불가');
                            _this.회원.비밀번호 = "";
                        }
                        else {
                            $(this).parent().next().removeClass('on');
                            _this.회원.비밀번호 = $(this).val();
                        }
                    }  
                    else {
                        $(this).parent().next().addClass('on').text('영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합');
                    }                  
                }
            });

            // 3. 비밀번호 확인
            $('#inputPw2').on({
                keyup: function(){
                    if($(this).val() !== ""){
                        if($(this).val() !== $('#inputPw').val()){
                            $(this).parent().next().addClass('on').text('동일한 비밀번호를 입력');
                            _this.회원.비밀번호확인 = false;
                        }
                        else {
                            $(this).parent().next().removeClass('on');
                            _this.회원.비밀번호확인 = true;
                        }
                    }
                    else {
                        $(this).parent().next().addClass('on').text('비밀번호를 한 번 더 입력해 주세요.');
                    }
                }
            });
            
            // 4. 이름
            // 1) 영문, 숫자, 한글, 공백만 입력
            $('#inputName').on({
                keyup:function(){
                    const regExp1 = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;

                    if($(this).val() !== ""){
                        // 특수문자 즉시 삭제
                        $(this).val($(this).val().replace(regExp1, ""));
                        $(this).parent().next().removeClass('on');
                        _this.회원.이름 = $(this).val();
                    }
                    else{
                        $(this).parent().next().addClass('on').text('이름을 입력해 주세요.');
                    }
                }
            });

            // 5-1. 이메일
            // 이메일 정규표현식
            // ^ 시작 문자는 문자, 숫자
            // 시작문자 바로 뒤 (@앞)는 문자, 숫자, -_.
            // @는 필수 +: 한글자
            // 문자, 숫자 [필수]
            // (-_. , 문자, 숫자) [선택]
            // .
            // 문자 [필수] {2,3}글자
            $('#inputEmail').on({
                keyup:function(){
                    const regExp1 = /^[A-Za-z0-9`!#$%^&*+=|{}'/~?]+([\-_\.]?[A-Za-z0-9`!#$%^&*+=|{}~'/?])*@[A-Za-z0-9~]+([\-_\.]?[A-Za-z0-9~])*\.[A-Za-z]{2,3}$/g;    // \w => 문자, 숫자포함  || ()*선택, +필수

                    if($(this).val() !== ""){
                        if(regExp1.test($(this).val()) === false){
                            $(this).parent().next().addClass('on').text('이메일 형식으로 입력해 주세요');
                            _this.회원.이메일 = "";
                        }
                        else{
                            $(this).parent().next().removeClass('on');
                            $('.email-ok-btn').removeClass('on').attr('disabled', false);
                            _this.회원.이메일 = $(this).val();
                        }
                    }
                    else{
                        $(this).parent().next().addClass('on').text('이메일을 입력해 주세요.');
                    }
                }
            });

            // 5-2. 이메일 중복 확인
            $('.email-ok-btn').attr('disabled', false);

            $('.email-ok-btn').on({
                click(e){
                    e.preventDefault();

                    const regExp1 = /^[A-Za-z0-9`!#$%^&*+=|{}~'/?]+([\-_\.]?[A-Za-z0-9`!#$%^&*+=|{}~'/?])*@[A-Za-z0-9~]+([\-_\.]?[A-Za-z0-9~])*\.[A-Za-z]{2,3}$/g;    // \w => 문자, 숫자포함  || ()*선택, +필수

                    if($('#inputEmail').val() !== ""){
                        if(regExp1.test($('#inputEmail').val()) === false){
                            $('#modal').stop().fadeIn(200);
                            $('#modal .message').text(`이메일 형식으로 입력해 주세요.`);
                            _this.회원.이메일중복확인 = false;
                        }
                        else{
                            $('#modal').stop().fadeIn(200);
                            $('#modal .message').text(`사용 가능한 이메일 입니다.`);
                            $('.email-ok-btn').addClass('on').attr('disabled', true);
                            _this.회원.이메일중복확인 = true;
                        }
                    }
                    else{
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`이메일을 입력해 주세요.`);
                    }
                }
            });

            // 6. 휴대폰 번호 입력 상자
            // 1) 공백이 아니면, 정규표현식 수행 (공백이면 '휴대폰 번호를 입력해 주세요.') 문자열.치환(정규표현식, "");
            // 2) 숫자가 아닌 문자는 즉시 삭제
            // 3) 1자 이상이면 우측에 인증번호받기 버튼 활성화(사용 가능)           
            $('#inputHp').on({
                keyup:function(){
                    const regExp1 = /[^0-9]/g;

                    if($(this).val() !== ""){
                        $(this).val($(this).val().replace(regExp1, ""));
                        if($(this).val().length >= 1){
                            $('.hp-res-num-btn').addClass('on').attr('disabled', false);
                            // 사용가능한 버튼 disabled == false
                            $(this).parent().next().removeClass('on')
                        }
                    }
                    else{
                        $(this).parent().next().addClass('on').text('휴대폰 번호를 입력해 주세요.');
                        $('.hp-res-num-btn').removeClass('on').attr('disabled', true);
                    }
                }
            });

            // 7-1. 휴대폰 인증번호받기 버튼 클릭이벤트
            // 1) 휴대폰 형식 틀리면 모달창 (잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.)
            // 2) 번호가 정상이면 모달창 (인증번호가 발송되었습니다.) 모달창의 확인버튼을 누르면 닫힘.
            // 3) 인증번호를 입력하는 상자가 보인다.
            $('#inputHp').attr('disabled', false);

            $('.hp-res-num-btn').on({
                click:function(e){
                    e.preventDefault();
                    // 휴대폰 번호 정규표현식
                    const regExp1 = /^01[0|1|2|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
                    // 인증번호 6자리(랜덤) Math.random()
                    let num = Math.floor(Math.random() * 900000 + 100000);
                    _this.회원.인증번호 = num  // 상위 변수

                    if(regExp1.test($('#inputHp').val()) === false){
                        // alert('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.`);
                    }
                    else{
                        // alert('인증번호가 발송되었습니다. ' + ' [ 인증번호: ' + num + ' ]');
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`인증번호가 발송되었습니다. [${num}]`);
                        $('.row-06-2').addClass('on');
                        timerCount();
                        $('.hp-res-num-btn').removeClass('on').attr('disabled', true);   
                        $('#inputHp').attr('disabled', true);                
                    }
                }
            });

            // 7-2. 인증번호 타이머(3분 카운트 함수 생성)
            // 1) 인증번호 상자 우측에 3분(2분 59초) 카운트 숫자
            // 2) 인증번호를 입력하면 카운트 다운 중지
            // 3) 인증번호 입력시간 만료: 유효 시간이 만료되었습니다. 다시 시도해 주세요.
            let setId = 0;

            function timerCount(){
                let m = 3;
                let s = 0;

                setId = setInterval(function(){
                    s--;
                    if(s < 0){
                        s = 59;
                        m--;
                        if(m < 0){
                            clearInterval(setId);
                            s = 0;
                            m = 0;
                            $('#modal').stop().fadeIn(200);
                            $('#modal .message').text(`유효 시간이 만료되었습니다. 다시 시도해 주세요.`);
                            $('.row-06-2').removeClass('on');
                            $('#inputHp').attr('disabled', false);
                            $('.hp-res-num-btn').addClass('on').attr('disabled', false);
                            $('#inputHpNum').val("");
                        }
                    }
                    $('.minute').text(m < 10 ? "0"+m : m);
                    $('.second').text(s < 10 ? "0"+s : s);
                }, 1000);
            };

            // 8-1. 인증번호 확인 버튼
            $('.hp-ok-num-btn').on({
                click:function(e){
                    e.preventDefault();
                    // 인증번호 비교           // 문자 => 숫자: 형변환
                    if(_this.회원.인증번호 === Number($('#inputHpNum').val())){
                        // alert('인증에 성공 하였습니다.');
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`인증에 성공 하였습니다.`);
                        _this.회원.휴대폰 = $('#inputHp').val();
                        _this.회원.휴대폰인증확인 = true;
                        $('#inputHpNum').val("");
                        clearInterval(setId);
                        $('.row-06-2').removeClass('on');
                        $('.hp-res-num-btn').addClass('off');
                        $('.hp-res-num-btn2').addClass('on');
                    }
                    else{
                        // alert('인증에 실패 하였습니다.');
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`인증에 실패 하였습니다.`);
                        _this.회원.휴대폰 = "";
                        _this.회원.휴대폰인증확인 = false;
                    }
                }
            });

            // 다른 번호 인증
            $('.hp-res-num-btn2').on({
                click(e){
                    e.preventDefault();
                    $('.hp-res-num-btn').removeClass('off');
                    $('.hp-res-num-btn2').removeClass('on');
                    $('.hp-res-num-btn').addClass('on').attr('disabled', false);   
                    $('#inputHp').attr('disabled', false);
                    $('#inputHp').val("").focus();
                }
            });

            // 8-2. 인증번호 입력 버튼 상자
            $('#inputHpNum').on({
                keyup:function(){
                    const regExp1 = /[^0-9]/g;

                    if($(this).val() !== ""){
                        $(this).val($(this).val().replace(regExp1, ""));
                        $('.hp-ok-num-btn').addClass('on').attr('disabled', false);
                    }
                    else{
                        $('.hp-ok-num-btn').removeClass('on').attr('disabled', true);
                    }
                }
            });

            // 주소검색 팝업 함수
            function windowPopup(){
                const winWidth = $(window).innerWidth();
                const winHeight = $(window).innerHeight();
                const width = 530;
                const height = 569;
                const top = (winHeight - height) / 2;   // (창높이 - 팝업창높이) / 2
                const left = (winWidth - width) / 2;  // (창넓이 - 팝업창넓이) / 2
                const winName = 'address_popup';
                const url = './popup.html';

                window.open(url, winName, `width = ${width}, height = ${height}, top = ${top}, left = ${left}`);
            };

            
            // 9. 주소검색 윈도우 팝업창 띄우기
            $('.addr-search-btn').on({
                click(e){
                    e.preventDefault();
                    windowPopup();
                }
            });

            // 10. 주소를 저장소에서 검색하여 있으면
            // 주소 입력상자에 주소를 새로고침해도 유지 하도록 값을 저장
            getAddress();
            function getAddress(){
                // 세션 스토리지 데이터 가져오기
                const key = 'KURLY_SIGNUP_ADDRESS';
                // console.log(sessionStorage.getItem(key));          
                // console.log(JSON.parse(sessionStorage.getItem(key))); // 문자열 => Object로 변환     
                const address = JSON.parse(sessionStorage.getItem(key));
                // console.log(address.주소1); // 문자열 => Object로 변환     
                // console.log(address.주소2); // 문자열 => Object로 변환

                if(address !== null){  // 주소가 있다면 입력상자 열고 데이터 입력
                    $('.row-07').addClass('on');
                    $('.row-08').addClass('on');
                    $('.row-09').addClass('on');
                    $('.sb').addClass('on');
                    $('.row-11').addClass('on');
                    $('#inputAddr1').val(address.주소1);
                    $('#inputAddr2').val(address.주소2);
                    _this.회원.주소1 = address.주소1;
                    _this.회원.주소2 = address.주소2;
                }
                else{  // 주소가 없으면 입력상자 제거
                    $('.row-07').removeClass('on');
                    $('.row-08').removeClass('on');
                    $('.row-09').removeClass('on');
                    $('.sb').removeClass('on');
                    $('.row-11').removeClass('on');
                    _this.회원.주소1 = "";
                    _this.회원.주소2 = "";
                    return;  // 실행X
                }            
            };

            // 11. 주소 재검색          
            $('.addr-research-btn').on({
                click(e){
                    e.preventDefault();
                    windowPopup();
                }
            });

            // 12. 성별
            $('.gender-btn').on({
                change(){
                    _this.회원.성별 = $(this).val();
                }
            });

            // 13. 생년월일
            // 1) 3칸 모두 공백이면 아무 알림 없음
            // 2) 년: 100세 초과 불가, 미래년도 불가, 14세 이하 불가
            // 3) 월: 1 ~ 12월
            // 4) 일: 1 ~ 31일
            $('#year, #month, #date').on({
                keyup(){                  
                    const regExp1 = /.{4,}/g;  // true이면 정상
                    const regExp2 = /[^0-9]/g;

                    const newDate = new Date(); // 현재날짜 생성
                    const getYear = newDate.getFullYear();
                    // const getMonth = newDate.getMonth();
                    // const getDate = newDate.getDate();

                    if(regExp2.test($(this).val()) === true){
                        $(this).val($(this).val().replace(regExp2, ""));
                    }

                    if($('#year').val() === "" && $('#month').val() === "" && $('#date').val() === ""){
                        $('.row-12 .isError').removeClass('on');
                    }
                    else{
                        if(regExp1.test($('#year').val()) === false){    // 년                  
                            $('.row-12 .isError').addClass('on').text('태어난 년도 4자리를 정확하게 입력해 주세요.');            
                        }
                        else if(Number($('#year').val()) < getYear - 100){
                            $('.row-12 .isError').addClass('on').text('생년월일을 다시 확인해 주세요.');
                        }
                        else if(Number($('#year').val()) > getYear){
                            $('.row-12 .isError').addClass('on').text('생년월일이 미래로 입력되었습니다.');
                        }
                        else if(Number($('#year').val()) >= getYear - 14){
                            $('.row-12 .isError').addClass('on').text('만 14세 미만은 가입이 불가합니다.');          
                        }                  
                        else{
                            if(Number($('#month').val()) < 1 || Number($('#month').val()) > 12){  // 월
                                $('.row-12 .isError').addClass('on').text('태어난 월을 정확하게 입력해 주세요.');
                            }
                            else{
                                if(Number($('#date').val()) < 1 || Number($('#date').val()) > 31){  // 일
                                    $('.row-12 .isError').addClass('on').text('태어난 일을 정확하게 입력해 주세요.');
                                }
                                else{
                                    $('.row-12 .isError').removeClass('on');
                                    _this.회원.생년월일 = `${$('#year').val()}-${$('#month').val() < 10 ? '0'+$('#month').val() : $('#month').val()}-${$('#date').val() < 10 ? '0'+$('#date').val() : $('#date').val()}`;
                                }
                            }                                                    
                        }                 
                    }
                }
            });

            // 14-1. 추가입력 사항 (친구초대 추천인 아이디)
            $('#add_input1').on({
                change(){
                    $('.row-14-2-1').removeClass('on');
                    $('.row-14-2-2').removeClass('on');
                    $('#row_15_border').removeClass('on')
                    $('.row-14-1-1').addClass('on');
                    $('.row-14-1-2').addClass('on');
                    $('#addInputBox2').val("");
                    _this.회원.추가입력사항 = "";
                    // console.log(_this.회원);
                },           
            });

            // 14-2. 추가입력 사항 (참여 이벤트명)
            $('#add_input2').on({
                change(){
                    $('.row-14-1-1').removeClass('on');
                    $('.row-14-1-2').removeClass('on');
                    $('.row-14-2-1').addClass('on');
                    $('.row-14-2-2').addClass('on');
                    $('#row_15_border').addClass('on')
                    $('#addInputBox').val("");
                    $('.add-input-btn').removeClass('on').attr('disabled', false);
                    _this.회원.추가입력사항 = "";
                    // console.log(_this.회원);
                }
            });

            // 14-1. 추가입력 사항 (친구초대 추천인 아이디)
            $('#addInputBox').on({
                keyup(){
                    const regExp4 = /[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<]/g;
                    
                    if(regExp4.test($(this).val()) === true){
                        $(this).val($(this).val().replace(regExp4, ""));                             
                    }

                    $('.add-input-btn').removeClass('on').attr('disabled', false);
                }
            });

            $('#addInputBox2').on({
                keyup(){
                    _this.회원.추가입력사항 = $(this).val();
                    // console.log(_this.회원);
                }
            });

            // 14-3. 추가입력 사항 (친구초대 추천인 아이디 확인 버튼)
            $('.add-input-btn').removeClass('on').attr('disabled', false);
            $('.add-input-btn').on({
                click(e){
                    e.preventDefault();
                    const regExp1 = /.{6,16}/g;  // true이면 정상
                    const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
                    const regExp3 = /\s/g;  // true면 공백
                    const regExp4 = /[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<]/g;
                    const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g;  // 한글 오류                   

                    
                    if($('#addInputBox').val() !== ""){                                              
                        // 정규표현식 1, 2, 3, 5 어느 하나라도 오류가 발생하면
                        if(regExp1.test($('#addInputBox').val()) === false || regExp2.test($('#addInputBox').val()) === false || regExp3.test($('#addInputBox').val()) === true || regExp5.test($('#addInputBox').val()) === true){
                            $('#modal').stop().fadeIn(200);
                            $('#modal .message').text(`존재하지 않는 아이디 입니다.`);
                            _this.회원.추가입력사항 = "";
                            // console.log(_this.회원);
                        }
                        else{
                            $('#modal').stop().fadeIn(200);
                            $('#modal .message').text(`존재하는 아이디 입니다.
                            친구초대 이벤트에 참여 가능해요.`);
                            $('.add-input-btn').addClass('on').attr('disabled', true);
                            _this.회원.추가입력사항 = $('#addInputBox').val();
                            // console.log(_this.회원);
                        }                                        
                    }
                    else{
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`아이디를 입력해 주세요.`);
                    }                   
                }
            });

            // 15. 이용약관동의
            // 체크박스 이벤트
            // All 체크
            $('#checkAll').on({
                change(e){
                    // console.log(e.target.value);
                    // console.log($(this).is(':checked'));
                    if($(this).is(':checked') === true){  // 전체 체크
                        $('.chk-btn').prop('checked', true);
                        _this.회원.이용약관동의 = _this.회원.약관동의목록;
                    }
                    else{
                        $('.chk-btn').prop('checked', false);
                        _this.회원.이용약관동의 = [];  // 빈 배열 (삭제)
                    }
                    // console.log(_this.회원);
                }
            });

            // 무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)
            $('#check4').on({
                change(e){                   
                    if( $(this).is(':checked') ){ // 전체체크
                        $('#check5').prop('checked', true);
                        $('#check6').prop('checked', true);
                        if($('#check5').prop('checked', true)){
                            _this.회원.이용약관동의 = _this.회원.이용약관동의.filter((item)=>item !== $('#check5').val());
                        }
                        if($('#check6').prop('checked', true)){
                            _this.회원.이용약관동의 = _this.회원.이용약관동의.filter((item)=>item !== $('#check6').val());
                        }
                        _this.회원.이용약관동의 = [..._this.회원.이용약관동의, $('#check5').val() ];
                        _this.회원.이용약관동의 = [..._this.회원.이용약관동의, $('#check6').val() ];
                    }
                    else {
                        $('#check5').prop('checked', false);
                        $('#check6').prop('checked', false);                       
                        _this.회원.이용약관동의 = _this.회원.이용약관동의.filter((item)=>item !== $('#check5').val());
                        _this.회원.이용약관동의 = _this.회원.이용약관동의.filter((item)=>item !== $('#check6').val());
                    }
                    // console.log( _this.회원 );
                }
            });

            $('#check5').on({
                change(e){
                    if( $('#check5').is(':checked') && $('#check6').is(':checked')){
                        $('#check4').prop('checked', true);
                            _this.회원.이용약관동의 = [ $('#check4').val() , ..._this.회원.이용약관동의]; 
                    }
                    else {
                        $('#check4').prop('checked', false);    
                        _this.회원.이용약관동의 = _this.회원.이용약관동의.filter((item)=>item !== $('#check4').val() );
                        // if($('#check4').is(':checked')){
                        //     $('#check5').prop('checked', false);
                        //     _this.회원.이용약관동의 = _this.회원.이용약관동의.filter((item)=>item !== $('#check5').val() );
                        // }
                    }
                }
            })

            $('#check6').on({
                change(e){
                    if( $('#check5').is(':checked') && $('#check6').is(':checked')){
                        $('#check4').prop('checked', true);
                            _this.회원.이용약관동의 = [ $('#check4').val() , ..._this.회원.이용약관동의 ]; 
                    }
                    else {
                        $('#check4').prop('checked', false);    
                        _this.회원.이용약관동의 = _this.회원.이용약관동의.filter((item)=>item !== $('#check4').val() );
                    }
                }
            })

            // 16. 개별체크
            // 전개연산자 이용
            $('.chk-btn').on({
                change(e){
                    if($(this).is(':checked')){
                        _this.회원.이용약관동의 = [..._this.회원.이용약관동의, $(this).val()];
                        console.log(_this.회원.이용약관동의);
                    }
                    else{ // 체크 해제되면
                        _this.회원.이용약관동의 = _this.회원.이용약관동의.filter((item)=>item !== $(this).val());
                        // 체크 해제한 항목은 삭제한다. 즉, 채크 해제한 항목을 제외한 모든 배열을 재구성하여 저장한다.
                        console.log(_this.회원.이용약관동의);
                    }
                    // 7개 항목이 체크되어 있다면 전체체크 선택
                    // 1개라도 항목이 체크 해제되면 전체체크 선택 해제
                    if(_this.회원.이용약관동의.length === 7){  // 배열의 길이
                        $('#checkAll').prop('checked', true);
                    }
                    else{
                        $('#checkAll').prop('checked', false);
                    }
                }
            });

            // 17. 전송버튼
            // 서버에 전송하기 이전 유효성 검사를 거친다. (단, 필수항목과 선택항목 구분)
            // 전송버튼 클릭 이벤트
            $('.submit-btn').on({
                click(e){
                    e.preventDefault();
                    let cnt = 0;

                    // 추가입력사항 입력상자
                    // _this.회원.추가입력사항 = `${_this.회원.추가입력사항} : ${$('#addInputBox2').val()}`;
                    _this.회원.주소1 = $('#inputAddr1').val();
                    _this.회원.주소2 = $('#inputAddr2').val();


                    _this.회원.이용약관동의.map(function(item, idx){
                        if(item.indexOf('필수') !== -1){  // 찾았으면
                            cnt++;
                        } 
                    });
                   
                    if(_this.회원.아이디 === ""){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`아이디를 입력해 주세요.`);
                        return;
                    }
                    else if(_this.회원.비밀번호 === ""){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`비밀번호를 입력해 주세요.`);
                        return;
                    }
                    else if(_this.회원.이름 === ""){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`이름을 입력해 주세요.`);
                        return;
                    }
                    else if(_this.회원.이메일 === ""){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`이메일을 입력해 주세요.`);
                        return;
                    }
                    else if(_this.회원.휴대폰 === ""){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`휴대폰 번호를 입력해 주세요.`);
                        return;
                    }
                    else if(_this.회원.주소1 === ""){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`주소를 입력해 주세요.`);
                        return;
                    }
                    else if(_this.회원.주소2 === ""){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`나머지 주소를 입력해 주세요.`);
                        return;
                    }
                    else if(cnt < 3){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`이용약관동의 필수 항목을 체크해 주세요.`);
                        return;
                    }
                    else if(_this.회원.아이디중복확인 === false){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`아이디 중복 체크를 해주세요.`);
                        return;
                    }
                    // else if(_this.회원.비밀번호확인 === false){
                    //     $('#modal').stop().fadeIn(200);
                    //     $('#modal .message').text(`비밀번호를 한 번 더 입력해 주세요.`);
                    //     return;
                    // }
                    else if(_this.회원.비밀번호확인 === ""){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`비밀번호를 한 번 더 입력해 주세요.`);
                        return;
                    }
                    else if(_this.회원.이메일중복확인 === false){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`이메일 중복 체크를 해주세요.`);
                        return;
                    }
                    else if(_this.회원.휴대폰인증확인 === false){
                        $('#modal').stop().fadeIn(200);
                        $('#modal .message').text(`휴대폰 인증을 진행해 주세요.`);
                        return;
                    }
                    else{
                        $('#modal').stop().fadeOut(0);
                        $('#modal .message').text(``);

                        // (최종) 모든 데이터 객체를 생성하여 전송할 데이터 저장
                        // 휴대폰 번호: 010-1234-5678 ^(\d{3})-(\d{3,4})-(\d{4})$
                        // const regExp1 = /^(\d{3})(\d{3,4})(\d{4})$/g;
                        const member = {
                            아이디: _this.회원.아이디, 
                            비밀번호: _this.회원.비밀번호,
                            이름: _this.회원.이름, 
                            이메일: _this.회원.이메일,
                            휴대폰: _this.회원.휴대폰/* .replace(regExp1, '$1-$2-$3') */, 
                            주소: `${_this.회원.주소1} ${_this.회원.주소2}`,
                            성별: _this.회원.성별,
                            생년월일: _this.회원.생년월일, 
                            추가입력사항: _this.회원.추가입력사항,
                            이용약관동의: JSON.stringify(_this.회원.이용약관동의),
                            가입일자: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                        };

                        // 서버에 전송하기 이전 최종테스트
                        // localStorage.setItem('마켓컬리회원가입', JSON.stringify(member));

                        // location.href = '../../index.php';  // 전송 후 루트로 이동
                        $.ajax({
                            url: './sign_up.php',
                            type: 'POST',  // 폼데이터 전송방식
                            data: member,
                            success(result){
                                console.log(result); // 서버 응답
                                console.log(_this.회원); // 서버 응답

                                // location.href = '../../index.php';
                            },
                            error(error){
                                console.log(error);
                            }
                        });
                    }
                }
            });
        }
    }

    signUp.init();
    
})(jQuery, window, document);