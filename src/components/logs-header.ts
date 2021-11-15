import { controller } from "@github/catalyst";

@controller
export class LogsHeaderElement extends HTMLElement {
  connectedCallback() {
    this.update();
  }

  update() {
    this.innerHTML = `
          <h2>Action Logs</h2>
          <form
            role="search"
            class="log_form"
            method="GET"
            onsubmit="return false"
          >
            <button type="submit">
              <span>Submit Search</span>
            </button>
            <input
              aria-label="Search"
              id="search"
              type="search"
              placeholder="Search the logs"
            />
          </form>
        `;
  }
}
