import styles from './ErrorMessage.module.css'

function ErrorMessage({ error }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>!</div>

      <div>
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    </div>
  )
}

export default ErrorMessage