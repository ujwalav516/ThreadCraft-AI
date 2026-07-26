function updateCount() {

    let text = document.getElementById("article").value;

    document.getElementById("count").innerText =
        text.length + " characters";

}

function copyThread() {

    let tweets = document.querySelectorAll(".tweet-box");

    let thread = "";

    tweets.forEach((tweet, index) => {

        thread += tweet.value.trim();

        if (index < tweets.length - 1) {
            thread += "\n\n";
        }

    });

    navigator.clipboard.writeText(thread);

    showToast("📋 Thread copied!");

    addHistory("📋 Copied Thread");

}

function clearAll() {

    document.getElementById("article").value = "";

    document.getElementById("trend").value = "";

    document.getElementById("result").innerHTML = `
        <div class="placeholder">

            🚀

            <h3>Your generated thread will appear here</h3>

            <p>
                Fill the form and click
                <strong>Generate Viral Thread</strong>
            </p>

        </div>
    `;

    document.getElementById("count").innerText =
        "0 characters";




document.getElementById("tweetCount").innerText = "--";

document.getElementById("wordCount").innerText = "--";

document.getElementById("charCount").innerText = "--";

document.getElementById("readingTime").innerText = "--";



document.getElementById("pdfFile").value = "";

document.getElementById("fileName").innerText =
"Drop your PDF here";

document.getElementById("fileStatus").innerText =
"or click to browse";




addHistory("🗑 Cleared Workspace");


}














const imageInput = document.getElementById("imageFile");

let uploadedImage = "";

if(imageInput){

    imageInput.addEventListener("change", function(){

        const file = this.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onload = function(e){

            uploadedImage = e.target.result;

        };

        reader.readAsDataURL(file);

    });

}











