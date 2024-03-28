class Credits {
  constructor() {
    this.creditsSection = document.getElementById("credits_credits");
    this.prevButton = document.getElementById("prev_button");
    this.nextButton = document.getElementById("next_button");
    this.inspirationSection = document.getElementById("credits_inspiration");
    this.resourcesSection = document.getElementById("credits_resources");
    this.specialThanksSection = document.getElementById(
      "credits_special_thanks"
    );
    this.allButtonsCredits = document.querySelectorAll(".credits-section");
    this.arrayOrder = [
      "credits_button",
      "inspiration_button",
      "resources_button",
      "special_thanks_button",
    ];
    this.buttonListeners = [];
    this.currentIndex = 0;
  }
  onCreditsClickButton = (id) => {
    switch (id) {
      case "credits_button":
        this.creditsSection.style.display = "block";
        this.inspirationSection.style.display = "none";
        this.resourcesSection.style.display = "none";
        this.specialThanksSection.style.display = "none";
        this.currentIndex = 0;
        break;
      case "inspiration_button":
        this.creditsSection.style.display = "none";
        this.inspirationSection.style.display = "block";
        this.resourcesSection.style.display = "none";
        this.specialThanksSection.style.display = "none";
        this.currentIndex = 1;
        break;
      case "resources_button":
        this.creditsSection.style.display = "none";
        this.inspirationSection.style.display = "none";
        this.resourcesSection.style.display = "block";
        this.specialThanksSection.style.display = "none";
        this.currentIndex = 2;
        break;
      case "special_thanks_button":
        this.creditsSection.style.display = "none";
        this.inspirationSection.style.display = "none";
        this.resourcesSection.style.display = "none";
        this.specialThanksSection.style.display = "block";
        this.currentIndex = 3;
        break;
    }
    this.checkIfOutOfArray();
  };
  checkIfOutOfArray = () => {
    if (this.currentIndex == 3) {
      this.nextButton.style.display = "none";
      this.prevButton.style.display = "block";
    } else if (this.currentIndex == 0) {
      this.nextButton.style.display = "block";
      this.prevButton.style.display = "none";
    } else {
      this.nextButton.style.display = "block";
      this.prevButton.style.display = "block";
    }
  };

  activateEvents() {
    this.allButtonsCredits.forEach((button) => {
      const listener = () => this.onCreditsClickButton(button.id);
      button.addEventListener("click", listener);
      this.buttonListeners.push({ element: button, listener });
    });

    this.prevButtonListener = () => {
      if (this.currentIndex >= 1) {
        this.onCreditsClickButton(this.arrayOrder[this.currentIndex - 1]);
      }
    };

    this.nextButtonListener = () => {
      if (this.currentIndex <= 2) {
        this.onCreditsClickButton(this.arrayOrder[this.currentIndex + 1]);
      }
    };

    this.prevButton.addEventListener("click", this.prevButtonListener);
    this.nextButton.addEventListener("click", this.nextButtonListener);
  }

  deactivateEvents() {
    this.buttonListeners.forEach(({ element, listener }) => {
      element.removeEventListener("click", listener);
    });
    this.prevButton.removeEventListener("click", this.prevButtonListener);
    this.nextButton.removeEventListener("click", this.nextButtonListener);
  }
}
export default Credits;
