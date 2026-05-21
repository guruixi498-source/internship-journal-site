const STORAGE_KEY = "growthJournalEntries";
const PROFILE_STORAGE_KEY = "growthJournalProfile";
const COMPANY_STORAGE_KEY = "growthJournalCompanies";
const PLAN_STORAGE_KEY = "growthJournalPlans";
const AI_CONFIG_STORAGE_KEY = "growthJournalAiConfig";
const CLOUD_CONFIG_STORAGE_KEY = "growthJournalCloudConfig";
const CLOUD_TABLE_NAME = "journal_data";
const DEFAULT_CLOUD_CONFIG = {
  url: "https://juvqrgcxxrretgourogt.supabase.co",
  anonKey: "sb_publishable_y7Ts0o9sRwovh8dZLH8FCg_fA4U6QOe",
};

const categoryLabels = {
  internship: "实习收获",
  learning: "学习感悟",
  thinking: "个人思考",
  documents: "文档资料",
  projects: "项目记录",
};

const projectTypeLabels = {
  school: "学校小组作业",
  competition: "竞赛项目",
  vibe: "Vibe Coding / 个人产品",
  other: "其他项目",
};

const planTypeLabels = {
  tomorrow: "明日计划",
  week: "周计划",
  longTerm: "长期计划",
};

const reviewTemplates = {
  daily: "今日完成：\n\n遇到的问题：\n\n学到的内容：\n\n可以改进的地方：\n\n明日计划：",
  weekly: "本周完成：\n\n关键收获：\n\n遇到的挑战：\n\n下周重点：\n\n需要补充的资料：",
  project: "项目背景：\n\n我的职责：\n\n实现过程：\n\n技术难点：\n\n最终结果：\n\n项目反思：",
  interview: "项目/经历一句话概括：\n\n我负责的部分：\n\n使用的技术：\n\n遇到的难点与解决方式：\n\n可量化结果：\n\n面试中可以强调的亮点：",
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

const defaultProfile = {
  skills: "HTML、CSS、JavaScript、Git、文档整理",
  abilities: "需求理解、沟通协作、问题拆解、学习复盘",
};

const form = document.querySelector("#entryForm");
const categoryInput = document.querySelector("#entryCategory");
const titleInput = document.querySelector("#entryTitle");
const contentInput = document.querySelector("#entryContent");
const reviewTemplate = document.querySelector("#reviewTemplate");
const applyTemplate = document.querySelector("#applyTemplate");
const templatePreview = document.querySelector("#templatePreview");
const editEntryId = document.querySelector("#editEntryId");
const entryTags = document.querySelector("#entryTags");
const entryCompany = document.querySelector("#entryCompany");
const entryFavorite = document.querySelector("#entryFavorite");
const projectFields = document.querySelector("#projectFields");
const projectType = document.querySelector("#projectType");
const projectBackground = document.querySelector("#projectBackground");
const projectTechStack = document.querySelector("#projectTechStack");
const projectImplementation = document.querySelector("#projectImplementation");
const projectReflection = document.querySelector("#projectReflection");
const linkInput = document.querySelector("#entryLink");
const linkField = document.querySelector("#linkField");
const formMessage = document.querySelector("#formMessage");
const saveEntryButton = document.querySelector("#saveEntryButton");
const cancelEditButton = document.querySelector("#cancelEditButton");
const entriesList = document.querySelector("#entriesList");
const emptyState = document.querySelector("#emptyState");
const filterButtons = document.querySelectorAll(".filter-button");
const searchInput = document.querySelector("#searchInput");
const monthFilter = document.querySelector("#monthFilter");
const tagFilter = document.querySelector("#tagFilter");
const favoriteOnly = document.querySelector("#favoriteOnly");
const resetRecordFilters = document.querySelector("#resetRecordFilters");
const totalCount = document.querySelector("#totalCount");
const documentCount = document.querySelector("#documentCount");
const dateJump = document.querySelector("#dateJump");
const dateJumpHint = document.querySelector("#dateJumpHint");
const clearDateFilter = document.querySelector("#clearDateFilter");
const dashboardStats = document.querySelector("#dashboardStats");
const categoryBars = document.querySelector("#categoryBars");
const monthBars = document.querySelector("#monthBars");
const topTags = document.querySelector("#topTags");
const planProgressBars = document.querySelector("#planProgressBars");
const planForm = document.querySelector("#planForm");
const editPlanId = document.querySelector("#editPlanId");
const planType = document.querySelector("#planType");
const planTitle = document.querySelector("#planTitle");
const planNote = document.querySelector("#planNote");
const planMessage = document.querySelector("#planMessage");
const savePlanButton = document.querySelector("#savePlanButton");
const cancelPlanEditButton = document.querySelector("#cancelPlanEditButton");
const tomorrowPlanList = document.querySelector("#tomorrowPlanList");
const weekPlanList = document.querySelector("#weekPlanList");
const longTermPlanList = document.querySelector("#longTermPlanList");
const tomorrowPlanCount = document.querySelector("#tomorrowPlanCount");
const weekPlanCount = document.querySelector("#weekPlanCount");
const longTermPlanCount = document.querySelector("#longTermPlanCount");
const togglePersonalPanel = document.querySelector("#togglePersonalPanel");
const personalPanel = document.querySelector("#personalPanel");
const profileForm = document.querySelector("#profileForm");
const profileSkills = document.querySelector("#profileSkills");
const profileAbilities = document.querySelector("#profileAbilities");
const profileMessage = document.querySelector("#profileMessage");
const skillsList = document.querySelector("#skillsList");
const abilitiesList = document.querySelector("#abilitiesList");
const companyForm = document.querySelector("#companyForm");
const companyName = document.querySelector("#companyName");
const companyIntro = document.querySelector("#companyIntro");
const leaderInfo = document.querySelector("#leaderInfo");
const colleagueInfo = document.querySelector("#colleagueInfo");
const companyMessage = document.querySelector("#companyMessage");
const companyList = document.querySelector("#companyList");
const companyEmptyState = document.querySelector("#companyEmptyState");
const exportData = document.querySelector("#exportData");
const exportMarkdown = document.querySelector("#exportMarkdown");
const importData = document.querySelector("#importData");
const backupMessage = document.querySelector("#backupMessage");
const cloudProjectUrl = document.querySelector("#cloudProjectUrl");
const cloudAnonKey = document.querySelector("#cloudAnonKey");
const saveCloudConfig = document.querySelector("#saveCloudConfig");
const clearCloudConfig = document.querySelector("#clearCloudConfig");
const cloudConfigMessage = document.querySelector("#cloudConfigMessage");
const cloudAuthForm = document.querySelector("#cloudAuthForm");
const cloudEmail = document.querySelector("#cloudEmail");
const cloudPassword = document.querySelector("#cloudPassword");
const cloudAuthMode = document.querySelector("#cloudAuthMode");
const cloudSignOut = document.querySelector("#cloudSignOut");
const cloudAuthMessage = document.querySelector("#cloudAuthMessage");
const cloudStatus = document.querySelector("#cloudStatus");
const pushCloudData = document.querySelector("#pushCloudData");
const pullCloudData = document.querySelector("#pullCloudData");
const cloudSyncMessage = document.querySelector("#cloudSyncMessage");
const aiApiKey = document.querySelector("#aiApiKey");
const aiModel = document.querySelector("#aiModel");
const saveAiConfig = document.querySelector("#saveAiConfig");
const clearAiConfig = document.querySelector("#clearAiConfig");
const aiConfigMessage = document.querySelector("#aiConfigMessage");
const aiStatus = document.querySelector("#aiStatus");
const aiOutput = document.querySelector("#aiOutput");
const copyAiOutput = document.querySelector("#copyAiOutput");
const aiTaskButtons = document.querySelectorAll(".ai-task-button");
const navLinks = document.querySelectorAll("[data-view-target]");
const appViews = document.querySelectorAll("[data-view]");

let entries = loadEntries();
let profile = loadProfile();
let companies = loadCompanies();
let plans = loadPlans();
let activeFilter = "all";
let activeDate = "";
let activeSearch = "";
let activeMonth = "";
let activeTag = "";
let showFavoriteOnly = false;
let aiConfig = loadAiConfig();
let cloudConfig = loadCloudConfig();
let cloudClient = null;
let cloudSession = null;
let cloudSaveTimer = null;
let isApplyingCloudData = false;

render();
fillProfileForm();
fillAiConfigForm();
fillCloudConfigForm();
setActiveView(getInitialView());
initializeCloudSync();

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveView(link.dataset.viewTarget);
  });
});

