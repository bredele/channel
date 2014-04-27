
/**
 * Create a single data chanel from the peer connection
 * once created.
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

		// Enable rtp coomunication
		
		peer.set('optional', [{
			RtpDataChannels: true
		}]);


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


		// create data channel
		
		peer.on('create', function() {

			// options
			channel = peer.connection.createDataChannel(name);

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

		});

	};
};


