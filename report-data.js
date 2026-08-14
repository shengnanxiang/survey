// AiKen 一对一深度访谈分析报告 — 数据层
// 数据来源: 10份完整访谈记录（另有徐玲杰、刘旋 2 份「部分」访谈未纳入）+ 89份量化问卷(其中10位为访谈对象)

var REPORT_META = {
  dateRange: "2026年8月5日 – 8月12日",
  intervieweeCount: 10,
  surveyCount: 89,
  analysisDate: "2026年8月14日"
};

var ATTITUDE_MAP = {
  pos: { label: "积极", cls: "tag-pos" },
  neu: { label: "中性", cls: "tag-neu" },
  neg: { label: "消极", cls: "tag-neg" }
};

// --- 用户分群 ---
var SEGMENTS = [
  { id: "ritual", name: "体验仪式驱动型", count: 5, members: ["刘莹","朱语婷","张震","冯洁","张子璟"],
    desc: "对胶片美学、机械交互和仪式感有天然认同。拉片动作本身即价值，愿意为「感觉」付费。",
    priceRange: "399–799元", key: "机械手感 + 胶片直出 + 仪式感", color: "var(--accent)" },
  { id: "value", name: "便利价值权衡型", count: 4, members: ["孙雨琪","刘伟钢","王雅岚","刘嘉彦"],
    desc: "对新鲜事物好奇，但会优先比较成片质量、使用效率和价格。需要被「说服」。",
    priceRange: "299–499元", key: "画质 + 即时查看 + 便携性", color: "var(--warn)" },
  { id: "pragmatic", name: "低匹配务实型", count: 1, members: ["韩志群"],
    desc: "不认同额外操作步骤，对机械交互无感。即使价格降低也未必转化。",
    priceRange: "—", key: "无法被机械交互打动", color: "var(--danger)" }
];

