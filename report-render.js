// AiKen 一对一深度访谈分析报告 — 渲染层

function showSection(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  var sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');
  if (btn) btn.classList.add('active');
  document.getElementById('main').scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 概览 ---
function renderOverview() {
  var pos = ATTITUDE_DIST.pos, neu = ATTITUDE_DIST.neu, neg = ATTITUDE_DIST.neg;
  var total = pos + neu + neg;

  var html = '<div class="section active" id="sec-overview">';
  html += '<div class="section-title">概览</div>';
  html += '<div class="section-desc">AiKen 概念产品一对一深度访谈分析 · 基于量化问卷筛选 + 实物体验访谈</div>';

  // 核心数据卡片
  html += '<div class="summary-row">';
  html += '<div class="summary-card"><div class="label">访谈日期</div><div class="value" style="font-size:16px">' + REPORT_META.dateRange + '</div></div>';
  html += '<div class="summary-card"><div class="label">受访者人数</div><div class="value">' + REPORT_META.intervieweeCount + '</div><div class="sub">从' + REPORT_META.surveyCount + '份问卷中筛选</div></div>';
  html += '<div class="summary-card card-pos"><div class="label">积极态度</div><div class="value">' + pos + '</div><div class="sub">' + Math.round(pos/total*100) + '% 的受访者</div></div>';
  html += '<div class="summary-card card-neu"><div class="label">中性态度</div><div class="value">' + neu + '</div><div class="sub">' + Math.round(neu/total*100) + '% 的受访者</div></div>';
  html += '<div class="summary-card card-neg"><div class="label">消极态度</div><div class="value">' + neg + '</div><div class="sub">' + Math.round(neg/total*100) + '% 的受访者</div></div>';
  html += '</div>';

  // 调研目的：三个核心假设与验证闭环
  html += '<h3 class="sub-title">调研目的：验证三个核心假设</h3>';
  html += '<div class="callout"><strong>本次调研的首要目的</strong> — ' + HYPOTHESES.intro + '</div>';

  HYPOTHESES.items.forEach(function(h) {
    var vCls = h.cls === 'pos' ? 'priority-P0' : (h.cls === 'warn' ? 'priority-P1' : 'priority-P3');
    var vIcon = h.cls === 'pos' ? '✓ 成立' : (h.cls === 'warn' ? '▲ 部分成立' : '✗ 不成立');
    html += '<div class="hypo-card">';
    html += '<div class="hypo-header"><span class="hypo-id">' + h.id + '</span><span class="hypo-name">' + h.name + '</span><span class="priority-badge ' + vCls + '">' + vIcon + '</span></div>';
    html += '<div class="hypo-conclusion"><strong>验证结论</strong> — ' + h.conclusion + '</div>';
    if (h.support.length > 0) {
      html += '<div class="hypo-block"><div class="hypo-label">支持依据</div>';
      h.support.forEach(function(q) { html += '<div class="quote-block">' + q + '</div>'; });
      html += '</div>';
    }
    if (h.oppose.length > 0) {
      html += '<div class="hypo-block"><div class="hypo-label">反证依据</div>';
      h.oppose.forEach(function(q) { html += '<div class="quote-block">' + q + '</div>'; });
      html += '</div>';
    }
    html += '</div>';
  });

  html += '<div class="callout"><strong>闭环结论</strong> — ' + HYPOTHESES.closure + '</div>';

  // 用户分群（一行三列）
  html += '<h3 class="sub-title">用户分群</h3>';
  html += '<p>基于访谈反馈，10位受访者可清晰分为三类人群。分群依据：对机械交互的认同度、价格预期、使用场景偏好。<strong>姓名色块对应其访谈态度</strong>（绿=积极 · 橙=中性 · 红=消极）。详细画像见「用户画像」页。</p>';
  html += '<div class="seg-row">';
  SEGMENTS.forEach(function(seg) {
    html += '<div class="segment-card" style="border-top-color:' + seg.color + '">';
    html += '<div class="seg-header"><span class="seg-name">' + seg.name + '</span><span class="seg-count">' + seg.count + '人</span></div>';
    html += '<div class="seg-desc">' + seg.desc + '</div>';
    html += '<div class="seg-key">关键词: <strong>' + seg.key + '</strong><br>价格区间: <strong>' + seg.priceRange + '</strong></div>';
    html += '<div class="seg-members">';
    seg.members.forEach(function(m) {
      var att = 'neu';
      PEOPLE.forEach(function(p) { if (p.name === m) att = p.attitude; });
      html += '<span class="seg-chip att-' + att + '">' + m + '</span>';
    });
    html += '</div></div>';
  });
  html += '</div>';

  // 跨访谈主题覆盖（按提及人数降序）
  html += '<h3 class="sub-title">跨访谈主题覆盖</h3>';
  html += '<p>以下为10位受访者在访谈中主动提及的核心主题及其覆盖人数。覆盖率高的话题代表用户关注度最高。</p>';
  html += '<div class="chart-box"><div class="chart-title">主题提及率 (N=10)</div>';
  var sortedThemes = THEME_COVERAGE.slice().sort(function(a, b) { return b.count - a.count; });
  sortedThemes.forEach(function(t) {
    var pct = Math.round(t.count / 10 * 100);
    var cls = pct >= 80 ? 'green' : (pct >= 50 ? '' : 'orange');
    html += '<div class="bar-row"><span class="bar-label">' + t.theme + '</span><div class="bar-track"><div class="bar-fill ' + cls + '" style="width:' + pct + '%">' + t.count + '/10</div></div></div>';
  });
  html += '</div>';

  html += '</div>';
  return html;
}

// --- 核心洞察 ---
function renderInsights() {
  var html = '<div class="section" id="sec-insights">';

  // 方法论简介（保留简单介绍）
  html += '<div class="divider"></div>';
  html += '<h3 class="sub-title">方法论：亲和图（Affinity Diagram）</h3>';
  AFFINITY.method.forEach(function(m) {
    html += '<div class="insight-box"><ul><li>' + m + '</li></ul></div>';
  });

  // 核心洞察主体：亲和图 8 簇（一行 2 个卡片）
  html += '<h3 class="sub-title">核心洞察：亲和图 8 簇</h3>';
  html += '<div class="aff-grid">';
  AFFINITY.clusters.forEach(function(c) {
    html += '<div class="aff-cluster">';
    html += '<div class="aff-head"><span class="aff-id">' + c.id + '</span><span class="aff-title">' + c.title + '</span><span class="hypo-chip">' + c.hypo + '</span></div>';
    html += '<div class="aff-notes">';
    c.notes.forEach(function(n) {
      var parts = n.split(': ');
      html += '<div class="aff-note"><span class="aff-who">' + parts[0] + '</span><span class="aff-quote">' + parts.slice(1).join(': ') + '</span></div>';
    });
    html += '</div>';
    html += '<div class="aff-takeaway"><strong>归纳</strong> — ' + c.takeaway + '</div>';
    html += '</div>';
  });
  html += '</div>';

  // 功能优先级矩阵
  html += '<h3 class="sub-title">功能优先级矩阵</h3>';
  html += '<p>基于访谈中用户提及频率和态度，将功能按 P0（必须）→ P3（可选）排列。necessity 为提及该功能的用户比例。状态列：<span class="st-ok">✓ 已定义</span> 产品已定义该功能 · <span class="st-track">🔍 追踪</span> 需持续追踪验证 · <span class="st-no">✗ 无法满足</span> 该功能不做。</p>';
  html += '<div class="table-wrap"><table>';
  html += '<thead><tr><th>功能</th><th>优先级</th><th>提及率</th><th>状态</th><th>说明</th></tr></thead><tbody>';
  FUNCTION_PRIORITY.forEach(function(f) {
    var stCls = f.status === '已定义' ? 'st-ok' : (f.status === '追踪' ? 'st-track' : 'st-no');
    var stIcon = f.status === '已定义' ? '✓' : (f.status === '追踪' ? '🔍' : '✗');
    html += '<tr><td><strong>' + f.name + '</strong></td><td><span class="priority-badge priority-' + f.priority + '">' + f.priority + '</span></td><td>' + f.necessity + '</td><td><span class="' + stCls + '">' + stIcon + ' ' + f.status + '</span></td><td>' + f.desc + '</td></tr>';
  });
  html += '</tbody></table></div>';

  // 功能必需性测试（10 份纸质问卷，与访谈矩阵互为补充）
  html += '<h3 class="sub-title">功能必需性测试</h3>';
  html += '<p>独立于访谈的量化环节：<strong>' + NECESSITY_TEST.meta + '</strong> 用户对 7 项功能做四选一评价（没它不买 / 很吸引我 / 可有可无 / 劝退）。它与上方访谈矩阵口径不同：访谈矩阵的 necessity 是「提及率」（几位受访者聊到了该功能），下表则是「必需率 / 正向率 / 劝退率」（多少人把它当作购买门槛）。两者应结合阅读，以下表为准校正优先级。</p>';
  html += '<div class="table-wrap"><table class="nec-table">';
  html += '<thead><tr><th>功能</th><th>没它不买</th><th>很吸引我</th><th>可有可无</th><th>劝退</th><th>必需率</th><th>正向率</th><th>劝退率</th><th>层级</th></tr></thead><tbody>';
  NECESSITY_TEST.rows.forEach(function(r) {
    var lvlCls = r.level === '高风险' ? 'priority-P0' : 'priority-' + r.level;
    html += '<tr><td><strong>' + r.name + '</strong></td>';
    html += '<td><span class="nec-num must">' + r.must + '</span></td>';
    html += '<td><span class="nec-num like">' + r.like + '</span></td>';
    html += '<td><span class="nec-num neutral">' + r.neutral + '</span></td>';
    html += '<td><span class="nec-num refuse">' + r.refuse + '</span></td>';
    html += '<td>' + r.mustRate + '</td><td>' + r.posRate + '</td><td>' + r.riskRate + '</td>';
    html += '<td><span class="priority-badge ' + lvlCls + '">' + r.level + '</span></td></tr>';
  });
  html += '</tbody></table></div>';
  html += '<div class="nec-legend"><span><i class="nec-dot must"></i>没它不买 = 严格必需</span><span><i class="nec-dot like"></i>很吸引我 = 明显加分</span><span><i class="nec-dot neutral"></i>可有可无 = 低优先级</span><span><i class="nec-dot refuse"></i>劝退 = 负向风险</span></div>';

  html += '<div class="insight-box"><h3>关键发现</h3><ul>';
  NECESSITY_TEST.insights.forEach(function(t) { html += '<li>' + t + '</li>'; });
  html += '</ul></div>';

  html += '<div class="callout"><strong>产品定位启示</strong> — ' + NECESSITY_TEST.positioning + '</div>';

  // 两套口径的矛盾消解
  html += '<div class="callout warn"><strong>与访谈矩阵的口径差异（以下表为准）</strong><br>';
  html += '① <strong>即时冲扫</strong>：访谈矩阵仅 P1（60% 提及率），必需性测试显示 50% 必需率、100% 正向——应升为 <span class="priority-badge priority-P0">P0</span> 体验底线。<br>';
  html += '② <strong>36 张限制</strong>：访谈矩阵列 P1（100% 提及率），但必需性测试 60% 可有可无——它不是卖点而是约束，应设计为可开关的「胶卷模式」玩法。<br>';
  html += '③ <strong>社媒拼贴</strong>：访谈矩阵仅 P2（10% 提及率），必需性测试 80%「很吸引我」——传播价值被严重低估，应升为 <span class="priority-badge priority-P1">P1</span>。<br>';
  html += '④ <strong>经典冲扫（等 3-24 小时）</strong>：0% 正向、50% 劝退——不可强制，若保留只能作为自愿开启的「慢冲洗」挑战模式。</div>';

  // 体验架构（当前产品体验架构）
  html += '<h3 class="sub-title">体验架构</h3>';
  html += '<div class="arch-box">';
  html += '<div class="arch-core">' + EXPERIENCE_ARCH.core + '</div>';
  html += '<div class="arch-modes">';
  EXPERIENCE_ARCH.modes.forEach(function(m) {
    html += '<div class="arch-mode"><div class="mode-name">' + m.name + '</div><div class="mode-desc">' + m.desc + '</div><div class="mode-focus">核心: ' + m.focus + '</div></div>';
  });
  html += '</div>';
  html += '<div class="arch-layers">';
  EXPERIENCE_ARCH.layers.forEach(function(l) {
    html += '<div class="arch-layer"><div class="layer-name">' + l.name + '</div><div class="layer-desc">' + l.desc + '</div><span class="priority-badge priority-' + l.priority + '">' + l.priority + '</span></div>';
  });
  html += '</div></div>';

  // 定价 499 元
  html += '<h3 class="sub-title">定价：499 元</h3>';
  html += '<div class="callout"><strong>499 元是既定决策，不做塑料版 / 金属版分档</strong><br>金属版因成本与信号问题不成立。499 元落在积极用户「认真考虑」区间——受访者F（499）、受访者J（可重复使用后 499 可接受）、受访者A（599 认真考虑），不是需要被验证的价格，而是需要用体验去兑现的价格。</div>';
  html += '<div class="callout"><strong>撑住 499 元的关键：外观设计与 CMF 投入</strong><br>塑料材质容易带来廉价感，会直接削弱机械手感带来的价值感知。外观设计、表面处理、按键手感、机身配重等 CMF 细节需要足够投入，让「摸到它就想拍」的物理质感与滤镜直出、冲扫等待的仪式感形成一致的价值感。</div>';
  html += '</div>';
  return html;
}

// --- 访谈详析 (补充内容) ---
function renderAnalysis() {
  var html = '<div class="section" id="sec-analysis">';
  html += '<div class="section-title">访谈详析</div>';
  html += '<div class="section-desc">10位受访者完整访谈记录摘要（受访者L、受访者K 2 份「部分」访谈未纳入），作为补充参考材料。支持按态度与问卷分组组合筛选。</div>';

  // 筛选器：态度 × 分组，均支持多选与「所有」
  var attOpts = ['pos', 'neu', 'neg'];
  var groupSet = {};
  PEOPLE.forEach(function(p) {
    (p.survey.groups || []).forEach(function(g) { groupSet[g] = 1; });
  });
  var groupOpts = Object.keys(groupSet).sort();

  html += '<div class="filter-panel">';
  html += '<div class="filter-group" id="att-filter"><span class="filter-label">态度</span>';
  html += '<label class="filter-check"><input type="checkbox" class="all" value="all" checked onchange="filterAnalysis(this)">所有</label>';
  attOpts.forEach(function(a) {
    html += '<label class="filter-check"><input type="checkbox" value="' + a + '" onchange="filterAnalysis(this)">' + ATTITUDE_MAP[a].label + '</label>';
  });
  html += '</div>';
  html += '<div class="filter-group" id="group-filter"><span class="filter-label">分组</span>';
  html += '<label class="filter-check"><input type="checkbox" class="all" value="all" checked onchange="filterAnalysis(this)">所有</label>';
  var GROUP_NAME = { G1: '胶片好奇者', G2: '胶卷/拍立得经历者', G3: '潮玩数码尝鲜者' };
  groupOpts.forEach(function(g) {
    var gname = GROUP_NAME[g] ? ' <em class="group-name">' + GROUP_NAME[g] + '</em>' : '';
    html += '<label class="filter-check"><input type="checkbox" value="' + g + '" onchange="filterAnalysis(this)">' + g + gname + '</label>';
  });
  html += '</div>';
  html += '</div>';
  html += '<div class="filter-hint" id="analysis-count">当前显示 ' + PEOPLE.length + ' / ' + PEOPLE.length + ' 位受访者</div>';
  html += '<div id="analysis-list">';

  PEOPLE.forEach(function(p) {
    var attInfo = ATTITUDE_MAP[p.attitude];
    var seg = SEGMENTS.find(function(s) { return s.id === p.segment; });
    var gAttr = (p.survey.groups || []).join(',');

    html += '<div class="person-card" data-att="' + p.attitude + '" data-groups="' + gAttr + '">';
    html += '<div class="person-header">';
    html += '<span class="person-name">' + p.name + ' <span class="person-tag ' + attInfo.cls + '">' + attInfo.label + '</span></span>';
    html += '<div class="person-meta">';
    if (seg) html += '<span class="meta-chip">' + seg.name + '</span>';
    if (p.survey.groups && p.survey.groups.length > 0) {
      p.survey.groups.forEach(function(g) { html += '<span class="meta-chip" title="' + (GROUP_NAME[g] || g) + '">' + g + '</span>'; });
    }
    html += '<span class="meta-chip">' + p.survey.age + '</span>';
    html += '<span class="meta-chip">' + p.survey.gender + '</span>';
    html += '</div></div>';

    html += '<div class="person-body">';
    // 左列
    html += '<div>';
    html += '<div class="person-field"><div class="field-label">使用设备</div><div class="field-value">' + p.interview.devices + '</div></div>';
    html += '<div class="person-field"><div class="field-label">核心反馈</div><div class="field-value">' + p.interview.keyFeedback + '</div></div>';
    html += '<div class="person-field"><div class="field-label">价格预期</div><div class="field-value">' + p.interview.price + '</div></div>';
    html += '</div>';
    // 右列
    html += '<div>';
    html += '<div class="person-field"><div class="field-label">滤镜偏好</div><div class="field-value">' + p.interview.filters + '</div></div>';
    html += '<div class="person-field"><div class="field-label">产品定位</div><div class="field-value">' + p.interview.positioning + '</div></div>';
    if (p.interview.extra) {
      html += '<div class="person-field"><div class="field-label">额外期望</div><div class="field-value">' + p.interview.extra + '</div></div>';
    }
    html += '<div class="person-field"><div class="field-label">问卷概念态度</div><div class="field-value">' + p.survey.concept + '</div></div>';
    html += '</div>';
    html += '</div>';

    // 金句
    if (p.quotes && p.quotes.length > 0) {
      html += '<div style="margin-top:12px">';
      p.quotes.forEach(function(q) {
        html += '<div class="quote-block">' + q + '</div>';
      });
      html += '</div>';
    }

    html += '</div>';
  });

  html += '</div>';
  html += '</div>';
  return html;
}

// --- 访谈详析筛选：态度 × 分组（多选，含「所有」） ---
function filterAnalysis(el) {
  if (el) {
    var grp = el.closest('.filter-group');
    if (el.value === 'all') {
      if (el.checked) {
        grp.querySelectorAll('input:not(.all)').forEach(function(c) { c.checked = false; });
      }
    } else {
      if (el.checked) {
        grp.querySelector('input.all').checked = false;
      } else {
        var any = Array.prototype.some.call(grp.querySelectorAll('input:not(.all)'), function(c) { return c.checked; });
        if (!any) grp.querySelector('input.all').checked = true;
      }
    }
  }

  function selValues(panelId) {
    var values = [];
    var any = false;
    document.querySelectorAll('#' + panelId + ' input:not(.all)').forEach(function(cb) {
      if (cb.checked) { values.push(cb.value); any = true; }
    });
    return any ? values : null; // null 表示不过滤
  }

  var atts = selValues('att-filter');
  var grps = selValues('group-filter');
  var cards = document.querySelectorAll('#analysis-list .person-card');
  var visible = 0;

  cards.forEach(function(card) {
    var show = true;
    if (atts) show = show && atts.indexOf(card.getAttribute('data-att')) !== -1;
    if (grps) {
      var gs = (card.getAttribute('data-groups') || '').split(',').filter(Boolean);
      show = show && gs.some(function(g) { return grps.indexOf(g) !== -1; });
    }
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  var countEl = document.getElementById('analysis-count');
  if (countEl) countEl.textContent = '当前显示 ' + visible + ' / ' + cards.length + ' 位受访者';
}

// --- 态度变化（T0 问卷 × T1 访谈交叉验证） ---
function renderAttitude() {
  var c = ATTITUDE_CHANGE;
  var total = c.summary.total;

  function signed(n) { return n > 0 ? '+' + n : String(n); }

  var html = '<div class="section" id="sec-attitude">';
  html += '<div class="section-title">态度变化</div>';
  html += '<div class="section-desc">T0 倾向性问卷 × T1 一对一实物体验访谈 · 按 10 位完整访谈逐人交叉验证</div>';

  // 一句话结论
  html += '<div class="callout"><strong>一句话结论</strong> — ' + c.conclusion + '</div>';

  // 核心结论
  html += '<div class="summary-row">';
  html += '<div class="summary-card card-pos"><div class="label">态度增强 / 积极加深</div><div class="value">' + c.summary.up + '</div><div class="sub">' + Math.round(c.summary.up / total * 100) + '% 的受访者</div></div>';
  html += '<div class="summary-card card-neu"><div class="label">整体基本稳定</div><div class="value">' + c.summary.stable + '</div><div class="sub">' + Math.round(c.summary.stable / total * 100) + '% 的受访者</div></div>';
  html += '<div class="summary-card card-neg"><div class="label">体验后态度减弱</div><div class="value">' + c.summary.down + '</div><div class="sub">' + Math.round(c.summary.down / total * 100) + '% 的受访者</div></div>';
  html += '</div>';

  html += '<div class="callout warn"><strong>严格等级转换对照</strong> — 若只把 T0 的「想试试 / 好奇 / 麻烦 / 不感兴趣」与 T1 的「积极 / 中性 / 消极」对应，则为 ' + c.strict.up + ' 人上升、' + c.strict.stable + ' 人不变、' + c.strict.down + ' 人下降。综合访谈强度后：受访者J属于积极加深，受访者E虽仍为中性但确定性下降，因此得到 ' + c.summary.up + ' / ' + c.summary.stable + ' / ' + c.summary.down + '。</div>';

  // T0 与 T1 结构变化
  html += '<h3 class="sub-title">T0 与 T1 的结构变化 (N=10，10 位完整访谈)</h3>';
  html += '<div class="table-wrap"><table><thead><tr><th>阶段</th><th>积极</th><th>中性 / 好奇</th><th>负面 / 麻烦</th></tr></thead><tbody>';
  c.structure.forEach(function(s) {
    html += '<tr><td><strong>' + s.stage + '</strong></td><td class="att-up">' + s.pos + ' 人</td><td class="att-same">' + s.neu + ' 人</td><td class="att-down">' + s.neg + ' 人</td></tr>';
  });
  var d0 = c.structure[0], d1 = c.structure[1];
  html += '<tr><td><strong>净变化</strong></td><td class="att-up">' + signed(d1.pos - d0.pos) + '</td><td class="att-same">' + signed(d1.neu - d0.neu) + '</td><td class="att-down">' + signed(d1.neg - d0.neg) + '</td></tr>';
  html += '</tbody></table></div>';

  // 逐人交叉验证
  html += '<h3 class="sub-title">逐人交叉验证</h3>';
  html += '<div class="table-wrap"><table class="att-cmp-table"><colgroup><col class="col-user"><col class="col-t0"><col class="col-t1"><col class="col-change"><col class="col-explain"></colgroup><thead><tr><th>用户</th><th>T0 前期问卷</th><th>T1 体验访谈</th><th>变化</th><th>交叉验证解释</th></tr></thead><tbody>';
  c.people.forEach(function(p) {
    var cls = p.level === 'up' ? 'att-up' : (p.level === 'down' ? 'att-down' : 'att-same');
    html += '<tr><td><strong>' + p.name + '</strong></td><td>' + p.t0 + '</td><td>' + p.t1 + '</td><td class="' + cls + '">' + p.change + '</td><td>' + p.explain + '</td></tr>';
  });
  html += '</tbody></table></div>';

  // 变化是如何发生的
  html += '<h3 class="sub-title">变化是如何发生的</h3>';
  html += '<div class="two-col">';
  html += '<div>';
  html += '<div class="callout"><strong>正向转化路径</strong></div>';
  c.positivePaths.forEach(function(t) { html += '<div class="insight-box"><ul><li>' + t + '</li></ul></div>'; });
  html += '</div>';
  html += '<div>';
  html += '<div class="callout danger"><strong>负向回落路径</strong></div>';
  c.negativePaths.forEach(function(t) { html += '<div class="insight-box"><ul><li>' + t + '</li></ul></div>'; });
  html += '</div>';
  html += '</div>';

  // 前期胶卷关系
  html += '<h3 class="sub-title">前期胶卷关系（9/10 已有经验或好奇）</h3>';
  html += '<div class="table-wrap"><table><thead><tr><th>T0 胶卷关系</th><th>人数</th><th>解释</th></tr></thead><tbody>';
  c.filmRelation.forEach(function(f) {
    html += '<tr><td><strong>' + f.type + '</strong></td><td>' + f.count + '</td><td>' + f.explain + '</td></tr>';
  });
  html += '</tbody></table></div>';

  // 对产品与后续研究的含义
  html += '<h3 class="sub-title">对产品与后续研究的含义</h3>';
  html += '<div class="insight-box"><h3>产品表达优先级</h3><ul>';
  c.productPriorities.forEach(function(t) { html += '<li>' + t + '</li>'; });
  html += '</ul></div>';
  html += '<div class="table-wrap"><table><thead><tr><th>优先级</th><th>人群</th><th>主要信息</th><th>不应过度承诺</th></tr></thead><tbody>';
  c.userStrategy.forEach(function(u) {
    var cls = u.tier === 'P0' ? 'priority-P0' : (u.tier === 'P1' ? 'priority-P1' : 'priority-P3');
    html += '<tr><td><span class="priority-badge ' + cls + '">' + u.tier + '</span></td><td>' + u.crowd + '</td><td>' + u.message + '</td><td>' + u.avoid + '</td></tr>';
  });
  html += '</tbody></table></div>';
  html += '<div class="callout"><strong>建议用于汇报的最终表述</strong> — ' + c.finalStatement + '</div>';

  // 方法说明与数据边界
  html += '<h3 class="sub-title">方法说明与数据边界</h3>';
  html += '<div class="insight-box"><h3>编码方法</h3><ul>';
  c.codingMethod.forEach(function(t) { html += '<li>' + t + '</li>'; });
  html += '</ul></div>';
  html += '<div class="insight-box"><h3>样本与限制</h3><ul>';
  c.limits.forEach(function(t) { html += '<li>' + t + '</li>'; });
  html += '</ul></div>';

  html += '</div>';
  return html;
}

// --- 用户画像 ---
function renderPersona() {
  var p = PERSONA;
  var html = '<div class="section" id="sec-persona">';
  html += '<div class="section-title">用户画像</div>';
  html += '<div class="section-desc">访谈人群 × 问卷 G 分组交叉画像 · 10 位完整访谈 + 89 份问卷</div>';

  // 画像交叉说明
  html += '<div class="callout">' + p.intro + '</div>';

  // 三类人群详细画像
  html += '<h3 class="sub-title">三类人群画像（访谈侧）</h3>';
  html += '<p>下面对每类人群展开：人口学构成、设备经验、态度分布、价格预期、购买动机、关键顾虑与沟通策略。</p>';

  p.personas.forEach(function(seg) {
    var color = '';
    if (seg.id === 'ritual') color = 'var(--accent)';
    else if (seg.id === 'value') color = 'var(--warn)';
    else color = 'var(--danger)';

    html += '<div class="segment-card" style="border-top-color:' + color + '">';
    html += '<div class="seg-header"><span class="seg-name">' + seg.name + '</span><span class="seg-count">' + seg.count + '人</span></div>';

    // 成员（态度色块）
    html += '<div class="seg-members">';
    seg.members.forEach(function(m) {
      var att = 'neu';
      PEOPLE.forEach(function(x) { if (x.name === m) att = x.attitude; });
      html += '<span class="seg-chip att-' + att + '">' + m + '</span>';
    });
    html += '</div>';

    // 画像明细表
    html += '<div class="persona-grid">';
    var rows = [
      ['态度分布', seg.attitude],
      ['人口学', seg.demographic],
      ['设备经验', seg.device],
      ['价格预期', seg.price],
      ['问卷 G 分组', seg.gGroup],
      ['购买动机', seg.motivation],
      ['关键顾虑', seg.concern],
      ['决策因素', seg.decision],
      ['沟通策略', seg.message]
    ];
    rows.forEach(function(r) {
      html += '<div class="persona-row"><div class="persona-k">' + r[0] + '</div><div class="persona-v">' + r[1] + '</div></div>';
    });
    html += '</div>';

    // 代表语录
    html += '<div class="quote-block">' + seg.quote + '</div>';
    html += '</div>';
  });

  // G 分组（问卷侧）
  html += '<h3 class="sub-title">问卷 G 分组（问卷侧）</h3>';
  html += '<p>89 份倾向性问卷按设备经验与审美取向分为三组，10 位受访者均来自其中。G 分组回答的是「目标用户长什么样」，与访谈侧的三类人群互为印证。</p>';
  html += '<div class="seg-row">';
  p.gGroups.forEach(function(g) {
    html += '<div class="segment-card">';
    html += '<div class="seg-header"><span class="seg-name">' + g.id + ' · ' + g.name + '</span><span class="seg-count">' + g.count + '人</span></div>';
    html += '<div class="seg-desc">' + g.desc + '</div>';
    html += '<div class="seg-members">';
    g.members.forEach(function(m) {
      var att = 'neu';
      PEOPLE.forEach(function(x) { if (x.name === m) att = x.attitude; });
      html += '<span class="seg-chip att-' + att + '">' + m + '</span>';
    });
    html += '</div>';
    html += '<div class="seg-key">特质</div><div class="seg-desc">';
    g.traits.forEach(function(t) { html += '<div class="g-trait">· ' + t + '</div>'; });
    html += '</div></div>';
  });
  html += '</div>';

  // 问卷 × 访谈 映射
  html += '<h3 class="sub-title">问卷 × 访谈 交叉映射</h3>';
  html += '<div class="table-wrap"><table><thead><tr><th>问卷 G 分组</th><th>对应访谈人群</th><th>转化要点</th></tr></thead><tbody>';
  p.mapping.forEach(function(m) {
    html += '<tr><td><strong>' + m.q + '</strong></td><td>' + m.i + '</td><td>' + m.note + '</td></tr>';
  });
  html += '</tbody></table></div>';

  // 画像结论
  html += '<h3 class="sub-title">画像结论</h3>';
  html += '<div class="callout">' + p.conclusion + '</div>';

  html += '</div>';
  return html;
}

// --- 初始化 ---
function init() {
  var main = document.getElementById('main-inner');
  main.innerHTML = renderOverview() + renderPersona() + renderInsights() + renderAttitude() + renderAnalysis();
}

init();
