
var condition = "edit"
firebase.database().ref('todos').on('child_added',function(data){
    var taskInput = document.getElementById("task-input")

    var ul = document.getElementById("list")
        // var val = taskInput.value
        var li = document.createElement("li")
        var span = document.createElement("span")
        var editButton = document.createElement("button")
        var dltButton = document.createElement("button")
        editButton.innerHTML = "Edit"
        dltButton.innerHTML = "Remove"
        editButton.setAttribute("class", "edit")
        dltButton.setAttribute("class", "remove")
        editButton.setAttribute("id",data.val().key)
        editButton.setAttribute("onclick", "edit(this)")
        dltButton.setAttribute("id",data.val().key)
        dltButton.setAttribute("onclick", "remove(this)")
        li.setAttribute("class", "list-items")
        if (data.val().value == "") {
            alert("Enter What Do you Want to Do....")
        } else {
            ul.appendChild(li)
            span.innerHTML = data.val().value
            li.appendChild(span)
            li.appendChild(editButton)
            li.appendChild(dltButton)
            taskInput.value = ""
        }})
    
function addEvents() {
    if (condition == "edit") {
        var taskInput = document.getElementById("task-input")

        var database = firebase.database().ref('todos')
        var key = database.push().key
        var todo = {
            value: taskInput.value,
            key: key

        }
        database.child(key).set(todo)
     
    }

}
function removeAll() {
    firebase.database().ref('todos').remove()

    var ul = document.getElementById("list")
    ul.innerHTML = ""
}
function remove(r) {
    firebase.database().ref('todos').child(r.id).remove()
    var remove = r.parentElement.remove()
    
}
function edit(e) {

    if (e.innerHTML == "Edit" & condition == "edit") {
        var edit = e.parentElement.firstChild
        var editInput = document.createElement("input")
        editInput.setAttribute("class", "item-input")
        var val = edit.innerHTML
        edit.innerHTML = ""
        edit.appendChild(editInput)
        editInput.value = val
        e.innerHTML = "Update"
        condition = "update"
        var editTodo={
            value:val,
            key:e.id
        }
        firebase.database().ref('todos').child(e.id).set(editTodo)
    } else if (e.innerHTML == "Update" & condition == "update") {
        var edit = e.parentElement.firstChild
        var val = edit.firstChild.value
        edit.innerHTML = val
        e.innerHTML = "Edit"
        condition = "edit"
    }


}
