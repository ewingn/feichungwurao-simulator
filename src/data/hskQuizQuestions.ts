import { QuizQuestion } from "../types";

export const hskQuizQuestions: Record<string, QuizQuestion[]> = {
  "Beginner (HSK 1-2)": [
    {
      question: "哪个词的意思是“你好”？(Which word means 'hello'?)",
      options: ["再见 (Goodbye)", "谢谢 (Thank you)", "你好 (Hello)", "不客气 (You're welcome)"],
      answer: "你好 (Hello)",
    },
    {
      question: "“我爱吃米饭”中的“爱”是什么意思？(What does '爱' mean in '我爱吃米饭'?)",
      options: ["有 (have)", "是 (is)", "爱 (love)", "在 (at)"],
      answer: "爱 (love)",
    },
    {
      question: "请问，“多少钱”是什么意思？(Excuse me, what does '多少钱' mean?)",
      options: ["多少时间 (how much time)", "多少人 (how many people)", "多少钱 (how much money)", "多少本 (how many books)"],
      answer: "多少钱 (how much money)",
    },
  ],
  "Intermediate (HSK 3)": [
    {
      question: "“我觉得汉语很有意思”中的“觉得”是什么意思？(What does '觉得' mean in '我觉得汉语很有意思'?)",
      options: ["知道 (know)", "认为 (think/feel)", "学习 (study)", "明白 (understand)"],
      answer: "认为 (think/feel)",
    },
    {
      question: "哪个词是“公共汽车”的缩写？(Which word is the abbreviation for '公共汽车' (public bus)?)",
      options: ["火车 (train)", "地铁 (subway)", "公交车 (bus)", "飞机 (plane)"],
      answer: "公交车 (bus)",
    },
    {
      question: "“他比我高”这句话表达了什么？(What does '他比我高' express?)",
      options: ["比较高矮 (comparing heights)", "表示喜欢 (expressing liking)", "说明年龄 (explaining age)", "描述职业 (describing occupation)"],
      answer: "比较高矮 (comparing heights)",
    },
  ],
  "Intermediate High (HSK 4)": [
    {
      question: "“即使下雨，我也要去”这句话中的“即使”是什么意思？(What does '即使' mean?)",
      options: ["如果 (if)", "虽然 (although)", "因为 (because)", "无论 (no matter what)"],
      answer: "即使 (even if)",
    },
    {
      question: "哪个词可以形容一个人“非常努力”？(Which word means 'very hardworking'?)",
      options: ["马虎 (careless)", "粗心 (negligent)", "勤奋 (diligent)", "懒惰 (lazy)"],
      answer: "勤奋 (diligent)",
    },
    {
      question: "“通过这次考试，我的汉语水平提高了很多。”中的“通过”是什么意思？",
      options: ["走过 (walk past)", "经过 (pass through)", "凭借 (by means of)", "同意 (agree)"],
      answer: "凭借 (by means of)",
    },
  ],
  "Advanced (HSK 5+)": [
    {
      question: "“他对工作一丝不苟”中的“一丝不苟”是什么意思？",
      options: ["非常马虎 (very careless)", "认真负责 (serious and responsible)", "随便应付 (deal carelessly)", "追求完美 (pursue perfection)"],
      answer: "认真负责 (serious and responsible)",
    },
    {
      question: "哪个词形容一个人“深思熟虑，考虑周全”？",
      options: ["鲁莽 (rash)", "果断 (decisive)", "草率 (hasty)", "慎重 (prudent)"],
      answer: "慎重 (prudent)",
    },
    {
      question: "“这部作品具有划时代的意义。”中的“划时代”是什么意思？",
      options: ["非常古老 (very ancient)", "具有历史性 (historic)", "开创新纪元 (epoch-making)", "很有名 (very famous)"],
      answer: "开创新纪元 (epoch-making)",
    },
  ],
};
