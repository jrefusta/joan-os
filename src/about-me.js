class AboutMe {
  constructor() {
    this.offset = -468;
    this.likeListeners = [];
    this.likedListeners = [];
    this.nextListeners = [];
    this.prevListeners = [];
  }
  activateEvents() {
    this.handleSelectImages(1, 2);
    this.handleSelectImages(2, 3);
    this.handleSelectImages(3, 0);
    this.handleSelectImages(4, 1);
    this.handleSelectImages(5, 2);
    this.handleSelectImages(6, 1);
    this.handleSelectImages(7, 2);
  }
  handleSelectImages(numPost, maxImages) {
    const like = document.getElementById("like_" + numPost);
    const liked = document.getElementById("liked_" + numPost);
    const post = document.getElementById("post_" + numPost);
    const next = document.getElementById("next_" + numPost);
    const prev = document.getElementById("prev_" + numPost);
    const likeListener = () => this.handleLikeEventListener(like, liked);
    const likedListener = () => this.handleLikedEventListener(like, liked);
    const nextListener = () =>
      this.handleNextEventListener(post, currentImage, prev, next, maxImages);
    const prevListener = () =>
      this.handlePrevEventListener(post, currentImage, prev, next);

    like.addEventListener("click", likeListener);
    liked.addEventListener("click", likedListener);

    if (numPost == 3) {
      const next = document.getElementById("next_" + numPost);
      next.style.visibility = "hidden";
      return;
    }
    const currentImage = { numPost: 0 };
    next.addEventListener("click", nextListener);
    prev.addEventListener("click", prevListener);

    this.likeListeners.push({ element: like, listener: likeListener });
    this.likedListeners.push({ element: liked, listener: likedListener });
    this.nextListeners.push({ element: next, listener: nextListener });
    this.prevListeners.push({ element: prev, listener: prevListener });
  }
  handlePrevEventListener = (post, currentImage, prev, next) => {
    post.style.objectPosition =
      this.offset - this.offset * (2 - currentImage.numPost) + "px";
    currentImage.numPost--;
    next.style.visibility = "visible";
    if (currentImage.numPost == 0) {
      prev.style.visibility = "hidden";
    }
  };
  handleNextEventListener = (post, currentImage, prev, next, maxImages) => {
    post.style.objectPosition =
      this.offset + this.offset * currentImage.numPost + "px";
    currentImage.numPost++;
    prev.style.visibility = "visible";
    if (currentImage.numPost == maxImages) {
      next.style.visibility = "hidden";
    }
  };
  handleLikeEventListener = (like, liked) => {
    liked.style.display = "inline-block";
    like.style.display = "none";
  };
  handleLikedEventListener = (like, liked) => {
    like.style.display = "inline-block";
    liked.style.display = "none";
  };

  deactivateEvents() {
    this.likeListeners.forEach(({ element, listener }) => {
      element.removeEventListener("click", listener);
    });
    this.likedListeners.forEach(({ element, listener }) => {
      element.removeEventListener("click", listener);
    });
    this.nextListeners.forEach(({ element, listener }) => {
      element.removeEventListener("click", listener);
    });
    this.prevListeners.forEach(({ element, listener }) => {
      element.removeEventListener("click", listener);
    });

    this.likeListeners = [];
    this.likedListeners = [];
    this.nextListeners = [];
    this.prevListeners = [];
  }
}
export default AboutMe;
