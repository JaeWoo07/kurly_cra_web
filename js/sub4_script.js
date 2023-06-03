(($)=>{

    const obj = {
        init(){
            this.spProduct();
        },
        spProduct(){
            $.ajax({
                url: './data/sp_product.json',
                dataType: 'JSON',
                success:(result)=>{
                    let txt = '';

                    result.특가혜택.map((item, idx)=>{
                        txt += `<li>`;
                        txt += `    <a href="#">`;
                        txt += `        <img src="./img/sub4/${item.제품이미지}" alt="">`;
                        txt += `    </a>`;
                        txt += `</li>`;
                    });

                    $('.sp-product').append(txt);
                },
                error:(error)=>{

                }
            });
        }
    };

    obj.init();

})(jQuery);