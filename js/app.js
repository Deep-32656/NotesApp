showNotes();
let addBtn = document.getElementById("addBtn");
let addTxt = document.getElementById("addTxt");
let addTxtTitle = document.getElementById("addTxtTitle");
let searchNotes = document.getElementById("searchNotes");
addBtn.addEventListener("click", function() {
    let data = localStorage.getItem("data");
    let notes;
    if (data == null) notes = [];
    else notes = JSON.parse(data);
    let currTime = new Date();
    let newData = {
        time: currTime,
        title: addTxtTitle.value,
        data: addTxt.value
    };
    if (newData.title == "") newData.title = "Note";
    // notes.push(newData);
    notes.unshift(newData);
    localStorage.setItem("data", JSON.stringify(notes));
    showNotes();
    addTxt.value = "";
    addTxtTitle.value = "";
});

function showNotes() {
    let data = localStorage.getItem("data");
    let notes;
    if (data == null) notes = [];
    else notes = JSON.parse(data);
    html = "";
    // curTime
    let ct = new Date();
    notes.forEach(function(element, index) {
        let timeElapsed = getTimeDiff(element, ct);
        html += `
        <div id="note-${index}" class="card mx-4 my-4" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">#${element.title}</h5>
        <p class="card-text">${element.data}</p>
        <p class="card-text"><small class="text-muted">Created ${timeElapsed} ago</small></p>
        <button onclick="deleteNote(this.parentNode.parentNode.id)" href="#" class="btn btn-primary" style="background-color: rgb(243, 61, 61);">Delete note</button>
        </div>
        </div>`
    });
    document.getElementById("notes").innerHTML = html;
}

function deleteNote(id) {
    id = id.slice(5);

    let data = localStorage.getItem("data");
    let notes;
    if (data == null) notes = [];
    else notes = JSON.parse(data);

    notes.splice(id, 1);
    localStorage.setItem("data", JSON.stringify(notes));
    showNotes();
}

function getTimeDiff(element, ct) {
    let timeElapsed;
    // note time
    let nt = new Date(element.time);
    if (nt.getFullYear() == ct.getFullYear()) {
        if (nt.getMonth() == ct.getMonth()) {
            if (nt.getDate() == ct.getDate()) {
                if (nt.getHours() == ct.getHours()) {
                    if (nt.getMinutes() == ct.getMinutes()) {
                        let sec = ct.getSeconds() - nt.getSeconds();
                        if (!sec) sec = 1;
                        timeElapsed = `${sec} seconds`;
                    } else {
                        let min = ct.getMinutes() - nt.getMinutes();
                        timeElapsed = `${min} minutes`;
                    }
                } else {
                    let hour = ct.getHours() - nt.getHours();
                    timeElapsed = `${hour} hours`;
                }
            } else {
                let date = ct.getDate() - nt.getDate();
                timeElapsed = `${date} days`;
            }
        } else {
            let Month = ct.getMonth() - nt.getMonth();
            timeElapsed = `${Month} months`;
        }
    } else {
        let Years = ct.getYears() - nt.getYears();
        timeElapsed = `${Years} years`;
    }
    return timeElapsed;
}

searchNotes.addEventListener("input", function() {
    let str = searchNotes.value.toLowerCase();
    // console.log(str);
    let notes = document.getElementById("notes").children;
    // console.log(notes);
    Array.from(notes).forEach(function(element) {
        let data = element.getElementsByTagName("p")[0].innerText;
        let title = element.getElementsByTagName("h5")[0].innerText;
        // console.log(title, data);
        if (title.toLowerCase().includes(str) || data.toLowerCase().includes(str)) {
            // console.log(title, data);
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    });
});