categoryInput.addEventListener("change", () => {
  linkField.classList.toggle("hidden", categoryInput.value !== "documents");
  projectFields.classList.toggle("hidden", categoryInput.value !== "projects");
});

reviewTemplate.addEventListener("change", () => {
  updateTemplatePreview();
});

applyTemplate.addEventListener("click", () => {
  const template = reviewTemplates[reviewTemplate.value];

  if (!template) {
    showMessage("请先选择一个复盘模板。");
    return;
  }

  if (contentInput.value.trim()) {
    const shouldReplace = confirm("当前内容不为空，是否用模板覆盖现有内容？");

    if (!shouldReplace) {
      return;
    }
  }

  contentInput.value = template;
  contentInput.focus();
  showMessage("已套用复盘模板，可以在此基础上补充细节。", true);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.classList.remove("success");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const link = linkInput.value.trim();
  const category = categoryInput.value;
  const tags = parseTags(entryTags.value);
  const company = entryCompany.value.trim();
  const isFavorite = entryFavorite.checked;
  const project = getProjectFormData(category);

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

  const wasEditing = Boolean(editEntryId.value);

  if (wasEditing) {
    entries = entries.map((entry) =>
      entry.id === editEntryId.value
        ? {
            ...entry,
            category,
            title,
            content,
            link,
            tags,
            company,
            isFavorite,
            project,
            updatedAt: new Date().toISOString(),
          }
        : entry,
    );
  } else {
    entries.unshift({
      id: createId(),
      category,
      title,
      content,
      link,
      tags,
      company,
      isFavorite,
      project,
      createdAt: new Date().toISOString(),
    });
  }

  saveEntries();
  render();
  resetEntryForm();
  showMessage(wasEditing ? "修改已保存。" : "已保存，记得定期回来复盘。", true);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderEntries();
  });
});

searchInput.addEventListener("input", () => {
  activeSearch = searchInput.value.trim().toLowerCase();
  renderEntries();
});

monthFilter.addEventListener("change", () => {
  activeMonth = monthFilter.value;
  renderEntries();
});

tagFilter.addEventListener("change", () => {
  activeTag = tagFilter.value;
  renderEntries();
});

favoriteOnly.addEventListener("change", () => {
  showFavoriteOnly = favoriteOnly.checked;
  renderEntries();
});

resetRecordFilters.addEventListener("click", () => {
  activeFilter = "all";
  activeDate = "";
  activeSearch = "";
  activeMonth = "";
  activeTag = "";
  showFavoriteOnly = false;
  dateJump.value = "";
  searchInput.value = "";
  monthFilter.value = "";
  tagFilter.value = "";
  favoriteOnly.checked = false;
  filterButtons.forEach((item) => item.classList.remove("active"));
  document.querySelector('[data-filter="all"]').classList.add("active");
  renderEntries();
});

cancelEditButton.addEventListener("click", () => {
  resetEntryForm();
  showMessage("已取消编辑。", true);
});

planForm.addEventListener("submit", (event) => {
  event.preventDefault();
  planMessage.textContent = "";
  planMessage.classList.remove("success");

  const title = planTitle.value.trim();
  const note = planNote.value.trim();
  const type = planType.value;
  const wasEditing = Boolean(editPlanId.value);

  if (title.length < 2) {
    showInlineMessage(planMessage, "计划标题至少需要 2 个字。");
    planTitle.focus();
    return;
  }

  if (wasEditing) {
    plans = plans.map((plan) =>
      plan.id === editPlanId.value
        ? {
            ...plan,
            type,
            title,
            note,
            updatedAt: new Date().toISOString(),
          }
        : plan,
    );
  } else {
    plans.unshift({
      id: createId(),
      type,
      title,
      note,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    });
  }

  savePlans();
  render();
  resetPlanForm();
  showInlineMessage(planMessage, wasEditing ? "计划已更新。" : "计划已添加。", true);
});

cancelPlanEditButton.addEventListener("click", () => {
  resetPlanForm();
  showInlineMessage(planMessage, "已取消编辑计划。", true);
});

[tomorrowPlanList, weekPlanList, longTermPlanList].forEach((list) => {
  list.addEventListener("click", (event) => {
    const completeButton = event.target.closest(".complete-plan-button");
    const editButton = event.target.closest(".edit-plan-button");
    const deleteButton = event.target.closest(".delete-plan-button");

    if (editButton) {
      startEditPlan(editButton.dataset.id);
      return;
    }

    if (completeButton) {
      plans = plans.map((plan) =>
        plan.id === completeButton.dataset.id
          ? {
              ...plan,
              isCompleted: !plan.isCompleted,
              completedAt: plan.isCompleted ? "" : new Date().toISOString(),
            }
          : plan,
      );
      savePlans();
      render();
      return;
    }

    if (!deleteButton) {
      return;
    }

    const shouldDelete = confirm("确定删除这条计划吗？");

    if (!shouldDelete) {
      return;
    }

    plans = plans.filter((plan) => plan.id !== deleteButton.dataset.id);
    savePlans();
    render();
  });
});

