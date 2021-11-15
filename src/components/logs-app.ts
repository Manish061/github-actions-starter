import { controller } from "@github/catalyst";

@controller
export class LogsAppElement extends HTMLElement {
  #max = 10;
  connectedCallback() {
    this.update();
  }

  renderStepDetails(): string {
    const result: string[] = [];
    for (let i = 0; i < this.#max; i++) {
      result.push(`<logs-details data-step=${i + 1}></logs-details>`);
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
