export default function({ $auth }) {
  $auth.resetOnError = (error, name, endpoint) => {
    return true
  }
}