dateJump.addEventListener("change", () => {
  activeDate = dateJump.value;
  renderEntries();

  if (activeDate) {
    setActiveView("records");
    document.querySelector(".records-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

clearDateFilter.addEventListener("click", () => {
  activeDate = "";
  dateJump.value = "";
  renderEntries();
});

togglePersonalPanel.addEventListener("click", () => {
  const isHidden = personalPanel.classList.toggle("hidden");
  togglePersonalPanel.textContent = isHidden ? "打开个人信息板块" : "收起个人信息板块";

  if (!isHidden) {
    personalPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profile = {
    skills: profileSkills.value.trim(),
    abilities: profileAbilities.value.trim(),
  };

  saveProfile();
  renderProfile();
  showInlineMessage(profileMessage, "已保存技术与能力。", true);
});

companyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  companyMessage.textContent = "";
  companyMessage.classList.remove("success");

  const name = companyName.value.trim();
  const intro = companyIntro.value.trim();

  if (name.length < 2) {
    showInlineMessage(companyMessage, "公司名称至少需要 2 个字。");
    companyName.focus();
    return;
  }

  if (intro.length < 5) {
    showInlineMessage(companyMessage, "公司简介至少需要 5 个字，方便以后回顾。");
    companyIntro.focus();
    return;
  }

  companies.unshift({
    id: createId(),
    name,
    intro,
    leader: leaderInfo.value.trim(),
    colleagues: colleagueInfo.value.trim(),
    createdAt: new Date().toISOString(),
  });

  saveCompanies();
  renderCompanies();
  companyForm.reset();
  showInlineMessage(companyMessage, "已保存公司档案。", true);
});

companyList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-company-button");

  if (!deleteButton) {
    return;
  }

  const shouldDelete = confirm("确定删除这家公司档案吗？");

  if (!shouldDelete) {
    return;
  }

  companies = companies.filter((company) => company.id !== deleteButton.dataset.id);
  saveCompanies();
  renderCompanies();
});

exportData.addEventListener("click", () => {
  const backup = {
    app: "internship-journal-site",
    version: 1,
    exportedAt: new Date().toISOString(),
    entries,
    profile,
    companies,
    plans,
  };
  const backupText = JSON.stringify(backup, null, 2);
  downloadTextFile(backupText, `internship-journal-backup-${getDateKey(new Date())}.json`, "application/json");
  showInlineMessage(backupMessage, "已导出备份文件，请妥善保存。", true);
});

exportMarkdown.addEventListener("click", () => {
  const markdown = createMarkdownExport();
  downloadTextFile(markdown, `internship-journal-export-${getDateKey(new Date())}.md`, "text/markdown");
  showInlineMessage(backupMessage, "已导出 Markdown 文档，可用于周报、复盘或简历整理。", true);
});

saveAiConfig.addEventListener("click", () => {
  aiConfig = {
    apiKey: aiApiKey.value.trim(),
    model: aiModel.value.trim() || "gemini-1.5-flash",
  };
  saveAiConfigToStorage();
  showInlineMessage(aiConfigMessage, "AI 配置已保存到当前浏览器。", true);
});

clearAiConfig.addEventListener("click", () => {
  aiConfig = { apiKey: "", model: "gemini-1.5-flash" };
  saveAiConfigToStorage();
  fillAiConfigForm();
  showInlineMessage(aiConfigMessage, "已清除本地保存的 API Key。", true);
});

saveCloudConfig.addEventListener("click", async () => {
  cloudConfig = normalizeCloudConfig({
    url: cloudProjectUrl.value,
    anonKey: cloudAnonKey.value.trim(),
  });

  if (!cloudConfig.url || !cloudConfig.anonKey) {
    showInlineMessage(cloudConfigMessage, "云端配置缺失，请恢复默认配置后重试。");
    return;
  }

  if (!isValidUrl(cloudConfig.url)) {
    showInlineMessage(cloudConfigMessage, "Project URL 格式不正确，应类似 https://xxxx.supabase.co。");
    cloudProjectUrl.focus();
    return;
  }

  saveCloudConfigToStorage();
  fillCloudConfigForm();
  const isReady = await initializeCloudSync();
  showInlineMessage(
    cloudConfigMessage,
    isReady ? "云端连接已就绪，可以注册或登录账号。" : "配置已保存，但 Supabase SDK 暂未加载成功。",
    isReady,
  );
});

clearCloudConfig.addEventListener("click", async () => {
  const shouldReset = confirm("恢复默认云配置会退出当前云同步连接，但不会删除云端数据。确定继续吗？");

  if (!shouldReset) {
    return;
  }

  if (cloudClient) {
    await cloudClient.auth.signOut();
  }

  cloudConfig = { ...DEFAULT_CLOUD_CONFIG };
  cloudClient = null;
  cloudSession = null;
  saveCloudConfigToStorage();
  fillCloudConfigForm();
  await initializeCloudSync();
  renderCloudStatus();
  showInlineMessage(cloudConfigMessage, "已恢复默认云端配置。", true);
});

cloudAuthForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!ensureCloudClient()) {
    showInlineMessage(cloudAuthMessage, "云端连接暂不可用，请点击“重新连接云端”后再试。");
    return;
  }

  const email = cloudEmail.value.trim();
  const password = cloudPassword.value;

  if (!email || password.length < 6) {
    showInlineMessage(cloudAuthMessage, "请填写邮箱，并输入至少 6 位密码。");
    return;
  }

  cloudAuthForm.querySelector("button[type='submit']").disabled = true;

  try {
    const action =
      cloudAuthMode.value === "signup"
        ? cloudClient.auth.signUp({ email, password })
        : cloudClient.auth.signInWithPassword({ email, password });
    const { error } = await action;

    if (error) {
      throw error;
    }

    showInlineMessage(
      cloudAuthMessage,
      cloudAuthMode.value === "signup" ? "注册成功。如果没有自动登录，请切换为登录已有账号后继续。" : "登录成功，正在同步数据。",
      true,
    );
    cloudPassword.value = "";
  } catch (error) {
    showInlineMessage(cloudAuthMessage, `登录/注册失败：${error.message}`);
  } finally {
    cloudAuthForm.querySelector("button[type='submit']").disabled = false;
  }
});

cloudSignOut.addEventListener("click", async () => {
  if (!ensureCloudClient()) {
    showInlineMessage(cloudAuthMessage, "当前没有可用的云连接。");
    return;
  }

  await cloudClient.auth.signOut();
  showInlineMessage(cloudAuthMessage, "已退出登录。", true);
});

pushCloudData.addEventListener("click", async () => {
  const shouldPush = confirm("确认把当前浏览器里的本机数据上传并覆盖云端数据吗？");

  if (!shouldPush) {
    return;
  }

  await saveCloudData({ showMessage: true });
});

pullCloudData.addEventListener("click", async () => {
  const shouldPull = confirm("确认从云端拉取数据并覆盖当前浏览器里的本机数据吗？");

  if (!shouldPull) {
    return;
  }

  await loadCloudData({ showMessage: true });
});

copyAiOutput.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(aiOutput.textContent);
    showInlineMessage(aiStatus, "AI 输出已复制。", true);
  } catch {
    showInlineMessage(aiStatus, "复制失败，可以手动选中文本复制。");
  }
});

aiTaskButtons.forEach((button) => {
  button.addEventListener("click", () => {
    runAiTask(button.dataset.aiTask);
  });
});

