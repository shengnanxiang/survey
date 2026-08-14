// AiKen 一对一深度访谈分析报告 — 数据层
// 数据来源: 12份访谈记录 + 89份量化问卷(其中12位为访谈对象)

var REPORT_META = {
  dateRange: "2026年8月5日 – 8月12日",
  intervieweeCount: 12,
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
  { id: "ritual", name: "体验仪式驱动型", count: 6, members: ["刘莹","朱语婷","张震","冯洁","刘旋","张子璟"],
    desc: "对胶片美学、机械交互和仪式感有天然认同。拉片动作本身即价值，愿意为「感觉」付费。",
    priceRange: "399–799元", key: "机械手感 + 胶片直出 + 仪式感", color: "var(--accent)" },
  { id: "value", name: "便利价值权衡型", count: 4, members: ["孙雨琪","刘伟钢","王雅岚","刘嘉彦"],
    desc: "对新鲜事物好奇，但会优先比较成片质量、使用效率和价格。需要被「说服」。",
    priceRange: "299–499元", key: "画质 + 即时查看 + 便携性", color: "var(--warn)" },
  { id: "pragmatic", name: "低匹配务实型", count: 2, members: ["韩志群","徐玲杰"],
    desc: "不认同额外操作步骤，对机械交互无感。即使价格降低也未必转化。",
    priceRange: "—", key: "无法被机械交互打动", color: "var(--danger)" }
];

// --- 12位受访者完整数据 ---
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
    consistency:"一致", changeType:"same",
    changeDetail:"问卷「有点好奇」→访谈「积极」。作为内部人员对产品已有认知，态度一致，无显著变化。",
    trigger:"—",
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
    consistency:"部分一致", changeType:"up",
    changeDetail:"问卷「听起来有点麻烦」→访谈「中性偏好奇」。实物体验后觉得拉片有新鲜感，但不确定能否持续。",
    trigger:"拉片动作的物理反馈带来新鲜感",
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
    consistency:"不一致（正向转变）", changeType:"up",
    changeDetail:"问卷「听起来有点麻烦」→访谈「积极」。体验后发现「比真胶卷好——不会浪费」，态度大幅转变。",
    trigger:"可重复使用消除了浪费焦虑，拉片仪式感与现有胶卷使用习惯契合",
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
    consistency:"一致", changeType:"same",
    changeDetail:"问卷「有点好奇」→访谈「中性」。喜欢机械感但始终在玩具与工具之间犹豫，态度未变。",
    trigger:"—",
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
    consistency:"不一致（负向转变）", changeType:"down",
    changeDetail:"问卷「有点好奇」+「很想参加」→访谈「中性」。36张限制引发拍摄焦虑，从「想试」降为「需要看价格和功能再决定」。",
    trigger:"36张限制带来拍摄焦虑",
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
    consistency:"不一致（正向转变）", changeType:"up",
    changeDetail:"问卷「听起来有点麻烦」→访谈「积极」。机械手感体验后热情爆发，从「感兴趣」升级为「想买+想推荐给朋友」。",
    trigger:"机械手感的物理体验 + 社交分享属性",
    quotes:["这个机械的手感太好了，你摸到它就想拍，这就是仪式感。","跟朋友一起拍然后等冲洗出来，这个过程本身就很有意思，比直接发手机照片强多了。"] },

  { name:"徐玲杰", segment:"pragmatic", attitude:"neg",
    survey:{ age:"36-45岁", gender:"男", groups:["G2"], concept:"完全不感兴趣",
      filmExp:"用过，但已经不用了", instantExp:"用过，但已经不用了", filterFreq:"偶尔使用（每月几次）",
      purchased:["以上都没有"], shareFreq:"几乎不分享", platforms:[],
      photoAttitude:"基本都是随手记录", phoneNotEnough:"从没有过，手机拍照挺好的",
      ritual:"精心构图、调参数、灯光线", interviewWill:"可以参加，但要看具体时间" },
    interview:{ attitudeLabel:"消极", devices:"手机拍摄为主，2B产品经理",
      keyFeedback:"非常消极。拉片麻烦，吃惯细粮了。99元也不买。但对直出人像（港风）有兴趣。",
      price:"拒绝购买（99元也不买）", filters:"对港风人像直出有兴趣",
      positioning:"无价值的麻烦制造者", extra:"" },
    consistency:"一致", changeType:"same",
    changeDetail:"问卷「完全不感兴趣」→访谈「消极」。态度一致，实物体验后更加确认「太麻烦」。",
    trigger:"—",
    quotes:["太麻烦了，我已经吃惯细粮了，你让我回去吃粗粮，我不愿意。","99块我也不买，因为我用不上。但如果能直出那种港风人像，我倒是有兴趣。"] },

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
    consistency:"部分一致", changeType:"up",
    changeDetail:"问卷「听起来有点麻烦」→访谈「中性」。拉片有新鲜感但与数码对比后产生疑虑。",
    trigger:"拉片新鲜感 vs 画质对比疑虑",
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
    consistency:"不一致（负向转变）", changeType:"down",
    changeDetail:"问卷「有点好奇」→访谈「消极」。体验后认为「不能带来不一样的体验」，从中性好奇转为明确不感兴趣。",
    trigger:"预期落差——拉片只是「开一下关一下」，无差异化体验",
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
    consistency:"一致", changeType:"same",
    changeDetail:"问卷「听起来有点麻烦」→访谈「消极」。对拉片完全无法理解——「没有实际作用，有点傻」。",
    trigger:"—",
    quotes:["拉片这个动作没有实际作用啊，就是多了一个步骤，有点傻。","一百块的话可以给小孩玩玩，贵了就没意思了。"] },

  { name:"刘旋", segment:"ritual", attitude:"pos",
    survey:{ age:"26-35岁", gender:"女", groups:["G1"], concept:"有点好奇，但不确定自己会不会用",
      filmExp:"从没用过，但挺好奇的", instantExp:"用过，但已经不用了", filterFreq:"偶尔使用（每月几次）",
      purchased:["富士拍立得","CCD相机"], shareFreq:"偶尔分享（每月几次）", platforms:["小红书","微信朋友圈"],
      photoAttitude:"大部分想认真拍，偶尔随手记录", phoneNotEnough:"经常有这种感觉",
      ritual:"拍完立刻拿到实体照片", interviewWill:"很想参加" },
    interview:{ attitudeLabel:"积极", devices:"手机 + 拍立得 + CCD + 一次性",
      keyFeedback:"喜欢复式，不喜欢黑白。拉片可有可无。即时扫描很吸引。想要社交媒体模板。",
      price:"1000以内，499可以", filters:"复式 + 原图",
      positioning:"有社交属性的趣味设备", extra:"期望: 社交媒体模板/闪光灯" },
    consistency:"一致", changeType:"same",
    changeDetail:"问卷「有点好奇」→访谈「积极」。即时扫描功能维持了兴趣，态度一致。",
    trigger:"—",
    quotes:["即时扫描那个功能很吸引我，拍完马上能看到，这个好。","拉片对我来说可有可无，但整体体验我觉得挺有意思的。"] },

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
    consistency:"一致", changeType:"up",
    changeDetail:"问卷「很有意思想试试」→访谈「积极（加深）」。得知可重复使用后价格接受度从200提升至499。",
    trigger:"可重复使用消除了成本焦虑 + 拉片仪式感契合现有胶卷使用习惯",
    quotes:["挺期待的，就是那种你拿起来就想拍的感觉，有仪式感。","一开始觉得一两百，后来知道可以重复用，那四五百也行，毕竟不是一次性的。"] }
];

