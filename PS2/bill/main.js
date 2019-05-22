// Parameters for filling the table!
const GOODS = [
    {
        category: 'furniture',
        name: 'Chair',
        amount: 1,
        price: 20
    },
    {
        category: 'supplies',
        name: 'Gel Pen',
        amount: 20,
        price: 2
    },
    {
        category: 'other',
        name: 'Trash Bin',
        amount: 1,
        price: 5
    },
    {
        category: 'furniture',
        name: 'Sofa',
        amount: 1,
        price: 50
    },
    {
        category: 'supplies',
        name: 'Notebook',
        amount: 3,
        price: 3
    },
    {
        category: 'other',
        name: 'Calendar 2019',
        amount: 1,
        price: 3
    }
];

// Flags for displaying a table.
let sortByCategoryFlag = false;
let sortByNameFlag = false;
let filterType = "";

// Parameter to search by column name
let regex = new RegExp("");

// After loading the page display the table.
window.onload = () => {
    displayTable(GOODS);
};

/**
 * Display the table in accordance with the flags.
 */
let body = document.getElementsByClassName("tableBody")[0];
displayTable = () => {
    clearChild(body);
    if (sortByCategoryFlag) {
        GOODS.sort(compareCategory);
    }
    if (sortByNameFlag) {
        GOODS.sort(compareName);
    }
    let total = 0;
    for (let i = 0; i < GOODS.length; i++) {
        if ((filterType === "" || filterType === GOODS[i].category) && regex.test(GOODS[i].name)) {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${GOODS[i].category}</td><td>${GOODS[i].name}</td><td>${GOODS[i].amount}</td><td>${GOODS[i].price}$</td>`;
            body.appendChild(tr);
            total += GOODS[i].price;
        }
    }
    let result = document.getElementById("totalResult");
    result.innerText = `${total}$`;
};
// Sort button by category.
let sortByCategory = document.getElementById("sortByCategory");
/**
 * We remove the sort flag by name. Add a sorting flag by category. Display the table again.
 */
sortByCategory.addEventListener('click', () => {
    sortByNameFlag = false;
    sortByCategoryFlag = true;
    displayTable();
});

// Compare two items by category.
compareCategory = (firstCategory, secondCategory) => {
    if (firstCategory.category < secondCategory.category) {
        return -1;
    } else if (firstCategory.category > secondCategory.category) {
        return 1;
    }
    return 0;
};

// Sort button by name.
let sortByName = document.getElementById("sortByName");
/**
 * Add a sort flag by name. We remove the sorting flag by category.
 */
sortByName.addEventListener('click', () => {
    sortByCategoryFlag = false;
    sortByNameFlag = true;
    displayTable();
});

// Comparison of two names.
compareName = (firstName, secondName) => {
    if (firstName.name < secondName.name) {
        return -1;
    } else if (firstName.name > secondName.name) {
        return 1;
    }
    return 0;
};

/**
 * Remove all child elements.
 * @param chessBoardView Parent.
 */
clearChild = (chessBoardView) => {
    while (chessBoardView.firstChild) {
        chessBoardView.removeChild(chessBoardView.firstChild);
    }
};
// Filter selection field.
let select = document.getElementById("selectFilter");
/**
 * If a filter is selected, changes the filter.
 * Prints a new table.
 */
select.onchange = () => {
    let option = select.querySelectorAll('option')[select.selectedIndex];
    filterType = option.getAttribute('value');
    displayTable();
};
// A field to enter a search query.
let search = document.getElementById('search');
/**
 * Changes the search flag. Displays a table.
 */
search.addEventListener("input", () => {
    regex = new RegExp(search.value);
    displayTable();
});