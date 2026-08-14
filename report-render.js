// AiKen 访谈分析报告 - 渲染逻辑

function showSection(name, btn) {
  document.querySelectorAll('.nav-tab').forEach(function(t) { t.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
  var el = document.getElementById('section-' + name);
  if (el) el.classList.add('active');
}

function renderOverview() {
  var posCount = PEOPLE.filter(function(p){return p.attitude==='pos';}).length;
  var neuCount = PEOPLE.filter(function(p){return p.attitude==='neu';}).length;
  var negCount = PEOPLE.filter(function(p){return p.attitude==='neg';}).length;
  var posNames = PEOPLE.filter(function(p){return p.attitude==='pos';}).map(function(p){return p.name;}).join(' · ');
  var neuNames = PEOPLE.filter(function(p){return p.attitude==='neu';}).map(function(p){return p.name;}).join(' · ');
  var negNames = PEOPLE.filter(function(p){return p.attitude==='neg';}).map(function(p){return p.name;}).join(' · ');

  var filterCounts = {};
  PEOPLE.forEach(function(p) {
    p.filters.split(/[+，,]/).forEach(function(f) {
      f = f.trim().replace(/[（(].*$/, '').replace(/[—\-].*$/, '').trim();
      if (f && f.length <= 6) filterCounts[f] = (filterCounts[f] || 0) + 1;
    });
  });
  var filterSorted = Object.keys(filterCounts).sort(function(a, b) { return filterCounts[b] - filterCounts[a]; });

  var h = '';
  h += '<div class="section active" id="section-overview">';
  h += '<div class="section-title">报告概览</div>';
  h += '<div class="section-desc">基于12位受访者1对1深度访谈，结合89份内部调研问卷数据的综合分析</div>';

  // Summary cards
  h += '<div class="summary-row">';
  h += '<div class="summary-card card-pos"><div class="label">积极态度</div><div class="value">' + posCount + '</div><div class="sub">' + posNames + '</div></div>';
  h += '<div class="summary-card card-neu"><div class="label">中性/观望</div><div class="value">' + neuCount + '</div><div class="sub">' + neuNames + '</div></div>';
  h += '<div class="summary-card card-neg"><div class="label">消极态度</div><div class="value">' + negCount + '</div><div class="sub">' + negNames + '</div></div>';
  h += '<div class="summary-card"><div class="label">平均价格预期</div><div class="value">¥358</div><div class="sub">区间 ¥100–¥1000</div></div>';
  h += '</div>';

  // Core findings
  h += '<div class="insight-box"><h3>核心发现</h3><ul>';
  h += '<li><strong>拉片动作</strong>是引发正负分化的核心触点：积极者视为"仪式感/解压"，消极者视为"没有实际作用/有点傻"</li>';
  h += '<li><strong>36张限制</strong>引发"拍摄焦虑"与"珍惜感"两极反应，部分用户明确表示会因此减少使用频率</li>';
  h += '<li><strong>滤镜风格</strong>中"复式(富士)"获最多正面评价(8/12)，"黑白"争议最大</li>';
  h += '<li><strong>价格锚定</strong>集中在¥200–¥500区间，超过¥500后多数用户转入"需要认真考虑"区间</li>';
  h += '<li><strong>定位认知</strong>：多数用户将其视为"玩具"而非"工具"，这一认知直接压制价格天花板</li>';
  h += '<li><strong>从调研到访谈</strong>：5人态度上升、4人下降、3人基本不变——实物体验是关键转折变量</li>';
  h += '</ul></div>';

  // Attitude chart
  h += '<div class="chart-box"><div class="chart-title">受访者态度分布</div>';
  h += barRow('积极(愿意购买)', posCount, 12, 'green');
  h += barRow('中性(观望)', neuCount, 12, 'orange');
  h += barRow('消极(不感兴趣)', negCount, 12, 'red');
  h += '</div>';

  // Price chart
  h += '<div class="chart-box"><div class="chart-title">价格预期分布(¥)</div>';
  h += barRow('200元以下', 3, 12, '');
  h += barRow('200-500元', 6, 12, '');
  h += barRow('500-1000元', 2, 12, '');
  h += barRow('拒绝购买', 1, 12, 'red');
  h += '</div>';

  // Filter chart
  h += '<div class="chart-box"><div class="chart-title">滤镜偏好统计(可多选)</div>';
  filterSorted.forEach(function(f) {
    var isFuji = f.indexOf('复式') >= 0;
    h += barRow(f, filterCounts[f], 12, isFuji ? 'green' : '');
  });
  h += '</div>';

  // Note
  h += '<div class="callout"><strong>受访者构成说明：</strong>12位受访者覆盖三类人群——G1好奇者(无胶卷经验)、G2有胶卷/拍立得经验者、G3潮玩尝鲜者。其中<strong>刘莹</strong>为产品风格设计师，其风格相关意见已排除；<strong>徐玲杰</strong>和<strong>刘旋</strong>因技术原因仅记录到部分访谈内容。</div>';

  h += '</div>';
  return h;
}

function barRow(label, count, total, colorClass) {
  var pct = count / total * 100;
  var cls = colorClass ? ' ' + colorClass : '';
  return '<div class="bar-row"><div class="bar-label">' + label + '</div><div class="bar-track"><div class="bar-fill' + cls + '" style="width:' + pct + '%">' + count + '人</div></div></div>';
}

function renderAnalysis() {
  var h = '';
  h += '<div class="section" id="section-analysis">';
  h += '<div class="section-title">访谈逐人详析</div>';
  h += '<div class="section-desc">12位受访者的设备背景、产品反馈、价格预期、滤镜偏好及原话引用</div>';

  PEOPLE.forEach(function(p) {
    var att = ATTITUDE_MAP[p.attitude];
    h += '<div class="person-card">';
    h += '<div class="person-header">';
    h += '<div class="person-name">' + p.name + ' <span class="person-tag ' + att.cls + '">' + att.label + '</span>';
    p.tags.forEach(function(t) { h += ' <span class="person-tag tag-warn">' + t + '</span>'; });
    h += '</div>';
    h += '<div class="person-meta"><span class="meta-chip">' + p.devices + '</span></div>';
    h += '</div>';
    h += '<div class="person-body">';

    // Left column
    h += '<div class="person-field">';
    h += '<div class="field-label">设备背景</div><div class="field-value">' + p.devices + '</div>';
    h += '<div class="field-label">核心反馈</div><div class="field-value">' + p.feedback + '</div>';
    h += '<div class="field-label">价格预期</div><div class="field-value">' + p.price + '</div>';
    h += '</div>';

    // Right column
    h += '<div class="person-field">';
    h += '<div class="field-label">滤镜偏好</div><div class="field-value">' + p.filters + '</div>';
    h += '<div class="field-label">定位认知</div><div class="field-value">' + p.positioning + '</div>';
    if (p.extra) { h += '<div class="field-label">额外信息</div><div class="field-value">' + p.extra + '</div>'; }
    p.quotes.forEach(function(q) { h += '<div class="quote-block">' + q + '</div>'; });
    h += '</div>';

    h += '</div></div>';
  });

  h += '</div>';
  return h;
}

function renderMerge() {
  var h = '';
  h += '<div class="section" id="section-merge">';
  h += '<div class="section-title">调研x访谈合并分析</div>';
  h += '<div class="section-desc">89份问卷调研数据与12位访谈结果的交叉对比</div>';

  // Section 1: Device usage
  h += '<h3 class="sub-title">一、拍摄习惯对比</h3>';
  h += '<div class="chart-box"><div class="chart-title">日常拍摄设备使用率(访谈12人)</div>';
  h += barRow('手机', 12, 12, 'green');
  h += barRow('一次性胶卷', 5, 12, '');
  h += barRow('CCD', 4, 12, '');
  h += barRow('拍立得', 3, 12, '');
  h += barRow('胶卷相机', 3, 12, '');
  h += barRow('单反/微单', 1, 12, '');
  h += '</div>';

  h += '<div class="callout"><strong>调研对比：</strong>问卷调研(89人)中，手机拍摄率96.6%，胶卷/拍立得使用率约34%。访谈样本中胶卷/拍立得使用率58.3%(7/12)，显著高于问卷均值——这与访谈名单偏向G2(有胶卷经验)群体的设计一致。访谈中<strong>CCD用户</strong>(4人)对AiKen的接受度普遍更高，因为CCD与AiKen在"低像素复古质感"上有审美共鸣。</div>';

  // Section 2: Concept reaction
  h += '<h3 class="sub-title">二、概念反应对比</h3>';
  h += '<div class="table-wrap"><table>';
  h += '<tr><th>指标</th><th>问卷调研(89人)</th><th>访谈结果(12人)</th><th>差异分析</th></tr>';
  h += '<tr><td>积极反应率</td><td>62.9%(56人)</td><td>41.7%(5人)</td><td class="att-down">下降21.2%</td></tr>';
  h += '<tr><td>中性反应率</td><td>25.8%(23人)</td><td>33.3%(4人)</td><td class="att-up">上升7.5%</td></tr>';
  h += '<tr><td>消极反应率</td><td>11.2%(10人)</td><td>25.0%(3人)</td><td class="att-down">上升13.8%</td></tr>';
  h += '</table></div>';

  h += '<div class="callout warn"><strong>关键差异解读：</strong>访谈中消极率显著高于问卷(25% vs 11.2%)，原因有二：1)访谈中用户经历了<strong>实物体验</strong>，拉片动作的"麻烦感"在实操中被放大；2)问卷阶段用户对概念的理解基于文字描述，想象空间更大，而访谈中具体化后部分用户发现"不过如此"。但积极用户中<strong>转化深度更高</strong>——朱语婷、张震、冯洁在体验后从"感兴趣"升级为"想买"。</div>';

  // Section 3: Price
  h += '<h3 class="sub-title">三、价格预期对比</h3>';
  h += '<div class="chart-box"><div class="chart-title">价格预期区间分布对比</div>';
  h += barRow('200以下(访谈)', 3, 12, '');
  h += barRow('200以下(问卷)', 4.6, 12, 'orange');
  h += barRow('200-500(访谈)', 6, 12, 'green');
  h += barRow('200-500(问卷)', 5, 12, 'orange');
  h += barRow('500-1000(访谈)', 2, 12, '');
  h += barRow('500-1000(问卷)', 1.8, 12, 'orange');
  h += '</div>';

  h += '<div class="callout"><strong>价格洞察：</strong>访谈后200-500元区间占比从42%升至50%，说明实物体验后部分用户愿意支付更高价格——尤其是了解到"可重复使用"这一信息后(如冯洁从150-200提升至499可接受)。但200元以下区间从38%降至25%，部分低预算用户在体验后放弃购买意愿。</div>';

  // Section 4: Group analysis
  h += '<h3 class="sub-title">四、群体交叉分析</h3>';
  h += '<div class="table-wrap"><table>';
  h += '<tr><th>群体</th><th>访谈人数</th><th>积极</th><th>中性</th><th>消极</th><th>特征</th></tr>';
  h += '<tr><td>G1 好奇者</td><td>1</td><td>0</td><td>0</td><td>1</td><td>无胶卷经验，对拉片价值认知最低</td></tr>';
  h += '<tr><td>G2 胶卷/拍立得经验</td><td>7</td><td>4</td><td>2</td><td>1</td><td>最高接受度，能理解胶卷模拟的价值</td></tr>';
  h += '<tr><td>G3 潮玩尝鲜</td><td>4</td><td>1</td><td>2</td><td>1</td><td>分化明显，取决于是否重视操作手感</td></tr>';
  h += '</table></div>';

  h += '<div class="callout"><strong>群体洞察：</strong>G2群体(有胶卷/拍立得经验)是AiKen的<strong>核心目标用户</strong>——7人中4人积极、2人中性，积极率57%。他们能理解"胶卷模拟"的价值，且对价格容忍度更高。G1群体(仅1人韩志群)样本过小但信号明确：无胶卷经验者完全无法理解拉片的意义。G3群体分化最大，关键变量是"是否重视物理操作手感"——张震(重视)积极，刘嘉彦(不重视)消极。</div>';

  h += '</div>';
  return h;
}

function renderAttitude() {
  var h = '';
  h += '<div class="section" id="section-attitude">';
  h += '<div class="section-title">态度变化分析</div>';
  h += '<div class="section-desc">所有被访谈者从调研中态度到访谈后态度的变化及转折点</div>';

  // Summary
  var upCount = ATTITUDE_CHANGES.filter(function(c){return c.change==='up';}).length;
  var downCount = ATTITUDE_CHANGES.filter(function(c){return c.change==='down';}).length;
  var sameCount = ATTITUDE_CHANGES.filter(function(c){return c.change==='same';}).length;

  h += '<div class="summary-row">';
  h += '<div class="summary-card card-pos"><div class="label">态度上升</div><div class="value">' + upCount + '</div><div class="sub">朱语婷/张震/冯洁等</div></div>';
  h += '<div class="summary-card card-neg"><div class="label">态度下降</div><div class="value">' + downCount + '</div><div class="sub">孙雨琪/徐玲杰/王雅岚等</div></div>';
  h += '<div class="summary-card"><div class="label">基本不变</div><div class="value">' + sameCount + '</div><div class="sub">刘莹/刘伟钢/刘旋</div></div>';
  h += '</div>';

  // Detail table
  h += '<div class="table-wrap"><table>';
  h += '<tr><th>受访者</th><th>调研中态度</th><th>访谈后态度</th><th>变化</th><th>转折点</th></tr>';
  ATTITUDE_CHANGES.forEach(function(c) {
    var changeCls = c.change === 'up' ? 'att-up' : (c.change === 'down' ? 'att-down' : 'att-same');
    var changeText = c.change === 'up' ? '↑ 上升' : (c.change === 'down' ? '↓ 下降' : '— 不变');
    h += '<tr>';
    h += '<td><strong>' + c.name + '</strong></td>';
    h += '<td>' + c.survey + '</td>';
    h += '<td>' + c.interview + '</td>';
    h += '<td class="' + changeCls + '">' + changeText + '</td>';
    h += '<td>' + c.turning + '</td>';
    h += '</tr>';
  });
  h += '</table></div>';

  // Key patterns
  h += '<h3 class="sub-title">态度变化模式分析</h3>';

  h += '<div class="insight-box"><h3>上升模式：实物体验 + 信息补充</h3><ul>';
  h += '<li><strong>朱语婷</strong>：体验后发现"比真胶卷好——不会浪费"，可重复使用消除了胶卷最大的痛点(浪费)</li>';
  h += '<li><strong>张震</strong>：机械手感体验后热情爆发，社交分享属性进一步加分</li>';
  h += '<li><strong>冯洁</strong>：得知"可重复使用"后价格接受度从200提升至499——信息差是关键</li>';
  h += '</ul></div>';

  h += '<div class="insight-box"><h3>下降模式：实物体验 + 价值质疑</h3><ul>';
  h += '<li><strong>孙雨琪</strong>：新鲜感可能无法持续——"玩两天就放下了"</li>';
  h += '<li><strong>张子璟</strong>：36张限制引发焦虑，从"想试"降为"需要看价格和功能"</li>';
  h += '<li><strong>徐玲杰</strong>：实操后"麻烦感"放大——"吃惯细粮了"是核心转折</li>';
  h += '<li><strong>王雅岚</strong>：与手机画质对比后产生疑虑</li>';
  h += '<li><strong>刘嘉彦</strong>：体验后"不能带来不一样的体验"——预期落差</li>';
  h += '<li><strong>韩志群</strong>：完全无法理解拉片的意义——"没有实际作用，有点傻"</li>';
  h += '</ul></div>';

  h += '<div class="callout warn"><strong>核心转折变量：</strong>实物体验是态度变化的最大催化剂。问卷阶段基于概念描述的想象，在实操后发生分化：<strong>能感知"机械操作仪式感"的用户态度上升</strong>，<strong>只看到"多余步骤"的用户态度下降</strong>。第二个关键变量是<strong>"可重复使用"信息</strong>——冯洁在得知后价格接受度翻倍，说明这一信息在问卷阶段传达不足。</div>';

  h += '<div class="callout danger"><strong>风险提示：</strong>4人态度下降中有3人从"积极/中性"转为"消极"，转化不可逆。这意味着如果产品上市后用户在首次体验中无法感知拉片价值，将直接流失。建议在产品引导设计中<strong>强化"仪式感"叙事</strong>，让用户在首次使用时就建立正确预期。</div>';

  h += '</div>';
  return h;
}

function renderInsights() {
  var h = '';
  h += '<div class="section" id="section-insights">';
  h += '<div class="section-title">核心洞察与建议</div>';
  h += '<div class="section-desc">基于访谈与调研合并分析的产品策略建议</div>';

  // Insight 1
  h += '<div class="insight-box"><h3>洞察一：拉片动作是产品的"灵魂"也是"阿喀琉斯之踵"</h3><ul>';
  h += '<li>5位积极用户中，4人明确提到拉片的"仪式感/解压感/机械反馈"是核心吸引力</li>';
  h += '<li>3位消极用户中，2人明确表示拉片"没有实际作用/有点傻/麻烦"</li>';
  h += '<li><strong>建议</strong>：在产品引导和营销中，必须将拉片动作与"仪式感"叙事强绑定——让用户在首次使用前就建立正确预期，而非自行解读</li>';
  h += '</ul></div>';

  // Insight 2
  h += '<div class="insight-box"><h3>洞察二："可重复使用"是价格杠杆的关键信息</h3><ul>';
  h += '<li>冯洁在得知可重复使用后，价格接受度从150-200提升至499</li>';
  h += '<li>朱语婷的核心正面评价就是"比真胶卷好——不会浪费"</li>';
  h += '<li><strong>建议</strong>：在所有触点(包装/说明书/App引导/营销)中突出"可重复使用"信息，这是将价格天花板从200元提升至500元的关键</li>';
  h += '</ul></div>';

  // Insight 3
  h += '<div class="insight-box"><h3>洞察三：36张限制是双刃剑，需要设计缓冲</h3><ul>';
  h += '<li>张子璟明确表示"36张会焦虑，怕拍浪费了"，建议增加指示灯</li>';
  h += '<li>积极用户虽接受限制，但也提到"会减少使用频率"</li>';
  h += '<li><strong>建议</strong>：增加剩余张数指示(指示灯/App提示)；考虑"重置"机制让用户主动选择何时"换卷"，而非被动等待36张用完</li>';
  h += '</ul></div>';

  // Insight 4
  h += '<div class="insight-box"><h3>洞察四：G2群体是核心目标，G1群体需重新定位</h3><ul>';
  h += '<li>G2(有胶卷经验)积极率57%，是核心用户群</li>';
  h += '<li>G1(无胶卷经验)完全无法理解拉片价值——韩志群"有点傻"</li>';
  h += '<li><strong>建议</strong>：营销重点放在有胶卷/拍立得/CCD经验的用户群；对G1群体，需要用"复古潮流"而非"胶卷模拟"来沟通</li>';
  h += '</ul></div>';

  // Insight 5
  h += '<div class="insight-box"><h3>洞察五：滤镜"复式"是王牌，"黑白"需谨慎</h3><ul>';
  h += '<li>复式(富士)获8/12正面评价，是最受欢迎的滤镜</li>';
  h += '<li>黑白争议大：刘伟钢/张震/韩志群喜欢，但刘旋明确不喜欢</li>';
  h += '<li><strong>建议</strong>：以复式作为默认/主推滤镜；黑白作为可选风格保留，但不作为核心卖点</li>';
  h += '</ul></div>';

  // Insight 6
  h += '<div class="insight-box"><h3>洞察六：价格策略建议</h3><ul>';
  h += '<li>塑料版定价299-399元：覆盖50%用户的价格预期区间</li>';
  h += '<li>金属版定价499-599元：满足追求质感的用户(张震/朱语婷/刘旋)</li>';
  h += '<li>避免超过600元：超过后仅剩2人(刘旋/刘莹)可接受</li>';
  h += '<li><strong>建议</strong>：双版本策略，塑料版走量、金属版走利润；首发以塑料版299元作为"冲动消费"锚点</li>';
  h += '</ul></div>';

  // Insight 7
  h += '<div class="insight-box"><h3>洞察七：App端功能需求汇总</h3><ul>';
  h += '<li>朱语婷：后期编辑(裁剪/调色)</li>';
  h += '<li>张子璟：剩余张数指示</li>';
  h += '<li>刘旋：社交媒体模板</li>';
  h += '<li>冯洁/刘旋：闪光灯</li>';
  h += '<li>徐玲杰：港风人像直出(虽消极但对特定功能有兴趣)</li>';
  h += '<li><strong>建议</strong>：App端优先开发"编辑功能+社交模板+张数提示"，这些是提升留存的关键</li>';
  h += '</ul></div>';

  // Summary
  h += '<div class="callout"><strong>总结：</strong>AiKen的核心价值主张应聚焦于<strong>"可重复使用的胶卷仪式感"</strong>——用"不会浪费"解决胶卷痛点，用"拉片仪式感"创造差异化体验。目标用户为有胶卷/拍立得/CCD经验的G2群体，价格策略以塑料版299元走量、金属版499元走利润。营销中必须前置传达"可重复使用"和"仪式感"两个关键信息，避免用户在首次体验中产生"多余步骤"的错误认知。</div>';

  h += '</div>';
  return h;
}

// Init
document.getElementById('main').innerHTML =
  renderOverview() +
  renderAnalysis() +
  renderMerge() +
  renderAttitude() +
  renderInsights();
