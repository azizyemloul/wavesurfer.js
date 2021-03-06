'use strict';

// Create an instance
var wavesurfer = Object.create(WaveSurfer);

// Init & load
document.addEventListener('DOMContentLoaded', function () {
    var options = {
        container     : '#waveform',
        waveColor     : 'violet',
        progressColor : 'purple',
        loaderColor   : 'purple',
        cursorColor   : 'navy'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    if (location.search.match('normalize')) {
        options.normalize = true;
    }

    /* Progress bar */
    var progressDiv = document.querySelector('#progress-bar');
    var progressBar = progressDiv.querySelector('.progress-bar');
    wavesurfer.on('loading', function (percent) {
        progressDiv.style.display = 'block';
        progressBar.style.width = percent + '%';
    });

    wavesurfer.on('ready', function () {
        progressDiv.style.display = 'none';

        // Init Timeline plugin
        var timeline = Object.create(WaveSurfer.Timeline);

        timeline.init({
            wavesurfer: wavesurfer,
            container: '#wave-timeline'
        });

    });

    // Init wavesurfer
    wavesurfer.init(options);
    wavesurfer.load('../../example/media/demo.wav');
});


// Bind buttons and keypresses
wavesurfer.on('ready', function () {
    var handlers = {
        'play': function () {
            wavesurfer.playPause();
        }
    };

    var map = {
        32: 'play'       // spacebar
    };

    document.addEventListener('keydown', function (e) {
        if (e.keyCode in map) {
            e.preventDefault();
            var handler = handlers[map[e.keyCode]];
            handler && handler(e);
        }
    });

    document.addEventListener('click', function (e) {
        var action = e.target.dataset && e.target.dataset.action;
        if (action && action in handlers) {
            handlers[action](e);
        }
    });
});
