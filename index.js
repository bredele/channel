

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
    console.log("received: " + event.data)
  }
  channel.onopen = function () {
    console.log("datachannel open");
  }
  channel.onclose = function () {
    console.log("datachannel close")
  }
  return channel
}
