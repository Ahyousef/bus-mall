'use strict'

var imageArticle = document.getElementById("images");

var rounds = 25;

var products = [];

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

var productsNames = [];
var prodcutsClicks = [];
var productsShown = [];


var totalClick = 0;

var leftImageIndex;
var middleImageIndex;
var rightImageIndex;

var previousLeftIndex;
var previousmiddleIndex;
var previousrightIndex;



function Image(name, path) {
    this.name = name;
    this.path = path;
    products.push(this);

    this.timesShown = 0;
    this.timesClicked = 0;
    this.previous = false;
    productsNames.push(this.name);
}

new Image("bag", "img/bag.jpg")
new Image("banana", "img/banana.jpg")
new Image("bathroom", "img/bathroom.jpg")
new Image("boots", "img/boots.jpg")
new Image("breakfast", "img/breakfast.jpg")
new Image("bubblegum", "img/bubblegum.jpg")
new Image("chair", "img/chair.jpg")
new Image("cthulhu", "img/cthulhu.jpg")
new Image("dog-duck", "img/dog-duck.jpg")
new Image("dragon", "img/dragon.jpg")
new Image("pen", "img/pen.jpg")
new Image("pet-sweep", "img/pet-sweep.jpg")
new Image("scissors", "img/scissors.jpg")
new Image("shark", "img/shark.jpg")
new Image("sweep", "img/sweep.png")
new Image("tauntaun", "img/tauntaun.jpg")
new Image("unicorn", "img/unicorn.jpg")
new Image("usb", "img/usb.gif")
new Image("water-can", "img/water-can.jpg")
new Image("wineglass", "img/wine-glass.jpg")


console.log(products);
function generateRandomnumber() {
    return Math.floor(Math.random() * products.length);
};


imageArticle.addEventListener('click', clickHandler);

function generateRandomPictures() {
    leftImageIndex = generateRandomnumber();
    middleImageIndex = generateRandomnumber();
    rightImageIndex = generateRandomnumber();

    while (products[leftImageIndex].previous == true) {
        leftImageIndex = generateRandomnumber();
    };
    while (products[middleImageIndex].previous == true || leftImageIndex == middleImageIndex) {
        middleImageIndex = generateRandomnumber();
    };
    while (products[rightImageIndex].previous == true || leftImageIndex == rightImageIndex || rightImageIndex == middleImageIndex) {
        rightImageIndex = generateRandomnumber();
    };
    /*while (leftImageIndex == middleImageIndex || leftImageIndex == rightImageIndex || rightImageIndex == middleImageIndex) {
        leftImageIndex = generateRandomnumber();
        while (rightImageIndex == middleImageIndex) {
            middleImageIndex = generateRandomnumber();
        };
    };*/

    var leftImage = document.getElementById("left")
    var middleImage = document.getElementById("middle")
    var rightImage = document.getElementById("right")

    var leftImagePath = products[leftImageIndex].path;
    var middleImagePath = products[middleImageIndex].path;
    var rightImagePath = products[rightImageIndex].path;

    leftImage.setAttribute("src", leftImagePath);
    middleImage.setAttribute("src", middleImagePath);
    rightImage.setAttribute("src", rightImagePath);


    products[leftImageIndex].timesShown += 1;
    products[middleImageIndex].timesShown += 1;
    products[rightImageIndex].timesShown += 1;

    if (previousLeftIndex != undefined) {

        products[previousLeftIndex].previous = false;
        products[previousmiddleIndex].previous = false;
        products[previousrightIndex].previous = false;
    };

    products[leftImageIndex].previous = true;
    products[middleImageIndex].previous = true;
    products[rightImageIndex].previous = true;

    previousLeftIndex = leftImageIndex;
    previousmiddleIndex = middleImageIndex;
    previousrightIndex = rightImageIndex;



};

generateRandomPictures()


function clickHandler() {
    if (totalClick < rounds) {
        var clickedElement = event.target;
        var clickedElementID = clickedElement.id;

        if (clickedElementID == "left" || clickedElementID == "middle" || clickedElementID == "right") {
            totalClick += 1;
            console.log(totalClick);
            console.log(products);
            generateRandomPictures();
            if (clickedElementID == "left") {
                products[leftImageIndex].timesClicked += 1;
            };
            if (clickedElementID == "middle") {
                products[middleImageIndex].timesClicked += 1;
            };
            if (clickedElementID == "right") {
                products[rightImageIndex].timesClicked += 1;
            };
        }
    }
    else {
        removeEventListener('click', clickHandler);
        renderUserMessage();
        storeProducts();
        populateClick();
        generateChart()
        console.table(products);
        console.table(localStorage);
    }
}

function storeProducts() {
    var jsonStringProducts = JSON.stringify(products);

    localStorage.setItem('products', jsonStringProducts);
}


console.log('before parse and update');
console.table(products);
parseLocalStorage();
console.log('after updating');
console.table(products);


function parseLocalStorage() {
    var previousProductsArray = JSON.parse(localStorage.getItem('products'));

    update(previousProductsArray);
}

function update(previousProductsArray) {
    for (let index = 0; index < products.length; index++) {
        products[index].timesShown = previousProductsArray[index].timesShown;
        products[index].timesClicked = previousProductsArray[index].timesClicked;

    }
}


var rendered = false;
function renderUserMessage() {
    if (rendered == false) {
        for (let index = 0; index < products.length; index++) {
            var resultsSection = document.getElementById("results");
            var item = document.createElement("li");
            item.innerHTML = products[index].name + "shown " + products[index].timesShown +
                " times | clicked " + products[index].timesClicked + " times."
            resultsSection.append(item);
        };
        rendered = true;
    };
};

function populateClick() {
    for (let index = 0; index < products.length; index++) {
        prodcutsClicks.push(products[index].timesClicked);
        productsShown.push(products[index].timesShown);
    };
};


function generateChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsNames,
            datasets: [{
                label: '# of Clicks',
                data: prodcutsClicks,
                backgroundColor: colorArray,
                borderColor: colorArray,
                borderWidth: 1,
            },
        {
                label: '# of Shown',
                data: productsShown,
                backgroundColor: colorArray,
                borderColor: colorArray,
                borderWidth: 1,
            }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}