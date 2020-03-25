export default function({ $auth }) {
  $auth.resetOnError = (error, name, endpoint) => {
    console.log('Auth error:')
    console.error(name, error)
    return true
  }
}
