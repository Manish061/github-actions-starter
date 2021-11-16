import { attr, controller } from "@github/catalyst";
import faker from "../faker.js";

@controller
export class LogsDetailsElement extends HTMLElement {
  @attr step: number = 0;

  connectedCallback() {
    this.update();
  }

  loadMoreContent() {
    const targetEl = this.querySelector(".log_description");
    if (!targetEl) {
      return;
    }
    const button = this.querySelector("button");
    if (!button) {
      return;
    }
    button.textContent = "Loading...";
    setTimeout(() => {
      const elementsToAdd: (Node | string)[] = faker.Lorem.sentences(50)
        .split("\n")
        .map((sentence: string): Node => {
          const el = document.createElement("div");
          el.textContent = sentence;
          el.classList.add("log_line");
          return el;
        });
      targetEl.append(...elementsToAdd);
      button.textContent = "Show more";
    }, 2000);
  }

  update() {
    this.innerHTML = `
          <details class="log" id=${this.step}>
            <summary class="log_summary">Step ${this.step}</summary>
            <div class="log_description">
            </div>
            <div style="text-align: center" id="showMore">
              <button style="padding: 10px" data-action="click:logs-details#loadMoreContent">Show more</button>
              </div>
          </details>
        `;
  }
}
