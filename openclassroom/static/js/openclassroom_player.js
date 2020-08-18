// Copyright 2019 Open Classroom Team. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Insert this script at the bottom of your web page. It will take all the
 * <openclassroom> tags and render them as iframes of Open Classroom lessons.
 *
 * @author sll@google.com (Sean Lip)
 */


(function(window, document, gettext) {
  // Prevent duplicate loads of this embedding script.
  if (window.hasOwnProperty('OPENCLASSROOM_EMBED_GLOBALS')) {
    return;
  }

  window.OPENCLASSROOM_EMBED_GLOBALS = {
    version: '0.0.1'
  };

  /**
   * Logs a message in the console only if the embedding page is on localhost.
   * @param {string} The message to log.
   * @param {boolean} Whether to log the message only in dev mode.
   */
  function _debug(message) {
    if (console && window.location.host.indexOf('localhost') === 0) {
      console.log(message);
    }
  }

  /**
   * Logs a message in the console.
   * @param {string} The message to log.
   */
  function _log(message) {
    if (console) {
      console.log(message);
    }
  }

  /**
   * Create a random secret that is added to the fragment (the part after the
   * '#' symbol) of each child iframe's location URL. Any postMessages sent to
   * that child should include this secret, and the child iframe should check
   * that the secret in the received postMessage matches the secret in the
   * location hash. This defends against fraudulent messages being sent to the
   * child iframe by other code within the parent page.
   */
  var SECRET_LENGTH = 64;
  var secret = '';
  for (var i = 0; i < SECRET_LENGTH; i++) {
    secret += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  var OpenClassroomEmbed = (function() {
    function OpenClassroomEmbed(openclassroomNode) {
      // Validate the incoming node.
      if (openclassroomNode.tagName !== 'OPENCLASSROOM') {
        throw ('Error: expected OpenClassroomEmbed to be defined using a node of type ' +
               '<openclassroom>, not ' + openclassroomNode.tagName);
      }

      // This attribute is set to true when the iframe has loaded.
      this.contentHasLoaded = false;
      // The domain of the embedded site.
      this.targetDomain = null;

      // The initial <openclassroom> node.
      this.openclassroomNode = openclassroomNode;
      // The loading message div that replaces the <openclassroom> node while the
      // lesson is being loaded.
      this.loadingDiv = null;
      // The iframe node containing the lesson; this node ultimately
      // replaces the <openclassroom> node.
      this.iframe = null;
    }

    var LOADING_TIMEOUT_SECS = 10000;
    var warningBoxStyle = (
      'background-color: #ddd; border-radius: 5px; margin: 1px auto; ' +
      'max-width: 700px; padding: 30px; text-align: center');

    OpenClassroomEmbed.prototype.init = function() {
      if (this.contentHasLoaded) {
        _log('Error: tried to re-initialize Open Classroom node after its content ' +
             'was loaded.');
        return;
      }

      if (this.iframe !== null) {
        _log('Error: tried to initialize Open Classroom node, but the lesson ' +
             'iframe is already loaded.');
        return;
      }

      var that = this;

      if (!this.openclassroomNode.getAttribute('openclassroom-id')) {
        var strongTag = document.createElement('strong');
        strongTag.textContent = gettext('Warning: ');

        var spanTag = document.createElement('span');
        spanTag.textContent = gettext('This Open Classroom lesson could not be loaded because no openclassroom-id attribute was specified in the HTML tag.');

        var div = document.createElement('div');
        div.appendChild(strongTag);
        div.appendChild(spanTag);
        div.setAttribute('style', warningBoxStyle);

        this.openclassroomNode.parentNode.replaceChild(div, this.openclassroomNode);
        return;
      }

      var autoload = this.openclassroomNode.getAttribute('autoload') || true;
      if (autoload && autoload === 'false') {
        // Do not load the lesson automatically.
        var button = document.createElement('button');
        button.textContent = gettext('Load Lesson');
        button.onclick = function() {
          that.init();
        };
        var buttonStyles = [
          'background-color: rgb(95, 201, 95)',
          'border-radius: 5px',
          'color: white',
          'font-size: 1.2em',
          'height: 50px',
          'padding: 10px',
          'width: 700px'
        ];
        button.setAttribute('style', buttonStyles.join('; ') + ';');

        var buttonContainer = document.createElement('div');
        buttonContainer.setAttribute(
          'style', 'margin: 10px auto; text-align: center');
        buttonContainer.appendChild(button);
        this.openclassroomNode.appendChild(buttonContainer);

        // Set autoload to true so that the frame actually does load the next
        // time init() is called on this node.
        this.openclassroomNode.setAttribute('autoload', 'true');
        return;
      }

      this.iframe = document.createElement('iframe');
      var currLoc = window.location.protocol + '//' + window.location.host;
      this.targetDomain = this.openclassroomNode.getAttribute('src') || currLoc;
      var locale = this.openclassroomNode.getAttribute('locale') || 'en';
      var height = this.openclassroomNode.getAttribute('height');
      var width = this.openclassroomNode.getAttribute('width');
      var fixedHeight = 'false';
      var fixedWidth = 'false';
      var explorationVersion = this.openclassroomNode.getAttribute('exploration-version') || '';

      if (!height || height == 'auto') {
        // The default height is 700px.
        height = '700px';
      } else {
        fixedHeight = 'true';
      }

      if (!width || width == 'auto') {
        // The default width is 98%. This leaves room for the vertical scrollbar
        // (otherwise we get a horizontal scrollbar when there's a vertical
        // scrollbar).
        width = '98%';
      } else {
        fixedWidth = 'true';
      }

      var VERSION_KEY = 'version=';
      var SECRET_KEY = 'secret=';
      var versionString = explorationVersion ? '&v=' + explorationVersion : '';
      this.iframe.src = encodeURI(
        this.targetDomain + '/explore/' + this.openclassroomNode.getAttribute('openclassroom-id') +
        '?iframed=true&locale=en' + versionString +
        '#' + VERSION_KEY + OPENCLASSROOM_EMBED_GLOBALS.version +
        '&' + SECRET_KEY + secret);

      var iframeAttrs = {
        seamless: 'seamless',
        height: height,
        width: width,
        fixedheight: fixedHeight,
        fixedwidth: fixedWidth,
        frameborder: 0,
        // Hide the iframe first so that autofocus will not scroll the page.
        style: 'margin: 10px; position: fixed; top: -9999px; visibility: hidden;',
        // NEW: ADDED FOR OpenEdX.
        title: gettext('Open Classroom lesson')
      };
      for (var key in iframeAttrs) {
        this.iframe.setAttribute(key, iframeAttrs[key]);
      }

      this.openclassroomNode.parentNode.replaceChild(this.iframe, this.openclassroomNode);

      // Create a div with a loading message.
      var loadingMessageSpan = document.createElement('span');
      loadingMessageSpan.style.fontSize = 'larger';
      loadingMessageSpan.textContent = gettext('Loading...');

      var loadingMessageContainer = document.createElement('div');
      loadingMessageContainer.setAttribute('style', warningBoxStyle);
      loadingMessageContainer.appendChild(loadingMessageSpan);
      loadingMessageContainer.style.textAlign = 'center';

      this.loadingDiv = document.createElement('div');
      this.loadingDiv.appendChild(loadingMessageContainer);
      this.loadingDiv.appendChild(document.createElement('br'));
      this.loadingDiv.appendChild(document.createElement('br'));

      this.iframe.parentNode.insertBefore(this.loadingDiv, this.iframe);

      setTimeout(function() {
        // Show a warning message after the timeout.
        if (!that.contentHasLoaded) {
          var loadingMessageContainer = that.loadingDiv.firstChild;
          var loadingMessage = loadingMessageContainer.firstChild;

          loadingMessage.textContent = gettext('This lesson could not be loaded.');

          var loadingMessageSubtitle = document.createElement('div');
          loadingMessageSubtitle.textContent = gettext('Sorry about that.');

          loadingMessageContainer.setAttribute('style', warningBoxStyle);
          loadingMessageContainer.appendChild(document.createElement('br'));
          loadingMessageContainer.appendChild(document.createElement('br'));
          loadingMessageContainer.appendChild(loadingMessageSubtitle);
        }
      }, LOADING_TIMEOUT_SECS);

      // NOTE: Modified for OpenEdX to include lesson version.

      /**
       * Receives JSON-encoded messages from embedded Open Classroom iframes. Each
       * message has a title and a payload. The structure of the payload
       * depends on what the title is:
       *   - 'heightChange': The payload is an Object with the following fields:
       *         height: a positive integer, and
       *         scroll: boolean -- scroll down to bottom if true.
       *   - 'explorationLoaded': The payload is an Object with one key:
       *         explorationVersion.
       *   - 'stateTransition': The payload is an Object with four keys:
       *       'oldStateName', 'jsonAnswer', 'newStateName' and
       *       'explorationVersion'.
       *   - 'explorationReset': The payload is an Object with a single
       *          key-value pair. The key is 'stateName', and the value is of
       *          type String.
       *   - 'explorationCompleted': The payload is an Object with one key:
       *          explorationVersion.
       */
      window.addEventListener('message', function(evt) {
        // Verify the origin of the message.
        if (evt.origin !== that.targetDomain) {
          return false;
        }

        // Verify that the message comes from the child we know about.
        if (evt.source !== that.iframe.contentWindow) {
          return false;
        }

        try {
          var data = JSON.parse(evt.data);
          _debug(data);
        } catch(error) {
          return false;
        }

        var iframeNode = that.iframe;
        switch(data.title) {
          case 'explorationLoaded':
            that.loadingDiv.parentNode.removeChild(that.loadingDiv);
            that.explorationHasLoaded = true;
            window.OPENCLASSROOM_PLAYER.onExplorationLoaded(
              iframeNode, data.payload.explorationVersion);
            break;
          case 'heightChange':
            window.OPENCLASSROOM_PLAYER.onHeightChange(
              iframeNode, data.payload.height, data.payload.scroll);
            break;
          case 'stateTransition':
            window.OPENCLASSROOM_PLAYER.onStateTransition(
              iframeNode, data.payload.oldStateName, data.payload.jsonAnswer,
              data.payload.newStateName, data.payload.explorationVersion);
            break;
          case 'explorationReset':
            // This needs to be set in order to allow the scrollHeight of the
            // iframe content to be calculated accurately within the iframe's
            // JS.
            iframeNode.style.height = 'auto';
            window.OPENCLASSROOM_PLAYER.onExplorationReset(
              iframeNode, data.payload.stateName);
            break;
          case 'explorationCompleted':
            window.OPENCLASSROOM_PLAYER.onExplorationCompleted(
              iframeNode, data.payload.explorationVersion);
            break;
          default:
            _log('Error: event ' + data.title + ' not recognized.');
        }
      }, false);
    }

    return OpenClassroomEmbed;
  })();

  window.onload = function() {
    // Note that document.getElementsByTagName() is a live view of the DOM and
    // will change in response to DOM mutations.
    var openclassroomElementsFromDOM = document.getElementsByTagName('openclassroom');

    // The openclassroomElementsFromDOM list needs to be copied, otherwise it gets
    // changed during the for loop.
    var openclassroomElements = [];
    for (var i = 0; i < openclassroomElementsFromDOM.length; i++) {
      openclassroomElements.push(openclassroomElementsFromDOM[i]);
    }

    for (var i = 0; i < openclassroomElements.length; i++) {
      var openclassroomElement = new OpenClassroomEmbed(openclassroomElements[i]);
      openclassroomElement.init();
    }
  };

  window.OPENCLASSROOM_PLAYER = {
    /**
     * Called when the height of the embedded iframe is changed.
     * @param {object} iframeNode The iframe node that is the source of the
     *     postMessage call.
     * @param {int} newHeight The new height of the embedded iframe.
     * @param {boolean} doScroll Scroll down to show the bottom of iframe after
     *     changing the height.
     */
    onHeightChange: function(iframeNode, newHeight, doScroll) {
      _debug(
        'onHeightChange event triggered on ' + iframeNode + ' for ' +
        newHeight);

      // This is set to 'auto' when the lesson is reset. If this is not
      // removed, the iframe height will not change even if iframeNode.height
      // is set.
      iframeNode.style.height = '';

      if (iframeNode.getAttribute('fixedheight') === 'false') {
        iframeNode.height = newHeight + 'px';
      }
      if (doScroll) {
        iframeNode.scrollIntoView(false);
      }

      window.OPENCLASSROOM_PLAYER.onHeightChangePostHook(iframeNode, newHeight);
    },
    onExplorationLoaded: function(iframeNode, explorationVersion) {
      setTimeout(function() {
        // Show the Open Classroom contents after making sure the rendering happened.
        iframeNode.style.position = 'inherit';
        iframeNode.style.visibility = 'inherit';
        iframeNode.style.top = 'inherit';
      }, 0);
      window.OPENCLASSROOM_PLAYER.onExplorationLoadedPostHook(
        iframeNode, explorationVersion);
    },
    onStateTransition: function(
        iframeNode, oldStateName, jsonAnswer, newStateName, explorationVersion) {
      window.OPENCLASSROOM_PLAYER.onStateTransitionPostHook(
        iframeNode, oldStateName, jsonAnswer, newStateName, explorationVersion);
    },
    onExplorationReset: function(iframeNode, stateName) {
      window.OPENCLASSROOM_PLAYER.onExplorationResetPostHook(iframeNode, stateName);
    },
    onExplorationCompleted: function(iframeNode, explorationVersion) {
      window.OPENCLASSROOM_PLAYER.onExplorationCompletedPostHook(
        iframeNode, explorationVersion);
    }
  };
}(window, document, OpenClassroomXBlockI18N.gettext));


// FIXME: The contents of all functions below this line can be overwritten.

/**
 * Called after the height of the embedded iframe is changed and the iframe has
 * been appropriately resized.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 * @param {int} newHeight The new height of the embedded iframe.
 */
window.OPENCLASSROOM_PLAYER.onHeightChangePostHook = function(iframeNode, newHeight) {

};

/**
 * Called when the lesson is loaded.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 * @param {int} explorationVersion The version number of the lesson.
 */
window.OPENCLASSROOM_PLAYER.onExplorationLoadedPostHook = function(
  iframeNode, explorationVersion) {

};

/**
 * Called when a new state is encountered.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 * @param {string} oldStateName The name of the previous state.
 * @param {string} jsonAnswer A JSON representation of the reader's answer.
 * @param {string} newStateName The name of the destination state.
 * @param {int} explorationVersion The version number of the lesson.
 */
window.OPENCLASSROOM_PLAYER.onStateTransitionPostHook = function(
    iframeNode, oldStateName, jsonAnswer, newStateName, explorationVersion) {

};

/**
 * Called when the lesson is reset.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 * @param {string} stateName The reader's current state, before the reset.
 */
window.OPENCLASSROOM_PLAYER.onExplorationResetPostHook = function(iframeNode, stateName) {

};

/**
 * Called when the lesson is completed.
 * @param {object} iframeNode The iframe node that is the source of the
 *     postMessage call.
 * @param {int} explorationVersion The version number of the lesson.
 */
window.OPENCLASSROOM_PLAYER.onExplorationCompletedPostHook = function(
  iframeNode, explorationVersion) {

};
