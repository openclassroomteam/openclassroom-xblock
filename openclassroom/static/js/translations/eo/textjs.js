
            (function(global){
                var OpenClassroomXBlockI18N = {
                  init: function() {
                    

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=(n != 1);
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  /* gettext library */

  django.catalog = django.catalog || {};
  
  var newcatalog = {
    "Load Lesson": "L\u00f6\u00e4d L\u00e9ss\u00f6n \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5\u043c \u2202\u03c3\u0142\u03c3\u044f #",
    "Loading...": "L\u00f6\u00e4d\u00efng... \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5\u043c \u2202\u03c3\u0142\u03c3#",
    "Open Classroom lesson": "\u00d6p\u00e9n \u00c7l\u00e4ssr\u00f6\u00f6m l\u00e9ss\u00f6n \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5\u043c \u2202\u03c3\u0142\u03c3\u044f \u0455\u03b9\u0442 \u03b1\u043c\u0454\u0442, #",
    "Saving": "S\u00e4v\u00efng \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5#",
    "Sorry about that.": "S\u00f6rr\u00fd \u00e4\u00df\u00f6\u00fct th\u00e4t. \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5\u043c \u2202\u03c3\u0142\u03c3\u044f \u0455\u03b9\u0442 \u03b1\u043c\u0454#",
    "This Open Classroom lesson could not be loaded because no openclassroom-id attribute was specified in the HTML tag.": "Th\u00efs \u00d6p\u00e9n \u00c7l\u00e4ssr\u00f6\u00f6m l\u00e9ss\u00f6n \u00e7\u00f6\u00fcld n\u00f6t \u00df\u00e9 l\u00f6\u00e4d\u00e9d \u00df\u00e9\u00e7\u00e4\u00fcs\u00e9 n\u00f6 \u00f6p\u00e9n\u00e7l\u00e4ssr\u00f6\u00f6m-\u00efd \u00e4ttr\u00ef\u00df\u00fct\u00e9 w\u00e4s sp\u00e9\u00e7\u00eff\u00ef\u00e9d \u00efn th\u00e9 HTML t\u00e4g. \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5\u043c \u2202\u03c3\u0142#",
    "This lesson could not be loaded.": "Th\u00efs l\u00e9ss\u00f6n \u00e7\u00f6\u00fcld n\u00f6t \u00df\u00e9 l\u00f6\u00e4d\u00e9d. \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5\u043c \u2202\u03c3\u0142\u03c3\u044f \u0455\u03b9\u0442 \u03b1\u043c\u0454\u0442, \u00a2\u03c3\u03b7\u0455\u0454\u00a2\u0442\u0454#",
    "This may be happening because of an error with our server or your internet connection. Try refreshing the page or making sure you are online.": "Th\u00efs m\u00e4\u00fd \u00df\u00e9 h\u00e4pp\u00e9n\u00efng \u00df\u00e9\u00e7\u00e4\u00fcs\u00e9 \u00f6f \u00e4n \u00e9rr\u00f6r w\u00efth \u00f6\u00fcr s\u00e9rv\u00e9r \u00f6r \u00fd\u00f6\u00fcr \u00efnt\u00e9rn\u00e9t \u00e7\u00f6nn\u00e9\u00e7t\u00ef\u00f6n. Tr\u00fd r\u00e9fr\u00e9sh\u00efng th\u00e9 p\u00e4g\u00e9 \u00f6r m\u00e4k\u00efng s\u00fcr\u00e9 \u00fd\u00f6\u00fc \u00e4r\u00e9 \u00f6nl\u00efn\u00e9. \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5\u043c \u2202\u03c3\u0142\u03c3\u044f \u0455\u03b9\u0442 \u03b1\u043c\u0454\u0442, \u00a2\u03c3\u03b7\u0455\u0454\u00a2\u0442\u0454\u0442\u03c5\u044f \u03b1\u2202\u03b9\u03c1\u03b9\u0455\u03b9\u00a2\u03b9\u03b7g \u0454\u0142\u03b9\u0442, \u0455\u0454\u2202 \u2202\u03c3 \u0454\u03b9\u03c5\u0455\u043c\u03c3\u2202 \u0442\u0454\u043c\u03c1\u03c3\u044f \u03b9\u03b7\u00a2\u03b9\u2202\u03b9\u2202\u03c5\u03b7\u0442 \u03c5\u0442 \u0142\u03b1\u0432\u03c3\u044f\u0454 \u0454\u0442 \u2202\u03c3\u0142\u03c3\u044f\u0454 \u043c\u03b1g\u03b7\u03b1 \u03b1\u0142\u03b9q\u03c5\u03b1. \u03c5\u0442 \u0454\u03b7\u03b9\u043c \u03b1\u2202 \u043c\u03b9\u03b7\u03b9\u043c \u03bd\u0454\u03b7\u03b9\u03b1\u043c, q\u03c5\u03b9\u0455 \u03b7\u03c3\u0455\u0442\u044f\u03c5\u2202 \u0454\u03c7\u0454\u044f\u00a2\u03b9\u0442\u03b1\u0442\u03b9\u03c3\u03b7 \u03c5\u0142\u0142\u03b1\u043c\u00a2\u03c3 \u0142\u03b1\u0432\u03c3\u044f\u03b9\u0455 \u03b7\u03b9\u0455\u03b9 \u03c5\u0442 \u03b1\u0142\u03b9q\u03c5\u03b9\u03c1 \u0454\u03c7 \u0454\u03b1 \u00a2\u03c3\u043c\u043c\u03c3\u2202\u03c3 \u00a2\u03c3\u03b7\u0455\u0454q\u03c5\u03b1\u0442. \u2202\u03c5\u03b9\u0455 \u03b1\u03c5\u0442\u0454 \u03b9\u044f\u03c5\u044f\u0454 \u2202\u03c3\u0142\u03c3\u044f \u03b9\u03b7 \u044f\u0454\u03c1\u044f\u0454\u043d\u0454\u03b7\u2202\u0454\u044f\u03b9\u0442 \u03b9\u03b7 \u03bd\u03c3\u0142\u03c5\u03c1\u0442\u03b1\u0442\u0454 \u03bd\u0454\u0142\u03b9\u0442 \u0454\u0455\u0455\u0454 \u00a2\u03b9\u0142\u0142\u03c5\u043c \u2202\u03c3\u0142\u03c3\u044f\u0454 \u0454\u03c5 \u0192\u03c5g\u03b9\u03b1\u0442 \u03b7\u03c5\u0142\u0142\u03b1 \u03c1\u03b1\u044f\u03b9\u03b1\u0442\u03c5\u044f. \u0454\u03c7\u00a2\u0454\u03c1\u0442\u0454\u03c5\u044f \u0455\u03b9\u03b7\u0442 \u03c3\u00a2\u00a2\u03b1\u0454\u00a2\u03b1\u0442 \u00a2\u03c5\u03c1\u03b9\u2202\u03b1\u0442\u03b1\u0442 \u03b7\u03c3\u03b7 \u03c1\u044f\u03c3\u03b9\u2202\u0454\u03b7\u0442, \u0455\u03c5\u03b7\u0442 \u03b9\u03b7 \u00a2\u03c5\u0142\u03c1\u03b1 q\u03c5\u03b9 \u03c3\u0192\u0192\u03b9\u00a2\u03b9\u03b1 \u2202\u0454\u0455\u0454\u044f\u03c5\u03b7\u0442 \u043c\u03c3\u0142\u0142\u03b9\u0442 \u03b1\u03b7\u03b9\u043c \u03b9\u2202 \u0454\u0455\u0442 #",
    "Unable to update settings": "\u00dbn\u00e4\u00dfl\u00e9 t\u00f6 \u00fcpd\u00e4t\u00e9 s\u00e9tt\u00efngs \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5\u043c \u2202\u03c3\u0142\u03c3\u044f \u0455\u03b9\u0442 \u03b1\u043c\u0454\u0442, \u00a2\u03c3\u03b7\u0455#",
    "Warning: ": "W\u00e4rn\u00efng:  \u2c60'\u03c3\u044f\u0454\u043c \u03b9\u03c1\u0455\u03c5\u043c \u2202\u03c3\u0142#"
  };
  for (var key in newcatalog) {
    django.catalog[key] = newcatalog[key];
  }
  

  if (!django.jsi18n_initialized) {
    django.gettext = function(msgid) {
      var value = django.catalog[msgid];
      if (typeof(value) == 'undefined') {
        return msgid;
      } else {
        return (typeof(value) == 'string') ? value : value[0];
      }
    };

    django.ngettext = function(singular, plural, count) {
      var value = django.catalog[singular];
      if (typeof(value) == 'undefined') {
        return (count == 1) ? singular : plural;
      } else {
        return value[django.pluralidx(count)];
      }
    };

    django.gettext_noop = function(msgid) { return msgid; };

    django.pgettext = function(context, msgid) {
      var value = django.gettext(context + '\x04' + msgid);
      if (value.indexOf('\x04') != -1) {
        value = msgid;
      }
      return value;
    };

    django.npgettext = function(context, singular, plural, count) {
      var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
      if (value.indexOf('\x04') != -1) {
        value = django.ngettext(singular, plural, count);
      }
      return value;
    };

    django.interpolate = function(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
      } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
      }
    };


    /* formatting library */

    django.formats = {
    "DATETIME_FORMAT": "j\\-\\a \\d\\e F Y\\, \\j\\e H:i",
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M",
      "%Y-%m-%d",
      "%Y.%m.%d %H:%M:%S",
      "%Y.%m.%d %H:%M",
      "%Y.%m.%d",
      "%d/%m/%Y %H:%M:%S",
      "%d/%m/%Y %H:%M",
      "%d/%m/%Y",
      "%y-%m-%d %H:%M:%S",
      "%y-%m-%d %H:%M",
      "%y-%m-%d",
      "%Y-%m-%d %H:%M:%S.%f"
    ],
    "DATE_FORMAT": "j\\-\\a \\d\\e F Y",
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d",
      "%y-%m-%d",
      "%Y %m %d",
      "%d-a de %b %Y",
      "%d %b %Y",
      "%d-a de %B %Y",
      "%d %B %Y",
      "%d %m %Y"
    ],
    "DECIMAL_SEPARATOR": ",",
    "FIRST_DAY_OF_WEEK": "1",
    "MONTH_DAY_FORMAT": "j\\-\\a \\d\\e F",
    "NUMBER_GROUPING": "3",
    "SHORT_DATETIME_FORMAT": "Y-m-d H:i",
    "SHORT_DATE_FORMAT": "Y-m-d",
    "THOUSAND_SEPARATOR": "\u00a0",
    "TIME_FORMAT": "H:i",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M",
      "%H:%M:%S.%f"
    ],
    "YEAR_MONTH_FORMAT": "F \\d\\e Y"
  };

    django.get_format = function(format_type) {
      var value = django.formats[format_type];
      if (typeof(value) == 'undefined') {
        return format_type;
      } else {
        return value;
      }
    };

    /* add to global namespace */
    globals.pluralidx = django.pluralidx;
    globals.gettext = django.gettext;
    globals.ngettext = django.ngettext;
    globals.gettext_noop = django.gettext_noop;
    globals.pgettext = django.pgettext;
    globals.npgettext = django.npgettext;
    globals.interpolate = django.interpolate;
    globals.get_format = django.get_format;

    django.jsi18n_initialized = true;
  }

}(this));


                  }
                };
                OpenClassroomXBlockI18N.init();
                global.OpenClassroomXBlockI18N = OpenClassroomXBlockI18N;
            }(this));
        