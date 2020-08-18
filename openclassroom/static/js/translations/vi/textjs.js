
            (function(global){
                var OpenClassroomXBlockI18N = {
                  init: function() {
                    

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=0;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  /* gettext library */

  django.catalog = django.catalog || {};
  
  var newcatalog = {
    "Load Lesson": "T\u1ea3i b\u00e0i h\u1ecdc",
    "Loading...": "\u0110ang t\u1ea3i...",
    "Open Classroom lesson": "B\u00e0i h\u1ecdc Open Classroom",
    "Sorry about that.": "Xin l\u1ed7i v\u00ec \u0111i\u1ec1u \u0111\u00f3.",
    "This Open Classroom lesson could not be loaded because no openclassroom-id attribute was specified in the HTML tag.": "Kh\u00f4ng th\u1ec3 t\u1ea3i b\u00e0i h\u1ecdc Open Classroom n\u00e0y v\u00ec kh\u00f4ng c\u00f3 thu\u1ed9c t\u00ednh openclassroom-id trong th\u1ebb HTML.",
    "This lesson could not be loaded.": "Kh\u00f4ng th\u1ec3 t\u1ea3i b\u00e0i h\u1ecdc n\u00e0y.",
    "Warning: ": "C\u1ea3nh b\u00e1o: "
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
    "DATETIME_FORMAT": "H:i \\N\\g\u00e0\\y d \\t\\h\u00e1\\n\\g n \\n\u0103\\m Y",
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%Y-%m-%d",
      "%m/%d/%Y %H:%M:%S",
      "%m/%d/%Y %H:%M:%S.%f",
      "%m/%d/%Y %H:%M",
      "%m/%d/%Y",
      "%m/%d/%y %H:%M:%S",
      "%m/%d/%y %H:%M:%S.%f",
      "%m/%d/%y %H:%M",
      "%m/%d/%y"
    ],
    "DATE_FORMAT": "\\N\\g\u00e0\\y d \\t\\h\u00e1\\n\\g n \\n\u0103\\m Y",
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d",
      "%m/%d/%Y",
      "%m/%d/%y",
      "%b %d %Y",
      "%b %d, %Y",
      "%d %b %Y",
      "%d %b, %Y",
      "%B %d %Y",
      "%B %d, %Y",
      "%d %B %Y",
      "%d %B, %Y"
    ],
    "DECIMAL_SEPARATOR": ",",
    "FIRST_DAY_OF_WEEK": "0",
    "MONTH_DAY_FORMAT": "j F",
    "NUMBER_GROUPING": "0",
    "SHORT_DATETIME_FORMAT": "H:i d-m-Y",
    "SHORT_DATE_FORMAT": "d-m-Y",
    "THOUSAND_SEPARATOR": ".",
    "TIME_FORMAT": "H:i",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M"
    ],
    "YEAR_MONTH_FORMAT": "F Y"
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
        