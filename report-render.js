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

  // 用户分群
  html += '<h3 class="sub-title">用户分群</h3>';
  html += '<p>基于访谈反馈，12位受访者可清晰分为三类人群。分群依据：对机械交互的认同度、价格预期、使用场景偏好。</p>';
  SEGMENTS.forEach(function(seg) {
    html += '<div class="segment-card" style="border-top-color:' + seg.color + '">';
    html += '<div class="seg-header"><span class="seg-name">' + seg.name + '</span><span class="seg-count">' + seg.count + '人</span></div>';
    html += '<div class="seg-desc">' + seg.desc + '</div>';
    html += '<div class="seg-key">关键词: <strong>' + seg.key + '</strong> · 价格区间: <strong>' + seg.priceRange + '</strong></div>';
    html += '<div class="seg-members">';
    seg.members.forEach(function(m) {
      html += '<span class="seg-member">' + m + '</span>';
    });
    html += '</div></div>';
  });

  // 态度分布柱状图
  html += '<h3 class="sub-title">总体态度分布</h3>';
  html += '<div class="chart-box"><div class="chart-title">访谈后态度分布 (N=' + total + ')</div>';
  html += '<div class="bar-row"><span class="bar-label">积极</span><div class="bar-track"><div class="bar-fill green" style="width:' + (pos/total*100) + '%">' + pos + '人 (' + Math.round(pos/total*100) + '%)</div></div></div>';
  html += '<div class="bar-row"><span class="bar-label">中性</span><div class="bar-track"><div class="bar-fill orange" style="width:' + (neu/total*100) + '%">' + neu + '人 (' + Math.round(neu/total*100) + '%)</div></div></div>';
  html += '<div class="bar-row"><span class="bar-label">消极</span><div class="bar-track"><div class="bar-fill red" style="width:' + (neg/total*100) + '%">' + neg + '人 (' + Math.round(neg/total*100) + '%)</div></div></div>';
  html += '</div>';

  // 核心发现摘要
  html += '<h3 class="sub-title">核心发现</h3>';
  html += '<div class="callout"><strong>1. 机械交互是核心差异化</strong> — 拉片动作在「体验仪式驱动型」用户中引发强烈共鸣（6/6积极），但在「低匹配务实型」用户中完全失效（2/2消极）。产品需精准面向前者。</div>';
  html += '<div class="callout"><strong>2. 「可重复使用」是价格接受度的关键转折点</strong> — 5/12位受访者在得知可重复使用后价格接受度显著提升（如冯洁从200元提升至499元）。</div>';
  html += '<div class="callout"><strong>3. 36张限制是双刃剑</strong> — 8/12位提及，5位产生焦虑。需配合剩余张数指示和降低「浪费」心理成本。</div>';
  html += '<div class="callout"><strong>4. App冲洗等待是最脆弱环节</strong> — 7/12位关注等待时长，担心遗忘拍摄内容。需平衡仪式感与记忆保鲜。</div>';
  html += '<div class="callout"><strong>5. 目标用户画像清晰</strong> — 女性、18-35岁、有胶片/CCD/拍立得使用经验，对「氛围感」「仪式感」有天然追求。</div>';
  html += '<div class="callout"><strong>6. 价格锚点</strong> — 塑料版299-399元，金属版499-599元。100元以下会损害品牌定位。</div>';
  html += '<div class="callout"><strong>7. 产品定位</strong> — 有工具属性的趣味设备，而非纯玩具。成片质量能否超越手机是关键分水岭。</div>';

  // 跨访谈主题覆盖
  html += '<h3 class="sub-title">跨访谈主题覆盖</h3>';
  html += '<p>以下为12位受访者在访谈中主动提及的核心主题及其覆盖人数。覆盖率高的话题代表用户关注度最高。</p>';
  html += '<div class="chart-box"><div class="chart-title">主题提及率 (N=12)</div>';
  THEME_COVERAGE.forEach(function(t) {
    var pct = Math.round(t.count / 12 * 100);
    var cls = pct >= 80 ? 'green' : (pct >= 50 ? '' : 'orange');
    html += '<div class="bar-row"><span class="bar-label">' + t.theme + '</span><div class="bar-track"><div class="bar-fill ' + cls + '" style="width:' + pct + '%">' + t.count + '/12</div></div></div>';
  });
  html += '</div>';

  html += '</div>';
  return html;
}

