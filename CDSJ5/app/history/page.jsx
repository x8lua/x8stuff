import Link from 'next/link'

const events = [
  ['1932', '蒙神父創辦真原小學。'],
  ['1942', '蒙神父逝世後，校務由聖安多尼堂區司鐸管理。'],
  ['1960', '首次開辦夜間教育。'],
  ['1979', '聖若瑟中學、將望德中學與真原小學合併成學校網絡。'],
  ['1986', '聖若瑟教區中學第五校行政獨立。'],
  ['1989', '正式開辦中學部。'],
  ['1991', '獲准開辦英文教學並承接中學英文部。'],
  ['2013', '復辦學生會，成立管弦樂團、合唱團與舞蹈團，推動多元評分。'],
  ['2017', '加入免費教育學校系統。'],
  ['2018', '成立家長教師會。']
]

export default function HistoryPage() {
  return (
    <div className="site">
      <header className="header"><nav className="nav"><Link className="brand" href="/">CDSJ5 Wiki</Link><div className="links"><Link href="/">首頁</Link><Link href="/student-union">學生會</Link></div></nav></header>
      <main className="main">
        <article className="article">
          <div className="eyebrow">History</div>
          <h1>學校歷史</h1>
          <p className="lead">這裡用時間線整理學校由真原小學到聖若瑟教區中學第五校的主要發展。</p>
          <div className="timeline">
            {events.map(([year, text]) => <div className="event" key={year}><div className="year">{year}</div><div>{text}</div></div>)}
          </div>
        </article>
      </main>
    </div>
  )
}
