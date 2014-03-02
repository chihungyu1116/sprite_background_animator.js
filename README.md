Expected structure: 
 
playground_id container is where the animation will run 
background_id container contains everything 

if you want to place something on top of the playground_id container specify the top gutter 
if you want to place something below the playground_id container specify the bottom gutter 

<body id="{{background_id}}"> 
  <div></div> (optional for top gutter) 
  <div id="{{playground_id}}"></div> 
  <div></div> (optional for bottom gutter) 
</body> 

expected sprite structure: 

imagine each x represent an icon on the sprite 

xxxxxxx 
xxxxxxx 
xxxxxxx 
xxxxxxx 

and each x has width and height 
edge_gutter: the edge of the sprite 
icon_gutter: the spaces between icons 
 

CYU.sprite_animator.init({ 
  sprite: { 
    url: "{{path_to_the_sprite_image}}", 
    icon_class: "person_icon",// "{{class name that you want to apply to each icon on the sprite}}" 
    icon_width: 26, {{width of the icon on the sprite}}, 
    icon_height: 26, //{{height of the icon on the sprite}}, 
    edge_gutter: 1, 
    icon_gutter: 2, 
    num_x: 7, // the number of icons on the x_axis of the sprite 
    num_y: 4 // the number of icons on the y_axis of the sprite 
  }, 
  continue_to_animate_after_callback_for: 0, // continue the animation for number of mil second after animation callback called 
  background_id: "#background", 
  playground_id: "#playground", 
  time: 20000, // duration before calling after_animation_callback 
  interval_per_second: 3, // number of interval per sec 
  change_per_interval: 100, // for each interval update x number of icons 
  top_gutter: 50, 
  bottom_gutter:50, 
  after_animation_callback: function(){ // called when time is up 
    console.log('I am redirecting'); 
  }
});
