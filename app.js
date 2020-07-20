'use strict'

var imageArticle = document.getElementById("images");

var rounds = 25;

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