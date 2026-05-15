import Link from 'next/link'

const links = [
  ['歷史', '/history'],
  ['學生會', '/student-union'],
  ['教學', '/academics'],
  ['校園', '/campus'],
  ['校友', '/alumni']
]

export default function HomePage() {
  return (
    <div className="site">
      <header className="header">
        <nav className="nav">
          <Link className="brand" href="/">CDSJ5 Wiki</Link>
          <div className="links">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </div>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="card hero-copy">
            <div className="eyebrow">Community Archive</div>
            <h1>聖若瑟教區中學第五校</h1>
            <p className="lead">一個整理 CDSJ5 校史、校園文化、學生會、教學制度與校友資料的乾淨 wiki。先求穩定、清楚、好讀，再慢慢加料。</p>
            <div className="quote">實事求是，己立立人</div>
          </div>

          <aside className="card infobox">
            <h2>基本資料</h2>
            <div className="info-row"><span className="info-label">簡稱</span><span>CDSJ5 / 五校 / 聖五</span></div>
            <div className="info-row"><span className="info-label">地點</span><span>澳門台山</span></div>
            <div className="info-row"><span className="info-label">類型</span><span>天主教私立學校</span></div>
            <div className="info-row"><span className="info-label">語言</span><span>中文、英文、葡文</span></div>
            <div className="info-row"><span className="info-label">校訓</span><span>實事求是，己立立人</span></div>
          </aside>
        </section>

        <section className="article">
          <h2>快速導覽</h2>
          <div className="grid">
            <Link className="card tile" href="/history"><h3>學校歷史</h3><p>由真原小學到第五校行政獨立。</p></Link>
            <Link className="card tile" href="/student-union"><h3>學生會</h3><p>整理學生會復辦、宗旨與架構。</p></Link>
            <Link className="card tile" href="/academics"><h3>教學制度</h3><p>中文部、英文部與高中選科制度。</p></Link>
            <Link className="card tile" href="/campus"><h3>校園設施</h3><p>中小幼部主要設施與活動空間。</p></Link>
            <Link className="card tile" href="/alumni"><h3>校友</h3><p>政商、文化、體育及高等院校校友。</p></Link>
            <Link className="card tile" href="/culture"><h3>校園文化</h3><p>校歌、校訓與校園軼聞。</p></Link>
          </div>
        </section>
      </main>

      <footer className="footer">CDSJ5 Community Archive</footer>
    </div>
  )
}
