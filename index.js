

module.exports = function(name, peer) {
  return function(peer) {

  }
}


/**
 * Initialize peer data channel connection.
 *
 * @param {String} name
 * @param {Peer} peer
 * @param {RTCDataChannel}
 * @api private
 */

function init(name, peer) {
  var channel = peer.createDataChannel(name)
  channel.onmessage = function (event) {
    peer.emit('message', event.data)
  }
  channel.onopen = function () {
    peer.emit('channel open', name)
  }
  channel.onclose = function () {
    peer.emit('channel close', name)
  }
  return channel
}
