const btnToggle = document.querySelectorAll(".data-theme-toggle");

function handleChangeColor() {
    btnToggle.forEach(item => {
        item.addEventListener("click", (e) => {
            var Color = e.target.getAttribute('value');
            if (Color == "dark") {
                document.documentElement.setAttribute("color-mode", "dark");
                localStorage.setItem("color-mode", "dark");
            } else if (Color == "light") {
                document.documentElement.setAttribute("color-mode", "light");
                localStorage.setItem("color-mode", "light");
            } else if (Color == "red") {
                document.documentElement.setAttribute("color-mode", "red");
                localStorage.setItem("color-mode", "red");
            } else if (Color == "green") {
                document.documentElement.setAttribute("color-mode", "green");
                localStorage.setItem("color-mode", "green");
            }
            changeActive(Color);
        })
    });
}

function checkColorMode() {
    const colorMode = localStorage.getItem("color-mode");
    if (colorMode == "dark") {
        document.documentElement.setAttribute("color-mode", "dark");
    } else if (colorMode == "light") {
        document.documentElement.setAttribute("color-mode", "light");
    } else if (colorMode == "red") {
        document.documentElement.setAttribute("color-mode", "red");
    } else if (colorMode == "green") {
        document.documentElement.setAttribute("color-mode", "green");
    }
    changeActive(colorMode);
}

function changeActive(color) {
    if (color == "dark") {
        document.getElementById("dark").classList.add("active");
        document.getElementById("light").classList.remove("active");
        document.getElementById("red").classList.remove("active");
        document.getElementById("green").classList.remove("active");
    } else if (color == "light") {
        document.getElementById("light").classList.add("active");
        document.getElementById("dark").classList.remove("active");
        document.getElementById("red").classList.remove("active");
        document.getElementById("green").classList.remove("active");
    } else if (color == "red") {
        document.getElementById("red").classList.add("active");
        document.getElementById("dark").classList.remove("active");
        document.getElementById("light").classList.remove("active");
        document.getElementById("green").classList.remove("active");
    } else if (color == "green") {
        document.getElementById("green").classList.add("active");
        document.getElementById("dark").classList.remove("active");
        document.getElementById("light").classList.remove("active");
        document.getElementById("red").classList.remove("active");
    }
}

export { handleChangeColor, checkColorMode };