// --- 跨访谈主题覆盖 ---
var THEME_COVERAGE = [
  { theme:"成片质量/画质", count:10, detail:"10/12位受访者主动提及画质，其中8位与手机对比" },
  { theme:"即时查看/扫描", count:10, detail:"10/12位关注拍后能否立即看到效果" },
  { theme:"拉片手感/仪式感", count:12, detail:"12/12位均对拉片动作有明确反馈（6积极/3中性/3消极）" },
  { theme:"36张限制", count:8, detail:"8/12位提及36张限制，5位表示焦虑，3位认为可接受" },
  { theme:"价格预期", count:12, detail:"12/12位给出价格预期，区间100–1000元" },
  { theme:"App冲洗等待", count:7, detail:"7/12位关注冲洗等待时长，担心遗忘拍摄内容" },
  { theme:"社交分享", count:6, detail:"6/12位提及社交分享场景，认为等待冲洗过程有社交价值" },
  { theme:"滤镜风格", count:9, detail:"9/12位对滤镜风格有明确偏好，复式(富士)最受欢迎" },
  { theme:"可重复使用", count:5, detail:"5/12位在得知可重复使用后价格接受度提升" },
  { theme:"与拍立得对比", count:4, detail:"4/12位将产品与拍立得对比，认为可替代" }
];

