## Open Classroom XBlock

This XBlock allows [Open Classroom lessons](http://lessons.openclassroom.edu.vn) to be embedded in OpenEdX courses.

## Installation

For a native installation instance of OpenEdX:

```
$ sudo -H -u edxapp bash
$ source /edx/app/edxapp/edxapp_env
$ cd /edx/app/edxapp
$ pip install git+https://github.com/openclassroomteam/openclassroom-xblock.git#egg=openclassroom-xblock==0.0.1
```

For other types of OpenEdX installation, please consult the latest OpenEdX documentation.

## Usage

1. You will need to add the value "openclassroom" to the `advanced_modules` field in Studio's 'Advanced Settings' menu.
2. This XBlock may not show up as a live preview in Studio. However, it does show up in the LMS.
3. This XBlock also comes with default logging capabilities that make use of edX's `event-tracking` library (documented [here](http://edx.readthedocs.org/projects/edx-developer-guide/en/latest/analytics.html#event-tracking)).


## Working with Translations

For information about working with translations, see the [Internationalization Support](http://edx.readthedocs.io/projects/xblock-tutorial/en/latest/edx_platform/edx_lms.html#internationalization-support) section of the [Open edX XBlock Tutorial](https://xblock-tutorial.readthedocs.io/en/latest/).