// --- 10位受访者完整数据（徐玲杰、刘旋为「部分」访谈，未纳入） ---
var PEOPLE = [
  { name:"刘莹", segment:"ritual", attitude:"pos",
    survey:{ age:"36-45岁", gender:"女", groups:["G2","G3"], concept:"有点好奇，但不确定自己会不会用",
      filmExp:"用过，但已经不用了", instantExp:"是，现在还在用", filterFreq:"经常使用（每周至少几次）",
      purchased:["CCD相机"], shareFreq:"经常分享（每周几次）", platforms:["小红书","微信朋友圈","抖音"],
      photoAttitude:"大部分是随手记录，偶尔想认真拍", phoneNotEnough:"经常有这种感觉",
      ritual:"精心构图、调参数、灯光线", interviewWill:"很想参加" },
    interview:{ attitudeLabel:"积极", devices:"手机 + 多台相机（胶卷/数码/CCD/运动）",
      keyFeedback:"拉片动作有解压感，36张限制接受度高。但等待冲洗让人焦虑，关注App冲洗等待时长设计。",
      price:"300以下=玩具；599=认真考虑。金属材质可提升接受度。", filters:"复式（富士）",
      positioning:"介于玩具与工具之间，偏有趣玩具", extra:"" },
    quotes:["拉片这个动作确实有解压的感觉，就是那种咔嚓一下，挺爽的。","等冲洗的时间如果太长，我可能就忘了当时拍的是什么了，这个体验需要设计好。"] },

  { name:"孙雨琪", segment:"value", attitude:"neu",
    survey:{ age:"26-35岁", gender:"女", groups:[], concept:"听起来有点麻烦",
      filmExp:"从没用过，也不太感兴趣", instantExp:"从没用过，也不太感兴趣", filterFreq:"很少使用（装过但很少打开）",
      purchased:["以上都没有"], shareFreq:"偶尔分享（每月几次）", platforms:["微信朋友圈","小红书"],
      photoAttitude:"基本都是随手记录", phoneNotEnough:"偶尔有",
      ritual:"不追求完美，但每次快门都经过思考", interviewWill:"可以参加，但要看具体时间" },
    interview:{ attitudeLabel:"中性", devices:"手机 + 一次性胶卷 + CCD",
      keyFeedback:"喜欢氛围感，有尝试意愿但不强烈。拉片有新鲜感但不确定能否持续。",
      price:"100–200元，明确玩具定位", filters:"柯达金 — 喜欢暖色调氛围",
      positioning:"玩具", extra:"" },
    quotes:["我比较喜欢那种有氛围感的照片，就是看起来不是那么清晰但是有感觉的那种。","一两百块的话我会买来玩玩，贵了就算了。"] },

  { name:"朱语婷", segment:"ritual", attitude:"pos",
    survey:{ age:"18-25岁", gender:"女", groups:["G2","G3"], concept:"听起来有点麻烦",
      filmExp:"是，现在还在用", instantExp:"是，现在还在用", filterFreq:"很少使用（装过但很少打开）",
      purchased:["富士拍立得","CCD相机"], shareFreq:"偶尔分享（每月几次）", platforms:["小红书","微信朋友圈","抖音","微博","Instagram"],
      photoAttitude:"大部分是随手记录，偶尔想认真拍", phoneNotEnough:"偶尔有",
      ritual:"不追求完美，但每次快门都经过思考", interviewWill:"可以参加，但要看具体时间" },
    interview:{ attitudeLabel:"积极", devices:"手机 + 奥林巴斯胶卷 + 一次性",
      keyFeedback:"非常积极。认为比真实胶卷更好——不会浪费。希望增加编辑功能。拉片有仪式感。",
      price:"塑料版200–300，金属版500–600", filters:"复式（富士）",
      positioning:"有工具属性的玩具——比纯玩具更有价值", extra:"期望功能: App端支持后期编辑（裁剪/调色）" },
    quotes:["比真的胶卷好，因为不会浪费。拍坏了也不心疼，但又有那个仪式感。","如果能在App里再编辑一下就好了，比如裁剪啊调色啊，那就更完美了。"] },

  { name:"刘伟钢", segment:"value", attitude:"neu",
    survey:{ age:"18-25岁", gender:"男", groups:["G1","G2"], concept:"有点好奇，但不确定自己会不会用",
      filmExp:"从没用过，但挺好奇的", instantExp:"用过，但已经不用了", filterFreq:"偶尔使用（每月几次）",
      purchased:["以上都没有"], shareFreq:"经常分享（每周几次）", platforms:["微信朋友圈"],
      photoAttitude:"大部分是随手记录，偶尔想认真拍", phoneNotEnough:"经常有这种感觉",
      ritual:"不追求完美，但每次快门都经过思考", interviewWill:"可以参加，但要看具体时间" },
    interview:{ attitudeLabel:"中性", devices:"手机 + 借相机",
      keyFeedback:"喜欢复古操作感，拉片有机械反馈。36张限制有轻微焦虑但可接受。介于玩具和工具之间。",
      price:"500可接受，1000是上限", filters:"黑白 — 喜欢复古质感",
      positioning:"介于玩具与工具之间", extra:"" },
    quotes:["那种机械的操作感挺好的，现在数码的东西太没有手感了。","五百块还行，一千的话我得想想值不值了。"] },

  { name:"张子璟", segment:"ritual", attitude:"neu",
    survey:{ age:"26-35岁", gender:"女", groups:["G2","G3"], concept:"有点好奇，但不确定自己会不会用",
      filmExp:"从没用过，但挺好奇的", instantExp:"是，现在还在用", filterFreq:"很少使用（装过但很少打开）",
      purchased:["富士拍立得"], shareFreq:"偶尔分享（每月几次）", platforms:["小红书"],
      photoAttitude:"大部分想认真拍，偶尔随手记录", phoneNotEnough:"经常有这种感觉",
      ritual:"拍完立刻拿到实体照片", interviewWill:"很想参加" },
    interview:{ attitudeLabel:"中性", devices:"佳能250 + 大疆Pocket4",
      keyFeedback:"拉片是最喜欢的点。36张限制带来拍摄焦虑。希望有指示灯提示剩余张数。可替代拍立得。",
      price:"500元", filters:"交叉冲洗 + 复式（富士）",
      positioning:"可替代拍立得的新型玩具", extra:"改进建议: 增加剩余张数指示灯" },
    quotes:["拉片是我最喜欢的设计，就是那种物理反馈，跟按屏幕完全不一样。","36张的话我会焦虑，怕拍浪费了。最好有个指示灯告诉我还剩多少。"] },

  { name:"张震", segment:"ritual", attitude:"pos",
    survey:{ age:"26-35岁", gender:"男", groups:["G1"], concept:"听起来有点麻烦",
      filmExp:"从没用过，但挺好奇的", instantExp:"从没用过，但挺好奇的", filterFreq:"偶尔使用（每月几次）",
      purchased:["以上都没有"], shareFreq:"偶尔分享（每月几次）", platforms:["微信朋友圈"],
      photoAttitude:"几乎每次都是认真对待", phoneNotEnough:"偶尔有",
      ritual:"精心构图、调参数、灯光线", interviewWill:"可以参加，但要看具体时间" },
    interview:{ attitudeLabel:"积极", devices:"美术背景 + 前单反用户",
      keyFeedback:"非常积极。喜欢机械手感和社交分享属性。拉片有仪式感。对产品充满热情。",
      price:"塑料版399，金属版499", filters:"黑白 + 交叉冲洗",
      positioning:"有社交属性的创意工具", extra:"" },
    quotes:["这个机械的手感太好了，你摸到它就想拍，这就是仪式感。","跟朋友一起拍然后等冲洗出来，这个过程本身就很有意思，比直接发手机照片强多了。"] },

  { name:"王雅岚", segment:"value", attitude:"neu",
    survey:{ age:"18-25岁", gender:"女", groups:["G3"], concept:"听起来有点麻烦",
      filmExp:"从没用过，但挺好奇的", instantExp:"从没用过，但挺好奇的", filterFreq:"从未使用过",
      purchased:["CCD相机"], shareFreq:"几乎不分享", platforms:[],
      photoAttitude:"大部分想认真拍，偶尔随手记录", phoneNotEnough:"经常有这种感觉",
      ritual:"不追求完美，但每次快门都经过思考", interviewWill:"可以参加，但要看具体时间" },
    interview:{ attitudeLabel:"中性", devices:"手机 + 旧CCD",
      keyFeedback:"态度谨慎。不断与数码对比，担心画质。拉片有新鲜感但不确定必要性。兴趣一般。",
      price:"300冲动消费，500需要研究", filters:"复式（富士）",
      positioning:"需要更多理由才能购买的可选玩具", extra:"" },
    quotes:["我会拿它跟手机比，如果画质还不如手机那我为什么要用这个呢?","三百块的话可能冲动就买了，五百的话我得好好研究一下。"] },

  { name:"刘嘉彦", segment:"value", attitude:"neg",
    survey:{ age:"26-35岁", gender:"女", groups:["G2","G3"], concept:"有点好奇，但不确定自己会不会用",
      filmExp:"用过，但已经不用了", instantExp:"用过，但已经不用了", filterFreq:"很少使用（装过但很少打开）",
      purchased:["富士拍立得"], shareFreq:"偶尔分享（每月几次）", platforms:["微信朋友圈","Instagram"],
      photoAttitude:"差不多", phoneNotEnough:"好像有过几次",
      ritual:"不追求完美，但每次快门都经过思考", interviewWill:"可以参加，但要看具体时间" },
    interview:{ attitudeLabel:"消极", devices:"手机 + 一次性富士",
      keyFeedback:"不被吸引——不能带来不一样的体验。拉片只是开合。300封顶。玩具。",
      price:"300封顶", filters:"复式（富士）",
      positioning:"玩具", extra:"" },
    quotes:["它不能够给我带来什么不一样的体验，拉片也就是开一下关一下。","三百块顶天了，再贵我就不买了。"] },

  { name:"韩志群", segment:"pragmatic", attitude:"neg",
    survey:{ age:"26-35岁", gender:"男", groups:["G2"], concept:"听起来有点麻烦",
      filmExp:"用过，但已经不用了", instantExp:"从没用过，但挺好奇的", filterFreq:"很少使用（装过但很少打开）",
      purchased:["以上都没有"], shareFreq:"几乎不分享", platforms:[],
      photoAttitude:"大部分是随手记录，偶尔想认真拍", phoneNotEnough:"好像有过几次",
      ritual:"不追求完美，但每次快门都经过思考", interviewWill:"可以参加，但要看具体时间" },
    interview:{ attitudeLabel:"消极", devices:"仅手机",
      keyFeedback:"对拉片困惑——没有实际作用，有点傻。100封顶。给小孩玩的玩具。兴趣极低。",
      price:"100封顶", filters:"黑白",
      positioning:"给小孩玩的玩具", extra:"" },
    quotes:["拉片这个动作没有实际作用啊，就是多了一个步骤，有点傻。","一百块的话可以给小孩玩玩，贵了就没意思了。"] },

  { name:"冯洁", segment:"ritual", attitude:"pos",
    survey:{ age:"26-35岁", gender:"女", groups:["G2","G3"], concept:"很有意思想试试",
      filmExp:"是，现在还在用", instantExp:"是，现在还在用", filterFreq:"经常使用（每周至少几次）",
      purchased:["富士拍立得","CCD相机"], shareFreq:"经常分享（每周几次）", platforms:["小红书","微信朋友圈","抖音"],
      photoAttitude:"大部分想认真拍，偶尔随手记录", phoneNotEnough:"经常有这种感觉",
      ritual:"精心构图、调参数、灯光线", interviewWill:"很想参加" },
    interview:{ attitudeLabel:"积极", devices:"手机 + 拍立得 + CCD + 一次性",
      keyFeedback:"非常积极——挺期待的。拉片=仪式感。得知可重复使用后价格接受度上升。想要闪光灯。",
      price:"初始150–200，了解可重复使用后499可接受", filters:"复式 + 原图",
      positioning:"有仪式感的趣味设备", extra:"期望: 闪光灯" },
    quotes:["挺期待的，就是那种你拿起来就想拍的感觉，有仪式感。","一开始觉得一两百，后来知道可以重复用，那四五百也行，毕竟不是一次性的。"] }
];