// --- 核心洞察 ---
function renderInsights() {
  var html = '<div class="section" id="sec-insights">';
  html += '<div class="section-title">核心洞察</div>';
  html += '<div class="section-desc">基于12位受访者深度访谈，提炼7条核心洞察，覆盖产品定位、定价策略、体验设计和用户画像。</div>';

  // 7条核心洞察
  KEY_INSIGHTS.forEach(function(ins) {
    html += '<div class="insight-card">';
    html += '<div class="ic-header"><span class="ic-num">' + ins.id + '</span><span class="ic-title">' + ins.title + '</span><span class="ic-tag">' + ins.tag + '</span></div>';
    html += '<div class="ic-desc">' + ins.desc + '</div>';
    html += '<div class="ic-evidence">证据: ' + ins.evidence + '</div>';
    html += '</div>';
  });

  // 功能优先级矩阵
  html += '<h3 class="sub-title">功能优先级矩阵</h3>';
  html += '<p>基于访谈中用户提及频率和态度，将功能按 P0（必须）→ P3（可选）排列。necessity 为提及该功能的用户比例。</p>';
  html += '<div class="table-wrap"><table>';
  html += '<thead><tr><th>功能</th><th>优先级</th><th>提及率</th><th>状态</th><th>说明</th></tr></thead><tbody>';
  FUNCTION_PRIORITY.forEach(function(f) {
    html += '<tr><td><strong>' + f.name + '</strong></td><td><span class="priority-badge priority-' + f.priority + '">' + f.priority + '</span></td><td>' + f.necessity + '</td><td>' + f.status + '</td><td>' + f.desc + '</td></tr>';
  });
  html += '</tbody></table></div>';

  // 体验架构建议
  html += '<h3 class="sub-title">体验架构建议</h3>';
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

  // 定价建议
  html += '<h3 class="sub-title">定价建议</h3>';
  html += '<div class="two-col">';
  html += '<div class="callout"><strong>塑料版: 299–399元</strong><br>覆盖「便利价值权衡型」用户。此价位被视为「冲动消费可接受区间」，王雅岚（300冲动消费）和孙雨琪（100-200）代表此区间下限。</div>';
  html += '<div class="callout"><strong>金属版: 499–599元</strong><br>覆盖「体验仪式驱动型」用户。张震（499）、冯洁（499）、刘莹（599）均在此区间。金属材质可提升接受度。</div>';
  html += '</div>';
  html += '<div class="callout danger"><strong>定价红线</strong> — 100元以下会被视为「小孩玩具」（韩志群），反而损害品牌定位。1000元以上超出所有受访者接受范围。</div>';

  html += '</div>';
  return html;
}

