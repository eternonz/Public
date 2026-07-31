# show-me 重新激活 + v2 范围确立 — Handoff

- 日期：2026-07-31 11:49 NZST
- 作者：Claude Code (CCD)
- 触发：用户要求重新激活 KYC 与 show-me 两个项目，并给出新方向
- 本轮性质：**规划文档 only。未改动 `Build/show-me/` 任何文件**（Development Gate 仍为 Blocked，Constitution §8 规定批准前只能改 `History/`）。

## 用户 2026-07-31 的关键澄清

用户最初的表述容易被读成"show-me 自己去扫描 Memo"。澄清后的分工是相反的，且更好：

> KYC project … is ought to be the one to act scanning and analyzing (for summarizing tasks or
> projects) actions; Show-me is the skill to be called for demonstrating these summaries into charts,
> roadmaps, and so on (but of course, Show-me skill is not meant to only do this, it would also convert
> 复杂的科学原理 into animations). Therefore, Show-me skill, when it is used by other users, it should
> never ask things like "Which folder I can use".

**这条约束是 v2 架构的地基。** show-me 之所以能安全公开发布，不是因为它有一套权限策略，而是因为它**根本没有读取文件夹的能力** —— 一个不会读文件夹的 skill 泄露不了文件夹。公开安装者拿到的是一个渲染器，不会被授予任何文件系统范围，也永远不会被提示授权。

## v2 新增能力

| 能力 | 说明 |
|---|---|
| **Mode C — 图表** | 手写 SVG：bar / grouped bar / stacked bar / line / area / donut，带无障碍表格 fallback。不引入任何图表库（rule 1 是这个 skill 的全部价值） |
| **依赖边 + 关键链路** | `depends_on` 把 Mode A 的直线主轴变成左→右 DAG；最长路径高亮为关键链路。有 `duration` 时按时长加权，没有时按边数 —— 这样 KYC 在还estimate不出工作量时就能先产出可用的链路图 |
| **WBS 嵌套** | `children[]` 任意深度，默认只展开顶层，渐进披露。**深度由调用方决定，show-me 不自作主张展开** —— 拆到几层是分析判断，属于 KYC 的上下文 |
| **`What's Next` 区块** | 建议渲染为视觉上独立的区域，绝不混入图内。混进去会让 AI 的建议看起来像观测到的事实 —— 正是 WhatEvidence 的 Observation Gap 原则要防的混淆；也对齐用户 Constitution §1 的 wrap-up 格式 |
| **`showme-spec` v1 契约** | 版本化、仅可增补的 JSON 输入对象，让上游分析器直接驱动渲染器 |

v1 的两个模式与五条核心规则（单文件零依赖 / 系统字体 / 明暗双主题 / 一屏且动效克制 / 无障碍）**完全保留，不重开**。

## 本轮产出

| 文件 | 变更 |
|---|---|
| `History/PRD.md` | 迁移骨架 → 完整 PRD。13 条用户故事（3 条 v1 保留 + 10 条 v2 新增）、实现决定、测试门槛、4 项待决 |
| `History/ADR.md` | 迁移骨架 → 完整 ADR。8 项决策记录，含契约完整 JSON 示例 |
| `History/project.md` | Goal/Scope 重写为 v2；新增三项目关系表；验收标准拆为 v1（已达成）/ v2（待办）；Change Log 追加 |

两份 canonical 文档均为 `Approval Status: Pending User Approval`、`Document Completeness: Ready for User Review`。**Development Gate 仍为 Blocked。**

## 关键架构决定摘要

- **ADR-001** show-me 无输入发现能力 —— 不列目录、不 glob、不搜文件、不读未指定的文件、不问文件夹权限。以**打包扫描测试**强制，不是靠约定。备选方案"默认为空的 allowlist 配置"被否决：仍然装载了该能力，仍然需要首次使用时提问，而且 Skill 没有可靠的地方存配置。
- **ADR-002** `showme-spec` v1：版本化、仅可增补。未知字段忽略，缺失字段优雅降级。含 `provenance`（渲染任务来自哪里）与 `notes[]`（渲染分析器看不到什么）—— 这样 show-me 完全不必知道 Memo、音频、OCR 的存在。
- **ADR-004** 关键链路图**扩展 Mode A 而非新开第四模式** —— 用户要的关键链路图本质就是带依赖边的决策图，共用同一个 goal / 步骤卡片 / 鱼骨理由。新开模式会重复约 90% 的 Mode A。
- **ADR-007 色彩语义与 WhatEvidence 显式切分**（这是本轮发现的一处真实冲突）：WhatEvidence 已批准的 ADR 把红/黄/绿保留给 **Task Evidence 充分性**、紫色虚线 + `AI ?` 保留给 **AI 存疑的 Evidence**。show-me 的绿/橙/红理由 chip（justification/prerequisite/risk）早于此存在且保留，但必须始终带字形与文字，**且任务节点一律不得用颜色编码状态**（状态用文字标签）。否则用户日后同时使用两者时，show-me 里一个红色任务节点会被读成"证据不足"。现在切分零成本，事后补救是跨两个产品的视觉语言迁移。
- **ADR-008** 调用方拥有输出路径。KYC 会用私密材料生成简报；知道敏感度的一方（KYC）必须决定文件落在哪，不知道的一方（show-me）不能图省事默认到某处。"输出中的每个字符串都追溯得到 spec / 对话 / 固定 chrome"由自动化 containment 检查保证 —— 这才让"show-me 不携带任何未被交予的内容"成为可断言的属性而非期望。

## 两条硬门槛（阻塞发布）

1. **Boundary scan** —— 静态扫描打包产物，任何模式路径上都不得出现列目录、glob、文件搜索或文件夹授权提问。
2. **Containment check** —— 自动比对：输出字符串 ⊆ spec ∪ 对话 ∪ 固定 chrome。

## 需要用户决定的 4 项（详见 `PRD.md` §Open Decisions）

1. 首发图表子类型（建议：bar / grouped bar / stacked bar / line / donut —— 每一种都是实打实的实现成本）
2. `What's Next` 是静态列表，还是点击后高亮图中对应任务/序列（后者明显更好，也明显更花时间）
3. 无 duration 时关键链路的默认加权方式（建议：支持两种，缺省按边数）
4. 发布时序：等 KYC 端到端跑通契约后再发布 v2，还是先独立发布渲染器

## 下一步（等待用户）

1. 审阅 `PRD.md` 与 `ADR.md`。
2. 回答 4 项待决。
3. 明确批准两份文档 → 届时才可动 `Build/show-me/`。在此之前 v1 交付物保持原样、不受影响。

## 与另两个项目的关系

- **不阻碍 KYC**：show-me 无状态、不持久化、不判定证据充分性、色彩语义已切分；KYC 全权决定输出路径。
- **不阻碍 WhatEvidence**：持久化、Evidence 充分性、AI Memory、Time Lens、D2、协作、多图评审全部明确列入 show-me 的 Out of Scope。show-me 是 WhatEvidence 的视觉语言原型，不是竞品。
- **相关记录**：`WhatEvidence/History/project.md:83` 曾记载 show-me 是"未完成的偏好研究，不是产品规格"。本轮不改动该结论 —— show-me 依然不是 WhatEvidence 的规格；它是一个独立的公开渲染器，日后为 WhatEvidence 所借鉴。
