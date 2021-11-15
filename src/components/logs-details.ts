import { attr, controller } from "@github/catalyst";

@controller
export class LogsDetailsElement extends HTMLElement {
  @attr step: number = 0;

  connectedCallback() {
    this.update();
  }

  update() {
    this.innerHTML = `
          <details class="log">
            <summary class="log_summary">Step ${this.step}</summary>
            <div class="log_description">
            </div>
              <div style="text-align: center">Show more</div>
          </details>
        `;
  }
}
