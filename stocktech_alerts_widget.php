<?php

// 250F0669CD5543C8B9E5D9CC3DC90DD5

class Widget_Stocktech_Alerts extends WP_Widget {
 
  public function __construct() {
      $options = array('classname' => 
		'Widget_Stocktech_Alerts', 
		'description' => 'Stocktech - Smart stock market alerts.' );
      parent::__construct('Widget_Stocktech_Alerts', 'Stocktech Alerts', $options);
  }
    
  function widget($args, $instance) {
    // Arguments
    extract($args, EXTR_SKIP);
    $title = !isset($instance['title']) ? '' : apply_filters('widget_title', $instance['title']);
    $symbols = !isset($instance['symbols']) ? '' : $instance['symbols'];	
	$width = !isset($instance['width']) ? '' : $instance['width'];
	$height = !isset($instance['height']) ? '' : $instance['height'];	
	$showChart= (isset($instance['showChart']) AND $instance['showChart'] == 1) ? "true" : "false";
   	$language= !isset($instance['language']) ? '' : $instance['language'];	
    // 
    echo (isset($before_widget)?$before_widget:'');

	echo stocktech_alerts_func( array( 
									'title' => $title , 
									'symbols' => $symbols,
									'width' => $width, 
									'showChart' => $showChart,
									'height' => $height,
									'language' => $language
								));
   
    echo (isset($after_widget)?$after_widget:'');
  }

  public function GetFromOptions($options, $value){
	  if (array_key_exists($value, $options))
		  return $options[$value];
	  else
		  return '';
  }
  
  public function form( $instance ) {
   
	$stocktech_alerts_options = get_option( 'stocktech_alerts_options' );
  
     $instance = wp_parse_args( (array) $instance, array( 
		 'title' => array_key_exists('default_title',$stocktech_alerts_options)?$stocktech_alerts_options ['default_title']:'',
		 'symbols' =>array_key_exists('default_symbols',$stocktech_alerts_options)?$stocktech_alerts_options ['default_symbols']:'',
		 'width' => array_key_exists('default_width',$stocktech_alerts_options)?$stocktech_alerts_options ['default_width']:'',
		 'height' => array_key_exists('default_height',$stocktech_alerts_options)?$stocktech_alerts_options ['default_height']:'',
		 'showChart' => array_key_exists('default_showChart',$stocktech_alerts_options)?$stocktech_alerts_options ['default_showChart']:'',
		 'language' => array_key_exists('default_clanguage',$stocktech_alerts_options)?$stocktech_alerts_options ['default_language']:''		 
	 ) );
	 
	 extract($instance);
   
     ?>
	  
	 <!-- symbols -->
     <p>
      <label for="<?php echo $this->get_field_id('symbols'); ?>">Symbols: </label>
        <input class="widefat" id="<?php echo $this->get_field_id('symbols'); ?>" 
               name="<?php echo $this->get_field_name('symbols'); ?>" type="text" 
               value="<?php echo esc_attr($symbols); ?>" />
      </p>
	  
	 <!-- width -->
     <p>
      <label for="<?php echo $this->get_field_id('width'); ?>">Width: </label>
        <input class="widefat" id="<?php echo $this->get_field_id('width'); ?>" 
               name="<?php echo $this->get_field_name('width'); ?>" type="text" 
               value="<?php echo esc_attr($width); ?>" />      
      </p>
	  
	 <!-- height -->
     <p>
      <label for="<?php echo $this->get_field_id('height'); ?>">Height: </label>
        <input class="widefat" id="<?php echo $this->get_field_id('height'); ?>" 
               name="<?php echo $this->get_field_name('height'); ?>" type="text" 
               value="<?php echo esc_attr($height); ?>" />      
      </p>
	  
     <!-- title -->
     <p>
      <label for="<?php echo $this->get_field_id('title'); ?>">Title: </label>
        <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" 
               name="<?php echo $this->get_field_name('title'); ?>" type="text" 
               value="<?php echo esc_attr($title); ?>" />      
      </p>
   

     <!-- showChart -->
     <p>      
        <input id="<?php echo $this->get_field_id('showChart'); ?>" 
               name="<?php echo $this->get_field_name('showChart'); ?>" type="checkbox" 
               value="1" 
			   <?php if($showChart) echo ' checked="checked"'; ?> />
		<label for="<?php echo $this->get_field_id('showChart'); ?>">Include Chart: </label>      
      </p> 
	  	  
     <?php
   
  }
 
  function update($new_instance, $old_instance) {
    $instance = $old_instance;
    $instance['title'] = $new_instance['title'];
	$instance['symbols'] = $new_instance['symbols'];
	$instance['width'] = $new_instance['width'];
	$instance['height'] = $new_instance['height'];
	$instance['showChart'] = (isset($new_instance['showChart']) AND $new_instance['showChart'] == 1) ? 1 : 0;
	$instance['language'] = $new_instance['language'];
    return $instance;
  }
  
 
}

add_action( 'widgets_init', function() {
	return register_widget("Widget_Stocktech_Alerts");
});

add_action('admin_print_styles', 'stocktech_alerts_widget_admin_styles');

function stocktech_alerts_widget_admin_styles() {
  ?>
  <style>
	#available-widgets-list [class*=widget_stocktech_alerts] .widget-title:before{
	  content: "\60";
	  font-family: "stocktech-font" !important;
	}
  </style>
  <?php
}

?>