// --- 跨访谈主题覆盖 ---
var THEME_COVERAGE = [
  { theme:"成片质量/画质", count:10, detail:"10/10位受访者主动提及画质，其中2位（刘伟钢、韩志群）与手机画质对比" },
  { theme:"即时查看/扫描", count:6, detail:"6/10位（刘莹、孙雨琪、刘伟钢、张子璟、王雅岚、冯洁）关注拍后能否立即看到效果" },
  { theme:"拉片手感/仪式感", count:10, detail:"10/10位均对拉片动作有明确反馈（6积极/2中性/2消极）" },
  { theme:"36张限制", count:10, detail:"10/10位提及36张限制，2位（张子璟、朱语婷）产生焦虑，4位认为可接受" },
  { theme:"价格预期", count:10, detail:"10/10位给出价格预期，区间100–1000元" },
  { theme:"App冲洗等待", count:8, detail:"8/10位关注冲洗等待时长，担心遗忘拍摄内容" },
  { theme:"社交分享", count:9, detail:"9/10位提及社交分享场景（韩志群几乎不分享）" },
  { theme:"滤镜风格", count:10, detail:"10/10位对滤镜风格有明确偏好，7位首选复式(富士)" },
  { theme:"可重复使用", count:2, detail:"2/10位（冯洁、朱语婷）在得知可重复使用后价格接受度提升" },
  { theme:"与拍立得对比", count:5, detail:"5/10位将产品与拍立得对比，其中2位（刘伟钢、张子璟）认为可替代/更好" }
];

