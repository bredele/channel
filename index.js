
/**
 * Modules dependencies.
 * @api private
 */

var trace = require('trace')('channel');


/**
 * Create a single data chanel from the peer connection
 * once created.
 *
 * Extend peer with a send handler to send data over
 * the peer data channel.
 *
 * Examples:
 *
 *   peer.use(channel('chat'));
 * 
 * @param {String || JSON} name
 * @api public
 */

module.exports = function(name) {

  return function(peer) {
    var channel;
    var constraints = {};

    // it seems it doesn't change anything
    // detect('cw', function() {
    //   constraints = {
    //     reliable: false
    //   };
    // });


    /**
     * Send data through channel.
     * 
     * @param  {String } data 
     * @return {this}
     * @api public
     */

    peer.send = function(data) {
      if(typeof data === 'object') {
        data = JSON.stringify(data);
      }
      channel.send(data);
    };


    // create data channel on offer
    
    peer.on('before offer', function() {
      trace('create channel');
      channel = peer.connection.createDataChannel(name, constraints);
      setChannel(peer, channel);
    });


    // create data channel on answer
    
    peer.on('before answer', function() {
      // we will have to clean that up
      peer.connection.ondatachannel = function(event) {
        trace('receive channel');
        channel = event.channel;
        setChannel(peer, channel);
      };
    });

  };
};


function setChannel(peer, channel) {

  channel.onmessage = function (event) {
    peer.emit('message', event.data);
  };

  channel.onerror = function (error) {
    peer.emit('error', error);
  };

  channel.onopen = function () {
    peer.emit('channel open', name);
  };

  channel.onclose = function () {
    peer.emit('channel close', name);
  };

}