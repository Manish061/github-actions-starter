function fetchLogs() {
  fetch("data.json")
    .then((res) => res.json())
    .then(showData)
    .catch("Error failed loading data");
}

function truncateUtil(message) {
  return {
    msg: message,
    isTruncated: false,
    trunctateByCharacters: function (width) {
      this.isTruncated = true;
      return `${message.slice(0, width)}...`;
    },
  };
}

function addLog(data) {
  const truncateObj = truncateUtil(data);
  const log = document.createElement("button");
  log.setAttribute("class", "log");
  log.innerText = truncateObj.trunctateByCharacters(200);
  log.setAttribute("tabindex", "0");
  log.addEventListener("click", toggleView.bind(log, truncateObj));
  logs.appendChild(log);
}

function toggleView(obj) {
  this.innerText = obj.isTruncated ? obj.msg : obj.trunctateByCharacters(200);
  if (obj.isTruncated) {
    obj.isTruncated = false;
  }
}

function showData(data) {
  const TOTAL_ITEMS = 10000;
  let itemCount = 0;

  for (itemCount; itemCount < TOTAL_ITEMS; itemCount++) {
    addLog(data[0].data);
  }
}

const logs = document.getElementById("log_container");

fetchLogs();