importData.addEventListener("change", (event) => {
  const [backupFile] = event.target.files;

  if (!backupFile) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const backup = JSON.parse(reader.result);
      const importedData = normalizeBackup(backup);
      const shouldImport = confirm("导入会覆盖当前浏览器里的本地数据，确定继续吗？");

      if (!shouldImport) {
        importData.value = "";
        return;
      }

      entries = importedData.entries;
      profile = importedData.profile;
      companies = importedData.companies;
      plans = importedData.plans;
      activeFilter = "all";
      activeDate = "";
      activeSearch = "";
      activeMonth = "";
      activeTag = "";
      showFavoriteOnly = false;
      dateJump.value = "";
      searchInput.value = "";
      monthFilter.value = "";
      tagFilter.value = "";
      favoriteOnly.checked = false;
      reviewTemplate.value = "";
      updateTemplatePreview();
      filterButtons.forEach((item) => item.classList.remove("active"));
      document.querySelector('[data-filter="all"]').classList.add("active");
      saveEntries();
      saveProfile();
      saveCompanies();
      savePlans();
      fillProfileForm();
      render();
      showInlineMessage(backupMessage, "导入成功，数据已恢复到当前浏览器。", true);
    } catch {
      showInlineMessage(backupMessage, "导入失败，请确认选择的是本站导出的 JSON 备份文件。");
    } finally {
      importData.value = "";
    }
  });

  reader.readAsText(backupFile);
});

entriesList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-button");
  const editButton = event.target.closest(".edit-button");
  const favoriteButton = event.target.closest(".favorite-button");
  const detailButton = event.target.closest(".detail-button");

  if (detailButton) {
    const card = detailButton.closest(".entry-card");
    const summary = card.querySelector(".entry-summary");
    const detail = card.querySelector(".entry-detail");
    const isHidden = detail.classList.toggle("hidden");

    summary.hidden = !isHidden;
    detailButton.textContent = isHidden ? "展开详情" : "收起详情";
    return;
  }

  if (editButton) {
    startEditEntry(editButton.dataset.id);
    return;
  }

  if (favoriteButton) {
    entries = entries.map((entry) =>
      entry.id === favoriteButton.dataset.id
        ? { ...entry, isFavorite: !entry.isFavorite }
        : entry,
    );
    saveEntries();
    render();
    return;
  }

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
    return Array.isArray(parsedEntries) ? parsedEntries.map(normalizeEntry) : sampleEntries;
  } catch {
    return sampleEntries;
  }
}

function normalizeEntry(entry) {
  return {
    id: entry.id || createId(),
    category: entry.category || "internship",
    title: entry.title || "",
    content: entry.content || "",
    link: entry.link || "",
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    company: entry.company || "",
    isFavorite: Boolean(entry.isFavorite),
    project: normalizeProject(entry.project),
    createdAt: entry.createdAt || new Date().toISOString(),
    updatedAt: entry.updatedAt || "",
  };
}

function normalizeProject(project) {
  return {
    type: project && projectTypeLabels[project.type] ? project.type : "school",
    background: project && typeof project.background === "string" ? project.background : "",
    techStack: Array.isArray(project && project.techStack) ? project.techStack : [],
    implementation:
      project && typeof project.implementation === "string" ? project.implementation : "",
    reflection: project && typeof project.reflection === "string" ? project.reflection : "",
  };
}

function loadProfile() {
  const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!storedProfile) {
    return defaultProfile;
  }

  try {
    const parsedProfile = JSON.parse(storedProfile);
    return {
      skills: parsedProfile.skills || "",
      abilities: parsedProfile.abilities || "",
    };
  } catch {
    return defaultProfile;
  }
}

function loadCompanies() {
  const storedCompanies = localStorage.getItem(COMPANY_STORAGE_KEY);

  if (!storedCompanies) {
    return [];
  }

  try {
    const parsedCompanies = JSON.parse(storedCompanies);
    return Array.isArray(parsedCompanies) ? parsedCompanies : [];
  } catch {
    return [];
  }
}

function loadPlans() {
  const storedPlans = localStorage.getItem(PLAN_STORAGE_KEY);

  if (!storedPlans) {
    return [];
  }

  try {
    const parsedPlans = JSON.parse(storedPlans);
    return Array.isArray(parsedPlans) ? parsedPlans.map(normalizePlan) : [];
  } catch {
    return [];
  }
}

function loadAiConfig() {
  const storedConfig = localStorage.getItem(AI_CONFIG_STORAGE_KEY);

  if (!storedConfig) {
    return { apiKey: "", model: "gemini-1.5-flash" };
  }

  try {
    const parsedConfig = JSON.parse(storedConfig);
    return {
      apiKey: parsedConfig.apiKey || "",
      model: parsedConfig.model || "gemini-1.5-flash",
    };
  } catch {
    return { apiKey: "", model: "gemini-1.5-flash" };
  }
}

function loadCloudConfig() {
  const storedConfig = localStorage.getItem(CLOUD_CONFIG_STORAGE_KEY);

  if (!storedConfig) {
    return { ...DEFAULT_CLOUD_CONFIG };
  }

  try {
    const parsedConfig = JSON.parse(storedConfig);
    return normalizeCloudConfig(parsedConfig);
  } catch {
    return { ...DEFAULT_CLOUD_CONFIG };
  }
}

function normalizeCloudConfig(config) {
  const url = config && config.url ? normalizeCloudUrl(config.url) : DEFAULT_CLOUD_CONFIG.url;
  const anonKey = config && config.anonKey ? config.anonKey : DEFAULT_CLOUD_CONFIG.anonKey;

  return { url, anonKey };
}

function normalizeCloudUrl(url) {
  return url.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

function normalizePlan(plan) {
  return {
    id: plan.id || createId(),
    type: planTypeLabels[plan.type] ? plan.type : "tomorrow",
    title: plan.title || "",
    note: plan.note || "",
    isCompleted: Boolean(plan.isCompleted),
    createdAt: plan.createdAt || new Date().toISOString(),
    completedAt: plan.completedAt || "",
    updatedAt: plan.updatedAt || "",
  };
}

function normalizeBackup(backup) {
  if (!backup || backup.app !== "internship-journal-site") {
    throw new Error("Invalid backup file");
  }

  return {
    entries: Array.isArray(backup.entries) ? backup.entries.map(normalizeEntry) : [],
    profile: {
      skills: backup.profile && typeof backup.profile.skills === "string" ? backup.profile.skills : "",
      abilities:
        backup.profile && typeof backup.profile.abilities === "string"
          ? backup.profile.abilities
          : "",
    },
    companies: Array.isArray(backup.companies) ? backup.companies : [],
    plans: Array.isArray(backup.plans) ? backup.plans.map(normalizePlan) : [],
  };
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  queueCloudSave();
}

function saveProfile() {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  queueCloudSave();
}

function saveCompanies() {
  localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(companies));
  queueCloudSave();
}

function savePlans() {
  localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plans));
  queueCloudSave();
}

function saveAiConfigToStorage() {
  localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(aiConfig));
}

function saveCloudConfigToStorage() {
  localStorage.setItem(CLOUD_CONFIG_STORAGE_KEY, JSON.stringify(cloudConfig));
}

function render() {
  renderSummary();
  renderEntries();
  renderPlans();
  renderProfile();
  renderCompanies();
}

function getInitialView() {
  const hashView = window.location.hash.replace("#", "");
  const hasView = [...appViews].some((view) => view.dataset.view === hashView);

  return hasView ? hashView : "home";
}

function setActiveView(viewName) {
  appViews.forEach((view) => {
    view.hidden = view.dataset.view !== viewName;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.viewTarget === viewName);
  });
  window.history.replaceState(null, "", `#${viewName}`);
}

function renderSummary() {
  totalCount.textContent = entries.length;
  documentCount.textContent = entries.filter((entry) => entry.category === "documents").length;
  renderDateJump();
  renderRecordFilterOptions();
  renderDashboard();
}

