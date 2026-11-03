(function () {
  "use strict";

  /* ---------- i18n ---------- */
  var LANG_KEY = "vpb.lang";
  var INDUSTRY_DEFAULT = "离散制造"; // internal value, never translated in state
  var I18N = {
    zh: {
      docTitle: "质检承诺边界 · Vision Promise Boundary",
      docDesc: "一线踩出来的质检承诺边界清单。报价／宣传前先自查，再写进合同与对外材料。",
      title: "质检承诺边界",
      tagline: "一线踩出来的经验：对外承诺检测速度／误报／节拍前，先跑一遍拒单与边界清单。",
      audience: "面向评估供应商的甲方，以及谈落地的交付／销售",
      rulesLoading: "加载规则中…",
      loading: "正在加载规则…",
      inputTitle: "场景输入",
      industry: "行业环节",
      industryPh: "默认：离散制造",
      industryDefault: "离散制造",
      hasTaktNumber: "是否有节拍数字（产线已对齐的 cycle time）",
      clientWantsSpeedPromise: "客户是否已要求「检测速度」承诺",
      fpCost: "误报代价",
      fpRework: "返工",
      fpLineStop: "停线",
      fpComplaint: "客诉",
      hasRecentFalsePositiveSamples: "是否有近两周误报样本表",
      hasRunExperimentOrCopyTest: "是否上线过实验／改文案",
      dataDesensitizedForExternal: "数据是否脱敏可对外",
      clientConfirmedPublicScreenshot: "客户是否已确认脱敏截图可上公众号／宣传",
      hasHumanRedlineApproval: "是否有人批红线",
      askIncludesPaymentOrLineParams: "本次诉求是否包含支付／改产线参数（越权项）",
      promisedCycleTime: "承诺节拍／周期时间（可选）",
      promisedCycleTimePh: "例：2.5s / 节拍内完成",
      promisedCycleTimeHint: "无节拍数字却填写此处 → 将触发拒单",
      claimedSpeedText: "拟对外速度话术（可选）",
      claimedSpeedTextPh: "例：检测速度可达产线节拍",
      btnEval: "重新评估",
      btnDangerous: "危险承诺预设",
      btnReset: "重置",
      outputTitle: "边界输出",
      nextTitle: "先补哪项证据",
      allowTitle: "可承诺",
      deferTitle: "暂缓",
      rejectTitle: "明确拒单",
      btnCopy: "复制 Markdown",
      footerNote: "<strong>说明：</strong>本页把产线交付里踩过的坑固化成可编辑规则，供报价／宣传前自查。规则见 <code>rules.json</code>。非法律意见，不作合同依据。",
      openSource: "開源",
      langToggleAria: "切换语言 / Switch language",
      emptyNext: "没有缺的证据。",
      emptyAllow: "当前无「可承诺」项——先补齐边界条件。",
      emptyDefer: "无暂缓项。",
      emptyReject: "无拒单项。",
      unblockReject: function (n) { return "解除拒单 " + n + " 条"; },
      unblockDefer: function (n) { return "解除暂缓 " + n + " 条"; },
      partsSep: "，",
      parenOpen: "（",
      parenClose: "）",
      gapPrefix: "缺：",
      gapSep: "、",
      rulesMeta: function (n, v) { return "规则 " + n + " 条 · v" + v; },
      loadFailed: "加载规则失败：",
      toastCopied: "已复制 Markdown",
      toastCopyFailed: "复制失败，请手动选择",
      toastEval: "已重新评估",
      toastDangerous: function (n) { return "危险承诺预设 → 触发拒单 " + n + " 条"; },
      toastPreset: "预设已填入",
      toastReset: "已重置",
      presetCycleTime: "2.5秒内出结果",
      presetSpeedText: "检测速度可达产线节拍，误报可忽略",
      fpCostLabels: { "返工": "返工", "停线": "停线", "客诉": "客诉" },
      md: {
        title: "# 质检承诺边界清单",
        source: "> 生成自 [vision-promise-boundary](https://bianwuwei.github.io/vision-promise-boundary/) · 结构演示，非法律意见",
        summary: "## 场景摘要",
        colon: "：",
        yes: "是",
        no: "否",
        have: "有",
        haveNot: "无",
        none: "_无_",
        notSelected: "未选",
        industry: "行业环节",
        hasTaktNumber: "有节拍数字",
        clientWantsSpeedPromise: "客户要求检测速度承诺",
        fpCosts: "误报代价",
        hasRecentFalsePositiveSamples: "近两周误报样本表",
        hasRunExperimentOrCopyTest: "已上线实验／改文案",
        dataDesensitizedForExternal: "数据脱敏可对外",
        clientConfirmedPublicScreenshot: "客户确认脱敏截图可宣传",
        hasHumanRedlineApproval: "有人批红线",
        askIncludesPaymentOrLineParams: "涉及支付／改产线参数",
        promisedCycleTime: "承诺节拍／周期",
        claimedSpeedText: "速度话术",
        footer: "_规则可编辑：见仓库 `docs/rules.json`_",
      },
    },
    en: {
      docTitle: "QC Promise Boundary · Vision Promise Boundary",
      docDesc: "A field-tested checklist of machine-vision QC promise boundaries. Check before quoting or publicizing, then put it into contracts and external materials.",
      title: "QC Promise Boundary",
      tagline: "Lessons from the shop floor: before promising inspection speed, false-positive rates or takt time to anyone outside, run through the reject-and-boundary checklist.",
      audience: "For buyers evaluating vision vendors, and for delivery / sales teams negotiating deployments",
      rulesLoading: "Loading rules…",
      loading: "Loading rules…",
      inputTitle: "Scenario input",
      industry: "Industry / process",
      industryPh: "Default: Discrete manufacturing",
      industryDefault: "Discrete manufacturing",
      hasTaktNumber: "Measured takt number available (cycle time agreed with the line)",
      clientWantsSpeedPromise: "Customer has asked for an inspection-speed promise",
      fpCost: "Cost of a false positive",
      fpRework: "Rework",
      fpLineStop: "Line stop",
      fpComplaint: "Customer complaint",
      hasRecentFalsePositiveSamples: "False-positive sample log from the last two weeks available",
      hasRunExperimentOrCopyTest: "A pilot / copy test has been run live",
      dataDesensitizedForExternal: "Data is desensitized and cleared for external use",
      clientConfirmedPublicScreenshot: "Customer has confirmed desensitized screenshots may be used publicly / in marketing",
      hasHumanRedlineApproval: "Red-line approval signed off by a person",
      askIncludesPaymentOrLineParams: "Request involves payments or changing line parameters (out of scope)",
      promisedCycleTime: "Promised takt / cycle time (optional)",
      promisedCycleTimePh: "e.g. 2.5 s / within takt",
      promisedCycleTimeHint: "Filling this in without a takt number → triggers a reject",
      claimedSpeedText: "Proposed external speed claim (optional)",
      claimedSpeedTextPh: "e.g. Inspection keeps up with line takt",
      btnEval: "Re-evaluate",
      btnDangerous: "Dangerous-promise preset",
      btnReset: "Reset",
      outputTitle: "Boundary output",
      nextTitle: "Evidence to collect first",
      allowTitle: "OK to promise",
      deferTitle: "Hold",
      rejectTitle: "Reject",
      btnCopy: "Copy Markdown",
      footerNote: "<strong>Note:</strong> This page turns lessons learned in production-line delivery into editable rules for self-checking before quotes or marketing. Rules live in <code>rules.json</code>. Not legal advice; not a basis for contracts.",
      openSource: "Open source",
      langToggleAria: "Switch language",
      emptyNext: "No missing evidence.",
      emptyAllow: "Nothing is OK to promise yet — close the boundary gaps first.",
      emptyDefer: "No items on hold.",
      emptyReject: "No rejects.",
      unblockReject: function (n) { return "clears " + n + " reject" + (n === 1 ? "" : "s"); },
      unblockDefer: function (n) { return "clears " + n + " hold" + (n === 1 ? "" : "s"); },
      partsSep: ", ",
      parenOpen: " (",
      parenClose: ")",
      gapPrefix: "Missing: ",
      gapSep: ", ",
      rulesMeta: function (n, v) { return n + " rules · v" + v; },
      loadFailed: "Failed to load rules: ",
      toastCopied: "Markdown copied",
      toastCopyFailed: "Copy failed — please select and copy manually",
      toastEval: "Re-evaluated",
      toastDangerous: function (n) { return "Dangerous-promise preset → " + n + " reject" + (n === 1 ? "" : "s") + " triggered"; },
      toastPreset: "Preset filled in",
      toastReset: "Reset done",
      presetCycleTime: "Results within 2.5 s",
      presetSpeedText: "Inspection keeps up with line takt; false positives are negligible",
      fpCostLabels: { "返工": "Rework", "停线": "Line stop", "客诉": "Customer complaint" },
      md: {
        title: "# QC Promise Boundary Checklist",
        source: "> Generated by [vision-promise-boundary](https://bianwuwei.github.io/vision-promise-boundary/?lang=en) · structural demo, not legal advice",
        summary: "## Scenario summary",
        colon: ": ",
        yes: "Yes",
        no: "No",
        have: "Yes",
        haveNot: "No",
        none: "_None_",
        notSelected: "Not selected",
        industry: "Industry / process",
        hasTaktNumber: "Takt number available",
        clientWantsSpeedPromise: "Customer asked for inspection-speed promise",
        fpCosts: "Cost of a false positive",
        hasRecentFalsePositiveSamples: "Last-two-weeks false-positive sample log",
        hasRunExperimentOrCopyTest: "Pilot / copy test run live",
        dataDesensitizedForExternal: "Data desensitized for external use",
        clientConfirmedPublicScreenshot: "Customer confirmed screenshots usable in marketing",
        hasHumanRedlineApproval: "Red-line approval signed off",
        askIncludesPaymentOrLineParams: "Involves payments / line-parameter changes",
        promisedCycleTime: "Promised takt / cycle time",
        claimedSpeedText: "Speed claim",
        footer: "_Rules are editable: see `docs/rules.json` in the repo_",
      },
    },
  };

  function detectLang() {
    var q = null;
    try {
      q = new URLSearchParams(window.location.search).get("lang");
    } catch (e) {}
    if (q === "en" || q === "zh") return q;
    try {
      var saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "zh") return saved;
    } catch (e) {}
    return "zh";
  }

  var lang = detectLang();

  function t(key) {
    var d = I18N[lang] || I18N.zh;
    return Object.prototype.hasOwnProperty.call(d, key) ? d[key] : I18N.zh[key];
  }

  /** Localized text of a rule / gap field, falling back to Chinese. */
  function loc(obj, field) {
    if (!obj) return "";
    if (lang === "en" && obj[field + "_en"]) return obj[field + "_en"];
    return obj[field] || "";
  }

  const DEFAULT_STATE = {
    industry: "离散制造",
    hasTaktNumber: false,
    clientWantsSpeedPromise: false,
    fpCosts: [],
    hasRecentFalsePositiveSamples: false,
    hasRunExperimentOrCopyTest: false,
    dataDesensitizedForExternal: false,
    clientConfirmedPublicScreenshot: false,
    hasHumanRedlineApproval: false,
    askIncludesPaymentOrLineParams: false,
    promisedCycleTime: "",
    claimedSpeedText: "",
  };

  /** Dangerous preset: triggers reject rules (speed + no takt + no samples + high cost + claim text) */
  const DANGEROUS_PRESET = {
    industry: "离散制造",
    hasTaktNumber: false,
    clientWantsSpeedPromise: true,
    fpCosts: ["停线", "客诉"],
    hasRecentFalsePositiveSamples: false,
    hasRunExperimentOrCopyTest: false,
    dataDesensitizedForExternal: false,
    clientConfirmedPublicScreenshot: false,
    hasHumanRedlineApproval: false,
    askIncludesPaymentOrLineParams: false,
    promisedCycleTime: "2.5秒内出结果", // replaced by current-language text in presetForLang()
    claimedSpeedText: "检测速度可达产线节拍，误报可忽略",
  };

  function presetForLang() {
    return Object.assign({}, DANGEROUS_PRESET, {
      promisedCycleTime: t("presetCycleTime"),
      claimedSpeedText: t("presetSpeedText"),
    });
  }

  /** Industry field: internal default stays 离散制造; displayed per language. */
  function isIndustryDefault(v) {
    return v === I18N.zh.industryDefault || v === I18N.en.industryDefault;
  }
  function displayIndustry(v) {
    return !v || isIndustryDefault(v) ? t("industryDefault") : v;
  }

  let rules = [];
  let gaps = {};
  var rulesVersion = "?";
  var rulesLoaded = false;
  var WEIGHT = { reject: 3, defer: 1 };

  function $(id) {
    return document.getElementById(id);
  }

  function readState() {
    const fpCosts = [];
    document.querySelectorAll('input[name="fpCost"]:checked').forEach(function (el) {
      fpCosts.push(el.value);
    });
    return {
      industry: (function (v) { return !v || isIndustryDefault(v) ? INDUSTRY_DEFAULT : v; })(($("industry").value || "").trim()),
      hasTaktNumber: $("hasTaktNumber").checked,
      clientWantsSpeedPromise: $("clientWantsSpeedPromise").checked,
      fpCosts: fpCosts,
      hasRecentFalsePositiveSamples: $("hasRecentFalsePositiveSamples").checked,
      hasRunExperimentOrCopyTest: $("hasRunExperimentOrCopyTest").checked,
      dataDesensitizedForExternal: $("dataDesensitizedForExternal").checked,
      clientConfirmedPublicScreenshot: $("clientConfirmedPublicScreenshot").checked,
      hasHumanRedlineApproval: $("hasHumanRedlineApproval").checked,
      askIncludesPaymentOrLineParams: $("askIncludesPaymentOrLineParams").checked,
      promisedCycleTime: ($("promisedCycleTime").value || "").trim(),
      claimedSpeedText: ($("claimedSpeedText").value || "").trim(),
    };
  }

  function writeState(state) {
    $("industry").value = displayIndustry(state.industry);
    $("hasTaktNumber").checked = !!state.hasTaktNumber;
    $("clientWantsSpeedPromise").checked = !!state.clientWantsSpeedPromise;
    document.querySelectorAll('input[name="fpCost"]').forEach(function (el) {
      el.checked = (state.fpCosts || []).indexOf(el.value) !== -1;
    });
    $("hasRecentFalsePositiveSamples").checked = !!state.hasRecentFalsePositiveSamples;
    $("hasRunExperimentOrCopyTest").checked = !!state.hasRunExperimentOrCopyTest;
    $("dataDesensitizedForExternal").checked = !!state.dataDesensitizedForExternal;
    $("clientConfirmedPublicScreenshot").checked = !!state.clientConfirmedPublicScreenshot;
    $("hasHumanRedlineApproval").checked = !!state.hasHumanRedlineApproval;
    $("askIncludesPaymentOrLineParams").checked = !!state.askIncludesPaymentOrLineParams;
    $("promisedCycleTime").value = state.promisedCycleTime || "";
    $("claimedSpeedText").value = state.claimedSpeedText || "";
  }

  /** Derived fields used by rules */
  function enrich(state) {
    var high = state.fpCosts.indexOf("停线") !== -1 || state.fpCosts.indexOf("客诉") !== -1;
    return Object.assign({}, state, {
      falsePositiveCostHigh: high,
    });
  }

  function matchCond(cond, state) {
    if (cond.all) {
      return cond.all.every(function (c) {
        return matchCond(c, state);
      });
    }
    if (cond.any) {
      return cond.any.some(function (c) {
        return matchCond(c, state);
      });
    }
    var val = state[cond.field];
    if (Object.prototype.hasOwnProperty.call(cond, "eq")) {
      return val === cond.eq;
    }
    if (Object.prototype.hasOwnProperty.call(cond, "neq")) {
      return val !== cond.neq;
    }
    if (Object.prototype.hasOwnProperty.call(cond, "includes")) {
      return Array.isArray(val) && val.indexOf(cond.includes) !== -1;
    }
    return false;
  }

  function evaluate(state, ruleList) {
    var allow = [];
    var defer = [];
    var reject = [];
    ruleList.forEach(function (rule) {
      if (!matchCond(rule.when, state)) return;
      var item = { id: rule.id, message: loc(rule, "message"), outcome: rule.outcome, gaps: rule.gaps || [] };
      if (rule.outcome === "allow") allow.push(item);
      else if (rule.outcome === "defer") defer.push(item);
      else if (rule.outcome === "reject") reject.push(item);
    });
    var next = rankGaps(defer.concat(reject));
    var order = {};
    next.forEach(function (g, i) { order[g.key] = i; });
    function rank(it) {
      var best = 999;
      it.gaps.forEach(function (k) { if (order[k] !== undefined && order[k] < best) best = order[k]; });
      return best;
    }
    function byGap(a, b) { return rank(a) - rank(b); }
    defer.sort(byGap);
    reject.sort(byGap);
    return { allow: allow, defer: defer, reject: reject, next: next };
  }

  /** Group triggered rules by the missing evidence behind them; rank by how much each one unblocks. */
  function rankGaps(items) {
    var map = {};
    items.forEach(function (it) {
      it.gaps.forEach(function (k) {
        if (!map[k]) map[k] = { key: k, score: 0, reject: 0, defer: 0, ids: [] };
        map[k].score += WEIGHT[it.outcome] || 0;
        map[k][it.outcome] += 1;
        map[k].ids.push(it.id);
      });
    });
    return Object.keys(map)
      .map(function (k) { return map[k]; })
      .sort(function (a, b) { return b.score - a.score || b.reject - a.reject; });
  }

  function gapLabel(k) {
    return loc(gaps[k], "label") || k;
  }

  function renderNext(el, next) {
    el.querySelector(".count").textContent = String(next.length);
    var body = el.querySelector(".body");
    if (!next.length) {
      body.innerHTML = '<p class="empty">' + escapeHtml(t("emptyNext")) + "</p>";
      return;
    }
    var html = "<ol>";
    next.forEach(function (g) {
      var parts = [];
      if (g.reject) parts.push(t("unblockReject")(g.reject));
      if (g.defer) parts.push(t("unblockDefer")(g.defer));
      html +=
        "<li><strong>" + escapeHtml(gapLabel(g.key)) + "</strong>" + escapeHtml(t("parenOpen") + parts.join(t("partsSep")) + t("parenClose")) + "<br>" +
        escapeHtml(loc(gaps[g.key], "action")) + "</li>";
    });
    html += "</ol>";
    body.innerHTML = html;
  }

  function renderList(el, items, emptyText) {
    var countEl = el.querySelector(".count");
    var body = el.querySelector(".body");
    countEl.textContent = String(items.length);
    if (!items.length) {
      body.innerHTML = '<p class="empty">' + emptyText + "</p>";
      return;
    }
    var html = "<ul>";
    items.forEach(function (it) {
      html +=
        "<li><span class=\"rule-id\">" +
        escapeHtml(it.id) +
        "</span>" +
        (it.gaps && it.gaps.length
          ? '<span class="gap-tag">' + escapeHtml(t("gapPrefix")) + it.gaps.map(gapLabel).map(escapeHtml).join(escapeHtml(t("gapSep"))) + "</span>"
          : "") +
        escapeHtml(it.message) +
        "</li>";
    });
    html += "</ul>";
    body.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function run() {
    var state = enrich(readState());
    var result = evaluate(state, rules);
    renderNext($("list-next"), result.next);
    renderList($("list-allow"), result.allow, escapeHtml(t("emptyAllow")));
    renderList($("list-defer"), result.defer, escapeHtml(t("emptyDefer")));
    renderList($("list-reject"), result.reject, escapeHtml(t("emptyReject")));
    window.__lastResult = { state: state, result: result };
    return result;
  }

  function buildMarkdown(state, result) {
    var m = t("md");
    var lines = [];
    function yn(b) { return b ? m.yes : m.no; }
    function kv(key, val) { lines.push("- " + m[key] + m.colon + val); }
    var fpMap = t("fpCostLabels");
    lines.push(m.title);
    lines.push("");
    lines.push(m.source);
    lines.push("");
    lines.push(m.summary);
    lines.push("");
    kv("industry", state.industry ? displayIndustry(state.industry) : "—");
    kv("hasTaktNumber", yn(state.hasTaktNumber));
    kv("clientWantsSpeedPromise", yn(state.clientWantsSpeedPromise));
    kv("fpCosts", state.fpCosts.length
      ? state.fpCosts.map(function (v) { return fpMap[v] || v; }).join(t("gapSep"))
      : m.notSelected);
    kv("hasRecentFalsePositiveSamples", state.hasRecentFalsePositiveSamples ? m.have : m.haveNot);
    kv("hasRunExperimentOrCopyTest", yn(state.hasRunExperimentOrCopyTest));
    kv("dataDesensitizedForExternal", yn(state.dataDesensitizedForExternal));
    kv("clientConfirmedPublicScreenshot", yn(state.clientConfirmedPublicScreenshot));
    kv("hasHumanRedlineApproval", yn(state.hasHumanRedlineApproval));
    kv("askIncludesPaymentOrLineParams", yn(state.askIncludesPaymentOrLineParams));
    if (state.promisedCycleTime) {
      kv("promisedCycleTime", state.promisedCycleTime);
    }
    if (state.claimedSpeedText) {
      kv("claimedSpeedText", state.claimedSpeedText);
    }
    lines.push("");

    function heading(title, n) {
      return "## " + title + t("parenOpen") + n + t("parenClose");
    }

    function section(title, items) {
      lines.push(heading(title, items.length));
      lines.push("");
      if (!items.length) {
        lines.push(m.none);
        lines.push("");
        return;
      }
      items.forEach(function (it) {
        lines.push("- **`" + it.id + "`** " + it.message);
      });
      lines.push("");
    }

    lines.push(heading(t("nextTitle"), result.next.length));
    lines.push("");
    if (!result.next.length) {
      lines.push(m.none);
    }
    result.next.forEach(function (g, i) {
      var parts = [];
      if (g.reject) parts.push(t("unblockReject")(g.reject));
      if (g.defer) parts.push(t("unblockDefer")(g.defer));
      lines.push((i + 1) + ". **" + gapLabel(g.key) + "**" + t("parenOpen") + parts.join(t("partsSep")) + t("parenClose") + m.colon + loc(gaps[g.key], "action"));
    });
    lines.push("");

    section(t("allowTitle"), result.allow);
    section(t("deferTitle"), result.defer);
    section(t("rejectTitle"), result.reject);

    lines.push("---");
    lines.push("");
    lines.push(m.footer);
    return lines.join("\n");
  }

  function showToast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      t.classList.remove("show");
    }, 2200);
  }

  function copyMarkdown() {
    var pack = window.__lastResult;
    if (!pack) {
      run();
      pack = window.__lastResult;
    }
    var md = buildMarkdown(pack.state, pack.result);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).then(
        function () {
          showToast(t("toastCopied"));
        },
        function () {
          fallbackCopy(md);
        }
      );
    } else {
      fallbackCopy(md);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast(t("toastCopied"));
    } catch (e) {
      showToast(t("toastCopyFailed"));
    }
    document.body.removeChild(ta);
  }

  function bind() {
    var form = $("scenario-form");
    form.addEventListener("change", run);
    form.addEventListener("input", run);
    $("btn-eval").addEventListener("click", function (e) {
      e.preventDefault();
      run();
      showToast(t("toastEval"));
    });
    $("btn-copy").addEventListener("click", function (e) {
      e.preventDefault();
      copyMarkdown();
    });
    $("btn-dangerous").addEventListener("click", function (e) {
      e.preventDefault();
      writeState(presetForLang());
      var result = run();
      if (result.reject.length > 0) {
        showToast(t("toastDangerous")(result.reject.length));
      } else {
        showToast(t("toastPreset"));
      }
    });
    $("lang-toggle").addEventListener("click", function (e) {
      e.preventDefault();
      setLang(lang === "en" ? "zh" : "en");
    });
    $("btn-reset").addEventListener("click", function (e) {
      e.preventDefault();
      writeState(DEFAULT_STATE);
      run();
      showToast(t("toastReset"));
    });
  }

  function renderRulesMeta() {
    $("rules-meta").textContent = rulesLoaded ? t("rulesMeta")(rules.length, rulesVersion) : t("rulesLoading");
  }

  /** Swap a text field between language variants if it still holds the other language's preset text. */
  function swapPresetField(id, key) {
    var el = $(id);
    var v = el.value;
    if (v && (v === I18N.zh[key] || v === I18N.en[key])) el.value = t(key);
  }

  function applyLang() {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.title = t("docTitle");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("docDesc"));
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
    });
    var toggle = $("lang-toggle");
    toggle.setAttribute("aria-label", t("langToggleAria"));
    toggle.querySelectorAll("[data-lang]").forEach(function (s) {
      s.classList.toggle("active", s.getAttribute("data-lang") === lang);
    });
    var ind = $("industry");
    if (!ind.value || isIndustryDefault(ind.value)) ind.value = t("industryDefault");
    swapPresetField("promisedCycleTime", "presetCycleTime");
    swapPresetField("claimedSpeedText", "presetSpeedText");
    renderRulesMeta();
  }

  function setLang(next) {
    lang = next === "en" ? "en" : "zh";
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
    applyLang();
    if (rulesLoaded) run();
  }

  function loadRules() {
    return fetch("rules.json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("rules.json HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        rules = data.rules || [];
        gaps = data.gaps || {};
        rulesVersion = data.version || "?";
        rulesLoaded = true;
        renderRulesMeta();
      });
  }

  // Expose for smoke tests
  window.VisionPromiseBoundary = {
    evaluate: evaluate,
    rankGaps: rankGaps,
    enrich: enrich,
    matchCond: matchCond,
    buildMarkdown: buildMarkdown,
    DANGEROUS_PRESET: DANGEROUS_PRESET,
    setLang: setLang,
    getLang: function () {
      return lang;
    },
    getRules: function () {
      return rules;
    },
    run: run,
  };

  document.addEventListener("DOMContentLoaded", function () {
    bind();
    writeState(DEFAULT_STATE);
    applyLang();
    loadRules()
      .then(function () {
        $("loading").hidden = true;
        $("app-main").hidden = false;
        run();
      })
      .catch(function (err) {
        $("loading").textContent = t("loadFailed") + err.message;
      });
  });
})();
