import { Header } from './components/Header'

import styles from './App.module.css'
import './global.css'
import { Post } from './components/Post'

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <main>
            <Post />
        </main>
      </div>
    </div>
  )
}

export default App
