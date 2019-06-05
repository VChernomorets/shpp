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
let sortByCategoryFlag = 0;
let sortByNameFlag = 0;
let filterType = "";

// Parameter to search by column name
let regex = new RegExp("");

// After loading the page display the table.
window.onload = () => displayTable();

/**
 * Sort according to flags.
 */
sorting = () => {
    switch (sortByCategoryFlag) {
        case 1:
            GOODS.sort(compareCategory);
            break;
        case -1:
            GOODS.sort(compareCategory);
            GOODS.reverse();
    }
    switch (sortByNameFlag) {
        case 1:
            GOODS.sort(compareName);
            break;
        case -1:
            GOODS.sort(compareName);
            GOODS.reverse();
    }
};

/**
 * Display the table in accordance with the flags.
 */
let body = document.getElementsByClassName("tableBody")[0];
displayTable = () => {
    clearChild(body);
    sorting();
    let total = 0;
    for (let i = 0; i < GOODS.length; i++) {
        if ((filterType === "" || filterType === GOODS[i].category) && regex.test(GOODS[i].name)) {
            let tr = document.createElement("tr");
            let row = GOODS[i];
            let rowResult = "";
            for (let key in row) {
                rowResult += `<td>${row[key]}</td>`;
            }
            tr.innerHTML = rowResult;
            body.appendChild(tr);
            total += GOODS[i].price * GOODS[i].amount;
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
    sortByNameFlag = 0;
    if (sortByCategoryFlag !== -1) {
        sortByCategoryFlag = -1;
    } else {
        sortByCategoryFlag = 1;
    }
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
    sortByCategoryFlag = 0;
    if (sortByNameFlag !== -1) {
        sortByNameFlag = -1;
    } else {
        sortByNameFlag = 1;
    }
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
 * @param element Parent.
 */
clearChild = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
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