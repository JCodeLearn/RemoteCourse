import type { AiMessage } from './composables/useAiChat'

const BASE_URL = 'http://localhost:8080'

// ========== 真实 API ==========

export async function chatStream(
  _messages: AiMessage[],
  _onToken: (t: string) => void,
  _onDone: () => void,
  _onError: (msg: string) => void,
  _signal: AbortSignal,
) {
  // TODO: 后端就绪后切换
  // const response = await fetch(`${BASE_URL}/api/v1/ai/chat`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  //   body: JSON.stringify({ messages: _messages.map(m => ({ role: m.role, content: m.content })) }),
  //   signal: _signal,
  // })
  // const reader = response.body!.getReader()
  // const decoder = new TextDecoder()
  // ... parse SSE: data: {"type":"token","content":"..."} \n\n
  // ... on token → _onToken, on done → _onDone, on error → _onError

  // 当前走 Mock
  mockChatStream(
    _messages[_messages.length - 1]?.content || '',
    _onToken,
    _onDone,
    _signal,
  )
}

// ========== Mock SSE ==========

async function mockChatStream(
  message: string,
  onToken: (t: string) => void,
  onDone: () => void,
  signal: AbortSignal,
) {
  const responses: Record<string, string> = {
    '推荐': '为你推荐以下课程：\n\n1. **数据结构与算法** — 张教授 · 1.2万播放\n2. **深入理解计算机系统** — 王老师 · 8900播放\n3. **操作系统原理** — 李教授 · 6200播放\n4. **计算机网络** — 赵教授 · 7500播放\n\n你可以前往首页浏览更多课程，或告诉我你感兴趣的方向～',
    '进度': '你当前的学习进度：\n\n- 📊 **数据结构与算法**：已完成 60%（还剩第4-6章）\n- 📊 **深入理解计算机系统**：已完成 30%（还剩第2-8章）\n- 📊 **计算机网络**：已完成 85%（即将完成！）\n\n继续加油！💪',
    '课程': '平台上有以下热门课程类别：\n\n- 💻 **计算机科学**：数据结构、操作系统、计组\n- 📐 **数学与统计**：高等数学、线性代数、概率论\n- ⚛️ **物理**：量子力学、电磁学\n- 📚 **文学与历史**：古代文学、世界近代史\n- 🌐 **外国语言**：英语精读、日语入门\n\n想了解哪个分类的课程？',
    '帮助': '我是小映助手，可以帮你：\n\n- 🔍 **推荐课程**：说"推荐一些CS课程"\n- 📊 **查看进度**：说"我的学习进度"\n- 💬 **解答问题**：问我课程相关的问题\n- 📖 **浏览课程**：说"有什么课程"\n\n直接告诉我你需要什么吧！',
  }

  const matchKey = Object.keys(responses).find((k) => message.includes(k))
  const text = matchKey ? responses[matchKey]! : responses['帮助']!

  for (let i = 0; i < text.length; i++) {
    if (signal.aborted) return
    await new Promise((r) => setTimeout(r, 25 + Math.random() * 35))
    onToken(text[i]!)
  }
  onDone()
}
