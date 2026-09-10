(function () {
  "use strict";

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
    promisedCycleTime: "2.5秒内出结果",
    claimedSpeedText: "检测速度可达产线节拍，误报可忽略",
  };

  let rules = [];

  function $(id) {
    return document.getElementById(id);
  }

  function readState() {
    const fpCosts = [];
    document.querySelectorAll('input[name="fpCost"]:checked').forEach(function (el) {
      fpCosts.push(el.value);
    });
    return {
      industry: ($("industry").value || "").trim() || "离散制造",
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
    $("industry").value = state.industry || "离散制造";
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
      var item = { id: rule.id, message: rule.message, outcome: rule.outcome };
      if (rule.outcome === "allow") allow.push(item);
      else if (rule.outcome === "defer") defer.push(item);
      else if (rule.outcome === "reject") reject.push(item);
    });
    return { allow: allow, defer: defer, reject: reject };
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
    renderList($("list-allow"), result.allow, "当前无「可承诺」项——先补齐边界条件。");
    renderList($("list-defer"), result.defer, "无暂缓项。");
    renderList($("list-reject"), result.reject, "无拒单项。");
    window.__lastResult = { state: state, result: result };
    return result;
  }

  function buildMarkdown(state, result) {
    var lines = [];
    lines.push("# 质检承诺边界清单");
    lines.push("");
    lines.push("> 生成自 [vision-promise-boundary](https://bianwuwei.github.io/vision-promise-boundary/) · 结构演示，非法律意见");
    lines.push("");
    lines.push("## 场景摘要");
    lines.push("");
    lines.push("- 行业环节：" + (state.industry || "—"));
    lines.push("- 有节拍数字：" + (state.hasTaktNumber ? "是" : "否"));
    lines.push("- 客户要求检测速度承诺：" + (state.clientWantsSpeedPromise ? "是" : "否"));
    lines.push("- 误报代价：" + (state.fpCosts.length ? state.fpCosts.join("、") : "未选"));
    lines.push("- 近两周误报样本表：" + (state.hasRecentFalsePositiveSamples ? "有" : "无"));
    lines.push("- 已上线实验／改文案：" + (state.hasRunExperimentOrCopyTest ? "是" : "否"));
    lines.push("- 数据脱敏可对外：" + (state.dataDesensitizedForExternal ? "是" : "否"));
    lines.push("- 客户确认脱敏截图可宣传：" + (state.clientConfirmedPublicScreenshot ? "是" : "否"));
    lines.push("- 有人批红线：" + (state.hasHumanRedlineApproval ? "是" : "否"));
    lines.push("- 涉及支付／改产线参数：" + (state.askIncludesPaymentOrLineParams ? "是" : "否"));
    if (state.promisedCycleTime) {
      lines.push("- 承诺节拍／周期：" + state.promisedCycleTime);
    }
    if (state.claimedSpeedText) {
      lines.push("- 速度话术：" + state.claimedSpeedText);
    }
    lines.push("");

    function section(title, items) {
      lines.push("## " + title + "（" + items.length + "）");
      lines.push("");
      if (!items.length) {
        lines.push("_无_");
        lines.push("");
        return;
      }
      items.forEach(function (it) {
        lines.push("- **`" + it.id + "`** " + it.message);
      });
      lines.push("");
    }

    section("可承诺", result.allow);
    section("暂缓", result.defer);
    section("明确拒单", result.reject);

    lines.push("---");
    lines.push("");
    lines.push("_规则可编辑：见仓库 `docs/rules.json`_");
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
          showToast("已复制 Markdown");
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
      showToast("已复制 Markdown");
    } catch (e) {
      showToast("复制失败，请手动选择");
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
      showToast("已重新评估");
    });
    $("btn-copy").addEventListener("click", function (e) {
      e.preventDefault();
      copyMarkdown();
    });
    $("btn-dangerous").addEventListener("click", function (e) {
      e.preventDefault();
      writeState(DANGEROUS_PRESET);
      var result = run();
      if (result.reject.length > 0) {
        showToast("危险承诺预设 → 触发拒单 " + result.reject.length + " 条");
      } else {
        showToast("预设已填入");
      }
    });
    $("btn-reset").addEventListener("click", function (e) {
      e.preventDefault();
      writeState(DEFAULT_STATE);
      run();
      showToast("已重置");
    });
  }

  function loadRules() {
    return fetch("rules.json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("rules.json HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        rules = data.rules || [];
        $("rules-meta").textContent = "规则 " + rules.length + " 条 · v" + (data.version || "?");
      });
  }

  // Expose for smoke tests
  window.VisionPromiseBoundary = {
    evaluate: evaluate,
    enrich: enrich,
    matchCond: matchCond,
    buildMarkdown: buildMarkdown,
    DANGEROUS_PRESET: DANGEROUS_PRESET,
    getRules: function () {
      return rules;
    },
    run: run,
  };

  document.addEventListener("DOMContentLoaded", function () {
    bind();
    writeState(DEFAULT_STATE);
    loadRules()
      .then(function () {
        $("loading").hidden = true;
        $("app-main").hidden = false;
        run();
      })
      .catch(function (err) {
        $("loading").textContent = "加载规则失败：" + err.message;
      });
  });
})();
