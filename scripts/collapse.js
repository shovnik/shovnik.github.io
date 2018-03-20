const collapsible = document.getElementsByClassName("collapse");
for (let i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.display === "block"){
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}