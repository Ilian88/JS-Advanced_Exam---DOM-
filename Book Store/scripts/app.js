function solve() {

    const form = document.querySelector('form');
    let totalPriceHeading = document.querySelectorAll('h1')[1];
    let totalPrice = 0;


    form.querySelector('button').addEventListener('click', (ev) => addBook(ev));
    let divResults = document.getElementById('results');
    let [oldBooks, newBooks] = divResults.querySelectorAll('.selected');


    function addBook(ev) {
        ev.preventDefault();

        let [titleInput, yearInput, priceInput] = form.querySelectorAll('input');
        let title = titleInput.value;
        let year = yearInput.value;
        let price = Number(priceInput.value);
        if(year < 2000) {
            price = price -  (price*0.15);
        }

        if (title == '' || year < 0 || price < 0) {
            return;
        }

        let divToAppendNewBook = newBooks.querySelector('.shelf');
        let divToAppendOldBook = oldBooks.querySelector('.shelf');


        let divBook = e('div', {
                className: 'book'
            },
            e('p', {}, `${title} [${year}]`),
            e('button', {
                onClick: () => onBuy()
            }, `Buy it only for ${price.toFixed(2)} BGN`),
             e('button', {
                onClick: (ev) => onMoveToOld(ev)
            }, 'Move to old section'));
        if(year > 2000) {
            divToAppendNewBook.appendChild(divBook);
        } else {
            let moveToOldBtn = divBook.querySelectorAll('button')[1];
            moveToOldBtn.remove();

            divToAppendOldBook.appendChild(divBook);
        }
        

        ev.target.parentNode.reset();

        function onMoveToOld(ev) {
            let div =  ev.target.parentNode;;
            let moveToOldButton = div.querySelectorAll('button')[1];
            moveToOldButton.remove();
            let buyButton = div.querySelectorAll('button')[0];
            
            price = price -  (price*0.15);
            buyButton.textContent = `Buy it only for ${price.toFixed(2)} BGN`;
            divToAppendOldBook.appendChild(div);
        }

        function onBuy() {

            totalPrice += price
            console.log(totalPrice);
            totalPriceHeading.innerHTML = ''
            totalPriceHeading.textContent =  `Total Store Profit: ${totalPrice.toFixed(2)} BGN`;
            divBook.remove();
        }
    }



    function e(type, attributes, ...content) {
        const result = document.createElement(type);

        for (let [attr, value] of Object.entries(attributes || {})) {
            if (attr.substring(0, 2) == 'on') {
                result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attr] = value;
            }
        }

        content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

        content.forEach(e => {
            if (typeof e == 'string' || typeof e == 'number') {
                const node = document.createTextNode(e);
                result.appendChild(node);
            } else {
                result.appendChild(e);
            }
        });

        return result;
    }
}