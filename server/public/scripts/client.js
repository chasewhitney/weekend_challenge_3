$(document).ready(function(){
  console.log('JQ sourced.');

  clickHandlers();
  displayToDos();

});

function clickHandlers(){
// listen for button clicks
  addToDo();
  completeToDo();
  deleteToDo();
}

function displayToDos() {
  // get items from database then send them to be appended to DOM
  $.ajax({
    type:'GET',
    url:'/todos',
    success: function(response){
      console.log('got a GET response', response);
      appendToDom(response);
    }
  });
}

function appendToDom(todoList){
  // appends list of item to DOM
  $('#viewToDos').empty();
  var todos = todoList.todos;
  console.log('appending to DOM');
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
    if (todo.status == "completed"){
      // set styling of item depending on completed status
      var $tr = $('<tr class="completed"></tr>');
      $tr.append('<td> ✔ ' + todo.todo + '</td>');
    } else {
      var $tr = $('<tr class="incomplete"></tr>');
      $tr.append('<td> - ' + todo.todo + '</td>');
    }
    if (todo.status == "incomplete"){
      // add completion button if item is incomplete
      $tr.append('<td><button class="completeBtn" data-buttonid="' + todo.id + '">Done!</button</td>');
    } else {
      $tr.append('<td></td>');
    }
    $tr.append('<td><button class="deleteBtn" data-buttonid="' + todo.id + '">Delete</button</td>');
    $('#viewToDos').append($tr);
  }
}

function addToDo() {
// adds item list
  $('#addToDo').on('click', function(){
    // adding an item to the list
    var objectToSend = {
      todo: $('#toDoIn').val(),
    };
    $.ajax({
      type: 'POST',
      url: '/todos',
      data: objectToSend,
      success: function(response){
        console.log('got response from POST');
        $('#toDoIn').val("");
        displayToDos();
      }
    }); // end ajax
  }); // end addToDo
}
 function completeToDo(){
   $('#viewToDos').on('click', '.completeBtn', function(){
     // completing an item
     var id = $(this).data('buttonid');

     $.ajax({
       type: 'PUT',
       url: '/todos/' + id,
       data: id,
       success: displayToDos,
     });
   });
 }

 function deleteToDo(){
   $('#viewToDos').on('click', '.deleteBtn', function(){
     var id = $(this).data('buttonid');
     if (confirm('Delete this item?')) {
       $.ajax({
         type: 'DELETE',
         url: '/todos/' + id,
         data: id,
         success: displayToDos,
       });
     } else {
     // Do nothing!
     }
   });
 }
