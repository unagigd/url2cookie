(function(d, w) {
  function getDateWithOffset(offset, unit) {
    var now = new Date();
    switch (unit) {
      case "minute":
        return new Date(now.getTime() + offset * 60 * 1000);
      case "hour":
        return new Date(now.getTime() + offset * 60 * 60 * 1000);
      case "day":
        return new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);
      case "year":
        var newDate = new Date(now.getTime());
        newDate.setFullYear(now.getFullYear() + offset);
        return newDate;
      default:
        return new Date(now.getTime() + offset);
    }
  }

  function getCookie(name) {
    if (!name) {
      return null;
    }
    return (
      decodeURIComponent(
        d.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  }

  function setCookie(name, value, expires, domain) {
    if (!name) {
      return false;
    }
    var cExpires = "; expires=" + expires.toUTCString();
    var cDomain = "; domain=" + domain;

    d.cookie =
      encodeURIComponent(name) +
      "=" +
      encodeURIComponent(value) +
      cExpires +
      cDomain;

    return true;
  }

  function parse(input) {
    var toParse = input.trim().replace(/^[?#&]/, "");

    if (!toParse) {
      return {};
    }

    var ret = toParse.split("&").reduce(function(acc, item) {
      var parsed = item.replace(/\+/g, " ").split("=");
      var key = decodeURIComponent(parsed[0]);
      var value =
        parsed[1] === undefined ? null : decodeURIComponent(parsed[1]);

      acc[key] = value;
      return acc;
    }, {});

    return Object.keys(ret)
      .sort()
      .reduce(function(acc, key) {
        acc[key] = ret[key];
        return acc;
      }, {});
  }

  return {
    getCookie: getCookie,
    getDateWithOffset: getDateWithOffset,
    setCookie: setCookie,
    parse: parse
  };
})(document, window);
