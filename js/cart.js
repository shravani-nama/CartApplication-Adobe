var cart,output,cartItems,discount_price,total_price,item_price;
cart = JSON.parse(localStorage.getItem('cart'));
output = '';
cartItems = document.getElementById('cartItems');
discount_price=document.getElementById('DPrice');
total_price=document.getElementById('TPrice');
item_price=document.getElementById('IPrice');
cart.map((item,i) => {
    output +=
        `<div class="row items">
            <img src=${item.url}
                class="cardImg col-lg-2 col-xs-4"
                alt=${item.productName}>
            <span class="col-lg-10 col-xs-8 itemContent" >
            <span class="col-lg-3" style="padding:0">
                <h5 class="cardTitle">${item.productName}</h5>
                <span class="cardSp"> &#8377;${item.sellingPrice}</span> 
                <span class="cardAp">${item.actualPrice}</span>
                <span class="cardDp">${item.discountprice} %off</span>
                </span>
                
                <span class="input-group col-lg-3 col-lg-offset-1">
                    <button type="button" onclick="decrease(${item.id})">-</button>
                    <span class="inputField">
                    <input type="text" id="text" value=${item.quantity}>
                    </span>
                    <button type="button" onclick="increase(${item.id})">+</button>
                </span>
                <span class="col-lg-2 col-lg-offset-1 removeGrp">
                    <a id="removeBtn" onclick="removeItem(${item.id})">REMOVE</a>
                </span>
                
            </span>
        </div>`;
});
cartItems.innerHTML = output;
function increase(id) {
    debugger;
    var textBox= document.getElementById("text");
    textBox.value++;
    textBox.innerHTML=textBox.value;
    console.log(textBox.value)
    cart.map(c=>{
        if(id===c.id){
            c.quantity=parseInt(textBox.value);
        }
    });
    localStorage.setItem('cart',JSON.stringify(cart));
    onCalculation()
}    
function decrease(id) {
    debugger;
    var textBox = document.getElementById("text");
    textBox.value--;
    textBox.innerHTML=textBox.value;
    cart.map(c=>{
        if(id===c.id){
            c.quantity=parseInt(textBox.value);
        }
    });
    localStorage.setItem('cart',JSON.stringify(cart));
    onCalculation()
}

function onCalculation(){
    console.log(cart);
    document.getElementById('itemsNumbers').innerHTML=`<span>(${cart.length} Item)</span>`;
    var individualPrice,discountPrice;
    individualPrice=0;
    discountPrice=0;
    cart.map(c=>{
        individualPrice+=c.sellingPrice*c.quantity;
        discountPrice+=(c.actualPrice-c.sellingPrice)*c.quantity;
    });
    // console.log(discountPrice,individualPrice)
    discount_price.innerHTML=discountPrice;
    item_price.innerHTML=individualPrice;
    total_price.innerHTML=individualPrice-discountPrice
}
onCalculation();
function removeItem(id){
    console.log(id);
    cart.map(c=>{
        if(id===c.id){
            localStorage.removeItem(id);
        }
    });
    onCalculation();
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