// --- 调研×访谈合并 ---
function renderMerge() {
  var html = '<div class="section" id="sec-merge">';
  html += '<div class="section-title">调研×访谈合并</div>';
  html += '<div class="section-desc">逐人对比问卷回答与访谈回答，分析一致性、变化方向及触发原因。</div>';

  // 一致性统计
  html += '<div class="summary-row">';
  html += '<div class="summary-card"><div class="label">态度一致</div><div class="value">' + CONSISTENCY_STATS.totalSame + '</div><div class="sub">问卷与访谈态度相同</div></div>';
  html += '<div class="summary-card card-pos"><div class="label">正向转变</div><div class="value">' + CONSISTENCY_STATS.totalUp + '</div><div class="sub">访谈后态度提升</div></div>';
  html += '<div class="summary-card card-neg"><div class="label">负向转变</div><div class="value">' + CONSISTENCY_STATS.totalDown + '</div><div class="sub">访谈后态度下降</div></div>';
  html += '</div>';

  html += '<div class="callout"><strong>关键发现</strong> — 5位受访者态度一致，5位在实物体验后态度正向提升，仅2位负向转变。实物体验整体对产品认知有正向作用，尤其是「可重复使用」和「机械手感」两个信息点的传达。</div>';

  // 逐人对比
  PEOPLE.forEach(function(p) {
    var attInfo = ATTITUDE_MAP[p.attitude];
    var changeCls = p.changeType === 'up' ? 'change-up' : (p.changeType === 'down' ? 'change-down' : 'change-same');
    var changeLabel = p.changeType === 'up' ? '↑ 正向转变' : (p.changeType === 'down' ? '↓ 负向转变' : '→ 无变化');
    var consCls = p.consistency.includes('一致') && !p.consistency.includes('不一致') ? 'consistency-yes' : (p.consistency.includes('部分') ? 'consistency-partial' : 'consistency-no');

    html += '<div class="merge-person">';
    html += '<div class="mp-header">';
    html += '<span class="mp-name">' + p.name + ' <span class="person-tag ' + attInfo.cls + '">' + attInfo.label + '</span></span>';
    html += '<span><span class="consistency-badge ' + consCls + '">' + p.consistency + '</span> <span class="' + changeCls + '">' + changeLabel + '</span></span>';
    html += '</div>';
    html += '<div class="mp-body">';

    // 对比表头
    html += '<div class="mp-row" style="border-bottom:2px solid var(--border)">';
    html += '<div></div><div class="mp-col-header">问卷回答</div><div class="mp-col-header">访谈回答</div><div class="mp-col-header">分析</div>';
    html += '</div>';

    // 概念态度
    html += '<div class="mp-row">';
    html += '<div class="mp-row-label">概念态度</div>';
    html += '<div class="mp-survey">' + p.survey.concept + '</div>';
    html += '<div class="mp-interview">' + p.interview.attitudeLabel + '</div>';
    html += '<div class="mp-analysis">' + p.changeDetail + '</div>';
    html += '</div>';

    // 胶片经验
    html += '<div class="mp-row">';
    html += '<div class="mp-row-label">胶片经验</div>';
    html += '<div class="mp-survey">' + p.survey.filmExp + '</div>';
    html += '<div class="mp-interview">' + p.interview.devices + '</div>';
    html += '<div class="mp-analysis">' + (p.survey.filmExp.includes('在用') || p.survey.filmExp.includes('用过') ? '有胶片经验，对机械交互接受度高' : '无胶片经验，需靠实物体验转化') + '</div>';
    html += '</div>';

    // 拍摄习惯
    html += '<div class="mp-row">';
    html += '<div class="mp-row-label">拍摄习惯</div>';
    html += '<div class="mp-survey">' + p.survey.photoAttitude + '</div>';
    html += '<div class="mp-interview">' + p.interview.keyFeedback + '</div>';
    html += '<div class="mp-analysis">滤镜偏好: ' + p.interview.filters + '</div>';
    html += '</div>';

    // 价格预期
    html += '<div class="mp-row">';
    html += '<div class="mp-row-label">价格预期</div>';
    html += '<div class="mp-survey">问卷未直接询价</div>';
    html += '<div class="mp-interview">' + p.interview.price + '</div>';
    html += '<div class="mp-analysis">定位: ' + p.interview.positioning + '</div>';
    html += '</div>';

    // 触发原因
    if (p.trigger !== '—') {
      html += '<div class="mp-row">';
      html += '<div class="mp-row-label">变化触发</div>';
      html += '<div class="mp-analysis" style="grid-column:2/5;color:var(--accent)">' + p.trigger + '</div>';
      html += '</div>';
    }

    // 访谈金句
    if (p.quotes && p.quotes.length > 0) {
      html += '<div class="mp-row">';
      html += '<div class="mp-row-label">访谈金句</div>';
      html += '<div class="mp-interview" style="grid-column:2/5">';
      p.quotes.forEach(function(q) {
        html += '<div class="quote-block">' + q + '</div>';
      });
      html += '</div></div>';
    }

    html += '</div></div>';
  });

  html += '</div>';
  return html;
}

