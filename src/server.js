import Server from 'socket.io'

export default function startServer (store) {
  const io = new Server().attach(8090)

  // Below, the whole app state is being published to all clients. Future
  // optimization may be to emit only relevant state subsets or diffs.
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  )

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS())
  })
}
