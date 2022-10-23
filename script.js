
const cols = document.querySelectorAll(".col");
const hexCodes = document.querySelectorAll("h2");

document.addEventListener("keydown", e => {
    if (e.code.toLowerCase() == "space") {
        setRandomColor();
    }
})

document.addEventListener("click", e => {
    if(e.target.tagName == "I") {
        e.target.classList.toggle("fa-lock-open");
        e.target.classList.toggle("fa-lock");
    } else if(e.target.dataset.type == "copy") {
        copyToClickboard(e.target.textContent)
    }
})

function setRandomColor(isInitial) {
    const colors = isInitial?[]:getColorsFromHash();
    cols.forEach((item) => {
        const colColor = generateRandomColor();
        const text = item.querySelector("h2");
        const lock = item.querySelector(".fa-solid");

        if(lock.classList.item(1) == "fa-lock-open") {
            colors.push(colColor);
            item.style.backgroundColor = colColor;
            item.firstElementChild.textContent = colColor.toUpperCase();
            setTextColor(text,colColor);
            setTextColor(lock,colColor);
        } else {
            colors.push(text.innerText.toUpperCase());
        }
    })
    console.log(colors)
    updateHash(colors);
    getColorsFromHash()
}

function getColorsFromHash() {
    if(document.location.hash.length > 1) {
        document.location.hash.substring(1).split("-");
        console.log(document.location.hash.substring(1).split("-"));
    }
}

function updateHash(arr) {
    document.location.hash = arr.map(item => item.substring(1).toUpperCase()).join("-");
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}

function stopChangeColor(detal) {
    if(detal.classList.item(1) == "fa-lock-open") {
        detal.style.backgroundColor = colColor;
        detal.firstElementChild.textContent = colColor.toUpperCase();
    }
}

function setTextColor(txt,color) {
    txt.style.color = chroma(color).luminance()>0.5?"black":"white";
}

function generateRandomColor() {
    return chroma.random().hex();
}

setRandomColor(true)