// --- 功能优先级矩阵 ---
var FUNCTION_PRIORITY = [
  { name:"胶片滤镜直出", priority:"P0", necessity:"100%", desc:"核心卖点。10/10位有明确滤镜偏好（7位首选复式），是购买决策的首要因素", status:"必须" },
  { name:"拉片上弦机械结构", priority:"P0", necessity:"100%", desc:"差异化核心。10/10位有明确反馈，6位积极认可", status:"必须" },
  { name:"App冲洗等待体验", priority:"P0", necessity:"80%", desc:"8/10位关注等待时长，需精心设计避免焦虑", status:"必须" },
  { name:"36张拍摄限制", priority:"P1", necessity:"100%", desc:"仪式感来源但10/10位提及，2位产生焦虑，需配合剩余张数提示", status:"核心" },
  { name:"即时扫描预览", priority:"P1", necessity:"60%", desc:"6/10位期待即时查看，是体验闭环的关键环节", status:"核心" },
  { name:"复式(富士)滤镜", priority:"P1", necessity:"70%", desc:"最受欢迎的滤镜风格，7/10位首选", status:"核心" },
  { name:"剩余张数指示", priority:"P2", necessity:"10%", desc:"张子璟明确提出，缓解36张焦虑的辅助功能", status:"增强" },
  { name:"App后期编辑", priority:"P2", necessity:"10%", desc:"朱语婷期望裁剪/调色功能", status:"增强" },
  { name:"社交媒体模板", priority:"P2", necessity:"10%", desc:"张震提及社媒拼贴很有吸引力，一键分享模板需求", status:"增强" },
  { name:"闪光灯", priority:"P3", necessity:"10%", desc:"冯洁提及，低光场景需求", status:"可选" }
];

