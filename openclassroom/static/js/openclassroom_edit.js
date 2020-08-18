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
 * @fileoverview  Javascript for Open Classroom XBlock editor.
 */

function OpenClassroomXBlockEditor(runtime, element) {
  $(element).find('.save-button').bind('click', function() {
    var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
    var data = {
      openclassroomid: $(element).find('input[name=openclassroomid]').val(),
      src: $(element).find('input[name=src]').val(),
      display_name: $(element).find('input[name=display_name]').val()
    };
    runtime.notify('save', {state: 'start'});
    $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
      runtime.notify('save', {state: 'end'});
    });
  });

  $(element).find('.cancel-button').bind('click', function() {
    runtime.notify('cancel', {});
  });
}
