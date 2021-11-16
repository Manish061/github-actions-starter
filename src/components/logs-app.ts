import { controller, targets } from "@github/catalyst";
import { LogsDetailsElement } from "./logs-details";

@controller
export class LogsAppElement extends HTMLElement {
  #max = 10;
  #intersectionObserver: IntersectionObserver | null = null;
  @targets details!: HTMLElement[];
  connectedCallback() {
    this.update();
    this.setupIntersectionObservers();
    this.addMutationObserver();
  }

  addMutationObserver() {
    const callback: MutationCallback = (mutationRecord) => {
      for (const record of mutationRecord) {
        if (record.type === "childList") {
          record.addedNodes.forEach((node) => {
            const targetEl = node.parentElement?.querySelector("#showMore");
            if (node.nodeName === "DETAILS") {
              if (this.#intersectionObserver && targetEl) {
                this.#intersectionObserver.observe(targetEl);
              }
            }
          });
        }
      }
    };
    const ob = new MutationObserver(callback);
    ob.observe(this, {
      childList: true,
      subtree: true,
    });
  }

  removeIntersectionObserver() {
    if (this.#intersectionObserver) {
      this.#intersectionObserver.disconnect();
      this.#intersectionObserver = null;
    }
  }

  setupIntersectionObservers() {
    this.removeIntersectionObserver();
    this.#intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.length < 1) {
        return;
      }
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (
            entry.target.parentElement?.parentElement as LogsDetailsElement
          )?.loadMoreContent();
        }
      });
    }, {});
  }

  renderStepDetails(): string {
    const result: string[] = [];
    for (let i = 0; i < this.#max; i++) {
      result.push(
        `<logs-details data-targets="logs-app.details" data-step=${
          i + 1
        }></logs-details>`
      );
    }
    return result.join("");
  }

  update() {
    this.innerHTML = `
      <logs-step-nav data-count=${this.#max}></logs-step-nav>
      <logs-container class="log_container">
        <logs-header class="header"></logs-header>
          ${this.renderStepDetails()}
      </logs-container>`;
  }
}
