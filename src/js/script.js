$(function () {
  // $().show
  $.prototype.show = function(a) {
    return this.each(function(b) {
      b.style.display = 'block';
    });
  };
  // $().hide
  $.prototype.hide = function(a) {
    return this.each(function(b) {
      b.style.display = 'none';
    });
  };

  var App = function() {} || window.App;

  App.prototype.init = function() {
    $('#loading').show();

    var app = this;
    app.load('test.js', function(data) {
      app.render($('#content'), data);
    }, function(e) {
      console.log('error:' + e);
    });
  };

  App.prototype.render = function($el, data) {
    var temp = '<h1>{{=it.title}}</h1>';
    temp += '<table cellpadding="0" cellspacing="0" border="0">';
    temp += '<tr><th>fruit</th><th>qty</th></tr>';
    temp += '{{~it.fruits :value:index}}';
    temp += '<tr>';
    temp += '<td>{{=value.name}}</td>';
    temp += '<td>{{=value.qty}}</td>';
    temp += '</tr>';
    temp += '{{~}}';
    temp += '</table>';
    var tempFn = doT.template(temp);
    $el[0].innerHTML = tempFn(data);
  };

  App.prototype.load = function(url, onSuccess, onError) {
    nanoajax.ajax({url:url}, function (code, responseText) {
      $('#loading').hide();

      if (code === 200) {
        var obj ;
        try {
          obj = JSON.parse(responseText);
          if (typeof onSuccess === 'function') {
            onSuccess.call(this, obj);
          }
        } catch (e) {
          if (typeof onError === 'function') {
            onError.call(this, e);
          }
        }
      } else {
        if (typeof onError === 'function') {
          onError.call(this, code);
        }
      }

    });
  };

  window.App = App;

  var app = new App();
  app.init();
  window.app = app;
});