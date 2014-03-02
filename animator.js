var CYU = CYU || {};
(function($){
CYU.sprite_animator = {
  set_background_width_and_height: function(){
    var background_height = $(window).height();
    this.playground_width = $(window).width();

    this.playground_height = background_height - this.top_gutter - this.bottom_gutter;
    
    this.$background.css("height", background_height);
    this.$playground.css("height", this.playground_height);
  },
  init_height_handler: function(){
    this.$background.css("overflow-x","hidden");
    this.set_background_width_and_height();
    $(window).resize(function(){
      this.set_background_width_and_height();
    }.bind(this));
  },
  animate: function(){
    var time = this.time,
        redirect_time = this.continue_to_animate_after_callback_for;
        animate_time = redirect_time + time;
     this.update_icons(animate_time, redirect_time);
  },
  update_icons: function(time_remaining, redirect_time){
    if(time_remaining < redirect_time && !this.after_animation_callback_called){
      this.after_animation_callback_called = true;
      this.after_animation_callback();
    }
    if(time_remaining < 0){return;}
    

    var icons = this.get_icons(), icon, $icon_block,
        locations = this.get_locations(), location,
        len = this.change_per_interval,
        self = this,
        animate_interval = 1000 / this.interval_per_second,
        id, i;

    for(i = 0; i < len; i++){
      icon = icons[i];
      location = locations[i];
      id =  "icon_" + location.x + "_" + location.y;
      $icon_block = this.create_icon_block(icon, location, id);

      if(!this.hash[id]){
        this.$playground.append($icon_block);
        this.hash[id] = true;
      } else {
        $("#" + id).html($icon_block.html());
      }
    }

    setTimeout(function(){
      self.update_icons(time_remaining - animate_interval, redirect_time);
    }, animate_interval);
  },
  create_icon_block: function(icon, location, id){
    var $icon_block = $("<div></div>"),
        sprite = this.sprite;
        
    $icon_block.attr({
      id: id,
      class: sprite.icon_class
    });
    $icon_block.css({
      position: "absolute",
      width: sprite.icon_width,
      height: sprite.icon_height,
      left: location.x,
      top: location.y,
      background: "url(" + sprite.url + ") " + icon.x + "px " + icon.y + "px no-repeat"
    });
    return $icon_block;
  },
  get_locations: function(){
    var len = this.change_per_interval,
        locations = [],
        i = 0;
    for(; i < len; i++){
      locations.push(this.get_location());
    }
    return locations;
  },
  get_location: function(){
    var sprite = this.sprite,
        icon_width = sprite.icon_width,
        icon_height = sprite.icon_height,
        edge_gutter = sprite.edge_gutter,
        icon_gutter = sprite.icon_gutter,
        height = this.playground_height,
        width = this.playground_width,
        x_bound = width - icon_width - icon_gutter,
        y_bound = height - icon_height - icon_gutter,
        rand_x = parseInt(Math.random()*x_bound, 10), // return 0 to (x_bound - 1)
        rand_y = parseInt(Math.random()*y_bound, 10), // return 0 to (y_bound -1)
        gap_x = icon_width + icon_gutter,
        gap_y = icon_height + icon_gutter,
        unit_x = parseInt(rand_x/gap_x, 10),
        unit_y = parseInt(rand_y/gap_y, 10),
        pos_x = edge_gutter + unit_x*gap_x,
        pos_y = edge_gutter + unit_y*gap_y;

    return {
      x: pos_x,
      y: pos_y
    };
  },
  get_icon: function(){ // get random icon
    var len = this.icons.length,
        random = parseInt(Math.random()*len, 10);

    return this.icons[random];
  },
  get_icons: function(){
    var len = this.change_per_interval,
        icons = [], icon, i;

    for(i = 0; i < len; i++){
      icon = this.get_icon();
      icons.push(icon);
    }
    return icons;
  },
  set_icon_locations: function(){ // parse the sprite and save icons location relative to the sprite
    var sprite = this.sprite,
        icon_width = sprite.icon_width,
        icon_height = sprite.icon_height,
        edge_gutter = sprite.edge_gutter,
        icon_gutter = sprite.icon_gutter,
        num_x = sprite.num_x,
        num_y = sprite.num_y,
        current_x = edge_gutter,
        current_y = edge_gutter,
        icon, i, j;

    i = j = 0;

    this.icons = [];

    while(j < num_y){ // goes from 0 to num_y - 1
      i = 0;
      current_x = edge_gutter;
      while(i < num_x){ // goes from 0 to num_x - 1
        this.icons.push({
          x: -1*current_x,
          y: -1*current_y
        });
        current_x += icon_width + icon_gutter;
        i++;
      }
      current_y += icon_height + icon_gutter;
      j++;
    }
  },
  init: function(opts){
    this.continue_to_animate_after_callback_for = opts.continue_to_animate_after_callback_for ?
      opts.continue_to_animate_after_callback_for
      : 0;
    this.after_animation_callback = opts.after_animation_callback;
    this.$background = $(opts.background_id);
    this.$playground = $(opts.playground_id);
    this.time = opts.time;
    this.sprite = opts.sprite;
    this.interval_per_second = opts.interval_per_second;
    this.top_gutter = opts.top_gutter || 0;
    this.bottom_gutter = opts.bottom_gutter || 0;
    this.change_per_interval = opts.change_per_interval;
    this.after_animation_callback_called = false;
    this.hash = {};
    this.init_height_handler();
    this.set_icon_locations();
    this.animate();
  }
};
}(jQuery));