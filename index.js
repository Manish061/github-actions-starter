async function fetchLogs() {
  try {
    const res = await fetch("data.json");
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
}

function toggleHandler() {
  this.toggleAttribute("open");
}

function toggleKeyUpHandler(e) {
  if (e.key === "Enter") {
    this.toggleAttribute("open");
  }
}

function removeLogsBatch(detailsDescription) {}

function addLogsBatch(data, detailsDescription) {
  data.forEach((datum) => {
    const logLine = document.createElement("span");
    logLine.classList.add("log_line");
    logLine.textContent = datum;
    detailsDescription.appendChild(logLine);
  });
}

function addLogLines(data, el) {
  const detailsDescription = document.createElement("p");
  detailsDescription.classList.add("log_description");

  // push it an array for later use.
  detailsDescriptionArr.push(detailsDescription);

  // add logs
  addLogsBatch(data, detailsDescription);

  if (el) {
    el.insertAdjacentElement("afterend", detailsDescription);
  }
}

function addStep(stepNo, el) {
  const logDetailsTag = document.createElement("div");
  logDetailsTag.setAttribute("role", "button");
  logDetailsTag.setAttribute("tabindex", 0);
  logDetailsTag.addEventListener("click", toggleHandler);
  logDetailsTag.addEventListener("keyup", toggleKeyUpHandler);
  logDetailsTag.classList.add("log");
  logDetailsTag.toggleAttribute("open");
  logDetailsTag.textContent = "Step " + stepNo;
  el.appendChild(logDetailsTag);
  return logDetailsTag;
}

function addLog(data, itemCount) {
  // const logs_container = document.createElement("section");
  // logs_container.classList.add("all_logs");

  const logDetailsTag = document.createElement("details");
  logDetailsTag.classList.add("log");

  const detailsSummary = document.createElement("summary");
  detailsSummary.classList.add("log_summary");
  detailsSummary.textContent = `Step - ${itemCount + 1}`;

  logDetailsTag.appendChild(detailsSummary);

  const detailsDescription = document.createElement("p");
  detailsDescription.classList.add("log_description");
  data.split("\n").forEach((datum) => {
    const logLine = document.createElement("span");
    logLine.classList.add("log_line");
    logLine.textContent = datum;
    detailsDescription.appendChild(logLine);
  });

  logDetailsTag.appendChild(detailsDescription);
  // logs_container.appendChild(logDetailsTag);
  logs.appendChild(logDetailsTag);
}

function getScrollHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

async function showStepData() {
  const TOTAL_ITEMS = 10;
  let itemCount = 0;
  for (itemCount; itemCount < TOTAL_ITEMS; itemCount++) {
    let random = Math.floor(Math.random() * 50) + 20;
    heightArr.push(random);
    parentStepArr.push(addStep(itemCount + 1, logs));
  }
}

function showLogsData() {
  // const { data } = await fetchLogs();
  // addMockLogs(data.split("\n").slice(0, random).join(""), itemCount);
  // addMockLogs(Faker.Lorem.sentences(random), itemCount);
  // addLog(Faker.Lorem.paragraphs(random), itemCount);
  // let itemCount = 0;
  // let offset = 0;
  // for (itemCount = 0; itemCount < heightArr.length; itemCount++) {
  //   addLogLines(
  //     actionsLogs.split("\n").slice(offset, offset + heightArr[itemCount]),
  //     parentStepArr[itemCount]
  //   );
  //   offset = offset + heightArr[itemCount];
  // }
}

function onScroll() {
  // addLogsBatch(Faker.Lorem.sentences(heightArr[0]));
}

const logs = document.getElementById("log_inner_container");
document.addEventListener("scroll", onScroll);

const actionsLogs = Faker.Lorem.sentences(100000);

// const logs = document.getElementById("log_container");
const scrollHeight = getScrollHeight();
const parentStepArr = [];
const heightArr = [];
const detailsDescriptionArr = [];

showStepData();
showLogsData();

document.documentElement.scrollTo({
  top: 0,
  behavior: "smooth",
  left: 0,
});
