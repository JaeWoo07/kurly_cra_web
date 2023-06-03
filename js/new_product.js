(($)=>{

    const obj = {
        init(){
            this.newProduct();
            this.category();
        },
        newProduct(){
            let txt = '';

            $.ajax({
                url: './data/product.json',
                dataType: 'JSON',
                success: (result)=>{

                    function commaFormat(z){
                        let str = z.toString();
                        const regExp = /(^\d+)(\d{3})/;

                        while(regExp.test(str)){
                            str = str.replace(regExp, '$1,$2');
                        }

                        return str;
                    };

                    result.신상품.map((item, idx)=>{
                        txt += `<li data-key= "list-${idx + 1}">`;
                        txt += `    <div class="col-gap">`;
                        txt += `        <a href="#">`;
                        txt += `            <div class="img-box">`;
                        txt += `                <img src="./img/sub1/${item.상품이미지}" alt="">`;
                        txt += `                <span><img src="./img/sub1/${item.카트아이콘}" alt=""></span>`;
                        txt += `            </div>`;
                        txt += `            <div class="txt-box">`;
                        txt += `                <h2>${item.배송}</h2>`;
                        txt += `                <h2>[${item.제조사}] ${item.상품명}</h2>`;
                        txt += `                <h5>${item.상품정보}</h5>`;
                        txt += `                <h3>
                                                ${item.할인율 > 0 ? `<strong>${Math.round(item.할인율 * 100)}%</strong>` : ``}
                                                <em>${commaFormat(Math.round(item.정가 * (1 - item.할인율)))}원</em>
                                                </h3>`;
                        txt += `                ${item.할인율 > 0 ? `<h4><s>${commaFormat(item.정가)}원</s></h4>` : ``}`;
                        txt += `                ${item.후기 !== "" ? `<h5><span class= "sub1-review">후기 ${item.후기}</span></h5>` : ``}`;
                        txt += `                ${item.판매처 !== "" ? `<h4 class= "sub1-kurlyonly">${item.판매처}</h4>` : ``}`;
                        txt += `            </div>`;
                        txt += `        </a>`;
                        txt += `    </div>`;
                        txt += `</li>`;
                    });
                    
                    $('.new-product').append(txt);
                },
                error: (error)=>{

                }
            });
        },
        category(){
            // 카테고리 메뉴 버튼 클릭 이벤트
            const $categoryBtn = $('#section2 .category-btn');
            
            // 토글버튼 슬라이드
            $categoryBtn.on({
                click: function(e){
                    e.preventDefault();
                    $(this).next().stop().slideToggle(200); // slideUp과 slideDown

                    $(this).find('svg').stop().toggleClass('on');
                }
            });

            // 모달1 닫기 버튼 클릭 이벤트
            const $modal1CloseBtn = $('.modal1-close-btn');
            $modal1CloseBtn.on({
                click: function(e){
                    e.preventDefault();
                    $('.sub1-modal1').removeClass('on');
                }
            });

            // 모달1 닫기 버튼 클릭 이벤트
            const $categoryMoreViewBtn = $('.category-more-view-btn');
            $categoryMoreViewBtn.on({
                click: function(e){
                    e.preventDefault();
                    $('.sub1-modal1').addClass('on');
                }
            });

             // 모달2 닫기 버튼 클릭 이벤트
             const $modal2CloseBtn = $('.modal2-close-btn');
             $modal2CloseBtn.on({
                 click: function(e){
                     e.preventDefault();
                     $('.sub1-modal2').removeClass('on');
                 }
             });
 
             // 모달2 닫기 버튼 클릭 이벤트
             const $brandMoreViewBtn = $('.brand-more-view-btn');
             $brandMoreViewBtn.on({
                 click: function(e){
                     e.preventDefault();
                     $('.sub1-modal2').addClass('on');
                 }
             });
        }
    };

    obj.init();

})(jQuery);