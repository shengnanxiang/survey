// AiKen 访谈分析报告 - 数据文件
var PEOPLE = [
  {
    name: "刘莹",
    attitude: "pos",
    tags: ["内部-风格设计师", "G2"],
    devices: "手机+多台相机(含胶卷/数码/CCD)",
    feedback: "拉片动作有解压感，但等待冲洗让人焦虑。对36张限制接受度高。关注App冲洗等待时长设计。",
    price: "300以下=玩具;599=认真考虑。金属材质可提升接受度。",
    filters: "复式(富士) - 风格意见已排除",
    positioning: "介于玩具与工具之间，偏有趣玩具",
    quotes: [
      "拉片这个动作确实有解压的感觉，就是那种咔嚓一下，挺爽的。",
      "等冲洗的时间如果太长，我可能就忘了当时拍的是什么了，这个体验需要设计好。"
    ]
  },
  {
    name: "孙雨琪",
    attitude: "neu",
    tags: ["G2"],
    devices: "手机+一次性胶卷+CCD",
    feedback: "喜欢氛围感，有尝试意愿但不强烈。拉片有新鲜感但不确定能否持续。",
    price: "100-200元，明确玩具定位",
    filters: "柯达金 - 喜欢暖色调氛围",
    positioning: "玩具",
    quotes: [
      "我比较喜欢那种有氛围感的照片，就是看起来不是那么清晰但是有感觉的那种。",
      "一两百块的话我会买来玩玩，贵了就算了。"
    ]
  },
  {
    name: "朱语婷",
    attitude: "pos",
    tags: ["G2"],
    devices: "手机+奥林巴斯胶卷+一次性",
    feedback: "非常积极。认为比真实胶卷更好--不会浪费。希望增加编辑功能。拉片有仪式感。",
    price: "塑料版200-300，金属版500-600",
    filters: "复式(富士)",
    positioning: "有工具属性的玩具--比纯玩具更有价值",
    extra: "期望功能: App端支持后期编辑(裁剪/调色)",
    quotes: [
      "比真的胶卷好，因为不会浪费。拍坏了也不心疼，但又有那个仪式感。",
      "如果能在App里再编辑一下就好了，比如裁剪啊调色啊，那就更完美了。"
    ]
  },
  {
    name: "刘伟钢",
    attitude: "neu",
    tags: ["G2"],
    devices: "手机+借相机",
    feedback: "喜欢复古操作感，拉片有机械反馈。36张限制有轻微焦虑但可接受。介于玩具和工具之间。",
    price: "500可接受，1000是上限",
    filters: "黑白 - 喜欢复古质感",
    positioning: "介于玩具与工具之间",
    quotes: [
      "那种机械的操作感挺好的，现在数码的东西太没有手感了。",
      "五百块还行，一千的话我得想想值不值了。"
    ]
  },
  {
    name: "张子璟",
    attitude: "neu",
    tags: ["G3"],
    devices: "佳能250+大疆Pocket4",
    feedback: "拉片是最喜欢的点。36张限制带来拍摄焦虑。希望有指示灯提示剩余张数。可替代拍立得。",
    price: "500元",
    filters: "交叉冲洗+复式(富士)",
    positioning: "可替代拍立得的新型玩具",
    extra: "改进建议: 增加剩余张数指示灯",
    quotes: [
      "拉片是我最喜欢的设计，就是那种物理反馈，跟按屏幕完全不一样。",
      "36张的话我会焦虑，怕拍浪费了。最好有个指示灯告诉我还剩多少。"
    ]
  },
  {
    name: "张震",
    attitude: "pos",
    tags: ["G3"],
    devices: "美术背景+前单反用户",
    feedback: "非常积极。喜欢机械手感和社会化分享属性。拉片有仪式感。对产品充满热情。",
    price: "塑料版399，金属版499",
    filters: "黑白+交叉冲洗",
    positioning: "有社交属性的创意工具",
    quotes: [
      "这个机械的手感太好了，你摸到它就想拍，这就是仪式感。",
      "跟朋友一起拍然后等冲洗出来，这个过程本身就很有意思，比直接发手机照片强多了。"
    ]
  },
  {
    name: "徐玲杰",
    attitude: "neg",
    tags: ["部分记录", "G2"],
    devices: "手机拍摄为主，2B产品经理",
    feedback: "非常消极。拉片麻烦，吃惯细粮了。99元也不买。但对直出人像(港风)有兴趣。",
    price: "拒绝购买(99元也不买)",
    filters: "对港风人像直出有兴趣",
    positioning: "无价值的麻烦制造者",
    quotes: [
      "太麻烦了，我已经吃惯细粮了，你让我回去吃粗粮，我不愿意。",
      "99块我也不买，因为我用不上。但如果能直出那种港风人像，我倒是有兴趣。"
    ]
  },
  {
    name: "王雅岚",
    attitude: "neu",
    tags: ["G3"],
    devices: "手机+旧CCD",
    feedback: "态度谨慎。不断与数码对比，担心画质。拉片有新鲜感但不确定必要性。兴趣一般。",
    price: "300冲动消费，500需要研究",
    filters: "复式(富士)",
    positioning: "需要更多理由才能购买的可选玩具",
    quotes: [
      "我会拿它跟手机比，如果画质还不如手机那我为什么要用这个呢?",
      "三百块的话可能冲动就买了，五百的话我得好好研究一下。"
    ]
  },
  {
    name: "刘嘉彦",
    attitude: "neg",
    tags: ["G3"],
    devices: "手机+一次性富士",
    feedback: "不被吸引--不能带来不一样的体验。拉片只是开合。300封顶。玩具。",
    price: "300封顶",
    filters: "复式(富士)",
    positioning: "玩具",
    quotes: [
      "它不能够给我带来什么不一样的体验，拉片也就是开一下关一下。",
      "三百块顶天了，再贵我就不买了。"
    ]
  },
  {
    name: "韩志群",
    attitude: "neg",
    tags: ["G1"],
    devices: "仅手机",
    feedback: "对拉片困惑--没有实际作用，有点傻。100封顶。给小孩玩的玩具。兴趣极低。",
    price: "100封顶",
    filters: "黑白",
    positioning: "给小孩玩的玩具",
    quotes: [
      "拉片这个动作没有实际作用啊，就是多了一个步骤，有点傻。",
      "一百块的话可以给小孩玩玩，贵了就没意思了。"
    ]
  },
  {
    name: "刘旋",
    attitude: "pos",
    tags: ["部分记录", "G2"],
    devices: "手机+拍立得+CCD+一次性",
    feedback: "喜欢复式，不喜欢黑白。拉片可有可无。即时扫描很吸引。想要社交媒体模板。",
    price: "1000以内，499可以",
    filters: "复式+原图",
    positioning: "有社交属性的趣味设备",
    extra: "期望: 社交媒体模板/闪光灯",
    quotes: [
      "即时扫描那个功能很吸引我，拍完马上能看到，这个好。",
      "拉片对我来说可有可无，但整体体验我觉得挺有意思的。"
    ]
  },
  {
    name: "冯洁",
    attitude: "pos",
    tags: ["G2"],
    devices: "手机+拍立得+CCD+一次性",
    feedback: "非常积极--挺期待的。拉片=仪式感。得知可重复使用后价格接受度上升。想要闪光灯。",
    price: "初始150-200，了解可重复使用后499可接受",
    filters: "复式+原图",
    positioning: "有仪式感的趣味设备",
    extra: "期望: 闪光灯",
    quotes: [
      "挺期待的，就是那种你拿起来就想拍的感觉，有仪式感。",
      "一开始觉得一两百，后来知道可以重复用，那四五百也行，毕竟不是一次性的。"
    ]
  }
];

