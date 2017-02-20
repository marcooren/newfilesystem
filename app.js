"use strict";
$(document).ready(function() {

    init();

    $('.views').on("contextmenu", function(event) {
        // Avoid the real one
        event.preventDefault();
        // Show contextmenu
        console.log(event);

        //  console.log($(this));
        $(".custom-menu").finish().toggle(100).
            // In the right position (the mouse)
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
    });

    // If the document is clicked somewhere
    $(document).on("mousedown", function(e) {
        // If the clicked element is not the menu
        //   console.log($(this));
        if (!$(e.target).parents(".custom-menu").length > 0) {
            // Hide it
            $(".custom-menu").hide(100);
        }
    });
    // If the menu element is clicked
    $(".custom-menu li").click(function() {
        // This is the triggered action name
        // console.log(this);
        switch ($(this).attr("data-action")) {

            // A case for each action. Your actions here
            case "1":
                //     console.log(this);
                var foldername = prompt("Enter folder name to create", "newfolder");
                exists = 0;
                file_or_folder_exists(currentFolder, foldername, fsStorage);
                if (exists) {
                    alert("there is already a file or folder in current dir with that name");
                    break;
                }
                if (foldername !== null && foldername !== '') {
                    createFileIn(currentFolder, fsStorage, foldername, '', 1);
                    buildFlatArray();
                    drawLeft();
                    drawRight();
                }
                break;
            case "2":
                var foldername = prompt("Enter a file name to create", "newfile.txt");
                exists = 0;
                file_or_folder_exists(currentFolder, foldername, fsStorage);
                if (exists) {
                    alert("there is already a file or folder in current dir with that name");
                    break;
                }
                if (foldername !== null && foldername !== '') {
                    createFileIn(currentFolder, fsStorage, foldername, '#', 2);
                    buildFlatArray();
                    drawLeft();
                    drawRight();
                }
                break;
        }

        // Hide it AFTER the action was triggered
        $(".custom-menu").hide(100);
    });


    drawLeft();
    $('.left0').children('ul').children('ul').children('ul').toggle();
    $('.left0').children('ul').children('ul').toggle();
    $('.left0').children('ul').toggle();
    drawNav();
    main();




});

function drawLeft() {
    //  printCurrentFolder();
    print_path(currentFolder, fsStorage);
    print_tree();

}

function drawRight() {

    //  var myclick = '';
    printCurrentFolder2();
    $('.right_view [class^="right"]').off();
    $('.right_view [class^="right"]').click(function(event) {
        event.stopPropagation();
        //console.log(($(this).attr('class').replace("right", '')));
        myclick = +($(this).attr('class').replace("right", ''));
        found = 0;
        folder_stack.push(currentFolder);
        FileOrFolder(myclick, fsStorage);
        //   console.log(found);
        //  console.log(found);
        if (found == 2) {
            currentFolder = +($(this).attr('class').replace("right", ''));
        }
        drawRight();
        if (found == 1) {
            open_file(myclick, fsStorage);
        }

    });

    $('.right_view [class^="right"]').on("contextmenu", function(event) {
        event.stopPropagation();
        event.preventDefault();
        myclick = +($(this).attr('class').replace("right", ''));

        $(".custom-menu2").finish().toggle(100).css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
    });

    $(document).bind("mousedown", function(e) {
        // If the clicked element is not the menu
        //  console.log($(this));
        if (!$(e.target).parents(".custom-menu2").length > 0) {
            // Hide it
            $(".custom-menu2").hide(100);
        }
    });


    $(".custom-menu2 li").click(function() {
        // This is the triggered action name
        // console.log(this);
        switch ($(this).attr("data-action")) {

            // A case for each action. Your actions here
            case "1":
                //   console.log(this);
                finished = 0;
                eraseMe(currentFolder, fsStorage, myclick);
                //               createFileIn(currentFolder, fsStorage, foldername, '', 1);
                buildFlatArray();
                drawLeft();
                drawRight();
                break;
            case "2":
                var foldername = prompt("Enter new name to rename to: ");
                finished = 0;
                exists = 0;
                file_or_folder_exists(currentFolder, foldername, fsStorage);
                if (exists) {
                    alert("there is already a file or folder in current dir with that name");
                    break;
                }
                if (foldername !== null && foldername !== '') {
                    renameme(currentFolder, fsStorage, foldername, myclick);
                    buildFlatArray();
                    drawLeft();
                    drawRight();
                }
                break;
        }

        // Hide it AFTER the action was triggered
        $(".custom-menu2").hide(100);
    });
    print_path(currentFolder, fsStorage);
}

function drawNav() {
    var nav_menu = '<div class="main_menu"></div><button class="back">Back</button>' +
        '<button class="forward">Forward</button>Location:<input type="text" class="path" name="path" value="' + basepath + '"><button class="goto">Goto</button></div>';
    $('.top').empty();
    //console.log(currentFolder);
    $('.top').html(nav_menu);

    // $('.path').val(currentFolder);
    $('.back').click(function(event) {
        event.stopPropagation();
        if (folder_stack.length > 0) {
            forward_folder_stack.push(currentFolder);
            currentFolder = folder_stack.pop();
        }

        //  console.log("back to :" + currentFolder);
        main();

    });

    $('.forward').click(function(event) {
        event.stopPropagation();


        if (forward_folder_stack.length > 0) {
            folder_stack.push(currentFolder);
            currentFolder = forward_folder_stack.pop();
        }
        main();
    });
}

function main() {
    //  drawLeft();
    drawRight();
}


function init() {

    found = 0;

    if (localStorage.getItem("oldstorage"))
        reBuildTree();

}