async function generateThread() {

    let article = document.getElementById("article").value;

    let trend = document.getElementById("trend").value;


    let tone =
document.getElementById("tone").value;



let length =
document.getElementById("length").value;

    let pdfFile = document.getElementById("pdfFile").files[0];

    let formData = new FormData();

    formData.append("article", article);

    formData.append("trend", trend);
    formData.append("tone", tone);
    formData.append("length", length);
    if (pdfFile) {

        formData.append("file", pdfFile);

        

    }



    document.getElementById("result").innerHTML = `
<div class="loader">

    <div class="spinner"></div>

    <h3>🤖 ThreadCraft AI is writing...</h3>

    <p>Analyzing your content...</p>

</div>
`;



    let response = await fetch("/generate", {

        method: "POST",

        body: formData

    });

    let data = await response.json();






    let thread = data.thread;

let tweetMatches = thread.match(/\d+\//g);

let tweets = tweetMatches ? tweetMatches.length : 1;

let words =
    thread.split(/\s+/).length;

let characters =
    thread.length;

let reading =
    Math.max(1, Math.ceil(words / 200));

document.getElementById("tweetCount").innerText =
    tweets;

document.getElementById("wordCount").innerText =
    words;

document.getElementById("charCount").innerText =
    characters;

document.getElementById("readingTime").innerText =
    reading + " min";

    displayThreadEditor(thread);

updateQuality(data.scores);

window.generatedThread = data.thread;

addHistory("🚀 Generated Thread");
}





function downloadThread() {

    let tweets = document.querySelectorAll(".tweet-box");

    if (tweets.length === 0) {

        showToast("⚠ Generate a thread first!");

        return;

    }

    let thread = "";

    tweets.forEach((tweet, index) => {

        thread += tweet.value.trim();

        if (index < tweets.length - 1) {
            thread += "\n\n";
        }

    });

    const blob = new Blob(
        [thread],
        { type: "text/plain" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "generated-thread.txt";

    link.click();

    showToast("⬇ Download started!");

    addHistory("⬇ Downloaded Thread");

}








pdfInput.addEventListener("change", () => {

    if (pdfInput.files.length > 0) {

        document.getElementById("fileName").innerText =
            "✅ " + pdfInput.files[0].name;

        document.getElementById("fileStatus").innerText =
            "Ready to generate thread";

    }

});
























function addHistory(action){

    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({

        action: action,

        time: new Date().toLocaleString()

    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

}



function showHistory(){

    let history =
        JSON.parse(localStorage.getItem("history")) || [];

   let html = `
<h2 style="color:#8B7CF7;">
🕒 History
</h2>`;

    if(history.length === 0){

        html += "<p>No activity yet.</p>";

    }else{

        history.forEach(item=>{

            html += `
            <div class="saved-card">

                <h3>${item.action}</h3>

                <p>${item.time}</p>

            </div>
            `;

        });

    }

    document.getElementById("result").innerHTML = html;

}


function showAnalytics(){

    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    let savedThreads =
        JSON.parse(localStorage.getItem("savedThreads")) || [];

    let generated =
        history.filter(item =>
            item.action.includes("Generated")
        ).length;

    let copied =
        history.filter(item =>
            item.action.includes("Copied")
        ).length;

    let downloaded =
        history.filter(item =>
            item.action.includes("Downloaded")
        ).length;

    let cleared =
        history.filter(item =>
            item.action.includes("Cleared")
        ).length;

    let latest =
        history.length > 0
        ? history[0].action + "<br><small>" + history[0].time + "</small>"
        : "No activity";

    let html = `

   <h2 style="color:#8B7CF7;">
📊 Analytics Dashboard
</h2>

    <div class="stats">

        <div class="stat">
            <h4>🚀 Generated</h4>
            <p>${generated}</p>
        </div>

        <div class="stat">
            <h4>💾 Saved</h4>
            <p>${savedThreads.length}</p>
        </div>

        <div class="stat">
            <h4>📋 Copied</h4>
            <p>${copied}</p>
        </div>

        <div class="stat">
            <h4>⬇ Downloaded</h4>
            <p>${downloaded}</p>
        </div>

        <div class="stat">
            <h4>🗑 Cleared</h4>
            <p>${cleared}</p>
        </div>

    </div>

    <div class="saved-card">

        <h3>🕒 Latest Activity</h3>

        <p>${latest}</p>

    </div>

    `;

    document.getElementById("result").innerHTML = html;

}


function showToast(message){

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}




window.onload = function(){

    let trend =
    localStorage.getItem("selectedTrend");

    if(trend){

        document.getElementById("trend").value =
        trend;

        localStorage.removeItem(
            "selectedTrend"
        );

    }

}


async function saveThread() {

    if (!window.generatedThread) {
        showToast("⚠ Generate a thread first!");
        return;
    }

    let title =
        document.getElementById("trend").value || "Untitled Thread";

    let form = new FormData();

    form.append("title", title);
    form.append("thread", window.generatedThread);
    form.append("tone", document.getElementById("tone").value);

    let response = await fetch("/save-thread", {
        method: "POST",
        body: form
    });

    let data = await response.json();

    showToast(data.message);
}



function openSchedulePopup(){

    document.getElementById("schedulePopup").style.display="flex";

}

function closeSchedulePopup(){

    document.getElementById("schedulePopup").style.display="none";

}

async function scheduleThread() {

    let title = document.getElementById("trend").value || "Untitled Thread";

    let thread = document.getElementById("result").innerText;

    let date = document.getElementById("scheduleDate").value;

    let time = document.getElementById("scheduleTime").value;

    if (date === "" || time === "") {

        showToast("Please select date and time.");

        return;

    }

    let form = new FormData();

    form.append("title", title);

    form.append("thread", thread);

    form.append("date", date);

    form.append("time", time);

    let response = await fetch("/schedule-thread", {

        method: "POST",

        body: form

    });

    let data = await response.json();

    showToast(data.message);

    closeSchedulePopup();

    addHistory("📅 Scheduled Thread");

}




async function postToX() {

    let thread = document.getElementById("result").innerText;

    if (thread.trim() === "") {

        showToast("Generate a thread first!");

        return;
    }

    let response = await fetch("/post-x", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            thread: thread
        })

    });

    let data = await response.json();

    showToast(data.message);

}


function displayThreadEditor(thread) {

    let tweets = thread.split(/\n(?=\d+\/)/);

    let html = "";

    tweets.forEach((tweet, index) => {

        let characters = tweet.length;

        html += `

        <div class="tweet-editor">

            <div class="tweet-header">

                <strong>🐦 Tweet ${index + 1}</strong>

                <span class="char-count">${characters}/280</span>

            </div>

            <div class="tweet-preview">

                <div class="preview-top">

                    <div class="preview-avatar">
                        U
                    </div>

                    <div>

                        <strong>ThreadCraft User</strong><br>

                        <small>@threadcraft</small>

                    </div>

                </div>
<div class="preview-media">

    ${
        uploadedImage
        ?

        `<img
            src="${uploadedImage}"
            class="tweet-image">`

        :

        `🖼 No Image Uploaded`
    }

</div>

            </div>

            <textarea
                class="tweet-box"
                oninput="updateCounter(this)"
            >${tweet}</textarea>

        </div>

        `;

    });

    document.getElementById("result").innerHTML = html;

}



function updateCounter(box){

    let counter = box.parentElement.querySelector(".char-count");

    counter.innerText = box.value.length + "/280";

    if(box.value.length > 280){

        counter.style.background = "#ffd7df";
        counter.style.color = "#d7265a";

    }

    else{

        counter.style.background = "#e7ddff";
        counter.style.color = "#7c5cff";

    }

}



function updateQuality(scores){

    document.getElementById("qualityScore").innerText =
        scores.overall + "/100";

    document.getElementById("hookBar").value =
        scores.hook;

    document.getElementById("readBar").value =
        scores.readability;

    document.getElementById("viralBar").value =
        scores.virality;

    document.getElementById("engageBar").value =
        scores.engagement;

}







async function improveThread(){

    if(!window.generatedThread){

        showToast("Generate a thread first!");

        return;

    }

    showToast("✨ Improving thread...");

    const response = await fetch("/improve-thread",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            thread:window.generatedThread

        })

    });

    const data = await response.json();

window.generatedThread = data.thread;

displayThreadEditor(data.thread);

updateQuality(data.scores);

showToast("🚀 Thread improved!");

}



