import { attr, controller } from "@github/catalyst";

@controller
export class LogsStepNavElement extends HTMLElement {
  @attr count = 0;
  connectedCallback() {
    this.update();
  }

  renderStepLinks(): string {
    const result: string[] = [];
    for (let i = 0; i < this.count; i++) {
      result.push(
        `<li class="stepLink"><a href="#step${i + 1}">Step ${i + 1}</a></li>`
      );
    }
    return result.join("");
  }

  update() {
    this.innerHTML = `
        <ul class="log_step">
            ${this.renderStepLinks()}
        </ul>`;
  }
}
