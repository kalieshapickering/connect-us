$(document).ready(function() {
    // Getting a reference to the input field where user adds a new todo
    var $newItemInput = $("input.new-item");
    // Our new todos will go inside the todoContainer
    var $todoContainer = $(".todo-container");
    // Adding event listeners for deleting, editing, and adding todos
    $(document).on("click", "button.delete", deleteTodo);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".todo-item", editTodo);
    $(document).on("keyup", ".todo-item", finishEdit);
    $(document).on("blur", ".todo-item", cancelEdit);
    $(document).on("submit", "#todo-form", insertTodo);
  
    // Our initial todos array
    var todos = [];
  
    // Getting todos from database when page loads
    getTodos();
  
    // This function resets the todos displayed with new todos from the database
    function initializeRows() {
      $todoContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < todos.length; i++) {
        rowsToAdd.push(createNewRow(todos[i]));
      }
      $todoContainer.prepend(rowsToAdd);
    }
  
    // This function grabs todos from the database and updates the view
    function getTodos() {
      $.get("/api/todos", function(data) {
        todos = data;
        initializeRows();
      });
    }
    // This function constructs a todo-item row
    function createNewRow(todo) {
        var $newInputRow = $(
          [
            "<li class='list-group-item todo-item'>",
            "<span>",
            todo.text,
            "</span>",
            "<input type='text' class='edit' style='display: none;'>",
            "<button class='delete btn btn-danger'>x</button>",
            "<button class='complete btn btn-primary'>✓</button>",
            "</li>"
          ].join("")
        );
    
        $newInputRow.find("button.delete").data("id", todo.id);
        $newInputRow.find("input.edit").css("display", "none");
        $newInputRow.data("todo", todo);
        if (todo.complete) {
          $newInputRow.find("span").css("text-decoration", "line-through");
        }
        return $newInputRow;
      }
    
      // This function inserts a new todo into our database and then updates the view
      function insertTodo(event) {
        event.preventDefault();
        var todo = {
          text: $newItemInput.val().trim(),
          complete: false
        };
    
        $.post("/api/todos", todo, getTodos);
        $newItemInput.val("");
      }
    });
    