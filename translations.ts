
import { OptimizedStandardPoint } from './types';

export const TRANSLATIONS = {
  en: {
    appTitle: "ViralScope AI",
    subtitle: "Traditional scoring is broken. We analyze your content based on Emotion, Hooks, and Social Currency.",
    logicButton: "Logic Update: Why we optimized the scoring standard",
    step1: "Input your Idea",
    topicLabel: "Topic / Title",
    topicPlaceholder: "e.g., How I learned coding in 30 days",
    descLabel: "Draft or Quick Description (Optional)",
    descPlaceholder: "Briefly describe the content structure, key points, or script...",
    analyzeBtn: "Predict Viral Potential",
    analyzingBtn: "Analyzing Market Data...",
    marketValidationTitle: "Market Validation: Historical Benchmarks",
    similarContentBadge: "Similar Content Performance",
    benchmarkExample: "Benchmark Example",
    whyItWorked: "Why it worked:",
    aiSuggestionsTitle: "AI Suggested Improvements",
    copyTitle: "Copy Title",
    angle: "Angle:",
    readyToAnalyze: "Ready to analyze",
    readyDesc: "Enter your topic to see how it scores against the optimized viral framework and compare with historical hits.",
    error: "Failed to analyze content. Please check your API key or try again.",
    standards: [
      {
        original: "Actual Effect Prediction (History)",
        optimized: "Emotional Trigger",
        reason: "Historical data can't predict the novelty of a hit. Virality is driven by strong emotions (Curiosity, Anger, Awe)."
      },
      {
        original: "Content Quality (Professionalism)",
        optimized: "Value Density (VPS)",
        reason: "Being too professional often means being boring. We optimize for 'Value Per Second' or 'Entertainment Value'."
      },
      {
        original: "Reader Pain Points",
        optimized: "Relatability (This is me)",
        reason: "Matching a pain point isn't enough. The user must feel an immediate, specific scene connection."
      },
      {
        original: "Expression (Readability)",
        optimized: "The Hook (First 3 Sec)",
        reason: "Without a strong hook in the first 3 seconds (visual or text), the rest of the content doesn't exist."
      },
      {
        original: "Innovation",
        optimized: "Counter-Intuitive",
        reason: "Novelty isn't enough. It must challenge common sense to trigger discussions and shares."
      }
    ] as OptimizedStandardPoint[]
  },
  zh: {
    appTitle: "爆款预测 AI",
    subtitle: "传统评分已过时。我们基于情绪价值、黄金前三秒和社交货币来预测爆款潜力。",
    logicButton: "逻辑升级：为什么我们要优化评分标准",
    step1: "输入你的选题",
    topicLabel: "标题 / 选题",
    topicPlaceholder: "例如：我如何在30天内学会编程",
    descLabel: "草稿或简要描述 (选填)",
    descPlaceholder: "简要描述内容结构、核心观点或脚本...",
    analyzeBtn: "预测爆款潜力",
    analyzingBtn: "正在分析全网数据...",
    marketValidationTitle: "市场验证：历史数据对标",
    similarContentBadge: "同类内容表现",
    benchmarkExample: "对标案例",
    whyItWorked: "爆款原因：",
    aiSuggestionsTitle: "AI 优化建议",
    copyTitle: "复制标题",
    angle: "切入角度：",
    readyToAnalyze: "准备就绪",
    readyDesc: "输入你的选题，查看它在优化后的爆款模型下的得分，并与历史爆款进行对比。",
    error: "分析失败，请检查网络或稍后重试。",
    standards: [
      {
        original: "实际效果预测 (基于历史数据)",
        optimized: "情绪触发力 (Emotional Trigger)",
        reason: "历史数据不能预测新爆款。真正决定传播的是内容是否激发了强烈情绪（好奇、愤怒、共鸣）。"
      },
      {
        original: "内容质量 (专业深度)",
        optimized: "信息密度/获得感 (Value Per Second)",
        reason: "过于专业往往曲高和寡。优化的标准强调'单位时间内的获得感'或'爽点'。"
      },
      {
        original: "读者痛点匹配度",
        optimized: "具体场景代入感 (Relatability)",
        reason: "单纯匹配痛点不够，必须有具体的场景描述，让用户瞬间觉得'这就是在说我'。"
      },
      {
        original: "表达方式 (可读性)",
        optimized: "黄金3秒钩子 (The Hook)",
        reason: "在信息流中，如果没有前3秒的强力钩子（视觉或标题），后续内容再好也无人问津。"
      },
      {
        original: "观点创新性",
        optimized: "认知反差 (Counter-Intuitive)",
        reason: "仅仅'新颖'不够，必须颠覆常识或提供反直觉的视角，才能引发讨论和转发。"
      }
    ] as OptimizedStandardPoint[]
  }
};