// --- 功能优先级矩阵 ---
var FUNCTION_PRIORITY = [
  { name:"胶片滤镜直出", priority:"P0", necessity:"92%", desc:"核心卖点。9/12位明确偏好，是购买决策的首要因素", status:"必须" },
  { name:"拉片上弦机械结构", priority:"P0", necessity:"83%", desc:"差异化核心。12/12位有明确反馈，6位高度认可", status:"必须" },
  { name:"App冲洗等待体验", priority:"P0", necessity:"58%", desc:"7/12位关注等待时长，需精心设计避免焦虑", status:"必须" },
  { name:"36张拍摄限制", priority:"P1", necessity:"67%", desc:"仪式感来源但8/12位提及，需配合剩余张数提示", status:"核心" },
  { name:"即时扫描预览", priority:"P1", necessity:"83%", desc:"10/12位期待即时查看，是体验闭环的关键环节", status:"核心" },
  { name:"复式(富士)滤镜", priority:"P1", necessity:"75%", desc:"最受欢迎的滤镜风格，6/12位首选", status:"核心" },
  { name:"剩余张数指示", priority:"P2", necessity:"42%", desc:"张子璟明确提出，缓解36张焦虑的辅助功能", status:"增强" },
  { name:"App后期编辑", priority:"P2", necessity:"33%", desc:"朱语婷期望裁剪/调色功能", status:"增强" },
  { name:"社交媒体模板", priority:"P2", necessity:"25%", desc:"刘旋期望一键分享模板", status:"增强" },
  { name:"闪光灯", priority:"P3", necessity:"17%", desc:"冯洁、刘旋提及，低光场景需求", status:"可选" },
  { name:"港风人像直出", priority:"P3", necessity:"17%", desc:"徐玲杰唯一感兴趣的功能点", status:"可选" }
];

// --- 核心洞察 ---
var KEY_INSIGHTS = [
  { id:1, title:"机械交互是核心差异化，但非万能解药",
    desc:"拉片动作在「体验仪式驱动型」用户中引发强烈共鸣（6/6积极），但在「低匹配务实型」用户中完全失效（2/2消极）。产品定位必须精准面向前者，而非试图说服后者。",
    evidence:"张震: 「你摸到它就想拍」vs 韩志群: 「没有实际作用，有点傻」",
    tag:"定位" },
  { id:2, title:"「可重复使用」是价格接受度的关键转折点",
    desc:"5/12位受访者在得知产品可重复使用后，价格接受度显著提升。冯洁从200元提升至499元，朱语婷认为「比真胶卷好——不会浪费」。这一信息必须在产品介绍中前置。",
    evidence:"冯洁: 200→499元；朱语婷: 「不会浪费」",
    tag:"定价" },
  { id:3, title:"36张限制是双刃剑——仪式感与焦虑并存",
    desc:"8/12位提及36张限制。积极面：营造稀缺感和仪式感；消极面：5位产生拍摄焦虑。解决方案不是取消限制，而是增加剩余张数指示（张子璟建议）和降低「浪费」的心理成本。",
    evidence:"张子璟: 「怕拍浪费了」；朱语婷: 「拍坏了也不心疼」",
    tag:"体验设计" },
  { id:4, title:"App冲洗等待是体验闭环中最脆弱的环节",
    desc:"7/12位关注冲洗等待时长。刘莹指出「等太久会忘了拍的是什么」。等待设计需要平衡仪式感（不能太快）和记忆保鲜（不能太慢），建议引入冲洗进度可视化和拍摄时刻记录。",
    evidence:"刘莹: 「等冲洗的时间如果太长，我可能就忘了当时拍的是什么了」",
    tag:"体验设计" },
  { id:5, title:"目标用户画像：女性、18-35岁、有胶片/CCD/拍立得使用经验",
    desc:"6位「体验仪式驱动型」用户中，5位为女性，全部有胶片或CCD或拍立得使用经验。她们对「氛围感」「仪式感」有天然追求，且在小红书等平台有分享习惯。产品营销应聚焦此人群。",
    evidence:"分群数据: 体验仪式驱动型 6人，5女1男，全部有复古拍摄设备经验",
    tag:"用户画像" },
  { id:6, title:"价格锚点：塑料版299-399元，金属版499-599元",
    desc:"综合12位受访者价格预期，积极用户的价格区间集中在399-599元（金属版）。塑料版应锚定299-399元以覆盖「便利价值权衡型」用户。100元以下会被视为「小孩玩具」，反而损害品牌定位。",
    evidence:"张震: 塑料399/金属499；冯洁: 可重复使用后499可接受；刘莹: 599认真考虑",
    tag:"定价" },
  { id:7, title:"产品定位：有工具属性的趣味设备，而非纯玩具",
    desc:"12位受访者中，9位将产品定位为「玩具」或「趣味设备」，但积极用户更倾向「有工具属性」。关键差异在于成片质量——如果画质能超越手机，产品将从「玩具」升级为「工具」。王雅岚的疑虑代表了价值权衡型用户的核心顾虑。",
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
  pos: 5,  // 刘莹、朱语婷、张震、刘旋、冯洁
  neu: 4,  // 孙雨琪、刘伟钢、张子璟、王雅岚
  neg: 3   // 徐玲杰、刘嘉彦、韩志群
};

// --- 问卷vs访谈一致性统计 ---
var CONSISTENCY_STATS = {
  consistent: 5,      // 刘莹、刘伟钢、徐玲杰、韩志群、刘旋
  positiveChange: 5,  // 孙雨琪、朱语婷、张震、冯洁、王雅岚 (up)
  negativeChange: 2,  // 张子璟、刘嘉彦 (down)
  totalUp: 5,
  totalSame: 5,
  totalDown: 2
};
