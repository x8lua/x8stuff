import Link from 'next/link'

const nav = [
  ['Overview', '/'],
  ['History', '/history'],
  ['Student Union', '/student-union'],
  ['Academics', '/academics'],
  ['Campus', '/campus'],
  ['Alumni', '/alumni']
]

const cards = [
  ['學校歷史', '/history', '從真原小學、教區學校網絡，到第五校行政獨立與免費教育時期。'],
  ['學生會', '/student-union', '學生會復辦、選舉制度、常見部門與歷屆架構整理。'],
  ['教學制度', '/academics', '中文部、英文部、高中分科與選科制度。'],
  ['校園設施', '/campus', '中小幼部主要活動空間、專科室與已更動設施。']
]

export default function HomePage() {
  return (
    <div className="site">
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" href="/"><span className="mark">5</span><span>CDSJ5 Wiki</span></Link>
          <div className="toplinks">
            <Link href="/history">歷史</Link>
            <Link href="/student-union">學生會</Link>
            <Link href="/academics">教學</Link>
            <Link href="/campus">校園</Link>
          </div>
        </div>
      </header>

      <main className="shell">
        <aside className="sidebar">
          <div className="sidebar-title">Navigation</div>
          {nav.map(([label, href]) => <Link className={`side-link ${href === '/' ? 'active' : ''}`} key={href} href={href}>{label}</Link>)}
        </aside>

        <div className="content">
          <section className="hero">
            <div className="hero-main">
              <div className="eyebrow">Community Archive</div>
              <h1>聖若瑟教區中學第五校</h1>
              <p className="lead">一個更乾淨、可維護的 CDSJ5 wiki。重點是清楚整理校史、學生會、教學制度與校園文化，而不是把所有資料直接倒進頁面。</p>
            </div>
            <div className="hero-meta">
              <div className="meta-cell"><div className="meta-label">簡稱</div><div className="meta-value">CDSJ5 / 聖五</div></div>
              <div className="meta-cell"><div className="meta-label">地點</div><div className="meta-value">澳門台山</div></div>
              <div className="meta-cell"><div className="meta-label">類型</div><div className="meta-value">天主教私立學校</div></div>
              <div className="meta-cell"><div className="meta-label">校訓</div><div className="meta-value">實事求是，己立立人</div></div>
            </div>
          </section>

          <section className="section">
            <h2>快速入口</h2>
            <p>先把核心資料拆成可讀頁面，之後再慢慢補來源、圖片、年表和人物條目。</p>
            <div className="card-grid">
              {cards.map(([title, href, desc]) => <Link className="wiki-card" href={href} key={href}><h3>{title}</h3><p>{desc}</p></Link>)}
            </div>
          </section>

          <section className="section">
            <h2>編輯方針</h2>
            <div className="notice">涉及爭議、人物評價或未完全證實的內容，建議使用中立語氣並附公開來源，避免寫成爆料文或主觀評論。</div>
          </section>
        </div>

        <aside className="infobox">
          <div className="info-head"><h2>School infobox</h2><p>Colégio Diocesano de São José 5</p></div>
          <div className="info-row"><span className="info-label">創立</span><span>1931 / 1932</span></div>
          <div className="info-row"><span className="info-label">宗教</span><span>天主教</span></div>
          <div className="info-row"><span className="info-label">語言</span><span>中文、英文、葡文</span></div>
          <div className="info-row"><span className="info-label">校長</span><span>黃建民先生</span></div>
          <div className="info-row"><span className="info-label">網站</span><span>cdsj5.edu.mo</span></div>
        </aside>
      </main>

      <footer className="footer">CDSJ5 Community Archive · Built with Next.js</footer>
    </div>
  )
}
