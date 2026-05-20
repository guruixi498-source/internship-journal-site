const STORAGE_KEY = "growthJournalEntries";

const categoryLabels = {
  internship: "实习收获",
  learning: "学习感悟",
  thinking: "个人思考",
  documents: "文档资料",
};

const sampleEntries = [
  {
    id: createId(),
    category: "internship",
    title: "把任务拆小后推进更稳定",
    content: "实习中发现，先明确目标、边界和交付标准，再把任务拆成可验证的小步骤，沟通成本会明显降低。",
    link: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: createId(),
    category: "learning",
    title: "学习后及时复盘更容易沉淀",
    content: "看完资料后用自己的话写下三点收获，比只收藏链接更能帮助长期记忆。",
    link: "",
    createdAt: new Date().toISOString(),
  },
];

const form = document.querySelector("#entryForm");
const categoryInput = document.querySelector("#entryCategory");
const titleInput = document.querySelector("#entryTitle");
const contentInput = document.querySelector("#entryContent");
const linkInput = document.querySelector("#entryLink");
const linkField = document.querySelector("#linkField");
const formMessage = document.querySelector("#formMessage");
const entriesList = document.querySelector("#entriesList");
const emptyState = document.querySelector("#emptyState");
const filterButtons = document.querySelectorAll(".filter-button");
const totalCount = document.querySelector("#totalCount");
const documentCount = document.querySelector("#documentCount");
const latestDate = document.querySelector("#latestDate");

let entries = loadEntries();
let activeFilter = "all";

render();

categoryInput.addEventListener("change", () => {
  linkField.classList.toggle("hidden", categoryInput.value !== "documents");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.classList.remove("success");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const link = linkInput.value.trim();
  const category = categoryInput.value;

  if (title.length < 2) {
    showMessage("标题至少需要 2 个字。");
    titleInput.focus();
    return;
  }

  if (content.length < 5) {
    showMessage("内容至少需要写 5 个字，方便以后回顾。");
    contentInput.focus();
    return;
  }

  if (link && !isValidUrl(link)) {
    showMessage("请输入完整有效的文档链接，例如 https://example.com。");
    linkInput.focus();
    return;
  }

  entries.unshift({
    id: createId(),
    category,
    title,
    content,
    link,
    createdAt: new Date().toISOString(),
  });

  saveEntries();
  render();
  form.reset();
  linkField.classList.add("hidden");
  showMessage("已保存，记得定期回来复盘。", true);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderEntries();
  });
});

entriesList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-button");

  if (!deleteButton) {
    return;
  }

  const shouldDelete = confirm("确定删除这条记录吗？");

  if (!shouldDelete) {
    return;
  }

  entries = entries.filter((entry) => entry.id !== deleteButton.dataset.id);
  saveEntries();
  render();
});

function loadEntries() {
  const storedEntries = localStorage.getItem(STORAGE_KEY);

  if (!storedEntries) {
    return sampleEntries;
  }

  try {
    const parsedEntries = JSON.parse(storedEntries);
    return Array.isArray(parsedEntries) ? parsedEntries : sampleEntries;
  } catch {
    return sampleEntries;
  }
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function render() {
  renderSummary();
  renderEntries();
}

function renderSummary() {
  totalCount.textContent = entries.length;
  documentCount.textContent = entries.filter((entry) => entry.category === "documents").length;
  latestDate.textContent = entries.length ? formatDate(entries[0].createdAt) : "暂无";
}

function renderEntries() {
  const visibleEntries =
    activeFilter === "all"
      ? entries
      : entries.filter((entry) => entry.category === activeFilter);

  entriesList.innerHTML = visibleEntries.map(createEntryCard).join("");
  emptyState.hidden = visibleEntries.length > 0;
}

function createEntryCard(entry) {
  const safeLink = entry.link ? escapeHtml(entry.link) : "";
  const documentLink = safeLink
    ? `<a class="entry-link" href="${safeLink}" target="_blank" rel="noopener noreferrer">打开文档</a>`
    : "<span></span>";

  return `
    <article class="entry-card">
      <div class="entry-meta">
        <span class="entry-tag">${categoryLabels[entry.category]}</span>
        <span class="entry-date">${formatDate(entry.createdAt)}</span>
      </div>
      <h3>${escapeHtml(entry.title)}</h3>
      <p>${escapeHtml(entry.content)}</p>
      <div class="entry-actions">
        ${documentLink}
        <button class="delete-button" type="button" data-id="${entry.id}">删除</button>
      </div>
    </article>
  `;
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function showMessage(message, isSuccess = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("success", isSuccess);
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const escapeMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return escapeMap[char];
  });
}
