var AvatarCrop,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$(function() {
  return new AvatarCrop();
});

AvatarCrop = (function() {
  function AvatarCrop() {
    this.updatePreview = bind(this.updatePreview, this);
    this.update = bind(this.update, this);
    var height, width;
    width = parseInt($('#cropbox').width());
    height = parseInt($('#cropbox').height());
    $('#cropbox').Jcrop({
      aspectRatio: 1,
      setSelect: [0, 0, width, height],
      onSelect: this.update,
      onChange: this.update
    });
  }

  AvatarCrop.prototype.update = function(coords) {
    $('#user_crop_x').val(coords.x);
    $('#user_crop_y').val(coords.y);
    $('#user_crop_w').val(coords.w);
    $('#user_crop_h').val(coords.h);
    return this.updatePreview(coords);
  };

  AvatarCrop.prototype.updatePreview = function(coords) {
    var rx, ry;
    rx = 100 / coords.w;
    ry = 100 / coords.h;
    return $('#preview').css({
      width: Math.round(rx * $('#cropbox').width()) + 'px',
      height: Math.round(ry * $('#cropbox').height()) + 'px',
      marginLeft: '-' + Math.round(rx * coords.x) + 'px',
      marginTop: '-' + Math.round(ry * coords.y) + 'px'
    });
  };

  return AvatarCrop;

})();
