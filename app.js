window.addEventListener('load', function loadFull() {
    'use strict';

    var field = document.querySelector('.field');
    var start = document.querySelector('.start');
    var heading = document.querySelector('h1');

    doRequest();
    $('.start').click(doRequest);

    function doRequest() { //get data and create a playing field
        $.ajax({
            type: "GET",
            url: "https://kde.link/test/get_field_size.php",
            dataType: "json",
            success: function (data) {
                cleanField();
                createField(data.width, data.height);
                getImgArr(data.width, data.height);
                hoverCell();
            }
        });

        heading.innerHTML = 'Find 2 identical pictures';
    }

    function createField(width, height) { // create a playing field
        var rows = [];
        var cells = [];
        var i;
        var j;
        for (i = 0; i < width; i++) {
            rows[i] = document.createElement('div');
            rows[i].classList.add('row');
            field.appendChild(rows[i]);
            for (j = 0; j < height; j++) {
                cells[j] = document.createElement('div');
                cells[j].classList.add('cell');
                cells[j].index = i + ',' + j; //cell coordinates
                rows[i].appendChild(cells[j]);
            }
        }
    }

    function cleanField() { //clearing the playing field
        var rows = document.querySelectorAll('.row');
        var i;
        if (rows.length !== 0) {
            for (i = rows.length - 1; i >= 0; i--) {
                rows[i].remove();
            }
        }
    }

    function getImgArr(width, height) { //get an array of pictures
        var images = [];
        var cells = document.querySelectorAll('.cell');
        var i;
        var j;
        var l;
        for (i = 0; i < (width * height) / 2; i++) {
            if (i < 10) {
                images[i] = 'https://kde.link/test/' + i + '.png';
            }
            if (i >= 10 && i < 20) {
                images[i] = 'https://kde.link/test/' + (i - 10) + '.png';
            }
            if (i >= 20 && i < 30) {
                images[i] = 'https://kde.link/test/' + (i - 20) + '.png';
            }
            if (i >= 30 && i < 40) {
                images[i] = 'https://kde.link/test/' + (i - 30) + '.png';
            }
        }

        var images2 = images.concat(images); //duplicate pictures in the array to ensure get pairs

        images2.sort(function() { //mix an array with pictures
            return Math.random() - 0.5
        });

        for (j = 0; j < cells.length; j++) { // fill the pictures
            cells[j].style.backgroundImage = 'url' +'(' + images2[j] + ')';
        }
    }

    function hoverCell() { // hide pictures
        var i;
        var cells = document.querySelectorAll('.cell');
        for (i = 0; i < cells.length; i++) {
            cells[i].classList.add('hover-cell');
        }
    }

    function classActive(e) { // add a class to an open picture
        if (e.target.index && !e.target.classList.contains('active-always')) {
            e.target.classList.remove('hover-cell');
            e.target.classList.add('active');
        }
    }

    function classActiveAlways(arr) { // add a class if the pictures match
        var i;
        for (i = 0; i < arr.length; i++) {
            arr[i].classList.remove('active');
            arr[i].classList.add('active-always');
        }
    }

    function classHover(arr) { //if the pictures did not match
        var i;
        for (i = 0; i < arr.length; i++) {
            arr[i].classList.remove('active');
            arr[i].classList.add('hover-cell');
        }
    }

    function getWin() {
        var win = document.querySelectorAll('.active-always');
        var size = document.querySelectorAll('.cell');

        if (win.length == size.length) {
            heading.innerHTML = 'Win !!!';
        }
    }

    field.addEventListener('click', function openImages(e) { //open pictures
        var active = [];
        var i;
        var itemStile1;
        var itemStile2;

        classActive(e);

        active = document.querySelectorAll('.active'); // open image array
        if (active.length == 2) {

            itemStile1 = active[0].getAttribute('style');
            itemStile2 = active[1].getAttribute('style');

            if (itemStile1 == itemStile2) { // check if the pictures are the same
                classActiveAlways(active);
            } else {
                setTimeout(classHover, 500, active);
            }

            getWin();
        }


    });

});
