'use strict'

var imageArticle = document.getElementById("images");

var rounds = 25;

var products = [];

var productsNames = [];
var prodcutsClicks = [];

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

new Image("Product 1", "img/bag.jpg")
new Image("Product 2", "img/banana.jpg")
new Image("Product 3", "img/bathroom.jpg")
new Image("Product 4", "img/boots.jpg")
new Image("Product 5", "img/breakfast.jpg")
new Image("Product 6", "img/bubblegum.jpg")
new Image("Product 7", "img/chair.jpg")
new Image("Product 8", "img/cthulhu.jpg")
new Image("Product 9", "img/dog-duck.jpg")
new Image("Product 10", "img/dragon.jpg")
new Image("Product 11", "img/pen.jpg")
new Image("Product 12", "img/pet-sweep.jpg")
new Image("Product 13", "img/scissors.jpg")
new Image("Product 14", "img/shark.jpg")
new Image("Product 15", "img/sweep.png")
new Image("Product 16", "img/tauntaun.jpg")
new Image("Product 17", "img/unicorn.jpg")
new Image("Product 18", "img/usb.gif")
new Image("Product 19", "img/water-can.jpg")
new Image("Product 20", "img/wine-glass.jpg")


console.log(products);
function generateRandomnumber() {
    return Math.floor(Math.random() * products.length);
};


imageArticle.addEventListener('click', clickHandler);

function generateRandomPictures() {
    leftImageIndex = generateRandomnumber();
    middleImageIndex = generateRandomnumber();
    rightImageIndex = generateRandomnumber();

    while (products[leftImageIndex].previous == true ) {
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

    if ( previousLeftIndex != undefined) {

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

function storeProducts(){
    var jsonStringProducts = JSON.stringify(products);

    localStorage.setItem('products',jsonStringProducts);
}


console.log('before parse and update');
console.table(products);
parseLocalStorage();
console.log('after updating');
console.table(products);


function parseLocalStorage(){
    var previousProductsArray = JSON.parse(localStorage.getItem('products'));

    update(previousProductsArray);
}

function update(previousProductsArray){
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
            item.innerHTML = products[index].name + " has been shown " + products[index].timesShown +
                " times, and clicked " + products[index].timesClicked + " times."
            resultsSection.append(item);
        };
        rendered = true;
    };
};

function populateClick(){
    for (let index = 0; index < products.length; index++) {
        prodcutsClicks.push(products[index].timesClicked);
    };
};


function generateChart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productsNames,
        datasets: [{
          label: '# of Clicks',
          data: prodcutsClicks,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
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