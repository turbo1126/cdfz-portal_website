<script setup lang="ts">
const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')

useSeoMeta({
  title: () => isEnglish.value ? 'Chengdian Fuzhi Technology' : '上海成电福智科技有限公司',
  description: () => isEnglish.value
    ? 'Intelligent systems, embodied robotics pilot validation and industrial innovation services.'
    : '上海成电福智科技有限公司官方网站，聚焦智能系统、具身智能中试验证与产业创新服务。',
})

const platforms = computed(() => isEnglish.value ? [
  { no: '01', title: 'Shanghai Lingang Intelligent Systems Innovation Platform', short: 'Intelligent systems innovation', description: 'Connect technology R&D, scenario validation, achievement transformation and ecosystem collaboration to accelerate industrial application.', tags: ['Technology R&D', 'Scenario validation', 'Transformation'] },
  { no: '02', title: 'Embodied Robotics Components Pilot Platform', short: 'Robotics pilot validation', description: 'Provide shared engineering verification and scale-up support for core components such as joint modules, motors, reducers and actuators.', tags: ['Pilot testing', 'Reliability', 'Scale-up'] },
] : [
  { no: '01', title: '上海临港智能系统科创平台', short: '智能系统科创平台', description: '贯通技术研发、场景验证、成果转化与生态协同，加快智能系统科技成果走向产业应用。', tags: ['技术研发', '场景验证', '成果转化'] },
  { no: '02', title: '上海人形机器人具身智能零部件中试平台', short: '具身智能中试平台', description: '面向关节模组、电机、减速器、执行器等核心零部件，提供开放共享的工程验证与量产支撑。', tags: ['中试验证', '可靠性测试', '量产支撑'] },
])

const products = computed(() => isEnglish.value ? [
  { no: '01', title: 'AI Mediation Assistant', category: 'Grassroots governance', description: 'Legal retrieval, dispute analysis, solution assistance and document generation in one secure workflow.', tags: ['Private deployment', 'Legal search'] },
  { no: '02', title: 'Vision Shield', category: 'Visual intelligence', description: 'AI-powered risk identification and multi-level alerts for safety management and inspection scenarios.', tags: ['Visual recognition', 'Smart alerts'] },
  { no: '03', title: 'Inspection Cyclone', category: 'Automated inspection', description: 'Connect inspection routes, issue detection, work-order collaboration and result archiving.', tags: ['Park inspection', 'Closed-loop workflow'] },
  { no: '04', title: 'Housing Manager', category: 'Urban governance', description: 'Build unified housing data, intelligent analysis and collaborative handling for fine-grained governance.', tags: ['Data governance', 'Business collaboration'] },
] : [
  { no: '01', title: 'AI 调解通', category: '基层治理智能体', description: '将法律检索、纠纷分析、调解方案辅助与文书生成整合进安全、清晰的业务流程。', tags: ['本地化部署', '法律检索'] },
  { no: '02', title: '视安盾', category: '视觉智能产品', description: '面向安全管理与巡查场景，以视觉识别提升风险发现、分级告警与联动处置效率。', tags: ['视觉识别', '智能告警'] },
  { no: '03', title: '巡检小旋风', category: '自动化巡检产品', description: '贯通巡检路线、问题识别、工单协同与结果归档，推动园区巡检形成业务闭环。', tags: ['园区巡检', '闭环管理'] },
  { no: '04', title: '房屋管理通', category: '城市治理产品', description: '围绕房屋管理构建统一数据底座、智能分析与协同处置能力，服务精细化治理。', tags: ['数据治理', '业务协同'] },
])

const capabilitySteps = computed(() => isEnglish.value ? [
  { no: '01', title: 'R&D', text: 'Core technology and component incubation' },
  { no: '02', title: 'Pilot', text: 'Performance, reliability and process validation' },
  { no: '03', title: 'Incubation', text: 'Scenario development and product validation' },
  { no: '04', title: 'Industrialization', text: 'Scale-up, delivery and ecosystem support' },
] : [
  { no: '01', title: '研发', text: '核心技术攻关与关键零部件研发孵化' },
  { no: '02', title: '中试', text: '性能、可靠性与生产工艺验证优化' },
  { no: '03', title: '孵化', text: '场景开发、产品打磨与科创服务' },
  { no: '04', title: '产业化', text: '量产导入、交付支持与生态协同' },
])

