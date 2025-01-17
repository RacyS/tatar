
function showfood(type) {
    // Hide all food view sections
    const sections = document.querySelectorAll(".foodview > div");
    sections.forEach(section => {
        section.style.display = "none";
    });

    // Show the specific section based on the type
    if (type === "pad") {
        document.querySelector(".foodview-pad").style.display = "grid";
        document.getElementById("color1").style.backgroundColor = "gray";
        document.getElementById("color2").style.backgroundColor = "white";
        document.getElementById("color3").style.backgroundColor = "white";        
        document.getElementById("color4").style.backgroundColor = "white";

    } else if (type === "kubrice") {
        document.querySelector(".foodview-kubrice").style.display = "grid";
        document.getElementById("color2").style.backgroundColor = "gray";
        document.getElementById("color1").style.backgroundColor = "white";
        document.getElementById("color3").style.backgroundColor = "white";        
        document.getElementById("color4").style.backgroundColor = "white";

    } else if (type === "yom") {
        document.querySelector(".foodview-yom").style.display = "grid";
        document.getElementById("color3").style.backgroundColor = "gray";
        document.getElementById("color1").style.backgroundColor = "white";
        document.getElementById("color2").style.backgroundColor = "white";        
        document.getElementById("color4").style.backgroundColor = "white";
    }
    else if (type === "set") {
        document.querySelector(".foodview-set").style.display = "grid";
        document.getElementById("color4").style.backgroundColor = "gray";
        document.getElementById("color1").style.backgroundColor = "white";
        document.getElementById("color2").style.backgroundColor = "white";        
        document.getElementById("color3").style.backgroundColor = "white";
    }
    
}