function renderEntries() {
  const dateEntries = getFilteredEntries();

  entriesList.innerHTML = dateEntries.map(createEntryCard).join("");
  emptyState.textContent =
    activeDate || activeSearch || activeMonth || activeTag || showFavoriteOnly
      ? "当前筛选条件下暂无记录，可以调整筛选条件。"
      : "暂无记录，先添加一条属于今天的收获吧。";
  emptyState.hidden = dateEntries.length > 0;
  updateDateJumpHint(dateEntries.length);
}

function getFilteredEntries() {
  return entries.filter((entry) => {
    const tagValues = Array.isArray(entry.tags) ? entry.tags : [];
    const searchableText = [
      entry.title,
      entry.content,
      entry.company,
      tagValues.join(" "),
      entry.project
        ? [
            entry.project.background,
            entry.project.implementation,
            entry.project.reflection,
            entry.project.techStack.join(" "),
          ].join(" ")
        : "",
      categoryLabels[entry.category],
    ]
      .join(" ")
      .toLowerCase();

    if (activeFilter !== "all" && entry.category !== activeFilter) {
      return false;
    }

    if (activeDate && getDateKey(entry.createdAt) !== activeDate) {
      return false;
    }

    if (activeMonth && getMonthKey(entry.createdAt) !== activeMonth) {
      return false;
    }

    if (activeTag && !tagValues.includes(activeTag)) {
      return false;
    }

    if (showFavoriteOnly && !entry.isFavorite) {
      return false;
    }

    return !activeSearch || searchableText.includes(activeSearch);
  });
}

function renderRecordFilterOptions() {
  const tags = getAllTags();
  const currentTag = activeTag;

  tagFilter.innerHTML = `<option value="">全部标签</option>${tags
    .map((tag) => `<option value="${escapeHtml(tag)}">${escapeHtml(tag)}</option>`)
    .join("")}`;
  tagFilter.value = tags.includes(currentTag) ? currentTag : "";
  activeTag = tagFilter.value;
}

function renderPlans() {
  renderPlanColumn("tomorrow", tomorrowPlanList, tomorrowPlanCount);
  renderPlanColumn("week", weekPlanList, weekPlanCount);
  renderPlanColumn("longTerm", longTermPlanList, longTermPlanCount);
}

function renderPlanColumn(type, container, countElement) {
  const typePlans = plans.filter((plan) => plan.type === type);
  const activeCount = typePlans.filter((plan) => !plan.isCompleted).length;

  countElement.textContent = `${activeCount}/${typePlans.length}`;
  container.innerHTML = typePlans.length
    ? typePlans.map(createPlanCard).join("")
    : `<p class="empty-state">暂无${planTypeLabels[type]}，可以先添加一条。</p>`;
}

function createPlanCard(plan) {
  const completeLabel = plan.isCompleted ? "恢复未完成" : "标记完成";
  const noteMarkup = plan.note ? `<p>${escapeHtml(plan.note)}</p>` : "";

  return `
    <article class="plan-card ${plan.isCompleted ? "is-completed" : ""}">
      <h4>${escapeHtml(plan.title)}</h4>
      ${noteMarkup}
      <footer>
        <time datetime="${escapeHtml(plan.createdAt)}">${formatDate(plan.createdAt)}</time>
        <div class="plan-actions">
          <button class="complete-plan-button" type="button" data-id="${plan.id}">${completeLabel}</button>
          <button class="edit-plan-button" type="button" data-id="${plan.id}">编辑</button>
          <button class="delete-plan-button" type="button" data-id="${plan.id}">删除</button>
        </div>
      </footer>
    </article>
  `;
}

