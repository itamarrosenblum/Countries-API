/**
* Purpose: Main JS File
* Author: Itamar Rosenblum
* Date: 09-02-2021
* Last modified: none
*/

// Main function
(function searchCountry() {
    // Get element
    const form = document.querySelector('form');
    const inputText = document.querySelector('#input-text');
    const btnSearch = document.querySelector('#btn-search');
    const btnAllCty = document.querySelector('#btn-all-cty');
    const tbody = document.querySelector('tbody');

    // Fetch all countries
    btnAllCty.addEventListener('click', async e => {
        // Reset placeholder
        inputText.placeholder = 'Search By Name';

        // Clear tbody
        tbody.innerHTML = '';

        // Create element
        const tr = document.createElement('tr');
        tbody.append(tr);

        try {
            const res = await fetch('https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag;borders');
            const data = await res.json();
            
            for (let i = 0; i < data.length; i++) {
                tr.insertAdjacentHTML('beforebegin', 
                `<tr>
                    <td>${data[i].name}</td>
                    <td><img src="${data[i].flag}" alt="${data[i].name} Flag"></td>
                    <td>${data[i].topLevelDomain}</td>
                    <td>${data[i].capital}</td>
                    <td>${data[i].currencies[0].name}: ${data[i].currencies[0].code}&sol;${data[i].currencies[0].symbol}</td>
                    <td>${data[i].borders}</td>
                </tr>`);
            }
        } catch(err) {
            console.error(err);
        }
    });

    // Fetch countries by name
    btnSearch.addEventListener('click', async e => {
        if (inputText.value !== '') {
            // Reset placeholder
            inputText.placeholder = 'Search By Name';

            // Clear tbody
            tbody.innerHTML = '';

            // Create element
            const tr = document.createElement('tr');
            tbody.append(tr);

            try {
                const res = await fetch(`https://restcountries.eu/rest/v2/name/${inputText.value}?fields=name;topLevelDomain;capital;currencies;flag;borders`);
                const data = await res.json();
            
                for (let i = 0; i < data.length; i++) {
                    tr.insertAdjacentHTML('beforebegin', 
                    `<tr>
                        <td>${data[i].name}</td>
                        <td><img src="${data[i].flag}" alt="${data[i].name} Flag"></td>
                        <td>${data[i].topLevelDomain}</td>
                        <td>${data[i].capital}</td>
                        <td>${data[i].currencies[0].name}: ${data[i].currencies[0].code}&sol;${data[i].currencies[0].symbol}</td>
                        <td>${data[i].borders}</td>
                    </tr>`);
                }
            } catch(err) {
                console.error(err);
            }

            // Reset input value
            inputText.value = '';
        } else {
            // Alert the user if the input is empty
            inputText.placeholder = '⚠️ Enter a name';
        }
    });

    // Prevent default behavior on submit
    form.addEventListener('submit', e => {
        e.preventDefault();
    });
})();