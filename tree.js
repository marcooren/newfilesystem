"use strict"
  var currentFolder = 0;
  var printed = 0;
  var folder_stack = [];
  var forward_folder_stack = [];
  folder_stack[0] = 0;
  var idCounter = 89;
  var finished = 0;
  var newArray = [];
  var exists = 0;
  var found = 0;
  var parent = -1;
  var my_content = '';
  var basePath = [];
  var myclick = '';
  var fsStorage = [{
      id: 0,
      name: 'root',
      children: [{
              id: 8,
              name: 'sub1',
              children: [
                  { id: 4, name: 'file1.txt', content: 'text text more text' },
                  {
                      id: 5,
                      name: 'sub3',
                      children: [{
                          id: 55,
                          name: 'sub33',
                          children: []
                      }]
                  }
              ]
          },
          { id: 2, name: 'sub2', children: [{ id: 88, name: 'sub72', children: [] }] },
          { id: 3, name: 'file2.txt', content: 'text gfhgff gdfgdfg ' },
          { id: 9, name: 'file4.txt', content: 'gfdgdfgdfgdfgd fdgdfg' },
          { id: 10, name: 'file5.txt', content: 'tgffdg fgfg d d ext' },
          { id: 11, name: 'file6.txt', content: 'tggfg dfd jjfgdgsgdfsghgfhrgfhfhfhxt' },
      ]
  }];


  var basepath = "root:\\";

  function printCurrentFolder() {
      printed = 0;
      printChildrenOfFolderWithIdOf(currentFolder, fsStorage);
  }

  function printChildrenOfFolderWithIdOf(myId, myArray) {
      if (printed)
          return;
      if (!myArray) {
          return;
      }
      for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].id == myId) {
              //   console.log("showing content of:");
              //   console.log("<" + myArray[i].name + ">");
              //console.log("--" + myArray[i].children);
              for (var x = 0; x < myArray[i].children.length; x++) {
                  if (myArray[i].children[x].children) {
                      //   console.log("------" + myArray[i].children[x].name + " <fold>");
                      $('.left_view').append('<div class="left' + myArray[i].children[x].id + '">' + myArray[i].children[x].name + '</div>');
                  }
                  // else
                  //    console.log("------" + myArray[i].children[x].name + " <file>");
              }
              printed = 1;
              return;
          } else printChildrenOfFolderWithIdOf(myId, myArray[i].children);
      }
  }

  function printCurrentFolder2() {
      printed = 0;
      printChildrenOfFolderWithIdOf2(currentFolder, fsStorage);
  }

  function printChildrenOfFolderWithIdOf2(myId, myArray) {
      if (printed)
          return;
      if (!myArray) {
          return;
      }
      for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].id == myId) {
              $('.right_view').html('');

              for (var x = 0; x < myArray[i].children.length; x++) {
                  if (myArray[i].children[x].children) {
                      $('.right_view').append('<div class="right' + myArray[i].children[x].id + '"><img src="./images/closed_dir.jpg"></br><center>' + myArray[i].children[x].name + '</center></div>');
                      //       console.log("------" + myArray[i].children[x].name + " <fold>");
                  } else {
                      $('.right_view').append('<div class="right' + myArray[i].children[x].id + '"><img src="./images/file.jpg"></br><center>' + myArray[i].children[x].name + '</center></div>');
                      //        console.log("------" + myArray[i].children[x].name + " <file>");
                  }
              }
              printed = 1;
              return;
          } else printChildrenOfFolderWithIdOf2(myId, myArray[i].children);
      }
  }

  function print_tree() {
      $('.left_view').html('');
      $('.left_view').append('<ul class="left0"><img src="./images/closed_dirs.jpg">root</ul>');
      for (var i = 0; i < fsStorage.length; i++) {
          if (fsStorage[i].children)
              pass_on(fsStorage[i].children, '.left0');

      }
      $('.left_view [class^="left"]').click(function(event) {
          event.stopPropagation();
          console.log(($(this).attr('class').replace("left", '')));
          var myclick = +($(this).attr('class').replace("left", ''));
          found = 0;
          folder_stack.push(currentFolder);
          FileOrFolder(myclick, fsStorage);
          if (found == 2) {
              currentFolder = +($(this).attr('class').replace("left", ''));
              main();
          }



      });


      $('.left_view [class^="left"] img').click(function(event) {
          event.stopPropagation();
          // var number = 
          var close_icon = './images/closed_dirs.jpg';
          var open_icon = './images/open_dirs.jpg';
          var changed = 0;
          if ($(this).attr('src') == close_icon && changed == 0) {

              $(this).attr('src', open_icon);
              changed = 1;
          }
          if ($(this).attr('src') == open_icon && changed == 0) {
              $(this).attr('src', close_icon);
              changed = 1;
          }
          changed = 0;
          $(this).parent().children('ul').toggle(200);
      });
  }

  function pass_on(myArray, myparent) {
      for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].children) {
              $(myparent).append('<ul class="left' + myArray[i].id + '"><img src="./images/closed_dirs.jpg">' + myArray[i].name + '</ul>');
          }
          if (myArray[i].children) {
              pass_on(myArray[i].children, '.left' + myArray[i].id);
          }
      }

  }

  function FileOrFolder(myId, myArray) {

      if (!myArray) {
          return;
      }

      for (var i = 0; i < myArray.length; i++) {
          if (myId == myArray[i].id) {
              found = 1;
              if (myArray[i].children) {
                  found = 2;
                  return;
              }
          }
          //    console.log(myArray[i].name);
          if (myArray[i].children) {
              FileOrFolder(myId, myArray[i].children);
          }
      }
      return;

  }

  function open_file(myId, myArray) {
      my_content = '';
      find_content_of_file(myId, myArray);
      var original_text = my_content;
      $('.right_view').html('<textarea class="file_text" rows="10" cols="50">' + original_text + '</textarea></br><button class="save">Save</button><button class="cancel">Cancel</button>');

      $('.save').click(function(event) {
          event.stopPropagation();
          found = 0;
          setContentOfFile(($('.file_text').val()), myId, myArray);
      });

      $('.cancel').click(function(event) {
          event.stopPropagation();
          // drawLeft();
          // drawRight();
          main();
      });
      return;
  }

  function find_content_of_file(myId, myArray) {

      if (!myArray) {
          return;
      }
      for (var i = 0; i < myArray.length; i++) {
          if (myId == myArray[i].id) {
              found = 1;
              my_content = myArray[i].content;
          }
          if (myArray[i].children) {
              find_content_of_file(myId, myArray[i].children);
          }
      }
      return;

  }

  function setContentOfFile(text, myId, myArray) {
      //   console.log(text);
      if (!myArray) {
          return;
      }

      for (var i = 0; i < myArray.length; i++) {
          if (myId == myArray[i].id) {
              found = 1;
              myArray[i].content = '';
              myArray[i].content += text;
              //  console.log(myArray[i].content);
          }

          if (myArray[i].children) {
              setContentOfFile(text, myId, myArray[i].children);
          }
      }
      return;
  }

  function what_is_parent_of(myId, myArray) {
      parent = -1;
      if (myId == 0) {
          return parent;
      }
      find_parent(myId, myArray);
      //  console.log(parent);
      return parent;
  }

  function find_parent(myId, myArray) {
      if (!myArray) {
          return;
      }
      for (var i = 0; i < myArray.length; i++) {

          if (myArray[i].children) {
              for (var x = 0; x < myArray[i].children.length; x++) {
                  if (myId == myArray[i].children[x].id) {
                      parent = myArray[i].id;
                  }
              }
              find_parent(myId, myArray[i].children);
          }
      }
      return;

  }



  function print_path(myId, myArray) {
      var a = 0;
      var path = '';
      a = what_is_parent_of(myId, myArray);
      path += a + '-';
      basePath.push(a);
      while (a != -1) {
          a = what_is_parent_of(a, myArray);
          if (a != -1) {
              path += a + '-';
              basePath.push(a);
          }
      }
      console.log(path);
      return path;
  }


  function createFileIn(location, fsStorage, folderName, content, myType) {

      for (var i = 0; i < fsStorage.length; i++) {
          if (location == fsStorage[i].id) {
              // console.log("enter here: " + fsStorage[i].id);
              if (myType == 2) {
                  fsStorage[i].children.push({
                      "id": idCounter++,
                      "name": folderName,
                      "content": content
                  });
                  //     console.log(folderName + " created!");
              }
              if (myType == 1) {
                  fsStorage[i].children.push({
                      "id": idCounter++,
                      "name": folderName,
                      "children": []
                  });
                  //   console.log(folderName + " created!");
              }
              return;
          }
          if (fsStorage[i].children) {
              createFileIn(location, fsStorage[i].children, folderName, content, myType);
          }
      }
      return;
  }

  function buildArray(newArray, oldArray) {
      for (var i = 0; i < oldArray.length; i++) {
          if (oldArray[i].id == currentFolder) {
              newArray.push({
                  "id": oldArray[i].id,
                  "name": oldArray[i].name,
                  "parent": null
              });
          }
          else {
              if (!oldArray[i].content) {
                  newArray.push({
                      "id": oldArray[i].id,
                      "name": oldArray[i].name,
                      "parent": currentFolder
                  });
              }
              else
                  newArray.push({
                      "id": oldArray[i].id,
                      "name": oldArray[i].name,
                      "parent": currentFolder,
                      "content": oldArray[i].content
                  });
          }
          //    console.log(oldArray[i].name);
          if (oldArray[i].children) {
              folder_stack.push(currentFolder);
              currentFolder = oldArray[i].id;
              buildArray(newArray, oldArray[i].children);
              currentFolder = folder_stack.pop();
          } //else return;
      }
  }

  function buildFlatArray() {
      folder_stack = [];
      folder_stack[0] = 0;
      newArray = [];
      var oldCurrentFolder = currentFolder;
      currentFolder = 0;
      buildArray(newArray, fsStorage);
      localStorage.setItem("oldstorage", JSON.stringify(newArray));
  }

  function reBuildTree() {
      newArray = JSON.parse(localStorage.getItem("oldstorage").toString());
      fsStorage = [];
      fsStorage.push({ name: "root", id: 0, children: [] });
      buildMe(newArray, fsStorage);
  }

  function buildMe(flatArray, newFileSystem) {
      for (var i = 1; i < flatArray.length; i++) {
          if (flatArray[i].content) {
              createFileIn2(flatArray[i].parent, newFileSystem, flatArray[i].name, flatArray[i].content, 2, flatArray[i].id);
          } else createFileIn2(flatArray[i].parent, newFileSystem, flatArray[i].name, flatArray[i].content, 1, flatArray[i].id);
      }
  }

  function createFileIn2(location, fsStorage, folderName, content, myType, myId) {
      for (var i = 0; i < fsStorage.length; i++) {
          if (location == fsStorage[i].id) {
              //   console.log("enter here: " + fsStorage[i].id);
              if (myType == 2) {
                  fsStorage[i].children.push({
                      "id": myId,
                      "name": folderName,
                      "content": content
                  });
              }
              if (myType == 1) {
                  fsStorage[i].children.push({
                      "id": myId,
                      "name": folderName,
                      "children": []
                  });
              }
              return;
          }
          if (fsStorage[i].children) {
              createFileIn2(location, fsStorage[i].children, folderName, content, myType, myId);
          }
      }
      return;
  }

  function eraseMe(location, myArray, myid) {
      if (finished == 1) {
          return;
      }
      for (var i = 0; i < myArray.length; i++) {
          if (location == myArray[i].id) {
              for (var x = 0; x < myArray[i].children.length; x++) {
                  if (myid == myArray[i].children[x].id) {
                      //   console.log("erase:" + myArray.name);
                      myArray[i].children.splice(x, 1);
                      finished = 1;
                      return;
                  }
              }
          }
          if (myArray[i].children) {
              eraseMe(location, myArray[i].children, myid);
          }
      }
  }

  function renameme(location, myArray, newname, myid) {
      if (finished == 1) {
          return;
      }
      for (var i = 0; i < myArray.length; i++) {
          if (location == myArray[i].id){
              for (var x = 0; x < myArray[i].children.length; x++) {
                  if (myid == myArray[i].children[x].id) {
                      //   console.log("erase:" + myArray.name);
                      myArray[i].children[x].name = newname;
                      finished = 1;
                      return;
                  }
              }
      }
          if (myArray[i].children)
              renameme(location, myArray[i].children, newname, myid);
      }

  }


  function file_or_folder_exists(location, foldername, myArray) {

      if (finished == 1) {
          return;
      }
      for (var i = 0; i < myArray.length; i++) {
          if (location == myArray[i].id){
              for (var x = 0; x < myArray[i].children.length; x++) {
                  if (foldername == myArray[i].children[x].name) {
                      //   console.log("erase:" + myArray.name);
                      exists = 1;
                      finished = 1;
                      return;
                  }
              }
      }
          if (myArray[i].children) {
              file_or_folder_exists(location, foldername, myArray[i].children);
          }
      }


  }