var ATTITUDE_MAP = {
  pos: { label: "积极", cls: "tag-pos" },
  neu: { label: "中性", cls: "tag-neu" },
  neg: { label: "消极", cls: "tag-neg" }
};

// 态度变化数据: survey=调研中态度, interview=访谈后态度, change=up/down/same, turning=转折点
var ATTITUDE_CHANGES = [
  { name: "刘莹", survey: "积极", interview: "积极", change: "same", turning: "无显著变化。作为内部人员对产品已有认知，访谈前后态度一致。" },
  { name: "孙雨琪", survey: "积极", interview: "中性", change: "down", turning: "实物体验后觉得'新鲜感可能无法持续'，从'想试'降为'观望'。" },
  { name: "朱语婷", survey: "积极", interview: "积极(加深)", change: "up", turning: "体验后意识到'比真胶卷好--不会浪费'，从感兴趣升级为明确想买。" },
  { name: "刘伟钢", survey: "中性", interview: "中性", change: "same", turning: "态度基本不变。喜欢机械感但始终在玩具与工具之间犹豫。" },
  { name: "张子璟", survey: "积极", interview: "中性", change: "down", turning: "36张限制引发焦虑，从'想试'降为'需要看价格和功能再决定'。" },
  { name: "张震", survey: "积极", interview: "积极(加深)", change: "up", turning: "机械手感体验后热情爆发，从'感兴趣'升级为'想买+想推荐给朋友'。" },
  { name: "徐玲杰", survey: "中性", interview: "消极", change: "down", turning: "实物体验后明确拒绝--'吃惯细粮了'。拉片的麻烦感在实操中被放大。" },
  { name: "王雅岚", survey: "积极", interview: "中性", change: "down", turning: "与手机画质对比后产生疑虑，从'有兴趣'降为'需要更多理由'。" },
  { name: "刘嘉彦", survey: "中性", interview: "消极", change: "down", turning: "体验后认为'不能带来不一样的体验'，从中性转为明确不感兴趣。" },
  { name: "韩志群", survey: "中性", interview: "消极", change: "down", turning: "对拉片动作完全无法理解--'没有实际作用，有点傻'，从中性转为消极。" },
  { name: "刘旋", survey: "积极", interview: "积极", change: "same", turning: "态度基本不变。即时扫描功能维持了兴趣，但拉片对其无增分。" },
  { name: "冯洁", survey: "积极", interview: "积极(加深)", change: "up", turning: "得知可重复使用后价格接受度从200提升至499，从'想试'升级为'想买'。" }
];
