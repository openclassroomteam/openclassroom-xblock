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
 * @fileoverview  Javascript for Open Classroom XBlock.
 */

function OpenClassroomXBlock(runtime, element) {
  var onLoadHandlerUrl = runtime.handlerUrl(
    element, 'on_exploration_loaded');
  var onStateTransitionUrl = runtime.handlerUrl(
    element, 'on_state_transition');
  var onCompleteHandlerUrl = runtime.handlerUrl(
    element, 'on_exploration_completed');

  $(function ($) {
    window.OPENCLASSROOM_PLAYER.onExplorationLoadedPostHook = function(
        iframeNode, explorationVersion) {
      $.ajax({
        type: "POST",
        url: onLoadHandlerUrl,
        data: JSON.stringify({
          explorationVersion: explorationVersion
        })
      });
    };

    window.OPENCLASSROOM_PLAYER.onStateTransitionPostHook = function(
        iframeNode, oldStateName, jsonAnswer, newStateName, explorationVersion) {
      $.ajax({
        type: "POST",
        url: onStateTransitionUrl,
        data: JSON.stringify({
          oldStateName: oldStateName,
          jsonAnswer: jsonAnswer,
          newStateName: newStateName,
          explorationVersion: explorationVersion
        })
      });
    };

    window.OPENCLASSROOM_PLAYER.onExplorationCompletedPostHook = function(
        iframeNode, explorationVersion) {
      $.ajax({
        type: "POST",
        url: onCompleteHandlerUrl,
        data: JSON.stringify({
          explorationVersion: explorationVersion
        })
      });
    };
  });
}
