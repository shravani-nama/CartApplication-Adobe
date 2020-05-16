//variable initialisation
const httpProducts= new Product;
var dataDeck,res,output,sortHTL,sortLTH,sortD,price_max,price_min,cart;


dataDeck=document.querySelector('.card-deck');
res='';
output='';
//Declaring event listeners
sortHTL=document.getElementById('sortHTL');
sortLTH=document.getElementById('sortLTH')
sortD=document.getElementById('sortD');

cart=[];


(function init(){
    httpProducts.get('js/products.json')
    .then(responses=>{
        res=responses;
        dataFilter(responses,true);
        dataDeck.innerHTML=output;
    });
}());


function onLTH(){
    sortLTH.classList.add('active');
    sortHTL.classList.remove('active');
    sortD.classList.remove('active');
    //console.log(res);
    var onSortLTH = res.slice(0);
    onSortLTH.sort(function(a,b) {
        return a.sellingPrice - b.sellingPrice;
    });
    output='';
    dataFilter(onSortLTH,true);
    dataDeck.innerHTML=output;
}
function onDiscount(){
    sortD.classList.add('active');
    sortHTL.classList.remove('active');
    sortLTH.classList.remove('active');
    //console.log(res);
    var onSortLTH = res.slice(0);
    output='';
    var result = onSortLTH.map(function(res) {
        var o = Object.assign({}, res);
        o.discountprice = (((1-(res.sellingPrice/res.actualPrice))*100)).toFixed(2);
        //console.log(o.discountprice)
        return o;
    })
    //console.log(result);
    result.sort(function(a,b) {
        return a.discountprice - b.discountprice;
    });
    dataFilter(result,false);
    dataDeck.innerHTML=output;
}
function onHTL(){
    sortHTL.classList.add('active');
    sortLTH.classList.remove('active');
    sortD.classList.remove('active');
    //console.log(res);
    var onSortLTH = res.slice(0);
    onSortLTH.sort(function(a,b) {
        return a.sellingPrice - b.sellingPrice;
    });
    output='';
    dataFilter(onSortLTH,false);
    dataDeck.innerHTML=output;
}

function dataFilter(arrResponse,sorting){
    var result = arrResponse.map(function(res) {
        var o = Object.assign({}, res);
        o.discountprice = (((1-(res.sellingPrice/res.actualPrice))*100)).toFixed(2);
        //console.log(o.discountprice)
        return o;
    });
    if(sorting){
        result.map((res,i)=>{
            output+=
            `<div class="card col-lg-2 col-xs-6">
                <img src=${res.url}
                    class="card-img-top"
                    alt=${res.productName}>
                <div class="card-body">
                    <h5 class="card-title">${res.productName}</h5>
                    <span class="card_sp"> &#8377;${res.sellingPrice}</span> 
                    <span class="card_ap">${res.actualPrice}</span>
                    <span class="card_dp">${parseFloat(res.discountprice)}% off</span>
                    <button class="btn btn-primary addToCartBtn" onclick="onaddingtocart(${res.id})">Add to Cart</button>
                </div>
            </div>`;
        });
    }
    else{
        result.reverse().map((res,i)=>{
            output+=
            `<div class="card col-lg-2 col-xs-6">
                <img src=${res.url}
                    class="card-img-top"
                    alt=${res.productName}>
                <div class="card-body">
                    <h5 class="card-title">${res.productName}</h5>
                    <span class="card_sp"> &#8377;${res.sellingPrice}</span> 
                    <span class="card_ap">${res.actualPrice}</span>
                    <span class="card_dp">${parseFloat(res.discountprice)}% off</span>
                    <button class="btn btn-primary addToCartBtn" onclick="onaddingtocart(${res.id})">Add to Cart</button>
                </div>
            </div>`;
        });
    }
}

//filtering by range
function onApply(){
    //variables for filtering by range
    price_max=document.getElementById('price-max').value;
    price_min=document.getElementById('price-min').value;
    
    output='';
    var onSortLTH = res.slice(0);
    var newList=[];
    onSortLTH.map((res,i)=>{
        if(res.sellingPrice<=price_max && res.sellingPrice>=price_min){
            newList.push(res);
        }
    });
    dataFilter(newList,true);
    dataDeck.innerHTML=output;
}


function showSearchBar(){
    document.getElementById('searchbar').classList.toggle('hide');
}
function searchItems() { 
    let input = document.getElementById('searchbar').value;
    input=input.toLowerCase(); 
    let x = document.getElementsByClassName('card'); 
    
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="list-item";                  
        } 
    }
    
} 

function onaddingtocart(id){
    var response=res.slice(0);
    var result = response.map(function(res) {
        var o = Object.assign({}, res);
        o.discountprice = (((1-(res.sellingPrice/res.actualPrice))*100)).toFixed(2);
        o.quantity=1;
        //console.log(o.discountprice)
        return o;
    });
        result.map(r=>{
            if(r.id === id){
            cart.push(r);
        }
    });
    if(cart.length>0){
        document.querySelector('.cart_quantity').innerHTML=cart.length;
        document.querySelector('.cart_quantity').style.display='block';
    }
    localStorage.setItem('cart',JSON.stringify(cart))
}


