import Link from 'next/link'

export default function StudentUnionPage() {
  return (
    <div className="site">
      <header className="header"><nav className="nav"><Link className="brand" href="/">CDSJ5 Wiki</Link><div className="links"><Link href="/">首頁</Link><Link href="/history">歷史</Link></div></nav></header>
      <main className="main">
        <article className="article">
          <div className="eyebrow">Student Union</div>
          <h1>學生會</h1>
          <p className="lead">學生會於 2013 年復辦，主要功能是增加學生參與、組織校內活動，並成為學生與校方之間的溝通橋樑。</p>

          <h2>宗旨</h2>
          <div className="grid">
            <div className="card tile"><h3>學生參與</h3><p>讓學生參與校內活動與公共事務。</p></div>
            <div className="card tile"><h3>溝通橋樑</h3><p>連接學生意見與學校行政。</p></div>
            <div className="card tile"><h3>領導能力</h3><p>培養組織、策劃與協作能力。</p></div>
          </div>

          <h2>選舉制度</h2>
          <p>學生會管理層由中學部學生以一人一票方式選出。正副會長需由中文部及英文部學生共同組成，以平衡代表性。</p>

          <h2>常見部門</h2>
          <table className="table"><tbody>
            <tr><th>部門</th><th>職能</th></tr>
            <tr><td>秘書部</td><td>會議紀錄、文書與內部行政。</td></tr>
            <tr><td>財務部</td><td>財政紀錄與活動開支管理。</td></tr>
            <tr><td>宣傳部</td><td>海報、社交平台與活動宣傳。</td></tr>
            <tr><td>學術部</td><td>學術活動與校園學習支援。</td></tr>
            <tr><td>康體部</td><td>康樂、體育及大型活動協助。</td></tr>
          </tbody></table>
        </article>
      </main>
    </div>
  )
}