const news = computed(() => isEnglish.value ? [
  { type: 'Platform', date: '2026.07', title: 'Building an open pilot validation capability for embodied robotics components' },
  { type: 'Product', date: '2026.06', title: 'AI Mediation Assistant accelerates the digital transformation of grassroots services' },
  { type: 'Ecosystem', date: '2026.05', title: 'Industry-university-research collaboration connects innovation with real scenarios' },
] : [
  { type: '平台动态', date: '2026.07', title: '建设开放共享的人形机器人具身智能零部件中试验证能力' },
  { type: '产品实践', date: '2026.06', title: 'AI 调解通助力基层调解服务数字化与智能化升级' },
  { type: '生态合作', date: '2026.05', title: '深化产学研协同，让前沿创新更快进入真实产业场景' },
])
</script>

<template>
  <div>
    <HomeHeroCarousel />

    <section id="platforms" class="platform-section">
      <div class="site-container">
        <div class="intro-grid">
          <div>
            <p class="section-kicker">{{ isEnglish ? 'TWO INNOVATION ENGINES' : '双平台驱动' }}</p>
            <h2 class="section-heading">{{ isEnglish ? 'Innovation platforms built for industrial outcomes.' : '面向产业落地，建设两大创新能力支点。' }}</h2>
          </div>
          <div>
            <p class="section-description">{{ isEnglish ? 'We connect intelligent systems innovation with embodied robotics pilot validation, forming a service base that spans technology, engineering and industry.' : '以智能系统科创平台连接前沿技术与应用场景，以具身智能零部件中试平台打通工程验证与量产导入，形成跨越技术、工程与产业的公共服务底座。' }}</p>
            <NuxtLink :to="localePath('/platforms')" class="arrow-link platform-more">{{ isEnglish ? 'Explore both platforms' : '查看双平台详情' }}<span>→</span></NuxtLink>
          </div>
        </div>

        <div class="platform-grid">
          <NuxtLink v-for="platform in platforms" :key="platform.no" :to="localePath('/platforms')" class="platform-card">
            <div class="platform-photo" :class="`platform-photo-${platform.no}`">
              <img v-if="platform.no === '01'" src="/brand/cdfz-building.png" alt="上海临港智能系统科创平台" />
              <div v-else class="robotic-visual">
                <div class="robot-ring ring-1" /><div class="robot-ring ring-2" />
                <div class="robot-joint"><span>+</span></div>
                <div class="data-label data-a">01 / MOTION</div><div class="data-label data-b">02 / TORQUE</div><div class="data-label data-c">03 / RELIABILITY</div>
              </div>
              <div class="photo-index">{{ platform.no }}</div>
              <div class="photo-arrow">↗</div>
            </div>
            <div class="platform-body">
              <p>{{ platform.short }}</p><h3>{{ platform.title }}</h3><div class="platform-meta"><span v-for="tag in platform.tags" :key="tag">{{ tag }}</span></div>
              <p class="platform-description">{{ platform.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section id="products" class="products-section">
      <div class="site-container">
        <div class="products-heading">
          <div><p class="section-kicker">{{ isEnglish ? 'FLAGSHIP PRODUCTS' : '核心产品矩阵' }}</p><h2 class="section-heading">{{ isEnglish ? 'Intelligence designed around real work.' : '围绕真实业务，打造可落地的智能产品。' }}</h2></div>
          <NuxtLink :to="localePath('/products')" class="arrow-link">{{ isEnglish ? 'All products & solutions' : '全部产品与解决方案' }}<span>→</span></NuxtLink>
        </div>

        <div class="product-grid">
          <NuxtLink v-for="product in products" :key="product.no" :to="localePath('/products')" class="product-card">
            <div class="product-top"><span>{{ product.no }}</span><b>↗</b></div>
            <div class="product-icon" :class="`icon-${product.no}`">
              <svg v-if="product.no === '01'" viewBox="0 0 64 64"><path d="M16 12h32v35H31L20 55v-8h-4z"/><path d="M24 23h16M24 31h12M24 39h8"/></svg>
              <svg v-else-if="product.no === '02'" viewBox="0 0 64 64"><path d="M5 32s10-16 27-16 27 16 27 16-10 16-27 16S5 32 5 32Z"/><circle cx="32" cy="32" r="8"/></svg>
              <svg v-else-if="product.no === '03'" viewBox="0 0 64 64"><path d="M14 39h36l-4-15H18z"/><circle cx="22" cy="45" r="5"/><circle cx="42" cy="45" r="5"/><path d="M25 24v-7h14v7M32 17V9"/></svg>
              <svg v-else viewBox="0 0 64 64"><path d="m8 31 24-19 24 19v23H8z"/><path d="M24 54V38h16v16M18 28h28"/></svg>
            </div>
            <p class="product-category">{{ product.category }}</p><h3>{{ product.title }}</h3><p class="product-copy">{{ product.description }}</p>
            <div class="product-tags"><span v-for="tag in product.tags" :key="tag">{{ tag }}</span></div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section id="capability" class="capability-section">
      <div class="site-container capability-layout">
        <div class="capability-copy">
          <p class="section-kicker">{{ isEnglish ? 'FULL-CYCLE CAPABILITY' : '全链路能力闭环' }}</p>
          <h2 class="section-heading">{{ isEnglish ? 'From an idea to a scalable industry.' : '从一项创新，走向一个可规模化的产业。' }}</h2>
          <p class="section-description">{{ isEnglish ? 'Combine R&D, pilot testing, incubation and industrialization into one continuous path, reducing the distance between frontier technology and market value.' : '将研发、中试、孵化与产业化组织为一条连续路径，缩短前沿技术走向工程产品和市场价值的距离。' }}</p>
          <NuxtLink :to="localePath('/services')" class="capability-button">{{ isEnglish ? 'View industrial services' : '了解产业服务' }}<span>↗</span></NuxtLink>
        </div>
        <div class="capability-flow">
          <article v-for="step in capabilitySteps" :key="step.no" class="flow-step">
            <div class="flow-number">{{ step.no }}</div><div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div><span class="flow-arrow">→</span>
          </article>
        </div>
      </div>
    </section>

    <section class="trust-section">
      <div class="site-container trust-grid">
        <div class="trust-intro"><p class="section-kicker">{{ isEnglish ? 'TRUSTED FOUNDATION' : '可信能力背书' }}</p><h2>{{ isEnglish ? 'Building long-term value through open collaboration.' : '以开放协同，构建长期产业价值。' }}</h2></div>
        <div class="trust-stat"><strong>2021</strong><span>{{ isEnglish ? 'Founded in Shanghai' : '成立于上海' }}</span></div>
        <div class="trust-stat"><strong>2</strong><span>{{ isEnglish ? 'Core innovation platforms' : '核心创新平台' }}</span></div>
        <div class="trust-stat"><strong>4</strong><span>{{ isEnglish ? 'Full-cycle service stages' : '全链路服务阶段' }}</span></div>
      </div>
      <p class="data-note">{{ isEnglish ? '* Publicity data is subject to final review before launch.' : '* 具体资质、知识产权与服务数据将在上线前完成最终审核后发布。' }}</p>
    </section>

    <section class="news-section">
      <div class="site-container">
        <div class="news-heading"><div><p class="section-kicker">{{ isEnglish ? 'CASES & NEWS' : '案例与动态' }}</p><h2 class="section-heading">{{ isEnglish ? 'See innovation happening.' : '看见创新，正在真实发生。' }}</h2></div><NuxtLink :to="localePath('/cases')" class="arrow-link">{{ isEnglish ? 'View all updates' : '查看全部动态' }}<span>→</span></NuxtLink></div>
        <div class="news-list">
          <NuxtLink v-for="item in news" :key="item.title" :to="localePath('/cases')" class="news-item"><div class="news-type">{{ item.type }}</div><div class="news-date">{{ item.date }}</div><h3>{{ item.title }}</h3><div class="news-arrow">↗</div></NuxtLink>
        </div>
      </div>
    </section>

    <section class="contact-banner">
      <div class="contact-pattern"><span v-for="i in 16" :key="i" /></div>
      <div class="site-container contact-content"><p>{{ isEnglish ? 'LET INNOVATION LAND' : '让创新落地' }}</p><h2>{{ isEnglish ? 'Ready to turn a possibility into a real solution?' : '准备好，把一种可能变成真实方案了吗？' }}</h2><NuxtLink :to="localePath('/contact')">{{ isEnglish ? 'Start a conversation' : '发起合作咨询' }}<span>↗</span></NuxtLink></div>
    </section>
  </div>
</template>

<style scoped>
.platform-section, .products-section, .news-section { padding: 118px 0; }
.intro-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 80px; align-items: end; }
.platform-more { margin-top: 28px; }
.platform-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-top: 72px; }
.platform-card { overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: #fff; transition: 260ms ease; }
.platform-card:hover { box-shadow: 0 25px 65px rgba(30,32,28,.11); transform: translateY(-5px); }
.platform-photo { position: relative; height: 360px; overflow: hidden; background: #2b2e29; }
.platform-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform 650ms ease; }
.platform-card:hover .platform-photo img { transform: scale(1.04); }
.platform-photo::after { position: absolute; inset: 0; content: ''; background: linear-gradient(180deg, transparent 45%, rgba(15,17,15,.68)); }
.photo-index { position: absolute; z-index: 2; left: 26px; bottom: 22px; color: white; font-size: 12px; letter-spacing: .15em; }
.photo-arrow { position: absolute; z-index: 2; right: 22px; top: 22px; display: grid; width: 46px; height: 46px; place-items: center; border-radius: 50%; color: white; background: rgba(255,255,255,.14); backdrop-filter: blur(9px); transition: 180ms ease; }
.platform-card:hover .photo-arrow { background: var(--accent); }
.robotic-visual { position: absolute; inset: 0; background: radial-gradient(circle at 50% 48%, #6f6658, #2a2e29 52%, #181b18); }
.robot-ring { position: absolute; left: 50%; top: 50%; border: 1px solid rgba(255,255,255,.24); border-radius: 50%; transform: translate(-50%,-50%); }
.ring-1 { width: 270px; height: 270px; }.ring-2 { width: 185px; height: 185px; border-style: dashed; }
.robot-joint { position: absolute; left: 50%; top: 50%; display: grid; width: 105px; height: 105px; place-items: center; border: 16px solid #a7a396; border-radius: 50%; background: #3c403a; box-shadow: 0 20px 60px rgba(0,0,0,.4), inset 0 0 0 1px rgba(255,255,255,.25); transform: translate(-50%,-50%); }
.robot-joint span { font-size: 28px; font-weight: 200; color: #f19a5c; }
.data-label { position: absolute; color: rgba(255,255,255,.48); font-size: 8px; letter-spacing: .16em; }.data-a { top: 55px; left: 55px; }.data-b { right: 48px; top: 125px; }.data-c { left: 70px; bottom: 55px; }
.platform-body { padding: 30px 32px 34px; }
.platform-body > p:first-child { margin: 0; color: var(--accent-dark); font-size: 11px; font-weight: 700; letter-spacing: .16em; }
.platform-body h3 { min-height: 64px; margin: 13px 0 0; font-size: 25px; font-weight: 560; letter-spacing: -.03em; line-height: 1.3; }
.platform-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }.platform-meta span, .product-tags span { padding: 7px 10px; border-radius: 999px; color: #676a63; background: #f1f1eb; font-size: 11px; }
.platform-description { margin: 22px 0 0; padding-top: 21px; border-top: 1px solid var(--line); color: var(--muted); font-size: 14px; line-height: 1.75; }
.products-section { background: #fff; }
.products-heading, .news-heading { display: flex; align-items: end; justify-content: space-between; gap: 45px; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 66px; }
.product-card { position: relative; min-height: 465px; padding: 24px; overflow: hidden; border: 1px solid var(--line); border-radius: 15px; background: #fafaf7; transition: 240ms ease; }
.product-card::after { position: absolute; inset: auto -35px -60px auto; width: 170px; height: 170px; content: ''; border-radius: 50%; background: var(--accent-soft); opacity: 0; transition: 300ms ease; }
.product-card:hover { border-color: #d8c5b6; background: white; box-shadow: 0 20px 52px rgba(35,36,32,.08); transform: translateY(-5px); }
.product-card:hover::after { opacity: .85; transform: scale(1.4); }
.product-top { display: flex; align-items: center; justify-content: space-between; color: #93958f; font-size: 11px; letter-spacing: .12em; }.product-top b { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--ink); font-size: 13px; font-weight: 400; transition: 180ms ease; }.product-card:hover .product-top b { color: white; border-color: var(--accent); background: var(--accent); }
.product-icon { display: grid; width: 86px; height: 86px; margin-top: 45px; place-items: center; border-radius: 23px; background: var(--accent-soft); }.product-icon svg { width: 46px; height: 46px; fill: none; stroke: var(--accent-dark); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.icon-02 { background: #eee8df; }.icon-03 { background: #efeee7; }.icon-04 { background: #f4eadf; }
.product-category { margin: 34px 0 0; color: var(--accent-dark); font-size: 11px; font-weight: 700; letter-spacing: .12em; }.product-card h3 { margin: 9px 0 0; font-size: 26px; font-weight: 570; letter-spacing: -.035em; }.product-copy { position: relative; z-index: 1; margin: 18px 0 0; color: var(--muted); font-size: 14px; line-height: 1.8; }.product-tags { position: absolute; z-index: 1; right: 24px; bottom: 23px; left: 24px; display: flex; gap: 7px; }
.capability-section { padding: 120px 0; color: white; background: var(--night); }
.capability-layout { display: grid; grid-template-columns: .92fr 1.08fr; gap: 100px; align-items: center; }
.capability-section .section-heading { max-width: 570px; }.capability-section .section-description { color: rgba(255,255,255,.58); }.capability-button { display: inline-flex; align-items: center; gap: 45px; margin-top: 38px; padding: 15px 18px; border: 1px solid rgba(255,255,255,.17); border-radius: 7px; font-size: 13px; font-weight: 700; transition: 180ms ease; }.capability-button:hover { border-color: var(--accent); background: var(--accent); }
.capability-flow { position: relative; }.capability-flow::before { position: absolute; top: 42px; bottom: 42px; left: 27px; width: 1px; content: ''; background: linear-gradient(var(--accent), rgba(255,255,255,.12)); }
.flow-step { position: relative; display: grid; grid-template-columns: 56px 1fr auto; align-items: center; gap: 22px; min-height: 118px; padding: 19px 18px 19px 0; border-bottom: 1px solid rgba(255,255,255,.12); }.flow-number { z-index: 1; display: grid; width: 56px; height: 56px; place-items: center; border: 1px solid rgba(255,255,255,.25); border-radius: 50%; color: #f7aa73; background: var(--night); font-size: 11px; }.flow-step h3 { margin: 0; font-size: 26px; font-weight: 520; }.flow-step p { margin: 8px 0 0; color: rgba(255,255,255,.5); font-size: 13px; }.flow-arrow { color: rgba(255,255,255,.35); transition: 180ms ease; }.flow-step:hover .flow-arrow { color: var(--accent); transform: translateX(5px); }
.trust-section { padding: 72px 0 40px; border-bottom: 1px solid var(--line); background: #edede6; }
.trust-grid { display: grid; grid-template-columns: 1.35fr repeat(3, .65fr); gap: 24px; align-items: end; }.trust-intro h2 { max-width: 490px; margin: 17px 0 0; font-size: 31px; font-weight: 520; letter-spacing: -.035em; line-height: 1.35; }.trust-stat { display: flex; min-height: 135px; flex-direction: column; justify-content: flex-end; padding-left: 25px; border-left: 1px solid #cfcfc7; }.trust-stat strong { font-size: 56px; font-weight: 450; letter-spacing: -.05em; }.trust-stat span { margin-top: 9px; color: var(--muted); font-size: 12px; }.data-note { width: min(100% - 48px, 1320px); margin: 42px auto 0; color: #93958e; font-size: 10px; text-align: right; }
.news-list { margin-top: 60px; border-top: 1px solid var(--line); }.news-item { display: grid; grid-template-columns: 110px 100px 1fr 44px; align-items: center; gap: 25px; min-height: 116px; padding: 18px 3px; border-bottom: 1px solid var(--line); transition: 180ms ease; }.news-item:hover { padding-right: 16px; padding-left: 16px; background: #fff; }.news-type { color: var(--accent-dark); font-size: 11px; font-weight: 700; }.news-date { color: #8b8e87; font-size: 12px; }.news-item h3 { margin: 0; font-size: 19px; font-weight: 520; line-height: 1.5; }.news-arrow { display: grid; width: 42px; height: 42px; place-items: center; border: 1px solid var(--line); border-radius: 50%; transition: 180ms ease; }.news-item:hover .news-arrow { color: white; border-color: var(--accent); background: var(--accent); }
.contact-banner { position: relative; overflow: hidden; padding: 104px 0; color: white; background: var(--accent); }.contact-pattern { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(8, 1fr); opacity: .2; transform: rotate(-8deg) scale(1.2); }.contact-pattern span { border: 1px solid rgba(255,255,255,.35); }.contact-content { position: relative; z-index: 1; display: grid; grid-template-columns: 160px 1fr auto; align-items: center; gap: 45px; }.contact-content > p { font-size: 11px; font-weight: 700; letter-spacing: .2em; }.contact-content h2 { max-width: 750px; margin: 0; font-size: clamp(34px, 4vw, 57px); font-weight: 500; letter-spacing: -.045em; line-height: 1.2; }.contact-content a { display: flex; width: 150px; height: 150px; flex-direction: column; align-items: center; justify-content: center; gap: 16px; border: 1px solid rgba(255,255,255,.55); border-radius: 50%; font-size: 13px; font-weight: 700; text-align: center; transition: 200ms ease; }.contact-content a span { font-size: 20px; }.contact-content a:hover { color: var(--accent-dark); background: white; transform: rotate(-5deg); }
@media (max-width: 1050px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }.capability-layout { gap: 55px; }.trust-grid { grid-template-columns: repeat(3,1fr); }.trust-intro { grid-column: 1 / -1; margin-bottom: 25px; }.contact-content { grid-template-columns: 1fr auto; }.contact-content > p { grid-column: 1 / -1; }
}
@media (max-width: 767px) {
  .platform-section, .products-section, .news-section { padding: 82px 0; }.intro-grid, .platform-grid, .capability-layout { grid-template-columns: 1fr; gap: 38px; }.platform-grid { margin-top: 48px; }.platform-photo { height: 260px; }.platform-body { padding: 25px 23px 28px; }.platform-body h3 { min-height: 0; font-size: 22px; }.products-heading, .news-heading { align-items: flex-start; flex-direction: column; }.product-grid { grid-template-columns: 1fr; margin-top: 45px; }.product-card { min-height: 420px; }.capability-section { padding: 84px 0; }.capability-layout { gap: 55px; }.flow-step { gap: 15px; }.flow-step h3 { font-size: 22px; }.flow-arrow { display: none; }.trust-section { padding-top: 65px; }.trust-grid { grid-template-columns: 1fr; }.trust-stat { min-height: 110px; padding: 22px 0 0; border-top: 1px solid #cfcfc7; border-left: 0; }.data-note { width: min(100% - 32px, 1320px); text-align: left; line-height: 1.6; }.news-item { grid-template-columns: 82px 1fr 40px; gap: 14px; min-height: 128px; }.news-date { display: none; }.news-item h3 { font-size: 16px; }.contact-banner { padding: 80px 0; }.contact-content { grid-template-columns: 1fr; gap: 28px; }.contact-content a { width: auto; height: auto; flex-direction: row; padding: 17px 20px; border-radius: 8px; }.contact-pattern { grid-template-columns: repeat(4,1fr); }
}
</style>
