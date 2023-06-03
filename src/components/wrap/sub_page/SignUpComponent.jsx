import React from 'react';
import axios from 'axios';

function SignUpComponent({회원, timerCounterFn, timer}){

    // 타이머 프롭스 비구조화
    const {seconds, minutes, setId, timerMsg, timerEnd} = timer;


    // 0. 변수관리(프롭스(변수) => 상태관리(state => setState 변경(수정) 세터 setter))
    const [state, setState] = React.useState(회원);

    // 입력상자 포커스 :
    let refHp = React.useRef();
   
    // 실행 주기 (라이프 사이클)
    // 마운트(태그가 실행돼서 화면에 그려지는 것) 후 그려지는 => 유즈 이펙트
    // React.useEffect(()=>{
            
    //     setState({   
    //             ...state,
    //             아이디: 'helloworld',
    //             비밀번호: 'hiworld'      
    //     });

    //     console.log(state);
    //     console.log(state.아이디);
    //     console.log(state.비밀번호);
    // }, []);


    // 1-1. 아이디: 입력상자 이벤트 (onChange: 입력 상자에 변화가 생기면 동작)
    // 입력상자에 onChange={함수이름}
    // 함수이름을 가져와서 화살쵸 함수로 등록하고 사용한다.
        // console.log(e);
        // console.log(e.target.id);
        // console.log(e.target.type);
        // console.log(e.target.value);
    const onChangeInputId=(e)=>{      
        const regExp1 = /.{6,16}/g;  // true이면 정상
        const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const regExp3 = /\s/g;  // true면 공백
        const regExp4 = /[~`!@#$%^&*()_\-+=|\\[\]{}'";:/?.>,<]/g;
        const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g;  // 한글 오류

        // let 아이디 = e.target.value;
        let {value} = e.target;
        let idMsg = '';
        let isId = false;
        let isIdBtn = false;     

        // 특수문자면 삭제
        if(regExp4.test(value) === true){
            value = value.replace(regExp4, "");                       
        }

        if(value !== ''){
            isIdBtn = true;
            
        }
        else{
            isIdBtn= false;
        }

        // 정규표현식 1, 2, 3, 5 어느 하나라도 오류가 발생하면
        if(regExp1.test(value) === false || regExp2.test(value) === false || regExp3.test(value) === true || regExp5.test(value) === true){
            isId = true;
            // 빨간색 문구 표기
            idMsg = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else{
            isId = false;
            idMsg= "";
        }      
              
        setState({
            ...state,  // 수정 전 데이터를 전개 연산자로 지정해서 유지시키고, 추가(수정)한다.
            아이디: value,  // 상태변수에 입력값을 저장
            idMsg: idMsg,
            isId: isId,
            isIdBtn: isIdBtn
        })
    };

    // 1-2. 아이디 중복 검사 (데이터베이스에서 정보를 가져오기)
    // 중복 아이디 비교하기
    const onClickIdOk=(e)=>{
        e.preventDefault();
        const regExp1 = /.{6,16}/g;  // true이면 정상
        const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const regExp3 = /\s/g;  // true면 공백
        // const regExp4 = /[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<]/g;
        const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g;  // 한글
        let modalMsg = '';
        let isModal = false;
        let isIdBtn = false;
        let 아이디중복확인 = false;


        // 정규표현식 1, 2, 3, 5 어느 하나라도 오류가 발생하면
        if(regExp1.test(state.아이디) === false || regExp2.test(state.아이디) === false || regExp3.test(state.아이디) === true || regExp5.test(state.아이디) === true){
            isModal = true;
            modalMsg = `6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합`; 
            isIdBtn = true;
            아이디중복확인= false;         
        }
        else{
            // $.axios() 구현 (axios 패키지 설치 후)
            // 아이디 중복확인 성공하면
            // alert(`사용할 수 있는 아이디입니다.`);

            // axios({}).then(()=>{성공결과}).catch(()=>{실패결과});
            axios({
                url: 'https://jaewoo07.com/cra_cors7/cors_member_id_email_select.php',  // 서버 호스트 주소
                method: 'GET'
            })
            .then((res)=>{ // 성공              
                if(res.status === 200){
                    let result = res.data.map((item)=>item.아이디 === state.아이디); // 같은 아이디가 있다면 true, 없다면 false
                    // console.log(result);  // result 배열에 true가 1개라도 있으면 중복된 것.

                    // true가 포함되어있는지 검증
                    if(result.includes(true)){
                        isModal = true;
                        modalMsg = '사용 불가능한 아이디 입니다';
                        isIdBtn = true;
                        아이디중복확인 = false;
                    }
                    else{
                        isModal = true;
                        modalMsg = `사용할 수 있는 아이디 입니다.`;
                        isIdBtn = false;
                        아이디중복확인 = true;
                    }

                    setState({
                        ...state,
                        modalMsg: modalMsg,
                        isModal: isModal,
                        isIdBtn: isIdBtn,
                        아이디중복확인: 아이디중복확인
                    });
                }
            })
            .catch((err)=>{ // 실패
                // console.log('AXIOS 실패', err);
            });            
        }

        setState({
            ...state,
            modalMsg: modalMsg,
            isModal: isModal,
            isIdBtn: isIdBtn,
            아이디중복확인: 아이디중복확인
        });
    };


    // 2. 비밀번호 입력 상자
    const onChangeInputPw=(e)=>{
        const regExp1 = /.{10,}/g;  // true이면 정상
        const regExp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)|((?=.*[0-9])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)/g;
        const regExp3 = /\s/g;  // true면 공백
        const regExp4 = /(.)\1\1/g;  // 동일한 문자 연속 3자 이상이면 오류
        const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g;  // 한글

        let {value} = e.target;
        let pwMsg = '';
        let isPw = false;
        let pwOkMsg = '';
        let isPwOk = false;

        if(value !== ""){
            if(regExp1.test(value) === false){
                pwMsg = '최소 10자 이상 입력';
                isPw = true;
            }
            else if(regExp2.test(value) === false || regExp3.test(value) === true || regExp5.test(value) === true){
                pwMsg = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
                isPw = true;
            }
            else if(regExp4.test(value) === true){
                pwMsg = '동일한 숫자 3개 이상 연속 사용 불가';
                isPw = true;
            }
            else {
                pwMsg = '';
                isPw = false;
            }
        }  
        else {
            pwMsg = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            isPw = true;
        }
        
        if(state.비밀번호확인 !== ''){
            if(state.비밀번호확인 !== value){
                pwOkMsg = '동일한 비밀번호를 입력';
                isPwOk = true;
            }
            else{
                pwOkMsg = '';
                isPwOk = false;
            }
        }  
        
        setState({
            ...state,
            비밀번호: value,
            pwMsg: pwMsg,
            isPw: isPw,
            pwOkMsg: pwOkMsg,
            isPwOk: isPwOk
        });
    };

    // 3. 비밀번호 확인 입력상자
    const onChangeInputPw2=(e)=>{
        let {value} = e.target;
        let pwOkMsg = '';
        let isPwOk = false;

        if(value !== ""){
            if(value !== state.비밀번호){
                pwOkMsg = '동일한 비밀번호를 입력';
                isPwOk = true;
            }
            else {
                pwOkMsg = '';
                isPwOk = false;
            }
        }
        else {
            pwOkMsg = '비밀번호를 한 번 더 입력해 주세요.';
            isPwOk = true;
        }

        setState({
            ...state,
            pwOkMsg: pwOkMsg,
            isPwOk: isPwOk,
            비밀번호확인: value
        });
    }
    
    // 4. 이름 입력상자
    const onChangeInputName=(e)=>{
        const regExp1 = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;

        let {value} = e.target;
        let nameMsg = '';
        let isName = false;

        if(value !== ""){
            // 특수문자 즉시 삭제
            value = value.replace(regExp1, "");
            nameMsg = '';
            isName = false;

        }
        else{
            nameMsg = '이름을 입력해 주세요.';
            isName = true;
        }

        setState({
            ...state,
            nameMsg: nameMsg,
            이름: value,
            isName: isName
        });
    }

    // 5-1. 이메일 입력상자
    const onChangeInputEmail=(e)=>{
        const regExp1 = /^[A-Za-z0-9`!#$%^&*+=|{}'/~?]+([-_.]?[A-Za-z0-9`!#$%^&*+=|{}~'/?])*@[A-Za-z0-9~]+([-_.]?[A-Za-z0-9~])*\.[A-Za-z]{2,3}$/g;    // \w => 문자, 숫자포함  || ()*선택, +필수
        let emailMsg = '';
        let isEmail = false;
        let {value} = e.target;
        let isEmailBtn = false;

        if(value !== ""){
            if(regExp1.test(value) === false){
                emailMsg = '이메일 형식으로 입력해 주세요';
                isEmail = true;
                isEmailBtn = true;
            }
            else{
                emailMsg = '';
                isEmail = false;
                isEmailBtn = true;
            }
        }
        else{
            emailMsg = '이메일을 입력해 주세요.';
            isEmail = true;
            isEmailBtn = false;
        }

        setState({
            ...state,
            emailMsg: emailMsg,
            isEmail: isEmail,
            이메일: value,
            isEmailBtn: isEmailBtn
        });
    }

    // 5-2. 이메일 중복 검사
    const onClickEmailOk=(e)=>{
        e.preventDefault();
        const regExp1 = /^[A-Za-z0-9`!#$%^&*+=|{}~'/?]+([-_.]?[A-Za-z0-9`!#$%^&*+=|{}~'/?])*@[A-Za-z0-9~]+([-_.]?[A-Za-z0-9~])*\.[A-Za-z]{2,3}$/g;    // \w => 문자, 숫자포함  || ()*선택, +필수
        let modalMsg = '';
        let isModal = false;
        let isEmailBtn = false;
        let 이메일중복확인 = false;

        if(state.이메일 !== ""){
            if(regExp1.test(state.이메일) === false){
                modalMsg = `이메일 형식으로 입력해 주세요.`;
                isModal = true;
                isEmailBtn = true;
                이메일중복확인= false;
            }
            else{
                axios({
                    url: 'https://jaewoo07.com/cra_cors7/cors_member_id_email_select.php',
                    method: 'GET'
                })
                .then((res)=>{
                    if(res.status === 200){
                        let result = res.data.map((item)=>item.이메일===state.이메일);
                    
                        if(result.includes(true)){
                            modalMsg = '사용 불가능한 이메일 입니다.';
                            isModal = true;
                            isEmailBtn = true;
                            이메일중복확인= false;
                        }
                        else{
                            modalMsg = `사용 가능한 이메일 입니다.`;
                            isModal = true;
                            isEmailBtn = false;
                            이메일중복확인= true;
                        }

                        setState({
                            ...state,
                            modalMsg: modalMsg,
                            isModal: isModal,
                            isEmailBtn: isEmailBtn,
                            이메일중복확인: 이메일중복확인
                        });
                    }                    
                })
                .catch((err)=>{
                    // console.log('AXIOS 실패', err);
                });
            }
        }
        else{
            modalMsg = `이메일을 입력해 주세요.`;
            isModal = true;
            이메일중복확인 = false;
        }

        setState({
            ...state,
            modalMsg: modalMsg,
            isModal: isModal,
            isEmailBtn: isEmailBtn,
            이메일중복확인: 이메일중복확인
        });

    };

    // 6-1. 휴대폰 입력상자 이벤트
    const onChangeInputHp=(e)=>{
        let hpMsg = '';
        let isHp = false;
        let {value} = e.target;
        let isHpBtn = false;

        const regExp1 = /[^0-9]/g;

        if(value !== ""){
            value = value.replace(regExp1, "");
            if(value.length >= 1){
                hpMsg = "";
                isHp = false;
                isHpBtn = true;
                // $('.hp-res-num-btn').addClass('on').attr('disabled', false);
                // 사용가능한 버튼 disabled == false
                // $(this).parent().next().removeClass('on')
            }
        }
        else{
            hpMsg = '휴대폰 번호를 입력해 주세요.';
            isHp = true;
            isHpBtn = false;
            // $('.hp-res-num-btn').removeClass('on').attr('disabled', true);
        }


        setState({
            ...state,
            isHp: isHp,
            hpMsg: hpMsg,
            휴대폰: value,
            isHpBtn: isHpBtn
        });

    }

    // 6-2. 휴대폰 인증번호 받기 버튼 클릭 이벤트
    const onClickHpBtn=(e)=>{
        e.preventDefault();
        let modalMsg = '';
        let isModal = false;
        // 휴대폰 번호 정규표현식
        const regExp1 = /^01[0|1|2|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
        let num = '';
        let isHpNum = false;
        let isHpBtn = false;
        let isHpOk = false;

        if(regExp1.test(state.휴대폰) === false){
            isModal = true;
            modalMsg = `잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.`;
            isHpBtn = true;
            isHpOk = false;
        }
        else{
            // 인증번호 6자리(랜덤) Math.random()
            num = Math.floor(Math.random() * 900000 + 100000);
            isModal = true;
            modalMsg = `인증번호가 발송되었습니다. [${num}]`;
            // isHpNum = true;
            // isHpBtn = false;
            // isHpOk = true;     
                
            // $('.row-06-2').addClass('on');
            // timerCount();
            // $('.hp-res-num-btn').removeClass('on').attr('disabled', true);   
            // $('#inputHp').attr('disabled', true);                
        }

        setState({
            ...state,
            isModal: isModal,
            modalMsg: modalMsg,
            휴대폰인증번호발송: num,
            isHpNum: isHpNum,
            isHpBtn: isHpBtn,
            isHpOk: isHpOk
        });

    }
    

    // 6-3. 휴대폰 인증번호 입력상자 이벤트
    const onChangeInputHpNum=(e)=>{
        let {value} = e.target;
        let isHpOkBtn = false;
        const regExp1 = /[^0-9]/g;

        value = value.replace(regExp1, "");

        if(value !== ''){
            isHpOkBtn = true;
        }
        else{
            isHpOkBtn = false;
        }

        setState({
            ...state,
            휴대폰인증번호입력: value,
            isHpOkBtn: isHpOkBtn
        });
    }


    // 6-4. 휴대폰인증번호발송과 휴대폰인증번호입력 비교하기
    const onClickHpOkBtn=(e)=>{
        e.preventDefault();
        let modalMsg = '';
        let isModal = false;
        let isHpNum = false;
        let isHpBtn2 = false;
        let 휴대폰인증확인 = false;

        // 인증번호 비교           // 문자 => 숫자: 형변환
        if(state.휴대폰인증번호발송 === Number(state.휴대폰인증번호입력)){
            isModal = true;
            modalMsg = `인증에 성공 하였습니다.`;
            isHpNum = false;
            isHpBtn2 = true;
            휴대폰인증확인 = true;
            // 타이머 정지
            clearInterval(setId);
        }
        else{
            isModal = true;
            modalMsg = `잘못된 인증 코드 입니다.`;
            isHpNum = true;
            isHpBtn2 = false;
            휴대폰인증확인 = false;
        }

        setState({
            ...state,
            modalMsg: modalMsg,
            isModal: isModal,
            isHpNum: isHpNum,
            isHpBtn2: isHpBtn2,
            휴대폰인증확인: 휴대폰인증확인
        });
    }


    // 6-5. 다른 번호 인증 버튼
    const onClickHpBtn2=(e)=>{
        e.preventDefault();

        timer.minutes = 2;
        timer.seconds = 59;

        setState({
            ...state,
            isHpBtn2: false,
            isHpOk: false,
            휴대폰: '',
            휴대폰인증번호입력:'',
            // seconds: seconds,
            // minutes: minutes
        });    

        // 커서가 포커스 됨
        refHp.current.focus();
    }

    React.useEffect(()=>{

        if(state.isHpNum === true){
            if(timerEnd === true){  // 유효시간 3분이 경과하면
                setState({
                    ...state,
                    isModal: true,  // 모달 열기
                    modalMsg: timerMsg,  // 모달 메세지
                    isHpNum: false,
                    isHpBtn: true,
                    isHpOk: false,
                    휴대폰인증번호입력:''
                })
            }      
        }
        else{
            if(timerEnd === true){  // 유효시간 3분이 경과하면
                setState({
                    ...state,
                    isModal: false,  // 모달 열기
                    modalMsg: '',  // 모달 메세지
                    isHpNum: false,
                    isHpBtn: true,
                    isHpOk: false,
                    휴대폰인증번호입력:''
                })
            }
        }     
    }, [timerEnd]);


    // 7-1. 주소 검색 버튼 클릭 이벤트
    const onClickAddrSearchBtn=(e)=>{
        e.preventDefault();
        // 팝업창 크기: 530 * 569
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const popWidth = 530;
        const popHeight = 569;
        const popTop = (winHeight - popHeight) / 2;
        const popLeft = (winWidth - popWidth) / 2;
        const popUrl = 'popup.html';
        const popName = 'addressSearch';

        window.open(popUrl, popName, `width = ${popWidth}, height = ${popHeight}, top = ${popTop}, left = ${popLeft}`);
    }


    // 7-2. 주소 온체인지 이벤트
    const onChangeInputAddr1=(e)=>{
        setState({
            ...state,
            주소1: e.target.value,
        });
    }

    const onChangeInputAddr2=(e)=>{
        setState({
            ...state,
            주소2: e.target.value,
        });
    }
  

    // 7-3. 세션 스토리지 데이터 가져오기
    const getAddress=()=>{
        const key = 'KURLY_SIGNUP_ADDRESS';

        if(sessionStorage.getItem(key) !== null){
            const result = JSON.parse(sessionStorage.getItem(key));

            setState({
                ...state,
                주소1: result.주소1,
                주소2: state.주소2,
                isAddress: true
            })
        }
        // else{
        //     return;
        // }
    }


    // const key = 'KURLY_SIGNUP_ADDRESS';
    // const result = JSON.parse(sessionStorage.getItem(key));



    // 7-4. 주소 변경이 되면 마운트 후에 주소 가져오기 실행
    React.useEffect(()=>{
            getAddress(); 
     }, [state.주소1, state.주소2]);



    // 8. 성별
    // 기본이 선택안함에 체크.
    const onChangeGender=(e)=>{
        setState({
            ...state,
            성별: e.target.value
        });
    }



    // 9-1. 생년 입력 상자 이벤트 : 숫자만 입력, 그 외는 즉시 삭제
    const onChangeYear=(e)=>{
        const regExp1 = /[^0-9]/g;
        let 생년 = '';
        const {value} = e.target;

        생년 = value.replace(regExp1, '');

        setState({
            ...state,
            생년: 생년
        });
    }


    // 9-2. 생월 입력 상자 이벤트 : 숫자만 입력, 그 외는 즉시 삭제
    const onChangeMonth=(e)=>{
        const regExp1 = /[^0-9]/g;
        let 생월 = '';
        const {value} = e.target;

        생월 = value.replace(regExp1, '');

        setState({
            ...state,
            생월: 생월
        });
    }


    // 9-3. 생일 입력 상자 이벤트 : 숫자만 입력, 그 외는 즉시 삭제
    const onChangeDate=(e)=>{
        const regExp1 = /[^0-9]/g;
        let 생일 = '';
        const {value} = e.target;

        생일 = value.replace(regExp1, '');

        setState({
            ...state,
            생일: 생일
        });
    }


    // 9-4. 생년월일 유효성 검사
    const birthCheckFn=(e)=>{
        let birthMsg = '';
        let isBirth = false;
        const regExp1 = /.{4,}/g;  // true이면 정상
        const newYear = new Date().getFullYear();
        const {생년, 생월, 생일} = state;

        // 생년: [미래 / 14세 미만 / 100년 초과] 불가
        // 생월: 1 ~ 12
        // 생일: 1 ~ 31
        if(생년 === '' && 생월 === '' && 생일 === ''){
            birthMsg = '';
            isBirth = false;
        }
        else{
            // 생년 체크
            if(regExp1.test(Number(생년)) === false){
                birthMsg = '태어난 년도 4자리를 정확하게 입력해 주세요.';
                isBirth = true;
            }
            else if(Number(생년) > newYear){
                birthMsg = '생년월일이 미래로 입력되었습니다.';
                isBirth = true;
            }
            else if(Number(생년) >= (newYear - 14)){
                birthMsg = '만 14세 미만은 가입이 불가합니다.';
                isBirth = true;
            }
            else if(Number(생년) < (newYear - 100)){
                birthMsg = '생년월일을 다시 확인해 주세요.';
                isBirth = true;
            }
            else{
                // 생월 체크
                if(Number(생월) < 1 || Number(생월) > 12){
                    birthMsg = '태어난 월을 정확하게 입력해 주세요.';
                    isBirth = true;
                }
                else{
                    // 생일 체크
                    if(Number(생일) < 1 || Number(생일) > 31){
                        birthMsg = '태어난 일을 정확하게 입력해 주세요.';
                        isBirth = true;
                    }
                    else{
                        birthMsg = '';
                        isBirth = false;
                    }
                }
            }
        }

        setState({
            ...state,
            birthMsg: birthMsg,
            isBirth: isBirth
        });
    }


    // 상태관리 변수가 입력이 되거나 변경이 되면 즉시 함수가 실행이 된다.
    React.useEffect(()=>{
        birthCheckFn();
    }, [state.생년, state.생월, state.생일]);



    // 10-1. 추가입력사항(친구초대 추천인 아이디, 참여 이벤트명)
    const onChangeAddInput=(e)=>{
        let isAddInput1 = false;
        let isAddInput2 = false;
        let isAddInputBtn = false;
        let 추가입력사항 = '';
        let 친구초대추천인아이디 = '';
        let 참여이벤트명 = '';
        
        if(e.target.checked === true){          
            if(e.target.value === "친구초대 추천인 아이디"){
                추가입력사항= "친구초대 추천인 아이디";
                isAddInput1 = true;
                isAddInput2 = false;
                state.참여이벤트명 = '';
            }
            else{
                추가입력사항= "참여 이벤트명";
                isAddInput1 = false;
                isAddInput2 = true;
                isAddInputBtn = false;
                state.친구초대추천인아이디 = '';
            }
        }

        setState({
            ...state,
            isAddInput1: isAddInput1,
            isAddInput2: isAddInput2,
            isAddInputBtn: isAddInputBtn,
            추가입력사항: 추가입력사항,
            참여이벤트명: 참여이벤트명,
            친구초대추천인아이디: 친구초대추천인아이디
        });
    }


    // 10-2. 친구초대 추천인 아이디 입력 상자
    const onChangeAddInputBox=(e)=>{
        // e.preventDefault();
        setState({
            ...state,
            친구초대추천인아이디: e.target.value,
            isAddInputBtn: false
        });

    }


    // 10-3. 참여 이벤트명 입력 상자
    const onChangeAddInputBox2=(e)=>{
        // e.preventDefault();
        setState({
            ...state,
            참여이벤트명: e.target.value
        });

    }


    // 10-4. 추가입력사항: 아이디 확인 이벤트
    const onClickAddInputBtn=(e)=>{
        e.preventDefault();
        let isModal = false;
        let modalMsg = '';
        let isAddInputBtn = false;

        if(state.친구초대추천인아이디 !== ''){
            axios({
                url: 'https://jaewoo07.com/cra_cors7/cors_member_id_email_select.php',  // 서버 호스트 주소
                method: 'GET'
            })
            .then((res)=>{ // 성공              
                if(res.status === 200){
                    let result = res.data.map((item)=>item.아이디 === state.친구초대추천인아이디); // 같은 아이디가 있다면 true, 없다면 false
                    // console.log(result);  // result 배열에 true가 1개라도 있으면 중복된 것.
                    
                    // true가 포함되어있는지 검증
                    if(result.includes(true)){
                        isModal = true;
                        modalMsg = '존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.';
                        isAddInputBtn = true;
                    }
                    else{
                        isModal = true;
                        modalMsg = `존재하지 않는 아이디 입니다.`;
                        isAddInputBtn = false;
                    }
    
                    setState({
                        ...state,
                        modalMsg: modalMsg,
                        isModal: isModal,
                        isAddInputBtn: isAddInputBtn
                    });
                }
            })
            .catch((err)=>{ // 실패
                // console.log('AXIOS 실패', err);
            });
        }
        else{
            isModal = true;
            modalMsg = `아이디를 입력해 주세요.`;
            isAddInputBtn = false;
        }

        setState({
            ...state,
            modalMsg: modalMsg,
            isModal: isModal,
            isAddInputBtn: isAddInputBtn
        });       
    }


    // 11-1. 이용약관동의 - 전체동의 
    const onChangeCheckAll=(e)=>{
        if(e.target.checked === true){
            setState({
                ...state,
                이용약관동의: state.약관동의목록
            });
        }
        else{
            setState({
                ...state,
                이용약관동의: []
            });
        }
    }

    // 11-2. 각 체크박스의 value값과 이용약관동의 값을 비교하여
    // 만약 value값이 있다면 체크를 자동으로 하게 한다. (JSX 태그 에서)


    // 11-3. 이용약관동의 - 개별 체크
    const onChangeService=(e)=>{
        if(e.target.checked === true){
            // 11-5. 무료배송 체크하면 SMS, 이메일이 같이 체크된다. (체크 해제하면 동시 해제)
            if(e.target.value === "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" && state.이용약관동의.includes("SMS") === false && state.이용약관동의.includes("이메일") === false){
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, "SMS", "이메일"]
                });
            }
            else if(e.target.value === "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" && state.이용약관동의.includes("SMS") === true && state.이용약관동의.includes("이메일") === false){
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, "이메일"]
                });
            }
            else if(e.target.value === "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" && state.이용약관동의.includes("SMS") === false && state.이용약관동의.includes("이메일") === true){
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, "SMS"]
                });
            }
            else if(e.target.value === "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" && state.이용약관동의.includes("SMS") === true && state.이용약관동의.includes("이메일") === true){
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value]
                });
            }
            else if(e.target.value === "SMS" && state.이용약관동의.includes("이메일") === true){
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"]
                });
            }
            else if(e.target.value === "이메일" && state.이용약관동의.includes("SMS") === true){
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"]
                });
            }
            else{
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value]
                });
            }          
        }
        else{  // 체크 해제하면 삭제 => 체크 해제한 항목만 제외하고, 나머지 모두 저장 (filter, 배열이 재구성 됨)
            if(e.target.value === "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"){
                // 무료배송 삭제1, SMS 삭제2, 이메일 삭제3 (state는 한 번에 지우지 못 하고 3번에 나눠서 지워야 한다. 즉, 한 번에 한 가지만 지워짐)
                let imsi = state.이용약관동의.filter((item)=>item !== "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)");
                imsi = imsi.filter((item)=>item !== "SMS");
                imsi = imsi.filter((item)=>item !== "이메일");
                setState({
                    ...state,
                    이용약관동의: imsi
                });              
            }
            else if(e.target.value === "SMS" && state.이용약관동의.includes("무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)") === true && state.이용약관동의.includes("이메일") === true){
                let imsi = state.이용약관동의.filter((item)=>item !== "SMS");
                imsi = imsi.filter((item)=>item !== "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)");
                setState({
                    ...state,
                    이용약관동의: imsi
                });              
            }
            else if(e.target.value === "이메일" && state.이용약관동의.includes("무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)") === true && state.이용약관동의.includes("SMS") === true){
                let imsi = state.이용약관동의.filter((item)=>item !== "이메일");
                imsi = imsi.filter((item)=>item !== "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)");
                setState({
                    ...state,
                    이용약관동의: imsi
                });              
            }
            else{
                setState({
                    ...state,
                    이용약관동의: state.이용약관동의.filter((item)=> item !== e.target.value)
                });
            }           
        }
    }

    // 11-4. 7개가 모두 체크되면 전체동의가 체크되도록 한다. (JSX 태그 에서)


    // 모달 닫기 버튼 클릭 이벤트
    const onClickModalClose=(e)=>{
        e.preventDefault();
        let isHpNum = state.isHpNum;
        let isHpBtn = state.isHpBtn;
        let isHpOk = state.isHpOk;

        // 인증번호가 발송되고 닫기를 누르면 타이머 호출
        if(state.modalMsg.includes('발송') === true ){
            // 카운트 타이머 함수 호출 실행
            timerCounterFn();
            isHpNum = true;
            isHpBtn = false;
            isHpOk = true;
        }
        
        if(state.modalMsg.includes("회원 가입이 완료 되었습니다.") === true){
            window.location.href = '/메인';
        }

            setState({
                ...state,
                isModal: false,
                modalMsg: '',
                isHpNum: isHpNum,
                isHpBtn: isHpBtn,
                isHpOk: isHpOk
            });       
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /// 12. 가입하기 버튼 클릭 이벤트 (폼 전송, 타입은 submit)
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    const onSubmitForm=(e)=>{
        e.preventDefault();

        let cnt = 0;
        state.이용약관동의.map((item)=>{
            if(item.indexOf('필수') !== -1){  // 찾으면 1씩 증가 (3이면 필수 항목 모두 체크)
                cnt++;
            }
        });


        // 유효성 검사: 버튼 클릭을 할 때 필수 항목 중에 빈 값이 있으면 안 됨
        if(state.아이디 === ""){
            setState({
                ...state,
                isModal: true,
                modalMsg: "아이디를 입력해 주세요."
            });
        }
        else if(state.비밀번호 === ""){
            setState({
                ...state,
                isModal: true,
                modalMsg: "비밀번호를 입력해 주세요."
            });
        }
        else if(state.비밀번호확인 === ""){
            setState({
                ...state,
                isModal: true,
                modalMsg: "비밀번호를 한 번 더 입력해 주세요."
            });
        }
        else if(state.이름 === ""){
            setState({
                ...state,
                isModal: true,
                modalMsg: "이름을 입력해 주세요."
            });
        }
        else if(state.이메일 === ""){
            setState({
                ...state,
                isModal: true,
                modalMsg: "이메일을 입력해 주세요."
            });
        }
        else if(state.이메일 === ""){
            setState({
                ...state,
                isModal: true,
                modalMsg: "휴대폰 번호를 입력해 주세요."
            });
        }
        else if(state.주소1 === ""){
            setState({
                ...state,
                isModal: true,
                modalMsg: "주소를 입력해 주세요."
            });
        }
        else if(state.주소2 === ""){
            setState({
                ...state,
                isModal: true,
                modalMsg: "나머지 주소를 입력해 주세요."
            });
        }
        else if(cnt < 3){
            setState({
                ...state,
                isModal: true,
                modalMsg: "이용약관동의 필수 항목을 체크해 주세요."
            });
        }
        // 중복확인(아이디, 이메일), 휴대폰인증확인
        else if(state.아이디중복확인 === false){
            setState({
                ...state,
                isModal: true,
                modalMsg: "아이디 중복 체크를 해주세요."
            });
        }
        else if(state.이메일중복확인 === false){
            setState({
                ...state,
                isModal: true,
                modalMsg: "이메일 중복 체크를 해주세요."
            });
        }
        else if(state.휴대폰인증확인 === false){
            setState({
                ...state,
                isModal: true,
                modalMsg: "휴대폰 인증을 진행해 주세요."
            });
        }
        else{
            //////////////////////////////////////////////////////
            // 모든 항목이 정상이면 (전송 준비 완료) 폼 전송
            //////////////////////////////////////////////////////
            // const regExp1 = /^(\d{3})(\d{3,4})(\d{4})$/g;

            const newFormData = new FormData(); // 폼 데이터 생성자 만들기

            newFormData.append('user_id', state.아이디);
            newFormData.append('user_pw', state.비밀번호);
            newFormData.append('user_name', state.이름);
            newFormData.append('user_email', state.이메일);
            newFormData.append('user_hp', state.휴대폰/* .replace(regExp1, '$1-$2-$3') */);
            newFormData.append('user_addr', `${state.주소1} ${state.주소2}`);
            newFormData.append('user_gender', state.성별);
            newFormData.append('user_birth', `${state.생년}-${state.생월}-${state.생일}`);
            newFormData.append('user_add_input', `${state.추가입력사항} ${state.친구초대추천인아이디} ${state.참여이벤트명}`);
            newFormData.append('user_service', state.이용약관동의);
            newFormData.append('user_gaib_date', `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-${(new Date().getDate()) < 10 ? "0" + (new Date().getDate()) : (new Date().getDate())}`);

            axios({
                url: 'https://jaewoo07.com/cra_cors7/member_form_insert.php',  // '웹서버의 URL/경로/DB에 저장하게 할 서버사이드 스크립트 언어 파일.PHP'
                method: 'POST',
                data: newFormData // 폼데이터 생성자 이용
            })
            .then((res)=>{  // 성공 시 응답
                // console.log(res);
                // console.log(res.data);

                // 가입 정보 전송요청 => 서버 => member_form_insert.php
                // SQL => INSERT INTO 테이블이름
                // 폼 전송된 회원 정보를 받아서 데이터베이스에 저장한다.

                // 1. 폼 정보 전송 => 받아줄 php sql 작성
                // 2. 변수 받기 테스트

                if(res.data.includes('성공') === true){
                    // 가입 완료 시, 성공 모달메시지
                    setState({
                        ...state,
                        isModal: true,
                        modalMsg: "회원 가입이 완료 되었습니다."                   
                    });
                }
                else{
                    // 가입 실패 시, 실패 모달메시지
                    setState({
                        ...state,
                        isModal: true,
                        modalMsg: "회원 가입을 다시 시도해 주세요."
                    });
                }                         
            })
            .catch((err)=>{  // 실패 시 에러 메시지
                // console.log(err);
            });
        }
    }
    



    return (
        <>
            <main id="sub" className="sub5">
                <section id="signUp">
                    <div className="container">
                        <div className="title">
                            <h2>회원가입</h2>
                            <span><i>*</i> 필수입력사항</span>
                        </div>
                        <div className="content">
                            <form onSubmit={onSubmitForm} name="signup_form" id="signupForm" method="post" action="./signup.php">
                                <ul>
                                    <li className="row row-01">
                                        <div className="wrap-box">
                                            <label htmlFor="inputId">아이디<i>*</i></label>
                                            <input 
                                                type="text" 
                                                maxLength={16} 
                                                id="inputId" 
                                                name="input_id" 
                                                placeholder="아이디를 입력해 주세요"
                                                onChange={onChangeInputId}
                                                value={state.아이디}
                                            />
                                            <button 
                                                className={`id-ok-btn${state.isIdBtn === false ? ' on' : ''}`}
                                                onClick={onClickIdOk}
                                                disabled={state.isIdBtn === false ? true : false}>중복확인</button>
                                        </div>
                                        <p className={`isError${state.isId === true ? ' on' : ''}`}>{state.idMsg}</p>
                                    </li>
                                    <li className="row row-02">
                                        <div className="wrap-box">
                                            <label htmlFor="inputPw">비밀번호<i>*</i></label>
                                            <input 
                                                type="password" 
                                                maxLength={16} 
                                                id="inputPw" 
                                                name="input_pw" 
                                                placeholder="비밀번호를 입력해 주세요"
                                                onChange={onChangeInputPw}
                                                value={state.비밀번호}
                                                />
                                        </div>
                                        <p className={`isError${state.isPw === true ? ' on' : ''}`}>{state.pwMsg}</p>
                                    </li>
                                    <li className="row row-03">
                                        <div className="wrap-box">
                                            <label htmlFor="inputPw2">비밀번호 확인<i>*</i></label>
                                            <input 
                                                type="password" 
                                                maxLength={16} 
                                                id="inputPw2" 
                                                name="input_pw2" 
                                                placeholder="비밀번호를 한 번 더 입력해 주세요"
                                                onChange={onChangeInputPw2}
                                                value={state.비밀번호확인}
                                                />
                                        </div>
                                        <p className={`isError${state.isPwOk === true ? ' on' : ''}`}>{state.pwOkMsg}</p>
                                    </li>
                                    <li className="row row-04">
                                        <div className="wrap-box">
                                            <label htmlFor="inputName">이름<i>*</i></label>
                                            <input 
                                                type="text" 
                                                maxLength={20} 
                                                id="inputName" 
                                                name="input_name" 
                                                placeholder="이름을 입력해 주세요"
                                                onChange={onChangeInputName}
                                                value={state.이름}
                                                />
                                        </div>
                                        <p className={`isError${state.isName === true ? ' on' : ''}`}>{state.nameMsg}</p>
                                    </li>
                                    <li className="row row-05">
                                        <div className="wrap-box">
                                            <label htmlFor="inputEmail">이메일<i>*</i></label>
                                            <input 
                                                type="text" 
                                                id="inputEmail" 
                                                name="input_email" 
                                                placeholder="예: marketkurly@kurly.com"
                                                onChange={onChangeInputEmail}
                                                value={state.이메일}
                                                />
                                            <button
                                                className={`email-ok-btn${state.isEmailBtn === false ? ' on' : ''}`}
                                                onClick={onClickEmailOk}
                                                disabled={state.isEmailBtn === false ? true : false}
                                                >중복확인</button>
                                        </div>
                                        <p className={`isError${state.isEmail === true ? ' on' : ''}`}>{state.emailMsg}</p>
                                    </li>
                                    <li className="row row-06-1">
                                        <div className="wrap-box">
                                            <label htmlFor="inputHp">휴대폰<i>*</i></label>
                                            <input 
                                                type="text"
                                                maxLength={11} 
                                                id="inputHp" 
                                                name="input_hp" 
                                                placeholder="숫자만 입력해 주세요"
                                                onChange={onChangeInputHp}
                                                value={state.휴대폰}
                                                ref={refHp}
                                                disabled={state.isHpOk === true ? true : false}/>
                                            <button 
                                                className={`hp-res-num-btn${state.isHpBtn === true ? ' on' : ''}`}
                                                disabled={state.isHpBtn === true ? false : true}
                                                onClick={onClickHpBtn}
                                                >인증번호 받기</button>
                                            <button 
                                                className={`hp-res-num-btn2${state.isHpBtn2 === true ? ' on' : ''}`}
                                                onClick={onClickHpBtn2}
                                                >다른번호 인증</button>
                                        </div>
                                        <p className={`isError${state.isHp === true ? ' on' : ''}`}>{state.hpMsg}</p>
                                    </li>
                                    <li className={`row row-06-2${state.isHpNum === true ? ' on' : ''}`}>
                                        <div className="wrap-box">
                                            <input 
                                                type="text" 
                                                maxLength={11} 
                                                id="inputHpNum" 
                                                name="input_hp_num"
                                                onChange={onChangeInputHpNum}  // 휴대폰인증번호입력
                                                value={state.휴대폰인증번호입력}
                                                />
                                            <span className="count-timer">
                                                <em className="minute">{minutes < 10 ? "0" + minutes : minutes}</em>
                                                <i>:</i>
                                                <em className="second">{seconds < 10 ? "0" + seconds : seconds}</em>
                                            </span>
                                            <button 
                                                className={`hp-ok-num-btn${state.isHpOkBtn === true ? ' on' : ''}`} 
                                                disabled={state.isHpOkBtn === true ? false : true}
                                                onClick={onClickHpOkBtn}
                                                >인증번호 확인</button>                                      
                                        </div>
                                        <p>인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (컬리 1644-1107)</p>
                                    </li>
                                    <li className={`row row-07${state.isAddress === true ? ' on' : ''}`}>
                                        <div className="wrap-box">
                                            <label htmlFor="inputAddr1">주소<i>*</i></label>
                                            <input 
                                                type="text" 
                                                id="inputAddr1" 
                                                name="input_addr1" 
                                                placeholder="주소 검색" 
                                                disabled={true}
                                                onChange={onChangeInputAddr1}
                                                // onFocus={onChangeInputAddr1}
                                                value={state.주소1}
                                                />
                                            <button 
                                                className="addr-research-btn"
                                                onClick={onClickAddrSearchBtn}
                                                ><img src="./img/sub5/ico_search.svg" alt=""/>재검색</button>
                                        </div>
                                    </li>
                                    <li className={`row row-08${state.isAddress === true ? ' on' : ''}`}>
                                        <div className="wrap-box">                 
                                            <input 
                                                type="text" 
                                                id="inputAddr2" 
                                                name="input_addr2" 
                                                placeholder="나머지 주소를 입력해 주세요"
                                                onChange={onChangeInputAddr2}
                                                onFocus={onChangeInputAddr2}
                                                value={state.주소2}
                                                />
                                        </div>
                                    </li>
                                    <li className={`row row-09${state.isAddress === true ? ' on' : ''}`}>
                                        <div className="wrap-box">
                                            <label htmlFor="inputAddr1">주소<i>*</i></label>
                                            <button 
                                                className="addr-search-btn"
                                                onClick={onClickAddrSearchBtn}
                                                ><img src="./img/sub5/ico_search.svg" alt=""/>주소 검색</button>
                                        </div>
                                    </li>
                                    <li className="row row-10">
                                        <div className="wrap-box">
                                        <h4 className={`sb${state.isAddress === true ? ' on' : ''}`}>샛별배송</h4>
                                        <h5>배송지에 따라 상품 정보가 달라질 수 있습니다.</h5>
                                        </div>
                                    </li>
                                    <li className={`row row-11${state.isAddress === true ? ' on' : ''}`}>
                                        <div className="wrap-box">
                                            <label className="radio-title">성별</label>
                                            <label className="radio" htmlFor="male">
                                                <input 
                                                    type="radio" 
                                                    id="male" 
                                                    name="gender" 
                                                    className="gender-btn" 
                                                    value="남자"
                                                    onChange={onChangeGender}
                                                    checked={state.성별.includes("남자")}
                                                    />남자</label>
                                            <label className="radio" htmlFor="female">
                                                <input 
                                                    type="radio" 
                                                    id="female" 
                                                    name="gender" 
                                                    className="gender-btn" 
                                                    value="여자"
                                                    onChange={onChangeGender}
                                                    checked={state.성별.includes("여자")}
                                                    />여자</label>
                                            <label className="radio" htmlFor="none">
                                                <input 
                                                    type="radio" 
                                                    id="none" 
                                                    name="gender" 
                                                    className="gender-btn" 
                                                    value="선택안함"
                                                    onChange={onChangeGender}
                                                    checked={state.성별.includes("선택안함")}
                                                    />선택안함</label>     
                                        </div>
                                    </li>
                                    <li className="row row-12">
                                        <div className="wrap-box">
                                            <label>생년월일</label>
                                            <div className="birth-box">
                                                <input 
                                                    type="text" 
                                                    maxLength={4} 
                                                    className="birth" 
                                                    name="year" 
                                                    id="year" 
                                                    placeholder="YYYY"
                                                    onChange={onChangeYear}
                                                    value={state.생년}
                                                    />
                                                <i>/</i>
                                                <input 
                                                    type="text"
                                                    maxLength={2} 
                                                    className="birth" 
                                                    name="month" 
                                                    id="month" 
                                                    placeholder="MM"
                                                    onChange={onChangeMonth}
                                                    value={state.생월}
                                                    />
                                                <i>/</i>
                                                <input 
                                                    type="text" 
                                                    maxLength={2} 
                                                    className="birth" 
                                                    name="date" 
                                                    id="date" 
                                                    placeholder="DD"
                                                    onChange={onChangeDate}
                                                    value={state.생일}
                                                    />
                                            </div>                                   
                                        </div>
                                        <p className={`isError${state.isBirth === true ? ' on' : ''}`}>{state.birthMsg}</p>
                                    </li>
                                    <li className="row row-13">
                                        <div className="wrap-box">
                                            <label className="radio-title">추가입력 사항</label>
                                            <label className="radio" htmlFor="add_input1">
                                                <input 
                                                    type="radio" 
                                                    id="add_input1" 
                                                    name="add_input" 
                                                    value="친구초대 추천인 아이디"
                                                    onChange={onChangeAddInput}
                                                    checked={state.추가입력사항.includes("친구초대 추천인 아이디")}
                                                    />친구초대 추천인 아이디</label>
                                            <label className="radio" htmlFor="add_input2">
                                                <input 
                                                    type="radio" 
                                                    id="add_input2" 
                                                    name="add_input" 
                                                    value="참여 이벤트명"
                                                    onChange={onChangeAddInput}
                                                    checked={state.추가입력사항.includes("참여 이벤트명")}
                                                    />참여 이벤트명</label>
                                        </div>
                                    </li>
                                    <li className={`row row-14-1-1${state.isAddInput1 === true ? ' on' : ''}`}>
                                        <div className="wrap-box">
                                            <input 
                                                type="text" 
                                                maxLength={16} 
                                                name="add_input_box" 
                                                id="addInputBox" 
                                                placeholder="추천인 아이디를 입력해 주세요"
                                                onChange={onChangeAddInputBox}
                                                value={state.친구초대추천인아이디}
                                                />
                                            <button 
                                                className={`add-input-btn${state.isAddInputBtn === true ? ' on' : ''}`} 
                                                onClick={onClickAddInputBtn}
                                                disabled={state.isAddInputBtn === true ? true : false}
                                                >아이디 확인</button>
                                        </div>
                                    </li>
                                    <li className={`row row-14-1-2${state.isAddInput1 === true ? ' on' : ''}`}>
                                        <div className="wrap-box">                                        
                                            <p>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</p>
                                        </div>
                                    </li>
                                    <li className={`row row-14-2-1${state.isAddInput2 === true ? ' on' : ''}`}>
                                        <div className="wrap-box">
                                            <input 
                                                type="text" 
                                                name="add_input_box2" 
                                                id="addInputBox2" 
                                                placeholder="참여 이벤트명을 입력해 주세요"
                                                onChange={onChangeAddInputBox2}
                                                value={state.참여이벤트명}
                                                />
                                        </div>
                                    </li>
                                    <li className={`row row-14-2-2${state.isAddInput2 === true ? ' on' : ''}`}>
                                        <div className="wrap-box">                                        
                                            <p>
                                                추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                                가입 이후는 수정이 불가능 합니다.<br/>
                                                대소문자 및 띄어쓰기에 유의해주세요.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="row row-15">
                                        <div className={`wrap-box${state.isAddInput2 === true ? ' on' : ''}`} id="row_15_border"></div>
                                    </li>
                                    <li className="row row-16">
                                        <div className="wrap-box">
                                            <label className="check-label">이용약관동의<i>*</i></label>
                                            <label className="check-box-all" htmlFor="checkAll">
                                                <input 
                                                    type="checkbox" 
                                                    id="checkAll" 
                                                    name="check_all" 
                                                    value="전체 동의합니다."
                                                    onChange={onChangeCheckAll}
                                                    checked={state.이용약관동의.length === 7 ? true : false}
                                                    />전체 동의합니다.</label>
                                            <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                        </div>
                                    </li>
                                    <li className="row row-17 row-check">
                                        <div className="wrap-box">
                                            <label className="check-box" htmlFor="check1">
                                                <input 
                                                    type="checkbox" 
                                                    id="check1" 
                                                    className="chk-btn" 
                                                    name="check_1" 
                                                    value="이용약관 동의(필수)"
                                                    checked={state.이용약관동의.includes("이용약관 동의(필수)")}
                                                    onChange={onChangeService}
                                                    />이용약관 동의</label><i>(필수)</i>
                                        </div>
                                    </li>
                                    <li className="row row-18 row-check">
                                        <div className="wrap-box">
                                            <label className="check-box" htmlFor="check2">
                                                <input 
                                                    type="checkbox" 
                                                    id="check2" 
                                                    className="chk-btn" 
                                                    name="check_2" 
                                                    value="개인정보 수집∙이용 동의(필수)"
                                                    checked={state.이용약관동의.includes("개인정보 수집∙이용 동의(필수)")}
                                                    onChange={onChangeService}
                                                    />개인정보 수집∙이용 동의</label><i>(필수)</i>
                                        </div>
                                    </li>
                                    <li className="row row-19 row-check">
                                        <div className="wrap-box">
                                            <label className="check-box" htmlFor="check3">
                                                <input 
                                                    type="checkbox" 
                                                    id="check3" 
                                                    className="chk-btn" 
                                                    name="check_3" 
                                                    value="개인정보 수집∙이용 동의(선택)"
                                                    checked={state.이용약관동의.includes("개인정보 수집∙이용 동의(선택)")}
                                                    onChange={onChangeService}
                                                    />개인정보 수집∙이용 동의</label><i>(선택)</i>
                                        </div>
                                    </li>
                                    <li className="row row-20 row-check">
                                        <div className="wrap-box">
                                            <label className="check-box" htmlFor="check4">
                                                <input 
                                                    type="checkbox" 
                                                    id="check4" 
                                                    className="chk-btn"
                                                    name="check_4" 
                                                    value="무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"
                                                    checked={state.이용약관동의.includes("무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)")}
                                                    onChange={onChangeService}
                                                    />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label><i>(선택)</i>
                                        </div>
                                    </li>
                                    <li className="row row-21 row-check">
                                        <div className="wrap-box">
                                            <label className="check-box" htmlFor="check5">
                                                <input 
                                                    type="checkbox" 
                                                    id="check5" 
                                                    className="chk-btn" 
                                                    name="check_5" 
                                                    value="SMS"
                                                    checked={state.이용약관동의.includes("SMS")}
                                                    onChange={onChangeService}
                                                    />SMS</label>
                                            <label className="check-box" htmlFor="check6">
                                                <input 
                                                    type="checkbox" 
                                                    id="check6" 
                                                    className="chk-btn" 
                                                    name="check_6" 
                                                    value="이메일"
                                                    checked={state.이용약관동의.includes("이메일")}
                                                    onChange={onChangeService}
                                                    />이메일</label>
                                            <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                        </div>
                                    </li>
                                    <li className="row row-22 row-check">
                                        <div className="wrap-box">
                                            <label className="check-box" htmlFor="check7">
                                                <input 
                                                    type="checkbox" 
                                                    id="check7" 
                                                    className="chk-btn" 
                                                    name="check_7" 
                                                    value="본인은 만 14세 이상입니다.(필수)"
                                                    checked={state.이용약관동의.includes("본인은 만 14세 이상입니다.(필수)")}
                                                    onChange={onChangeService}
                                                    />본인은 만 14세 이상입니다.</label><i>(필수)</i>
                                        </div>
                                    </li>
                                </ul>
                                <div className="button-box-border"></div>
                                <div className="button-box">
                                    <button type="submit" className="submit-btn">가입하기</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>                    
            </main>

            {/* 모달창 */}
            {
                state.isModal &&
                (
                    <div id="modal">
                        <div className="wrap">
                            <div className="container">
                                <div className="message-box">
                                    <h2 className="message">{state.modalMsg}</h2>
                                </div>
                                <div className="button-box">
                                    <button 
                                        className="modal-close-btn"
                                        onClick={onClickModalClose}
                                        >확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }            
        </>
    );
};

export default SignUpComponent;

// 기본 프롭스 설정
SignUpComponent.defaultProps = {
    회원: {
        modalMsg: "",
        isModal: false, 

        아이디: "", // String
        idMsg: "",
        isId: false,
        아이디중복확인: false,  // Boolean
        isIdBtn: false,
        
        비밀번호: "",  // String
        isPw: false,
        pwMsg: "",
        비밀번호확인: "",  
        isPwOk: false,
        pwOkMsg: "",

        이름: "",  // String
        isName: false,
        nameMsg: "",

        이메일: "",  // String
        isEmail: false,
        emailMsg: "",
        이메일중복확인: false,  // Boolean
        isEmailBtn: false,
        
        휴대폰: "",  // String
        isHp: false,
        hpMsg: "",
        isHpOk: false,

        isHpBtn: false,
        isHpBtn2: false,
        isHpOkBtn: false,
        휴대폰인증번호발송: "",
        휴대폰인증번호입력: "",
        isHpNum: false,
        휴대폰인증확인: false,  // Boolean

        인증번호: 0,  // Number

        주소1: "",  // String
        주소2: "",  // String
        isAddress: false, // 클래스 on동작

        성별: "선택안함",  // String

        // 생년월일: "",  // String
        생년: "",
        생월: "",
        생일: "",
        birthMsg: "",
        isBirth: false,

        추가입력사항: "",
        친구초대추천인아이디: "",
        참여이벤트명: "",
        isAddInputBtn: false,

        isAddInput1: false,
        isAddInput2: false,

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
    }
}