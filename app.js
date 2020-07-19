'use strict'

var imageArticle = document.getElementById("images");

var rounds = 5;

var products = [];

var totalClick = 0;

var leftImageIndex;
var middleImageIndex;
var rightImageIndex;


function Image(name, path) {
    this.name = name;
    this.path = path;
    products.push(this);

    this.timesShown = 0;
    this.timesClicked = 0;
}

var one = new Image("Product 1", "img/bag.jpg")
var two = new Image("Product 2", "img/banana.jpg")
var three = new Image("Product 3", "img/chair.jpg")
var four = new Image("Product 4", "img/dragon.jpg")
var five = new Image("Product 4", "img/pen.jpg")

console.log(products);
function generateRandomnumber() {
    return Math.floor(Math.random() * products.length);
};


imageArticle.addEventListener('click', clickHandler);

generateRandomPictures()

function generateRandomPictures() {
    leftImageIndex = generateRandomnumber();
    middleImageIndex = generateRandomnumber();
    rightImageIndex = generateRandomnumber();

    while (leftImageIndex == middleImageIndex || leftImageIndex == rightImageIndex || rightImageIndex == middleImageIndex) {
        leftImageIndex = generateRandomnumber();
        while (rightImageIndex == middleImageIndex) {
            middleImageIndex = generateRandomnumber();
        };
    };

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

};


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