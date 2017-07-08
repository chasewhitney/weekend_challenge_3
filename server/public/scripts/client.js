$(document).ready(function(){
  console.log('JQ sourced.');

  clickHandlers();
  displayToDos();

});

function clickHandlers(){

  $('#addToDo').on('click', function(){
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

  $('#viewToDos').on('click', '.completeBtn', function(){
    var id = $(this).data('buttonid');

    $.ajax({
      type: 'PUT',
      url: '/todos/' + id,
      data: id,
      success: displayToDos,
    });
  });

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

function displayToDos() {
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
  $('#viewToDos').empty();
  var todos = todoList.todos;
  console.log('appending to DOM');
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
      if (todo.status == "completed"){
        var $tr = $('<tr class="completed"></tr>');
        $tr.append('<td> ✔ ' + todo.todo + '</td>');
      } else {
        var $tr = $('<tr class="incomplete"></tr>');
        $tr.append('<td> - ' + todo.todo + '</td>');
      }



    if (todo.status == "incomplete"){
      $tr.append('<td><button class="completeBtn" data-buttonid="' + todo.id + '">Done!</button</td>');
    } else {
      $tr.append('<td></td>');
    }
    $tr.append('<td><button class="deleteBtn" data-buttonid="' + todo.id + '">Delete</button</td>');
    $('#viewToDos').append($tr);
  }
}
