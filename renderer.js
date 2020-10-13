// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.



let dom = new Render(".table");
get("http://localhost:8105/api").then(r =>{
    console.log(r);
    dom.for(r)
})

let box = document.getElementById("box");
box.style.width="300px";
box.style.height= "300px";
box.style.position = "absolute";
box.style.backgroundSize= "contain";
document.onmousemove = function (e){
    box.style.left=e.clientX+10+"px";
    box.style.top=e.clientY+"px";


}
function see_img(e){
    box.innerHTML = "";
    box.style.backgroundImage = `url(${e.innerText})`;

}
// 复制到剪贴板
function replace(name){
    let aux = document.createElement("input");
    aux.setAttribute("value", name);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);

}



function _normal(url, data, method)
{
    return new Promise(function (resolve, reject) {
        let XHR = new XMLHttpRequest();
        if (method === "GET" || method === "DELETE") {
            url = url + "?";
            for (let i in data) {
                // url += `${i}=${data[i]}`;
                url+= i+"="+data[i];
            }
        }
        XHR.open(method, url, true);
        XHR.setRequestHeader("Content-Type", "application/json");
        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4) {
                if (XHR.status === 200) {
                    try {
                        let response = JSON.parse(XHR.responseText);
                        resolve(response);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText));
                }
            }
        };
        XHR.send(JSON.stringify(data));
    })
}

function get(url, data)
{
    return _normal(url, data, "GET")
}

function post(url, data)
{
    return  _normal(url, data, "POST")
}

function deletes (url, data)
{
    return _normal(url, data, "DELETE")
}

function put(url, data)
{
    return _normal(url, data, "PUT")
}