class Experience {
  constructor() {
    this.companyLogos = document.querySelectorAll(".company-logo");
    this.timelines = document.querySelectorAll(".timeline");
  }

  activateEvents() {
    this.companyLogos.forEach((company) => {
      if (!company.id) {
        return;
      }
      company.addEventListener("click", () =>
        this.handleClickOnCompany(company)
      );
    });
  }
  deactivateEvents() {
    this.companyLogos.forEach((company) => {
      if (!company.id) {
        return;
      }
      company.removeEventListener("click", () =>
        this.handleClickOnCompany(company)
      );
    });
  }
  handleClickOnCompany = (company) => {
    const timelineString = company.id.replace("_company_logo", "_timeline");
    company.classList.add("company-logo-selected");
    this.companyLogos.forEach((companyLogo) => {
      if (companyLogo != company) {
        companyLogo.classList.remove("company-logo-selected");
      }
    });
    const currentTimeline = document.getElementById(timelineString);
    currentTimeline.style.display = "block";
    this.timelines.forEach((timeline) => {
      if (timeline != currentTimeline) {
        timeline.style.display = "none";
      }
    });
  };
}
export default Experience;