function startEditPlan(planId) {
  const plan = plans.find((item) => item.id === planId);

  if (!plan) {
    return;
  }

  editPlanId.value = plan.id;
  planType.value = plan.type;
  planTitle.value = plan.title;
  planNote.value = plan.note || "";
  savePlanButton.textContent = "保存计划修改";
  cancelPlanEditButton.classList.remove("hidden");
  showInlineMessage(planMessage, "正在编辑已有计划。", true);
  planForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetPlanForm() {
  planForm.reset();
  editPlanId.value = "";
  savePlanButton.textContent = "添加计划";
  cancelPlanEditButton.classList.add("hidden");
}

function createEntryCard(entry) {
  const safeLink = entry.link ? escapeHtml(entry.link) : "";
  const documentLink = safeLink
    ? `<a class="entry-link" href="${safeLink}" target="_blank" rel="noopener noreferrer">打开文档</a>`
    : "<span></span>";
  const tagMarkup = (entry.tags || [])
    .map((tag) => `<span class="profile-tag">${escapeHtml(tag)}</span>`)
    .join("");
  const companyMarkup = entry.company
    ? `<span class="entry-company">关联公司：${escapeHtml(entry.company)}</span>`
    : "";
  const favoriteLabel = entry.isFavorite ? "取消重点" : "标为重点";
  const shouldShowSummary = entry.content.length > 110;
  const summary = shouldShowSummary ? `${entry.content.slice(0, 110)}...` : entry.content;
  const projectMarkup = entry.category === "projects" ? createProjectMarkup(entry.project) : "";

  return `
    <article class="entry-card ${entry.isFavorite ? "is-favorite" : ""}">
      <div class="entry-meta">
        <span class="entry-tag">${entry.isFavorite ? "重点 · " : ""}${categoryLabels[entry.category]}</span>
        <span class="entry-date">${formatDate(entry.createdAt)}</span>
      </div>
      <h3>${escapeHtml(entry.title)}</h3>
      <p class="entry-summary">${escapeHtml(summary)}</p>
      <div class="entry-detail hidden">
        <p>${escapeHtml(entry.content)}</p>
      </div>
      <div class="entry-extra">
        ${companyMarkup}
        ${projectMarkup}
        ${tagMarkup ? `<div class="tag-list">${tagMarkup}</div>` : ""}
      </div>
      <div class="entry-actions">
        ${documentLink}
        <div class="entry-action-group">
          ${shouldShowSummary ? `<button class="detail-button" type="button">展开详情</button>` : ""}
          <button class="favorite-button" type="button" data-id="${entry.id}">${favoriteLabel}</button>
          <button class="edit-button" type="button" data-id="${entry.id}">编辑</button>
          <button class="delete-button" type="button" data-id="${entry.id}">删除</button>
        </div>
      </div>
    </article>
  `;
}

function createProjectMarkup(project) {
  if (!project) {
    return "";
  }

  const techStackMarkup = project.techStack && project.techStack.length
    ? `<div class="tag-list">${project.techStack
        .map((tech) => `<span class="profile-tag">${escapeHtml(tech)}</span>`)
        .join("")}</div>`
    : "";

  return `
    <div class="project-detail">
      <span><strong>项目类型：</strong>${projectTypeLabels[project.type]}</span>
      ${project.background ? `<span><strong>背景：</strong>${escapeHtml(project.background)}</span>` : ""}
      ${techStackMarkup}
      ${project.implementation ? `<span><strong>实现过程：</strong>${escapeHtml(project.implementation)}</span>` : ""}
      ${project.reflection ? `<span><strong>项目反思：</strong>${escapeHtml(project.reflection)}</span>` : ""}
    </div>
  `;
}

function startEditEntry(entryId) {
  const entry = entries.find((item) => item.id === entryId);

  if (!entry) {
    return;
  }

  editEntryId.value = entry.id;
  categoryInput.value = entry.category;
  titleInput.value = entry.title;
  contentInput.value = entry.content;
  entryTags.value = (entry.tags || []).join("、");
  entryCompany.value = entry.company || "";
  linkInput.value = entry.link || "";
  entryFavorite.checked = Boolean(entry.isFavorite);
  projectType.value = entry.project.type;
  projectBackground.value = entry.project.background;
  projectTechStack.value = (entry.project.techStack || []).join("、");
  projectImplementation.value = entry.project.implementation;
  projectReflection.value = entry.project.reflection;
  linkField.classList.toggle("hidden", entry.category !== "documents");
  projectFields.classList.toggle("hidden", entry.category !== "projects");
  saveEntryButton.textContent = "保存修改";
  cancelEditButton.classList.remove("hidden");
  showMessage("正在编辑已有记录。", true);
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetEntryForm() {
  form.reset();
  editEntryId.value = "";
  linkField.classList.add("hidden");
  projectFields.classList.add("hidden");
  updateTemplatePreview();
  saveEntryButton.textContent = "保存记录";
  cancelEditButton.classList.add("hidden");
}

function updateTemplatePreview() {
  const template = reviewTemplates[reviewTemplate.value];

  templatePreview.textContent = template || "选择模板后，这里会显示模板内容预览。";
  templatePreview.classList.toggle("hidden", !template);
}

function getProjectFormData(category) {
  if (category !== "projects") {
    return normalizeProject({});
  }

  return {
    type: projectType.value,
    background: projectBackground.value.trim(),
    techStack: parseTags(projectTechStack.value),
    implementation: projectImplementation.value.trim(),
    reflection: projectReflection.value.trim(),
  };
}

function parseTags(value) {
  return value
    .split(/[、,，\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function getAllTags() {
  return [...new Set(entries.flatMap((entry) => (Array.isArray(entry.tags) ? entry.tags : [])))].sort();
}

function renderDashboard() {
  const total = entries.length;
  const thisMonth = entries.filter((entry) => getMonthKey(entry.createdAt) === getMonthKey(new Date())).length;
  const favoriteCount = entries.filter((entry) => entry.isFavorite).length;
  const activeDays = new Set(entries.map((entry) => getDateKey(entry.createdAt))).size;
  const completedPlanCount = plans.filter((plan) => plan.isCompleted).length;
  const planProgress = plans.length ? `${Math.round((completedPlanCount / plans.length) * 100)}%` : "0%";

  dashboardStats.innerHTML = [
    ["总记录", total],
    ["本月新增", thisMonth],
    ["重点记录", favoriteCount],
    ["计划完成率", planProgress],
    ["记录天数", activeDays],
  ]
    .map(
      ([label, value]) => `
        <article class="dashboard-stat">
          <strong>${value}</strong>
          <span>${label}</span>
        </article>
      `,
    )
    .join("");

  renderMetricBars(categoryBars, getCategoryMetrics(), total || 1);
  renderMetricBars(monthBars, getRecentMonthMetrics(), Math.max(...getRecentMonthMetrics().map((item) => item.count), 1));
  renderMetricBars(planProgressBars, getPlanProgressMetrics(), 100);
  renderTopTags();
}

function getCategoryMetrics() {
  return Object.entries(categoryLabels).map(([key, label]) => ({
    label,
    count: entries.filter((entry) => entry.category === key).length,
  }));
}

function getRecentMonthMetrics() {
  const monthCounts = entries.reduce((result, entry) => {
    const monthKey = getMonthKey(entry.createdAt);
    result[monthKey] = (result[monthKey] || 0) + 1;
    return result;
  }, {});

  return Object.entries(monthCounts)
    .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
    .slice(-6)
    .map(([month, count]) => ({ label: month, count }));
}

function getPlanProgressMetrics() {
  return Object.entries(planTypeLabels).map(([type, label]) => {
    const typePlans = plans.filter((plan) => plan.type === type);
    const completedCount = typePlans.filter((plan) => plan.isCompleted).length;

    return {
      label,
      count: typePlans.length ? Math.round((completedCount / typePlans.length) * 100) : 0,
      suffix: "%",
    };
  });
}

function renderMetricBars(container, metrics, maxCount) {
  if (!metrics.length) {
    container.innerHTML = `<p class="entry-date">暂无统计数据</p>`;
    return;
  }

  container.innerHTML = metrics
    .map((metric) => {
      const width = Math.max((metric.count / maxCount) * 100, metric.count ? 8 : 0);

      return `
        <div class="metric-row">
          <div class="metric-label">
            <span>${escapeHtml(metric.label)}</span>
            <span>${metric.count}${metric.suffix || ""}</span>
          </div>
          <div class="metric-track"><span class="metric-fill" style="width: ${width}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderTopTags() {
  const tagCounts = entries
    .flatMap((entry) => (Array.isArray(entry.tags) ? entry.tags : []))
    .reduce((result, tag) => {
      result[tag] = (result[tag] || 0) + 1;
      return result;
    }, {});
  const tags = Object.entries(tagCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10);

  topTags.innerHTML = tags.length
    ? tags.map(([tag, count]) => `<span class="profile-tag">${escapeHtml(tag)} · ${count}</span>`).join("")
    : `<span class="entry-date">暂无标签，给记录添加标签后会显示在这里。</span>`;
}

function fillProfileForm() {
  profileSkills.value = profile.skills;
  profileAbilities.value = profile.abilities;
}

function fillAiConfigForm() {
  aiApiKey.value = aiConfig.apiKey;
  aiModel.value = aiConfig.model;
}

function fillCloudConfigForm() {
  cloudProjectUrl.value = cloudConfig.url;
  cloudAnonKey.value = cloudConfig.anonKey;
}

async function initializeCloudSync() {
  const hasClient = ensureCloudClient();

  if (!hasClient) {
    renderCloudStatus();
    return false;
  }

  const { data } = await cloudClient.auth.getSession();
  cloudSession = data.session;
  renderCloudStatus();

  cloudClient.auth.onAuthStateChange((event, session) => {
    cloudSession = session;
    renderCloudStatus();

    if (event === "SIGNED_IN" && session) {
      loadCloudData({ automatic: true });
    }
  });

  if (cloudSession) {
    await loadCloudData({ automatic: true });
  }

  return true;
}

function ensureCloudClient() {
  if (cloudClient) {
    return true;
  }

  if (!cloudConfig.url || !cloudConfig.anonKey || !window.supabase) {
    return false;
  }

  cloudClient = window.supabase.createClient(cloudConfig.url, cloudConfig.anonKey);
  return true;
}

function renderCloudStatus() {
  if (!cloudConfig.url || !cloudConfig.anonKey) {
    cloudStatus.textContent = "云端配置缺失，请恢复默认配置后重试。";
    pushCloudData.disabled = true;
    pullCloudData.disabled = true;
    cloudSignOut.disabled = true;
    return;
  }

  if (!cloudSession) {
    cloudStatus.innerHTML = "云端连接已就绪，当前未登录。登录后会自动同步数据。";
    pushCloudData.disabled = true;
    pullCloudData.disabled = true;
    cloudSignOut.disabled = true;
    return;
  }

  cloudStatus.innerHTML = `已登录：<strong>${escapeHtml(cloudSession.user.email || "当前用户")}</strong>。本机修改会自动同步到云端。`;
  pushCloudData.disabled = false;
  pullCloudData.disabled = false;
  cloudSignOut.disabled = false;
}

function createAppDataPayload() {
  return {
    app: "internship-journal-site",
    version: 2,
    updatedAt: new Date().toISOString(),
    entries,
    profile,
    companies,
    plans,
  };
}

function applyAppDataPayload(payload) {
  const normalizedData = normalizeBackup({
    app: "internship-journal-site",
    entries: payload && Array.isArray(payload.entries) ? payload.entries : [],
    profile: payload && payload.profile ? payload.profile : defaultProfile,
    companies: payload && Array.isArray(payload.companies) ? payload.companies : [],
    plans: payload && Array.isArray(payload.plans) ? payload.plans : [],
  });

  isApplyingCloudData = true;
  entries = normalizedData.entries;
  profile = normalizedData.profile;
  companies = normalizedData.companies;
  plans = normalizedData.plans;
  saveEntries();
  saveProfile();
  saveCompanies();
  savePlans();
  isApplyingCloudData = false;

  resetRecordFiltersState();
  fillProfileForm();
  render();
}

function queueCloudSave() {
  if (isApplyingCloudData || !cloudSession) {
    return;
  }

  window.clearTimeout(cloudSaveTimer);
  cloudSaveTimer = window.setTimeout(() => {
    saveCloudData({ showMessage: false });
  }, 800);
}

async function saveCloudData({ showMessage = false } = {}) {
  if (!ensureCloudClient() || !cloudSession) {
    if (showMessage) {
      showInlineMessage(cloudSyncMessage, "请先完成云配置并登录。");
    }
    return;
  }

  const payload = createAppDataPayload();
  const { error } = await cloudClient.from(CLOUD_TABLE_NAME).upsert({
    user_id: cloudSession.user.id,
    payload,
    updated_at: payload.updatedAt,
  });

  if (error) {
    showInlineMessage(cloudSyncMessage, `云端保存失败：${error.message}`);
    return;
  }

  showInlineMessage(
    cloudSyncMessage,
    showMessage ? "本机数据已上传到云端。" : `已自动同步到云端：${new Date().toLocaleTimeString("zh-CN")}`,
    true,
  );
}

async function loadCloudData({ automatic = false, showMessage = false } = {}) {
  if (!ensureCloudClient() || !cloudSession) {
    if (showMessage) {
      showInlineMessage(cloudSyncMessage, "请先完成云配置并登录。");
    }
    return;
  }

  const { data, error } = await cloudClient
    .from(CLOUD_TABLE_NAME)
    .select("payload, updated_at")
    .eq("user_id", cloudSession.user.id)
    .maybeSingle();

  if (error) {
    showInlineMessage(cloudSyncMessage, `云端读取失败：${error.message}`);
    return;
  }

  if (!data) {
    await saveCloudData({ showMessage: false });
    showInlineMessage(cloudSyncMessage, "云端暂无数据，已把当前浏览器数据作为第一份云备份。", true);
    return;
  }

  applyAppDataPayload(data.payload);
  showInlineMessage(
    cloudSyncMessage,
    automatic
      ? `已从云端加载数据：${formatDate(data.updated_at)}`
      : `已从云端拉取数据：${formatDate(data.updated_at)}`,
    true,
  );
}

function resetRecordFiltersState() {
  activeFilter = "all";
  activeDate = "";
  activeSearch = "";
  activeMonth = "";
  activeTag = "";
  showFavoriteOnly = false;
  dateJump.value = "";
  searchInput.value = "";
  monthFilter.value = "";
  tagFilter.value = "";
  favoriteOnly.checked = false;
  filterButtons.forEach((item) => item.classList.remove("active"));
  document.querySelector('[data-filter="all"]').classList.add("active");
}

function renderProfile() {
  skillsList.innerHTML = createTags(profile.skills, "还没有填写掌握的技术");
  abilitiesList.innerHTML = createTags(profile.abilities, "还没有填写个人能力");
}

function renderCompanies() {
  companyList.innerHTML = companies.map(createCompanyCard).join("");
  companyEmptyState.hidden = companies.length > 0;
}

function createCompanyCard(company) {
  const relatedEntries = entries.filter((entry) => entry.company === company.name);
  const relatedPlans = plans.filter((plan) =>
    [plan.title, plan.note].join(" ").includes(company.name),
  );
  const relatedEntriesMarkup = relatedEntries.length
    ? relatedEntries.map((entry) => `<li>${escapeHtml(entry.title)}</li>`).join("")
    : "<li>暂无关联记录</li>";
  const relatedPlansMarkup = relatedPlans.length
    ? relatedPlans.map((plan) => `<li>${escapeHtml(plan.title)}</li>`).join("")
    : "<li>暂无关联计划</li>";

  return `
    <article class="company-card">
      <div class="entry-meta">
        <h4>${escapeHtml(company.name)}</h4>
        <span class="entry-date">${formatDate(company.createdAt)}</span>
      </div>
      <dl>
        <div>
          <dt>公司简介</dt>
          <dd>${escapeHtml(company.intro)}</dd>
        </div>
        <div>
          <dt>Leader 信息</dt>
          <dd>${escapeHtml(company.leader || "暂未填写")}</dd>
        </div>
        <div>
          <dt>同事信息</dt>
          <dd>${escapeHtml(company.colleagues || "暂未填写")}</dd>
        </div>
        <div>
          <dt>关联内容</dt>
          <dd>
            <div class="company-related">
              <span>记录 ${relatedEntries.length} 条 · 计划 ${relatedPlans.length} 条</span>
              <details>
                <summary>查看关联条目</summary>
                <strong>关联记录</strong>
                <ul>${relatedEntriesMarkup}</ul>
                <strong>关联计划</strong>
                <ul>${relatedPlansMarkup}</ul>
              </details>
            </div>
          </dd>
        </div>
      </dl>
      <div class="entry-actions">
        <span></span>
        <button class="delete-button delete-company-button" type="button" data-id="${company.id}">删除</button>
      </div>
    </article>
  `;
}

function createTags(value, emptyText) {
  const tags = value
    .split(/[、,，\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!tags.length) {
    return `<span class="entry-date">${emptyText}</span>`;
  }

  return tags.map((tag) => `<span class="profile-tag">${escapeHtml(tag)}</span>`).join("");
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function renderDateJump() {
  const entryDates = [...new Set(entries.map((entry) => getDateKey(entry.createdAt)))].sort();
  const latestEntryDate = entryDates[entryDates.length - 1];
  const earliestEntryDate = entryDates[0];

  dateJump.disabled = entryDates.length === 0;
  dateJump.min = earliestEntryDate || "";
  dateJump.max = latestEntryDate || "";
  clearDateFilter.classList.toggle("hidden", !activeDate);
  updateDateJumpHint(activeDate ? getEntriesByDate(activeDate).length : 0);
}

function updateDateJumpHint(currentCount) {
  clearDateFilter.classList.toggle("hidden", !activeDate);

  if (!entries.length) {
    dateJumpHint.textContent = "还没有记录，添加第一条后就能按日期跳转。";
    return;
  }

  if (activeDate) {
    dateJumpHint.textContent = currentCount
      ? `${formatDateLabel(activeDate)} 有 ${currentCount} 条记录，已为你跳转到列表。`
      : `${formatDateLabel(activeDate)} 暂无记录，请选择有更新的日期。`;
    return;
  }

  dateJumpHint.textContent = `最近更新：${formatDateLabel(getDateKey(entries[0].createdAt))}。选择日期可查看当天记录。`;
}

function getEntriesByDate(dateKey) {
  return entries.filter((entry) => getDateKey(entry.createdAt) === dateKey);
}

function getDateKey(dateValue) {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthKey(dateValue) {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function formatDateLabel(dateKey) {
  const [year, month, day] = dateKey.split("-");
  return `${year}年${month}月${day}日`;
}

function showMessage(message, isSuccess = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("success", isSuccess);
}

function showInlineMessage(element, message, isSuccess = false) {
  element.textContent = message;
  element.classList.toggle("success", isSuccess);
}

async function runAiTask(taskType) {
  if (!aiConfig.apiKey) {
    showInlineMessage(aiStatus, "请先填写并保存 Gemini API Key。");
    return;
  }

  const prompt = buildAiPrompt(taskType);

  if (!prompt) {
    showInlineMessage(aiStatus, "暂不支持该 AI 任务。");
    return;
  }

  setAiLoading(true);
  aiOutput.textContent = "AI 正在生成，请稍候...";

  try {
    const result = await askGemini(prompt);
    aiOutput.textContent = result;
    showInlineMessage(aiStatus, "生成完成。", true);
  } catch (error) {
    aiOutput.textContent = "生成失败，请检查 API Key、网络连接或模型名称。";
    showInlineMessage(aiStatus, error.message || "AI 调用失败。");
  } finally {
    setAiLoading(false);
  }
}

function setAiLoading(isLoading) {
  aiTaskButtons.forEach((button) => {
    button.disabled = isLoading;
  });
}

async function askGemini(prompt) {
  const model = aiConfig.model || "gemini-1.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(aiConfig.apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini 请求失败：${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates && data.candidates[0] && data.candidates[0].content
    ? data.candidates[0].content.parts.map((part) => part.text || "").join("")
    : "";

  if (!text.trim()) {
    throw new Error("Gemini 没有返回可用内容。");
  }

  return text.trim();
}

function buildAiPrompt(taskType) {
  const dataSummary = createAiDataSummary();
  const prompts = {
    weeklyReport: `你是一个实习与学习复盘助手。请根据下面的数据生成一份中文周报草稿，结构包含：本周完成、关键收获、遇到的问题、下周计划、可量化亮点。语气正式但自然。\n\n${dataSummary}`,
    projectInterview: `你是一个面试辅导助手。请根据下面的项目记录，整理成中文面试回答素材。每个项目包含：一句话概括、项目背景、我的职责、技术栈、实现过程、难点与解决、结果与反思、面试中可强调的亮点。\n\n${dataSummary}`,
    planSuggestions: `你是一个个人成长规划助手。请根据下面的记录、计划和项目，生成“下周计划建议”和“长期计划建议”。要求具体、可执行，避免空泛，并说明建议依据。\n\n${dataSummary}`,
  };

  return prompts[taskType] || "";
}

function createAiDataSummary() {
  const recentEntries = entries.slice(0, 30).map((entry) => ({
    category: categoryLabels[entry.category],
    title: entry.title,
    content: entry.content,
    tags: entry.tags,
    company: entry.company,
    project: entry.category === "projects" ? entry.project : undefined,
    createdAt: entry.createdAt,
  }));
  const planSummary = plans.map((plan) => ({
    type: planTypeLabels[plan.type],
    title: plan.title,
    note: plan.note,
    isCompleted: plan.isCompleted,
  }));

  return JSON.stringify(
    {
      profile,
      recentEntries,
      plans: planSummary,
      companies,
    },
    null,
    2,
  );
}

function createMarkdownExport() {
  const lines = [
    "# 实习与学习记录导出",
    "",
    `导出时间：${new Date().toLocaleString("zh-CN")}`,
    "",
    "## 个人技术与能力",
    "",
    `- 掌握的技术：${profile.skills || "暂未填写"}`,
    `- 个人能力：${profile.abilities || "暂未填写"}`,
    "",
    "## 计划中心",
    "",
    ...createPlanMarkdown(),
    "",
    "## 记录列表",
    "",
    ...createEntryMarkdown(),
    "",
    "## 实习公司档案",
    "",
    ...createCompanyMarkdown(),
  ];

  return lines.join("\n");
}

function createPlanMarkdown() {
  if (!plans.length) {
    return ["暂无计划。"];
  }

  return Object.entries(planTypeLabels).flatMap(([type, label]) => {
    const typePlans = plans.filter((plan) => plan.type === type);

    return [
      `### ${label}`,
      "",
      ...(typePlans.length
        ? typePlans.flatMap((plan) => [
            `- [${plan.isCompleted ? "x" : " "}] ${plan.title}`,
            `  - 说明：${plan.note || "无"}`,
            `  - 创建时间：${formatDate(plan.createdAt)}`,
          ])
        : ["暂无。"]),
      "",
    ];
  });
}

function createEntryMarkdown() {
  if (!entries.length) {
    return ["暂无记录。"];
  }

  return entries.flatMap((entry) => [
    `### ${entry.title}`,
    "",
    `- 分区：${categoryLabels[entry.category] || entry.category}`,
    `- 时间：${formatDate(entry.createdAt)}`,
    `- 标签：${entry.tags && entry.tags.length ? entry.tags.join("、") : "无"}`,
    `- 关联公司：${entry.company || "无"}`,
    `- 重点记录：${entry.isFavorite ? "是" : "否"}`,
    entry.link ? `- 文档链接：${entry.link}` : "- 文档链接：无",
    ...(entry.category === "projects"
      ? [
          `- 项目类型：${projectTypeLabels[entry.project.type]}`,
          `- 项目背景：${entry.project.background || "无"}`,
          `- 技术栈：${entry.project.techStack.length ? entry.project.techStack.join("、") : "无"}`,
          `- 实现过程简述：${entry.project.implementation || "无"}`,
          `- 项目反思：${entry.project.reflection || "无"}`,
        ]
      : []),
    "",
    entry.content || "无内容",
    "",
  ]);
}

function createCompanyMarkdown() {
  if (!companies.length) {
    return ["暂无公司档案。"];
  }

  return companies.flatMap((company) => [
    `### ${company.name}`,
    "",
    `- 公司简介：${company.intro || "暂未填写"}`,
    `- Leader 信息：${company.leader || "暂未填写"}`,
    `- 同事信息：${company.colleagues || "暂未填写"}`,
    "",
  ]);
}

function downloadTextFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const downloadUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = filename;
  downloadLink.click();
  URL.revokeObjectURL(downloadUrl);
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
