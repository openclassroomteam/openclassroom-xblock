# coding: utf-8
#
# Copyright 2019 Open Classroom Team. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This XBlock embeds an Open Classroom lesson in the OpenEdX platform."""

import os
import pkg_resources

from django.template import Context
from django import utils

from xblock.core import XBlock
from xblock.fields import Scope, String
from xblock.fragment import Fragment
from xblockutils.resources import ResourceLoader


from .utils import _


@XBlock.needs("i18n")
class OpenClassroomXBlock(XBlock):
    """
    An XBlock providing an embedded Open Classroom lesson.
    """
    loader = ResourceLoader(__name__)

    _EVENT_NAME_EXPLORATION_LOADED = 'openclassroom.exploration.loaded'
    _EVENT_NAME_EXPLORATION_COMPLETED = 'openclassroom.exploration.completed'
    _EVENT_NAME_STATE_TRANSITION = 'openclassroom.exploration.state.changed'

    display_name = String(
        help=_("Display name of the component"),
        default=_("Open Classroom lesson"),
        scope=Scope.content)
    openclassroomid = String(
        help=_("ID of the Open Classroom lesson to embed"),
        default="2DB88aOgiXgD",
        scope=Scope.content)
    src = String(
        help=_("Source URL of the site"),
        default="https://lessons.openclassroom.edu.vn",
        scope=Scope.content)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def render_template(self, path, context):
        return self.loader.render_django_template(
            os.path.join('templates', path),
            context=Context(context),
        )

    def get_translation_content(self):
        try:
            return self.resource_string('static/js/translations/{lang}/textjs.js'.format(
                lang=utils.translation.get_language(),
            ))
        except IOError:
            return self.resource_string('static/js/translations/en/textjs.js')

    def student_view(self, context=None):
        """
        The primary view of the OpenClassroomXBlock, shown to students
        when viewing courses.
        """
        frag = Fragment(self.render_template("openclassroom.html", {
            'src': self.src,
            'openclassroomid': self.openclassroomid,
        }))
        frag.add_javascript(self.get_translation_content())
        frag.add_javascript(
            self.resource_string('static/js/openclassroom_player.js'))
        frag.add_javascript(self.resource_string("static/js/openclassroom.js"))
        frag.initialize_js('OpenClassroomXBlock')
        return frag

    def author_view(self, context=None):
        """
        A view of the XBlock to show within the Studio preview. For some
        reason, the student_view() does not display, so we show a placeholder
        instead.
        """
        frag = Fragment(self.render_template("openclassroom_preview.html", {
            'src': self.src,
            'openclassroomid': self.openclassroomid,
        }))
        frag.add_javascript(self.get_translation_content())
        return frag

    def _log(self, event_name, payload):
        """
        Logger for load, state transition and completion events.
        """
        self.runtime.publish(self, event_name, payload)

    @XBlock.json_handler
    def on_exploration_loaded(self, data, suffix=''):
        """Called when an exploration has loaded."""
        self._log(self._EVENT_NAME_EXPLORATION_LOADED, {
            'exploration_id': self.openclassroomid,
            'exploration_version': data['explorationVersion'],
        })

    @XBlock.json_handler
    def on_state_transition(self, data, suffix=''):
        """Called when a state transition in the exploration has occurred."""
        self._log(self._EVENT_NAME_STATE_TRANSITION, {
            'exploration_id': self.openclassroomid,
            'old_state_name': data['oldStateName'],
            'new_state_name': data['newStateName'],
            'exploration_version': data['explorationVersion'],
        })

    @XBlock.json_handler
    def on_exploration_completed(self, data, suffix=''):
        """Called when the exploration has been completed."""
        self._log(self._EVENT_NAME_EXPLORATION_COMPLETED, {
            'exploration_id': self.openclassroomid,
            'exploration_version': data['explorationVersion'],
        })

    def studio_view(self, context):
        """
        Create a fragment used to display the edit view in the Studio.
        """
        frag = Fragment(self.render_template("openclassroom_edit.html", {
            'src': self.src,
            'openclassroomid': self.openclassroomid or '',
            'display_name': self.display_name,
        }))

        frag.add_javascript(self.get_translation_content())
        js_str = pkg_resources.resource_string(
            __name__, "static/js/openclassroom_edit.js")
        frag.add_javascript(unicode(js_str))
        frag.initialize_js('OpenClassroomXBlockEditor')

        return frag

    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        """
        Called when submitting the form in Studio.
        """
        self.openclassroomid = data.get('openclassroomid')
        self.src = data.get('src')
        self.display_name = data.get('display_name')

        return {'result': 'success'}

    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("Open Classroom Embedding",
             """<vertical_demo>
                <openclassroom openclassroomid="0" src="https://lessons.openclassroom.edu.vn"/>
                </vertical_demo>
             """),
        ]
