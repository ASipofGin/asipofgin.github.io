document.addEventListener("DOMContentLoaded", () => {
  const svg = document.querySelector("svg");
  const tooltip = document.getElementById("tooltip");
  const tooltipBox = document.getElementById("tooltip-box");
  const tooltipText = document.getElementById("tooltip-text");

  const svgWidth = svg.viewBox.baseVal.width || svg.width.baseVal.value;
  const svgHeight = svg.viewBox.baseVal.height || svg.height.baseVal.value;

  document.querySelectorAll(".bar-data").forEach(bar => {
    bar.addEventListener("mouseenter", () => {
        
      const value = bar.getAttribute("data-tooltip") || bar.getAttribute("height");
      tooltipText.textContent = "Spent: $" + value;

      const boxW = parseFloat(tooltipBox.getAttribute("width"));
      const boxH = parseFloat(tooltipBox.getAttribute("height"));

      let x = parseFloat(bar.getAttribute("x")) + 60;
      let y = parseFloat(bar.getAttribute("y")) - 20;

      // Clamp 
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x + boxW > svgWidth) x = svgWidth - boxW;
      if (y + boxH > svgHeight) y = svgHeight - boxH;

      tooltip.setAttribute("transform", `translate(${x}, ${y})`);
      tooltip.setAttribute("visibility", "visible");
    });

    bar.addEventListener("mouseleave", () => {
      tooltip.setAttribute("visibility", "hidden");
    });
  });
});
