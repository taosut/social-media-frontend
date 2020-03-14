export default function({ $auth }) {
  $auth.resetOnError = (error, name, endpoint) => {
    console.error(name, error)
    return true
  }
}