// --- 访谈详析 (补充内容) ---
function renderAnalysis() {
  var html = '<div class="section" id="sec-analysis">';
  html += '<div class="section-title">访谈详析</div>';
  html += '<div class="section-desc">12位受访者完整访谈记录摘要，作为补充参考材料。</div>';

  PEOPLE.forEach(function(p) {
    var attInfo = ATTITUDE_MAP[p.attitude];
    var seg = SEGMENTS.find(function(s) { return s.id === p.segment; });

    html += '<div class="person-card">';
    html += '<div class="person-header">';
    html += '<span class="person-name">' + p.name + ' <span class="person-tag ' + attInfo.cls + '">' + attInfo.label + '</span></span>';
    html += '<div class="person-meta">';
    if (seg) html += '<span class="meta-chip">' + seg.name + '</span>';
    if (p.survey.groups && p.survey.groups.length > 0) {
      p.survey.groups.forEach(function(g) { html += '<span class="meta-chip">' + g + '</span>'; });
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
  return html;
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

  html += '<div class="callout warn"><strong>严格等级转换对照</strong> — 若只把 T0 的「想试试 / 好奇 / 麻烦 / 不感兴趣」与 T1 的「积极 / 中性 / 消极」对应，则为 ' + c.strict.up + ' 人上升、' + c.strict.stable + ' 人不变、' + c.strict.down + ' 人下降。综合访谈强度后：冯洁属于积极加深，张子璟虽仍为中性但确定性下降，因此得到 ' + c.summary.up + ' / ' + c.summary.stable + ' / ' + c.summary.down + '。</div>';

  // T0 与 T1 结构变化
  html += '<h3 class="sub-title">T0 与 T1 的结构变化</h3>';
  html += '<div class="table-wrap"><table><thead><tr><th>阶段</th><th>积极</th><th>中性 / 好奇</th><th>负面 / 麻烦</th></tr></thead><tbody>';
  c.structure.forEach(function(s) {
    html += '<tr><td><strong>' + s.stage + '</strong></td><td class="att-up">' + s.pos + ' 人</td><td class="att-same">' + s.neu + ' 人</td><td class="att-down">' + s.neg + ' 人</td></tr>';
  });
  var d0 = c.structure[0], d1 = c.structure[1];
  html += '<tr><td><strong>净变化</strong></td><td class="att-up">' + signed(d1.pos - d0.pos) + '</td><td class="att-same">' + signed(d1.neu - d0.neu) + '</td><td class="att-down">' + signed(d1.neg - d0.neg) + '</td></tr>';
  html += '</tbody></table></div>';

  // 逐人交叉验证
  html += '<h3 class="sub-title">逐人交叉验证</h3>';
  html += '<div class="table-wrap"><table><thead><tr><th>用户</th><th>T0 前期问卷</th><th>T1 体验访谈</th><th>变化</th><th>交叉验证解释</th></tr></thead><tbody>';
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

  html += '<div class="callout warn"><strong>与既有分析的口径差异</strong> — 本页「调研×访谈」基于 12 位受访者（含徐玲杰、刘旋的部分访谈），本 Tab 按交叉验证报告执行 10 位完整访谈的逐人比较，因此统计不同：<br><br>1. <strong>刘莹</strong>：上一版判为「一致 / 无显著变化」，交叉验证按访谈强度判为「轻度增强」——她认可拉片机械反馈与解压感，仅等待仍是阻力。<br>2. <strong>统计口径</strong>：上一版为 5 上 / 5 同 / 2 下；交叉验证严格等级转换为 5 上 / 4 同 / 1 下，综合访谈强度后为 6 增强 / 2 稳定 / 2 减弱。<br>3. <strong>结论侧重</strong>：交叉验证更强调「转化的是数字化复古拍摄体验，而非胶卷介质本身」，并明确画质、36 张限制、冲扫等待、机械动作价值不足的回落风险。</div>';

  html += '</div>';
  return html;
}

// --- 初始化 ---
function init() {
  var main = document.getElementById('main-inner');
  main.innerHTML = renderOverview() + renderInsights() + renderMerge() + renderAttitude() + renderAnalysis();
}

init();
