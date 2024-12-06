// Load game data
const gameData = {
    gameTitle: "Spot the Difference - Animals",
    images: {
      image1: "./images/image11.jpg",
      image2: "./images/image22.jpg"
    },
    differences: [
      { x: 65, y: 365, width: 25, height: 25 },
      { x: 300, y: 145, width: 30, height: 30 },
      { x: 180, y: 110, width: 25, height: 25 }
    ]
  };
  
  document.getElementById("gameTitle").textContent = gameData.gameTitle;
  
  const differences = gameData.differences;
  let score = 0;
  
  // Add click listeners to both images
  const images = document.querySelectorAll(".image-container img");
  
  images.forEach((img) => {
    img.addEventListener("click", (event) => {
      const rect = img.getBoundingClientRect(); // Get the image's position and size
      const scaleX = img.naturalWidth / rect.width; // Scale factor for X
      const scaleY = img.naturalHeight / rect.height; // Scale factor for Y
  
      // Get click position relative to the image
      const clickX = (event.clientX - rect.left) * scaleX;
      const clickY = (event.clientY - rect.top) * scaleY;
  
      console.log("Click Position:", { clickX, clickY });
  
      // Check if the click matches any difference
      const matchIndex = differences.findIndex(
        (diff) =>
          clickX >= diff.x &&
          clickX <= diff.x + diff.width &&
          clickY >= diff.y &&
          clickY <= diff.y + diff.height
      );
  
      if (matchIndex !== -1) {
        const match = differences[matchIndex];
        console.log("Difference Found:", match);
  
        // Highlight the found difference
        const highlight = document.createElement("div");
        highlight.classList.add("highlight");
        highlight.style.position = "absolute";
        highlight.style.left = `${(match.x / img.naturalWidth) * 100}%`;
        highlight.style.top = `${(match.y / img.naturalHeight) * 100}%`;
        highlight.style.width = `${(match.width / img.naturalWidth) * 100}%`;
        highlight.style.height = `${(match.height / img.naturalHeight) * 100}%`;
        highlight.style.border = "2px solid red";
        highlight.style.boxSizing = "border-box";
        img.parentElement.style.position = "relative"; // Ensure the parent is positioned
        img.parentElement.appendChild(highlight);
  
        // Remove the found difference from the list
        differences.splice(matchIndex, 1);
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
  
        // Check if all differences are found
        if (differences.length === 0) {
          alert("Congratulations! You've found all the differences!");
        }
      } else {
        console.log("No difference found at clicked position.");
      }
    });
  });
  
 