class Product {

    constructor(){
        this.id = 1;
        this.arrayProducts = []
    }
    
    save(){
        let product = this.readData()

        if(this.validateFields(product)){
            this.add(product)
        }

        console.log(this.arrayProducts)
    }

    add(product){
        clean();

        if (this.arrayProducts.length >= 0){
            document.querySelector('.checkoutButton').style.display = 'block'
        }

        if(this.id > 10){
            alert("Só é possível adicionar 10 produtos por carrinho")
        } else {
            this.arrayProducts.push(product);
            this.id++;
        }

    }

    readData(){
        let product = {}
        product.id = this.id;
        product.name = document.getElementById('product').value;
        product.price = document.getElementById('value').value;

        return product;
    }

    validateFields(product){
        var msg = '';

        if (product.name == ""){
            msg += 'Informe o nome do produto \n'
        }

        if(product.price == ''){
            msg += 'Informe o preço do produto \n'
        }
        
        if (msg != ''){
            alert(msg);
            return false
        }

        return true;
    }

    listData(){
        
        let list = document.getElementById('list');
    
        for(var i = 0; i < this.arrayProducts.length; i++){
            var item = document.createElement('li');
            item.appendChild(document.createTextNode(this.arrayProducts[i].name));
            list.appendChild(item);
        }
    }


    checkout(){
    
        document.querySelector('#welcome').innerHTML = "Finalizar compra"
        document.querySelector('#cart').style.display = 'none'
        document.querySelector('#inputs').style.display = 'none'
        document.querySelector('#checkout').style.display = 'block'

        let noteList = document.getElementById('amountToPay');
        var sumn = 0;

        for(var i = 0; i < this.arrayProducts.length; i++) {
            sumn += parseFloat(this.arrayProducts[i].price);
        }

        var total = document.querySelector("#toPay")
        total.innerText += (sumn).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        this.listData();

        var rest = Number(sumn);

        const amount = rest;
        const availableNotes = [100, 50, 20, 10, 5, 2, 1]

        function amountOfNotes (price, note){
            const amount =  Math.floor(price / note)
            return amount
        }

        function quantityPerNotes (price, note) {
            const noteList = note.map( note => {
                const amount =  amountOfNotes(price, note)
                price = price - (amount * note)
                return {note, amount}
            })

            return noteList
        }

        function showRequiredNotes (price, notes) {
            const requiredNotes = quantityPerNotes(price, notes)


            requiredNotes.forEach( ({amount, note}) => {

                if(amount > 0){
                    var item = document.createElement('ul')
                    item.appendChild(document.createTextNode(`${amount} nota(s) de R$ ${note},00`))
                    noteList.appendChild(item);
                }
            })
        }

        showRequiredNotes(amount, availableNotes)
    }  

    listNotes(){

        document.querySelector('#items').style.display = 'none'
        document.querySelector('#moneyNotes').style.display = 'block'
        
    }
}

var product = new Product();

function clean(){
    document.getElementById('product').value = "";
    document.getElementById('value').value = "";
}

var button = document.getElementById('mode_icon');
const form = document.getElementById('register');


button.addEventListener('click', mode);

function mode(){
    if(button.classList.contains('fa-moon')){
        
        button.classList.remove('fa-moon')
        button.classList.add('fa-sun')
        
        form.classList.add('dark')
        return;
        
    }
    button.classList.add('fa-moon')
    button.classList.remove('fa-sun')
    form.classList.remove('dark')
}