// --- 核心洞察 ---
var KEY_INSIGHTS = [
  { id:1, title:"机械交互是核心差异化，但非万能解药",
    desc:"拉片动作在「体验仪式驱动型」用户中引发强烈共鸣（5人中4人积极），但在「低匹配务实型」用户中完全失效（1/1消极）。产品定位必须精准面向前者，而非试图说服后者。",
    evidence:"张震: 「你摸到它就想拍」vs 韩志群: 「没有实际作用，有点傻」",
    tag:"定位" },
  { id:2, title:"「可重复使用」是价格接受度的关键转折点",
    desc:"2/10位受访者在得知产品可重复使用后，价格接受度显著提升。冯洁从200元提升至499元，朱语婷认为「非实体不会浪费」。这一信息必须在产品介绍中前置。",
    evidence:"冯洁: 200→499元；朱语婷: 「不会浪费」",
    tag:"定价" },
  { id:3, title:"36张限制是双刃剑——仪式感与焦虑并存",
    desc:"10/10位提及36张限制。积极面：营造稀缺感和仪式感（冯洁「36张挺有意义」）；消极面：张子璟明确产生拍摄焦虑、朱语婷觉得张数不够。解决方案不是取消限制，而是增加剩余张数指示（张子璟建议）和降低「浪费」的心理成本。",
    evidence:"张子璟: 「怕拍浪费了」；冯洁: 「36张也挺有意义的」",
    tag:"体验设计" },
  { id:4, title:"App冲洗等待是体验闭环中最脆弱的环节",
    desc:"8/10位关注冲洗等待时长。刘莹指出「等太久会忘了拍的是什么」，张震、张子璟甚至表示等待会直接劝退。等待设计需要平衡仪式感（不能太快）和记忆保鲜（不能太慢），建议引入冲洗进度可视化和拍摄时刻记录。",
    evidence:"刘莹: 「等冲洗的时间如果太长，我可能就忘了当时拍的是什么了」",
    tag:"体验设计" },
  { id:5, title:"目标用户画像：女性、18-35岁、有胶片/CCD/拍立得使用经验",
    desc:"5位「体验仪式驱动型」用户中，4位为女性，全部有胶片或CCD或拍立得使用经验。她们对「氛围感」「仪式感」有天然追求，且在小红书等平台有分享习惯。产品营销应聚焦此人群。",
    evidence:"分群数据: 体验仪式驱动型 5人，4女1男，全部有复古拍摄设备经验",
    tag:"用户画像" },
  { id:6, title:"价格锚点：塑料版299-399元，金属版499-599元",
    desc:"综合10位受访者价格预期，积极用户的价格区间集中在399-599元（金属版）。塑料版应锚定299-399元以覆盖「便利价值权衡型」用户。100元以下会被视为「小孩玩具」，反而损害品牌定位。",
    evidence:"张震: 塑料399/金属499；冯洁: 可重复使用后499可接受；刘莹: 599认真考虑",
    tag:"定价" },
  { id:7, title:"产品定位：有工具属性的趣味设备，而非纯玩具",
    desc:"10位受访者中，9位将产品定位为「玩具」或「趣味设备」，但积极用户更倾向「有工具属性」。关键差异在于成片质量——如果画质能超越手机，产品将从「玩具」升级为「工具」。王雅岚的疑虑代表了价值权衡型用户的核心顾虑。",
    evidence:"王雅岚: 「如果画质还不如手机那我为什么要用这个呢?」",
    tag:"定位" }
];

// --- 体验架构建议 ---
var EXPERIENCE_ARCH = {
  core: "机械交互 × 胶片美学 × 数字便利的融合体验",
  modes: [
    { name:"拍摄模式", desc:"拉片上弦 → 取景构图 → 按下快门 → 物理反馈", focus:"机械仪式感" },
    { name:"冲洗模式", desc:"App连接 → 等待冲洗 → 成片揭晓 → 滤镜呈现", focus:"期待与惊喜" }
  ],
  layers: [
    { name:"物理层", desc:"拉片手感、快门声、机身质感", priority:"P0" },
    { name:"数字层", desc:"App冲洗、滤镜直出、即时扫描", priority:"P0" },
    { name:"社交层", desc:"分享模板、成片展示、拍摄故事", priority:"P2" }
  ]
};

