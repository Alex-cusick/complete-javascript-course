//import { match } from "assert";

var budgetController = (function () {
    //Setup Objects
    var Expense = function (id, desc, value) {
        this.id = id;
        this.value = value;
        this.desc = desc;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, desc, value) {
        this.id = id;
        this.value = value;
        this.desc = desc;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur, i, arr) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    //Data structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    //Public:
    return {
        addItem: function (type, des, val) {
            var newItem;
            //Create new ID
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }
            
            //Check inc or exp
            if (type === 'inc') {
                newItem = new Income(id, des, val);
            } else if (type === 'exp') {
                newItem = new Expense(id, des, val);
            }

            //Push into 'data'
            data.allItems[type].push(newItem);

            //Return to request
            return newItem;
        },
        //Calculate stuff
        calculateBudget: function () {
            calculateTotal('exp');
            calculateTotal('inc');          
            data.budget = (data.totals.inc - data.totals.exp);
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            };
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        calculatePercentages: function () {
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            })
        },

        getPercentages: function () {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            })
            return allPerc
        },

        deleteItem: function (type, ID) {
            var ids, index;

            //Get list of current IDs
            ids = data.allItems[type].map(function (cur) {
                return cur.id;
            });
            //Return position of target
            index = ids.indexOf(ID)

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            };
        },

        testing: function () {
            console.log(data);
        }
    };

})();

var UIController = (function () {

    //DOM Reference 
    var DOMstrings = {
        inputType: '.add__type',
        inputValue: '.add__value',
        inputDescription: '.add__description',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        expensesPercentage: '.budget__expenses--percentage',
        deleteBtn: '.ion-ios-checkmark-outline',
        container: '.container',
        expenseLinePercentage: '.item__percentage',
        titleMonth: '.budget__title--month'
    };

    let now = new Date();
    console.log(now.toLocaleString('default', { month: 'long' }));

    var formatNumber = function (num, type) {
        var numSplit, int, dec;
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        if (int.length > 3) {
            int = (int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3));
        }
        dec = numSplit[1];
        return (type === 'exp' ? "-" : "+") + ' ' + int + '.' + dec;
    }

    //Public:
    return {
        //Read what user has input
        getInput: function () {
            type = document.querySelector(DOMstrings.inputType).value; //+ gives 'inc', - gives 'exp'
            descr = document.querySelector(DOMstrings.inputDescription).value;
            value = parseFloat(document.querySelector(DOMstrings.inputValue).value);

            //Flip value and type if negative
            if (value < 0) {
                value *= (-1);
                type = (type === "exp" ? "inc" : "exp");
            }

            return {type, descr, value};
        },

        //Add elements to HTML from input
        addListItem: function (obj,type) {
            var HTML, newHTML, element;
            //Create HTML string with placeholder text
            if (type === "inc") {
                element = DOMstrings.incomeContainer;
                HTML = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "exp") {
                element = DOMstrings.expensesContainer;
                HTML = '<div class="item clearfix" id="exp-%id%"><div class="item__description" >%description%</div ><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            };
            //Replace
            newHTML = HTML.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.desc);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
            //Insert into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        deleteListItem: function (selectorID) {
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },

        //Clear inputs
        clearFields: function () {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function (current, i, array) {
                current.value = "";
            });
            document.querySelector(DOMstrings.inputDescription).focus();
            //fieldsArray[0].focus();
        },

        displayBudget: function (obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, obj.budget > 0 ? 'inc' : 'exp');
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.expensesPercentage).textContent = (obj.percentage + '%');
            } else {
                document.querySelector(DOMstrings.expensesPercentage).textContent = '---';
            }
        },

        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(DOMstrings.expenseLinePercentage);

            var nodeListForEach = function (list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, function (cur, i) {
                if (percentages[i] > 0) {
                    cur.textContent = percentages[i] + '%';
                } else {
                    cur.textContent = '---';
                }
            });
        },

        displayDate: function () {
            console.log('dateInit')
            var now, year;
            now = new Date();
            year = now.getFullYear();
            month = now.toLocaleString('default', { month: 'long' });
            document.querySelector(DOMstrings.titleMonth).textContent = month + " " + year
        },

        //Allow other modules to use DOMstrings Reference
        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();

var mainController = (function (budgetCtrl, UICtrl) {
    //Setup Listeners
    var setupEventListeners = function () {
        var DOM = UIController.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    };

    //Calculate
    var updateBudget = function () {
        budgetCtrl.calculateBudget();
        var budget = budgetCtrl.getBudget();
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function () {
        budgetCtrl.calculatePercentages();
        var percentages = budgetCtrl.getPercentages();
        console.log(percentages);
        UICtrl.displayPercentages(percentages);
    };

    //When user adds input
    var ctrlAddItem = function () {
        var input, newItem;
        //Get field data
        var input = UIController.getInput();
        //Validation
        if (input.descr !== "" && !isNaN(input.value) && input.value > 0 || input.value < 0) {
            //console.log(input);
            //Add to budgetController
            var newItem = budgetCtrl.addItem(input.type, input.descr, input.value);
            //Add to UI
            UICtrl.addListItem(newItem, input.type);
            UIController.clearFields();
            //Calculate budget & display
            updateBudget();
            //Do a Percent
            updatePercentages();
        }
    };

    //Delete Item method
    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //Delete from 'data'
            budgetCtrl.deleteItem(type, ID);

            //Delete from UI
            UICtrl.deleteListItem(itemID);

            //Show new budget
            updateBudget();

            //Percentagest
            updatePercentages();
        }
    };

    //Public:
    return {
        init: function () {
            console.log('Application has started!');
            setupEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
            UICtrl.displayDate();
        }
    };

})(budgetController, UIController);

mainController.init();
