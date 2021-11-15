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

function loadMoreData(el) {
  if (el) {
    el.textContent = "Loading...";
    const tempDiv = document.createElement("div");
    setTimeout(() => {
      Faker.Lorem.sentences(50)
        .split("\n")
        .forEach((sentence) => {
          const logLine = document.createElement("div");
          logLine.classList.add("log_line");
          logLine.textContent = sentence;
          tempDiv.appendChild(logLine);
        });
      el.insertAdjacentElement("beforebegin", tempDiv);
      el.textContent = "Show more";
    }, 2000);
  }
}

function removeLogsBatch(detailsDescription) {}

function addLogsBatch(data, detailsDescription) {
  const description_inner1 = document.createElement("div");
  // const description_inner2 = document.createElement("div");
  // const description_inner3 = document.createElement("div");

  description_inner1.style.height = "auto";
  // description_inner2.style.height = "1000px";
  // description_inner3.style.height = "1000px";

  data.forEach((datum) => {
    const logLine = document.createElement("div");
    logLine.classList.add("log_line");
    logLine.textContent = datum;
    description_inner1.appendChild(logLine);
    // detailsDescription.appendChild(logLine);
  });

  const showMoreContainer = document.createElement("div");
  showMoreContainer.setAttribute("role", "button");
  showMoreContainer.setAttribute("tabindex", "0");
  showMoreContainer.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      loadMoreData(e.target);
    }
  });
  showMoreContainer.textContent = "Show more";
  showMoreContainer.addEventListener("click", (e) => {
    e.preventDefault();
    loadMoreData(e.target);
  });
  showMoreContainer.style.textAlign = "center";

  detailsDescription.appendChild(description_inner1);
  detailsDescription.appendChild(showMoreContainer);
  // detailsDescription.appendChild(description_inner2);
  // detailsDescription.appendChild(description_inner3);
}

function addLogLines(data, el) {
  if (el) {
    addLogsBatch(data, el);
    detailsDescriptionArr.push(el);
  }
}

function addStep(stepNo, el) {
  const logDetailsTag = document.createElement("details");
  logDetailsTag.classList.add("log");
  logDetailsTag.setAttribute("id", `step${stepNo}`);

  const obs = createObservers(logDetailsTag);

  // set mutation observer on attribute change
  const mutObs = new MutationObserver((mutationRecords) => {
    console.log("setting up");
    for (const mutationRecord of mutationRecords) {
      if (mutationRecord.type === "attributes") {
        if (mutationRecord.attributeName === "open") {
          if (mutationRecord.target.open) {
            obs.observe(logDetailsTag);
          } else {
            obs.unobserve(logDetailsTag);
          }
        }
      }
    }
  });

  mutObs.observe(logDetailsTag, {
    attributes: true,
  });

  const detailsSummary = document.createElement("summary");
  detailsSummary.textContent = "Step " + stepNo;
  detailsSummary.classList.add("log_summary");
  logDetailsTag.appendChild(detailsSummary);

  const detailsDescription = document.createElement("div");
  detailsDescription.classList.add("log_description");
  logDetailsTag.appendChild(detailsDescription);

  el.appendChild(logDetailsTag);
  return detailsDescription;
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
    let random = 50;
    heightArr.push(random);
    parentStepArr.push(addStep(itemCount + 1, logs));
  }
}

// function showLogsData() {
//   // const { data } = await fetchLogs();
//   // addMockLogs(data.split("\n").slice(0, random).join(""), itemCount);
//   // addMockLogs(Faker.Lorem.sentences(random), itemCount);
//   // addLog(Faker.Lorem.paragraphs(random), itemCount);
//   let itemCount = 0;
//   let offset = 0;
//   for (itemCount = 0; itemCount < heightArr.length; itemCount++) {
//     addLogLines(
//       actionsLogs.split("\n").slice(offset, offset + heightArr[itemCount]),
//       parentStepArr[itemCount]
//     );
//     offset = offset + heightArr[itemCount];
//   }
// }

function createObservers(target) {
  if (!target) {
    return;
  }
  target.querySelector("div.log_description > div:nth-child(2)");
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach((el) => {
      if (el.isIntersecting) {
        loadMoreData(el.target);
      }
    });
  }, {});

  return obs;
}

const logs = document.getElementById("log_inner_container");

// const logs = document.getElementById("log_container");
const scrollHeight = getScrollHeight();
const parentStepArr = [];
const heightArr = [];
const detailsDescriptionArr = [];

showStepData();
// showLogsData();

document.documentElement.scrollTo({
  top: 0,
  behavior: "smooth",
  left: 0,
});