// --- 态度分布 ---
var ATTITUDE_DIST = {
  pos: 4,  // 刘莹、朱语婷、张震、冯洁
  neu: 4,  // 孙雨琪、刘伟钢、张子璟、王雅岚
  neg: 2   // 刘嘉彦、韩志群
};

// --- 态度变化交叉验证（T0 倾向性问卷 × T1 实物体验访谈） ---
// 依据《AiKen前期问卷与访谈态度变化交叉验证报告》(2026-08-14)，按 10 位完整访谈执行逐人比较。
var ATTITUDE_CHANGE = {
  conclusion: "体验后整体态度净向正面移动，但用户被转化的是「数字化复古拍摄体验」，而不是传统胶卷介质本身。机械手感和可重复使用推动转化；画质、36张限制、冲扫等待和功能差异不足造成回落。",
  finalStatement: "前期问卷低估了实物机械交互的吸引力。「听起来麻烦」并不等于真实拒绝，部分用户在体验拉片手感、理解可重复使用后明显转正；但体验也暴露出画质、36张限制、冲扫等待和机械动作价值不足等问题。",
  summary: { up: 6, stable: 2, down: 2, total: 10 },
  strict: { up: 5, stable: 4, down: 1 },
  structure: [
    { stage: "T0 前期问卷", pos: 1, neu: 4, neg: 5 },
    { stage: "T1 体验访谈", pos: 4, neu: 4, neg: 2 }
  ],
  people: [
    { name:"刘莹",   t0:"用过胶卷但已停用；仍用拍立得；对 AiKen 好奇但不确定", t1:"认可拉片的机械反馈和解压感；接受36张限制；担心等待冲扫", change:"轻度增强", level:"up",
      explain:"手感验证了仪式价值，但等待仍是阻力" },
    { name:"孙雨琪", t0:"没用过胶卷且不太感兴趣；认为有点麻烦；只接受100–200元", t1:"喜欢氛围感，拉片带来新鲜感；愿尝试", change:"明显增强", level:"up",
      explain:"从不感兴趣转为可以玩玩，尚未形成高价值认同" },
    { name:"朱语婷", t0:"正在使用胶卷和拍立得；认同慢拍，但认为 AiKen 麻烦", t1:"认为可重复使用解决浪费；认可拉片仪式感；接受200–600元", change:"显著增强", level:"up",
      explain:"保留胶卷感觉，同时降低耗材和浪费焦虑" },
    { name:"刘伟钢", t0:"没用过胶卷但好奇；经常觉得手机少了感觉", t1:"喜欢复古机械感，但仍在玩具和工具之间犹豫；500元可考虑", change:"基本稳定", level:"same",
      explain:"兴趣真实，但缺少促成立即购买的决定性理由" },
    { name:"张子璟", t0:"没用过胶卷但好奇；仍用拍立得；对 AiKen 好奇", t1:"喜欢拉片，但36张限制引发浪费焦虑；需要看价格和功能决定", change:"略有减弱", level:"down",
      explain:"概念有吸引力，具体使用限制降低确定性" },
    { name:"张震",   t0:"没用过胶卷但好奇；问卷认为产品麻烦", t1:"实物拉片后高度认可机械手感，并产生购买和推荐意愿", change:"显著增强", level:"up",
      explain:"产品价值需要通过触摸和操作才能被理解" },
    { name:"王雅岚", t0:"没用过胶卷但好奇；买过CCD；认为 AiKen 麻烦", t1:"拉片有新鲜感，但会与手机画质比较；300元可能冲动购买", change:"中度增强", level:"up",
      explain:"体验消除部分麻烦感，画质仍决定工具价值" },
    { name:"刘嘉彦", t0:"用过胶卷和拍立得但已经不用；仍有一点好奇", t1:"认为拉片只是多一次开合，没有带来足够不同的体验；300元封顶", change:"明显减弱", level:"down",
      explain:"实物未达到预期，机械动作的价值不足" },
    { name:"韩志群", t0:"用过胶卷但已停用；认为 AiKen 麻烦", t1:"认为拉片没有实际功能，只是增加步骤；仅考虑给小孩玩", change:"稳定负面", level:"same",
      explain:"胶卷经历并不等于认同复古仪式" },
    { name:"冯洁",   t0:"正在使用胶卷、拍立得和CCD；已经表示很想试", t1:"体验后进一步认可仪式感；得知可重复使用后，接受价由约200元升至499元", change:"积极加深", level:"up",
      explain:"可重复使用显著提高产品价值和支付意愿" }
  ],
  positivePaths: [
    "文字概念中的「麻烦」，在实物操作后被重新解释为机械反馈和仪式感。孙雨琪、朱语婷、张震、王雅岚均出现不同程度的正向移动。",
    "「可重复使用」显著降低了用户对耗材成本和拍坏浪费的担忧。朱语婷认为它比真实胶卷更少浪费；冯洁的价格接受度由约200元上升至499元。",
    "复古氛围和滤镜直出让用户看到手机之外的审美价值，但只有在成片质量可信时，产品才会从新鲜玩具升级为趣味工具。"
  ],
  negativePaths: [
    "36张限制既制造稀缺感，也制造浪费焦虑。张子璟从好奇转为条件式接受，明确需要剩余张数提示。",
    "如果拉片只被理解为「开一下、关一下」，机械动作就会从差异化价值变成额外步骤。刘嘉彦和韩志群代表这一风险。",
    "冲扫等待如果太久，会让期待感变成遗忘和焦虑；画质如果不如手机，也会削弱单独携带设备的合理性。"
  ],
  filmRelation: [
    { type:"正在使用胶卷", count:2, explain:"原本就是高匹配用户" },
    { type:"用过但已停用", count:3, explain:"有经验，但不一定认同继续承担胶卷成本与麻烦" },
    { type:"没用过但好奇", count:4, explain:"最大可转化人群，需要低门槛体验" },
    { type:"没用过且不感兴趣", count:1, explain:"实物仍可带来有限的新鲜感，但价格预期低" }
  ],
  productPriorities: [
    "把「可重复使用」放到概念介绍的前半段，明确它与真实胶卷在成本和浪费上的区别。",
    "在招募、售卖和线下陈列中提供可操作样机。拉片价值很难依靠文字或静态图完整传达。",
    "保留36张的仪式结构，同时加入剩余张数提示，降低浪费和失控感。",
    "设计可感知的冲洗进度与拍摄时间线，让等待成为期待，而不是遗忘。",
    "用稳定、差异化的成片质量证明单独携带设备的价值；否则用户会回到手机比较。"
  ],
  userStrategy: [
    { tier:"P0", crowd:"已有胶卷 / 拍立得 / CCD 经验，且追求氛围和仪式感", message:"机械手感、可重复使用、滤镜直出", avoid:"专业画质或效率" },
    { tier:"P1", crowd:"没用过胶卷但好奇、觉得手机少了感觉", message:"低门槛体验、样机试用、可控等待", avoid:"「越麻烦越复古」" },
    { tier:"观察", crowd:"效率优先、几乎不分享、认为手机足够", message:"仅在画质或特定直出风格上验证", avoid:"通过降价强行转化" }
  ],
  codingMethod: [
    "T0 不仅使用概念反应题，还结合胶卷与拍立得经验、滤镜使用、手机摄影不满足、仪式感认知和分享行为。",
    "T1 综合受访者对拉片、36张限制、等待冲扫、成片质量、使用场景、产品定位、价格和购买意愿的表达。",
    "「增强 / 稳定 / 减弱」是研究编码，而非同一道题的严格统计复测，因此同时报告了严格等级转换与综合判断。"
  ],
  limits: [
    "访谈记录共 12 份，其中徐玲杰、刘旋为「部分」访谈，未纳入统计：徐玲杰记录不全（其现有内容显示态度稳定负面，若纳入仍属「稳定」）；刘旋为远程访谈、未做实物体验，不满足 T1 实物体验比较前提。全报告统一按 10 位完整访谈统计。",
    "样本来自倾向性问卷筛选，并非随机抽样，不能将 10 人比例直接外推到全部目标市场。",
    "T1 包含实物体验和更完整信息，态度变化可能同时受到产品本身、主持人说明、信息顺序和新鲜感影响。",
    "结果支持产品方向判断，但最终购买转化仍需通过原型试用、价格实验或预售行为验证。"
  ]
};
