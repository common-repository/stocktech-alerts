<?php
/*
	Plugin Name: Stocktech Alerts
	Plugin URI: https://stocktech.org/?page=public-user-api
	Description: Stocktech Alerts and stock marketing content.
	Version: 1.0.1
*/
define('stocktech_alerts_version','1.0.1');
define( 'stocktech_alerts__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
class StocktechAlertsSettingsPage
{
	public static function get_page_url( $page = 'config' ) {

		$args = array( 'page' => 'stocktech-alerts-settings-config' );

		$url = add_query_arg( $args, class_exists( 'Jetpack' ) ? admin_url( 'admin.php' ) : admin_url( 'options-general.php' ) );

		return $url;
	}
	public static function view( $name) {
		$file = stocktech_alerts__PLUGIN_DIR . $name . '.php';
		include( $file );
	}
	
	public static function display_admin_alert() {
		self::view( 'stocktech_alerts_activate_plugin_admin' );
	}

	public static function display_settings_alert() {
		self::view( 'stocktech_alerts_activate_plugin_settings' );
	}
	
	public static function stocktech_alerts_display_notice() {
		global $hook_suffix;
		$stocktech_alerts_options = get_option( 'stocktech_alerts_options' );
		$api_key = $stocktech_alerts_options['api_key'];
		if (($hook_suffix == 'plugins.php' || in_array( $hook_suffix, array( 'jetpack_page_stocktech-alerts-key-config', 'settings_page_stocktech-alerts-key-config', 'settings_page_stocktech-alerts-settings-config', 'jetpack_page_stocktech-alerts-settings-config' ))) && empty($api_key))
		{
			if ($hook_suffix == 'plugins.php')
				self::display_admin_alert();
			else
				self::display_settings_alert();
		}
		
	}
    /**
     */
    private $stocktech_alerts_options;

    /**
     * Start
     */
    public function __construct()
    {		
        add_action('admin_menu', array( $this, 'stocktech_alerts_add_plugin_page' ) );
        add_action('admin_init', array( $this, 'stocktech_alerts_page_init' ) );
		add_action('admin_notices', array( $this, 'stocktech_alerts_display_notice' ) );
		add_action('admin_head', 'stocktech_alerts_stocktech_js');
		add_action('admin_head', 'stocktech_alerts_charts_button');
    }
	
    /**
     * Add options
     */
    public function stocktech_alerts_add_plugin_page()
    {
        add_options_page(
            'Stocktech Alerts Settings', 
            'Stocktech Alerts', 
            'manage_options', 
            'stocktech-alerts-settings-config', 
            array( $this, 'stocktech_alerts_create_admin_page' )
        );
    }

    /**
     * Options page
     */
    public function stocktech_alerts_create_admin_page()
    {
        $this->options = get_option( 'stocktech_alerts_options' );
        ?>
</link>

<div class="wrap">
  <h2>Stocktech Alerts Settings</h2>
  <div class="stocktech_alerts_form">
    <form method="post" action="options.php">
      <?php
					settings_fields( 'stocktech_alerts_option_group' );   
					do_settings_sections( 'stocktech-alerts-settings-config' );
					submit_button(); 
				?>
    </form>
  </div>
</div>
<?php
    }


    /**
     * Register
     */
    public function stocktech_alerts_page_init()
    {        
		$stocktech_alerts_options = get_option( 'stocktech_alerts_options' );
		$api_key = $stocktech_alerts_options['api_key'];

		register_setting('stocktech_alerts_option_group', 'stocktech_alerts_options', array( $this, 'stocktech_alerts_sanitize' ));
		
		if (empty($api_key)) {
			add_settings_section('setting_section_id', '', array( $this, 'stocktech_alerts_missing_app_key' ), 'stocktech-alerts-settings-config');  
			add_settings_field('api_key', 'App-Key', array( $this, 'stocktech_alerts_api_key_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id');  
		}
		else {
			add_settings_section('setting_section_id','', array( $this, 'stocktech_alerts_print_section_info' ),'stocktech-alerts-settings-config');  
			add_settings_field('api_key','Api Key',	array( $this, 'stocktech_alerts_api_key_callback' ),'stocktech-alerts-settings-config', 'setting_section_id');
			add_settings_field('default_title', 'Title', array( $this, 'stocktech_alerts_title_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id'  ); 
			add_settings_field('default_width', 'Frame Width', array( $this, 'stocktech_alerts_width_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id' ); 
			add_settings_field('default_height', 'Frame Height', array( $this, 'stocktech_alerts_height_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id'  ); 
			add_settings_field('default_chartHeight', 'Chart Height', array( $this, 'stocktech_alerts_chartHeight_callback' ), 'stocktech-aler ts-settings-config', 'setting_section_id' ); 
			add_settings_field('default_style', 'Style', array( $this, 'stocktech_alerts_style_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id' ); 
			add_settings_field('default_displayPrices', 'Series', array( $this, 'stocktech_alerts_displayPrices_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id' ); 
			add_settings_field('default_font', 'Font', array( $this, 'stocktech_alerts_font_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id' ); 
			add_settings_field('default_includeChange', 'Show change in units', array( $this, 'stocktech_alerts_includeChange_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id' ); 
			add_settings_field('default_includePercentChange', 'Show change in percents', array( $this, 'stocktech_alerts_includePercentChange_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id' ); 
			add_settings_field('booleanIniCheck', 'booleanIniCheck', array( $this, 'stocktech_alerts_booleanIniCheck_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id' ); 
			add_settings_field('intradayCheck', '', array( $this, 'stocktech_alerts_intradayCheck_callback' ), 'stocktech-alerts-settings-config', 'setting_section_id'); 
		}
		
		$plugin_data = get_plugin_data( __FILE__ );
		$plugin_version = $plugin_data['Version'];
		$css_address=plugin_dir_url( __FILE__ )."assets/stocktech-wp.css";
		wp_register_script("customAdminCss",$css_address );
		wp_enqueue_style("customAdminCss", $css_address, array(), $plugin_version, false);
				
		wp_enqueue_script('jquery');

		$version = stocktech_alerts_version;
		
    }

	public function stocktech_alerts_sanitize( $input )
    {
        $new_input = array();

        if( isset( $input['api_key'] ) )
            $new_input['api_key'] = sanitize_text_field($input['api_key']);
		if( isset( $input['default_exchange'] ) )
            $new_input['default_exchange'] =  sanitize_text_field($input['default_exchange']);
		
		if( isset( $input['default_equities'] ) )
            $new_input['default_equities'] =  sanitize_text_field($input['default_equities']);	
		
		if( isset( $input['default_loadDataWhenVisible'] ) )
            $new_input['default_loadDataWhenVisible'] =  sanitize_text_field($input['default_loadDataWhenVisible']);
		
		if( isset( $input['default_culture'] ) )
            $new_input['default_culture'] =  sanitize_text_field($input['default_culture']);
		
		
		
		if( isset( $input['default_allowSort'] ) )
            $new_input['default_allowSort'] =  sanitize_text_field($input['default_allowSort']);
		
		if( isset( $input['default_width'] ) )
            $new_input['default_width'] =  sanitize_text_field($input['default_width']);
		if( isset( $input['default_height'] ) )
            $new_input['default_height'] =  sanitize_text_field($input['default_height']);
		if( isset( $input['default_font'] ) )
            $new_input['default_font'] =  sanitize_text_field($input['default_font']);				
		if( isset( $input['default_style'] ) )
            $new_input['default_style'] =  sanitize_text_field($input['default_style']);
		if( isset( $input['default_palette'] ) )
            $new_input['default_palette'] =  sanitize_text_field($input['default_palette']);
		
		if( isset( $input['default_title'] ) )
            $new_input['default_title'] =  sanitize_text_field($input['default_title']);
		
		if( isset( $input['booleanIniCheck'] ) )
            $new_input['booleanIniCheck'] =  sanitize_text_field($input['booleanIniCheck']);
		if( isset( $input['default_includeLogo'] ) )
            $new_input['default_includeLogo'] =  sanitize_text_field($input['default_includeLogo']);
		
		if( isset( $input['default_logoMaxHeight'] ) )
            $new_input['default_logoMaxHeight'] = sanitize_text_field( $input['default_logoMaxHeight']);
		if( isset( $input['default_logoMaxWidth'] ) )
            $new_input['default_logoMaxWidth'] = sanitize_text_field($input['default_logoMaxWidth']);
		if( isset( $input['default_includeIndicesSymbol'] ) )
            $new_input['default_includeIndicesSymbol'] = sanitize_text_field($input['default_includeIndicesSymbol']);
		if( isset( $input['default_includeIndicesName'] ) )
            $new_input['default_includeIndicesName'] = sanitize_text_field($input['default_includeIndicesName']);
		
		if( isset( $input['default_includePrice'] ) )			
            $new_input['default_includePrice'] = sanitize_text_field($input['default_includePrice']);
		if( isset( $input['default_includeChange'] ) )
            $new_input['default_includeChange'] = sanitize_text_field($input['default_includeChange']);
		if( isset( $input['default_includePercentChange'] ) )
            $new_input['default_includePercentChange'] = sanitize_text_field($input['default_includePercentChange']);		
		if( isset( $input['default_includeTrend'] ) )
            $new_input['default_includeTrend'] = sanitize_text_field($input['default_includeTrend']);
		if( isset( $input['default_includeVolume'] ) )
            $new_input['default_includeVolume'] = sanitize_text_field($input['default_includeVolume']);
		if( isset( $input['default_showHeader'] ) )
            $new_input['default_showHeader'] = sanitize_text_field($input['default_showHeader']);		
		
		if( isset( $input['default_includeChart'] ) )
            $new_input['default_includeChart'] = sanitize_text_field($input['default_includeChart']);		
		if( isset( $input['default_chartHeight'] ) )
            $new_input['default_chartHeight'] = sanitize_text_field($input['default_chartHeight']);	

        return $new_input;
    }
	

	/**	
     * Without key
     */
    public function stocktech_alerts_missing_app_key()
    {
        print '
		</p>';
    }
	
    /** 
     * With key
     */
    public function stocktech_alerts_print_section_info()
    {
        print '<br/>With this plugin you can add StockTech content to your site.</i>';
		print '<br/><i>Read more: <a href="https://stocktech.org/?page=public-user-api" target="_blank">https://stocktech.org/?page=public-user-api</a>.</i>';
    }

    /** 
     * 
     */
     public function stocktech_alerts_api_key_callback()
    {
        printf(
            '<input type="text" id="api_key" name="stocktech_alerts_options[api_key]" value="%s" />
			Get your API-Key: <a href="https://stocktech.org?view=API" target="_blank">https://stocktech.org?view=API</a>',
            isset( $this->options['api_key'] ) ? esc_attr( $this->options['api_key']) : ''
        );

    }

	
	public function stocktech_alerts_title_callback()
    {
    	if( empty( $this->options['default_title'] ) )
            $this->options['default_title'] = '' ;
        printf(
            '<input type="text" id="default_title" name="stocktech_alerts_options[default_title]" value="%s" style="width:300px;" />		
			<p class="description" id="tagline-description">Optional title</p>
			',
            isset( $this->options['default_title'] ) ? esc_attr( $this->options['default_title']) : ''
        );
    }
	
	public function stocktech_alerts_width_callback()
    {
    	if( empty( $this->options['default_width'] ) )
            $this->options['default_width'] = '100%' ;
        printf(
            '<input type="text" id="default_width" name="stocktech_alerts_options[default_width]" value="%s" />
			<p class="description" id="tagline-description">Max width. e. g. 100%% or 500px</p>
			',
            isset( $this->options['default_width'] ) ? esc_attr( $this->options['default_width']) : ''
        );
    }
	
	
    public function stocktech_alerts_height_callback()
    {
    	if( empty( $this->options['default_height'] ) )
            $this->options['default_height'] = '' ;
        printf(
            '<input type="text" id="default_height" name="stocktech_alerts_options[default_height]" value="%s" />
			<p class="description" id="tagline-description">Max height</p>
			',
            isset( $this->options['default_height'] ) ? esc_attr( $this->options['default_height']) : ''
        );
    }
	
	public function stocktech_alerts_booleanIniCheck_callback()
    {
		 printf('<input style="display:none" type="text" id="booleanIniCheck" name="stocktech_alerts_options[booleanIniCheck]" value="1" />');
		printf('<div class="stocktech_hidden_setting" style="display:none"></div><script>jQuery(function () {jQuery(".stocktech_hidden_setting").parent().parent().hide()});</script> ');
		$this->options['booleanIniCheck'] = "1";
    }

	
	public function stocktech_alerts_chartHeight_callback()
    {
    	if( empty( $this->options['default_chartHeight'] ) )
            $this->options['default_chartHeight'] = '200px' ;
        printf(
            '<input type="text" id="default_chartHeight" name="stocktech_alerts_options[default_chartHeight]" value="%s" />
			<p class="description" id="tagline-description">Height of chart if available. Set to 0 to hide chart. (default: 200px)</p>
			',
            isset( $this->options['default_chartHeight'] ) ? esc_attr( $this->options['default_chartHeight']) : ''
        );
    }
	
	public function stocktech_alerts_includeChange_callback()
    {
		if( !isset( $this->options['booleanIniCheck'] ) ){
			 $this->options['default_includeChange']=1;
		}
        printf(
            '<input type="checkbox" id="default_includeChange" name="stocktech_alerts_options[default_includeChange]" value="%s" '. checked( isset($this->options['default_includeChange'])?$this->options['default_includeChange']:0,1, false ) .' />			
			<p class="description" id="tagline-description"> When available</p>
			',
            isset( $this->options['default_includeChange'] ) ? $this->options['default_includeChange'] : 1
        );
    }	
	public function stocktech_alerts_includePercentChange_callback()
    {
		if( !isset( $this->options['booleanIniCheck'] ) ){
			 $this->options['default_includePercentChange']=1;
		}
        printf(
            '<input type="checkbox" id="default_includePercentChange" name="stocktech_alerts_options[default_includePercentChange]" value="%s" '. checked( isset($this->options['default_includePercentChange'])?$this->options['default_includePercentChange']:0,1, false ) .' />			
			<p class="description" id="tagline-description"> When available</p>
			',
            isset( $this->options['default_includePercentChange'] ) ? $this->options['default_includePercentChange'] : 1
        );
    }	

	public function stocktech_alerts_style_callback()
        {
		if( empty( $this->options['default_style'] ) )
            $this->options['default_style'] = '' ;			
        printf(
            '<select name="stocktech_alerts_options[default_style]" id="default_style">			
				<option value="" selected="selected">None</option>
             </select>
			 <p class="description" id="tagline-description"><a href="https://stocktech.org/?page=public-user-api" target="_blank">See all styles</a></p>
			 <script>document.getElementById("default_style").value = "'.$this->options['default_style'].'";</script>			 
			 ',
    		'default_style'
    		);
    }
	
	public function stocktech_alerts_font_callback()
    {
    	if( empty( $this->options['default_font'] ) )
            $this->options['default_font'] = '' ;
        printf(
            '<input type="text" id="default_font" name="stocktech_alerts_options[default_font]" value="%s" />
			<p class="description" id="tagline-description">e.g. Lato,Helvetica,Arial.</p>
			',
            isset( $this->options['default_font'] ) ? esc_attr( $this->options['default_font']) : ''
        );
    }
		

	public function stocktech_alerts_displayPrices_callback()
        {
		if( empty( $this->options['default_displayPrices'] ) )
            $this->options['default_displayPrices'] = 'Lines' ;
        printf(
            '<select name="stocktech_alerts_options[default_displayPrices]" id="default_displayPrices">		
			    <option value="Line" selected="selected">Line</option> 
				<option disabled value="Candlestick">Candlestick</option>
				<option disabled value="Area">Area</option> 		
             </select>
			 <p class="description" id="tagline-description">Chart series type.</p>
			 <script>document.getElementById("default_displayPrices").value = "'.$this->options['default_displayPrices'].'";</script>
			 ',
    		'default_displayPrices'
    		);
    }	
	
	public function stocktech_alerts_intradayCheck_callback()
    {
		$this->options['intradayCheck'] = "1";
		 printf('<input style="display:none" type="text" id="intradayCheck" name="stocktech_alerts_options[intradayCheck]" value="1" />');
		printf('<div class="stocktech_hidden_setting" style="display:none"></div><script>jQuery(function () {jQuery(".stocktech_hidden_setting").parent().parent().hide()});</script> ');
    }	
		
}


if( is_admin() )
    $stocktech_alerts_settings_page = new StocktechAlertsSettingsPage();

add_action('wp_print_scripts', 'enqueueStocktechAlertsAssets');

add_shortcode( 'stocktech-alerts', 'stocktech_alerts_func' );

require_once( dirname(__FILE__) . "/stocktech_alerts_widget.php"); 

/**
 * Block Initializer.
 */
if (function_exists( 'register_block_type')) {
	require_once(plugin_dir_path( __FILE__ ) . 'src/init.php');
}

remove_action( 'wp_head', 'stocktech_referrer_header_metadata', 0 );
add_action( 'wp_head', 'stocktech_referrer_header_metadata', 0 );
if ( ! function_exists( 'stocktech_referrer_header_metadata' ) ) 
{
	function stocktech_referrer_header_metadata() 
	{	
		try {
			{
			?>
				<meta name="referrer" content="no-referrer-when-downgrade">
			<?php	  
			}
			
		} 
		catch (Exception $e) {
		}	
	}
}

function enqueueStocktechAlertsAssets()
{
	$version = stocktech_alerts_version;
	$js_address=plugin_dir_url( __FILE__ )."assets/stocktech-wp.js";
	wp_register_script("customStocktechJs",$js_address, array(),$version, false );
	wp_enqueue_script('customStocktechJs');
}

//
function stocktech_alerts_func( $atts ) {
	//
    $a = shortcode_atts( array(
		'title' => '',
		'symbols' => '',
		'language' => '',
		'width'	=> '',
		'height'	=> '',			
		'font'	=> '',	
		'style'	=> '',
		
		'includeprice' => '',
		'includechange' => '',
		'includepercentchange' => '',
		'includetrend' => '',
		'includevolume' => '',
		'showheader' => '',
		'includechart' => '',
		'chartheight' => '',
		'displayprices' => ''
    ), $atts );


    //
	extract($a);
	
	if (!empty($exchange) && empty($stockexchange)){
		$stockexchange = $exchange;
	}

	//
  	$stocktech_alerts_options = get_option( 'stocktech_alerts_options' );
	
	 $api_key = '';
	if (isset($stocktech_alerts_options['api_key']))
		$api_key = $stocktech_alerts_options['api_key'];

	$extraSettings = '';
	
	
	if(!$stocktech_alerts_options){
		$stocktech_alerts_options = [];
	}
	stocktech_alerts_get_param_value('language', $language, 'string' , $extraSettings, $stocktech_alerts_options, '');
	stocktech_alerts_get_param_value('font', $font, 'string' , $extraSettings, $stocktech_alerts_options, '');
	stocktech_alerts_get_param_value('style', $style, 'string' , $extraSettings, $stocktech_alerts_options, '');
	stocktech_alerts_get_param_value('title', $title, 'string' , $extraSettings, $stocktech_alerts_options, '');	
	stocktech_alerts_get_param_value('symbols', $symbols, 'string' , $extraSettings, $stocktech_alerts_options, '');
	stocktech_alerts_get_param_value('includePrice', $includeprice, 'bool' , $extraSettings, $stocktech_alerts_options, '1');
	stocktech_alerts_get_param_value('includeChange', $includechange, 'bool' , $extraSettings, $stocktech_alerts_options, '1');
	stocktech_alerts_get_param_value('includePercentChange', $includepercentchange, 'bool' , $extraSettings, $stocktech_alerts_options, '1');
	stocktech_alerts_get_param_value('includeTrend', $includetrend, 'bool' , $extraSettings, $stocktech_alerts_options, '1');
	stocktech_alerts_get_param_value('includeVolume', $includevolume, 'bool' , $extraSettings, $stocktech_alerts_options, '0');
	stocktech_alerts_get_param_value('showHeader', $showheader, 'bool' , $extraSettings, $stocktech_alerts_options, '0');
		
	
	$showChart = true;
	
	$default_includeChart ='';
	$initCheck = array_key_exists('booleanIniCheck',$stocktech_alerts_options)? $stocktech_alerts_options['booleanIniCheck'] == '1' : false;
	if (isset($stocktech_alerts_options['default_includeChart']))
		$default_includeChart = $stocktech_alerts_options['default_includeChart'];
	
	$default_intraday = "true";
	if ($stocktech_alerts_options['default_intraday'] == 0 && $stocktech_alerts_options['intradayCheck']!= "") 
			$default_intraday = "false";
	
	if (empty($includechart))
		$includechart=$default_includeChart;
	
	$link = 'https://stocktech.org/static/widget-symbols';
	
	
	if ($includechart=="1" ||$includechart=="true" || $title != "" || (isset($default_title) && $default_title != ""))
		$showBorderAndTitle = '&showBorderAndTitle=true';
	else
		$showBorderAndTitle = '&showBorderAndTitle=false';
	$extraSettings .= $showBorderAndTitle;	
	
	if ($includechart=="1" ||$includechart=="true"){
		$link = 'https://stocktech.org/static/widget-symbols';
		stocktech_alerts_get_param_value('displayPrices', $showheader, 'string' , $extraSettings, $stocktech_alerts_options, '');
		stocktech_alerts_get_param_value('days', $days, 'string' , $extraSettings, $stocktech_alerts_options, '');
		stocktech_alerts_get_param_value('allowPeriodChange', $allowperiodchange, 'bool' , $extraSettings, $stocktech_alerts_options, '1');
		
		$default_chartHeight = '';
		if (isset($stocktech_alerts_options['default_chartHeight']))
			$default_chartHeight = $stocktech_alerts_options['default_chartHeight'];
		if (empty($chartheight))
			$chartheight =$default_chartHeight;
		if (strpos($chartheight, 'px') !== FALSE && strpos($chartheight, '%') !== FALSE) 
			$chartheight =$chartheight.'px';
		if (empty($chartheight))
			$chartheight='200px';
		$extraSettings .= '&chartHeight='.$chartheight;		
	}
	
	
	
	$default_width = '';
	if (isset($stocktech_alerts_options['default_width']))
		$default_width = $stocktech_alerts_options['default_width'];
	
	$default_height = '';
	if (isset($stocktech_alerts_options['default_height']))
		$default_height = $stocktech_alerts_options['default_height'];
	
	if (empty($width))
		$width =$default_width;
	if (empty($width))
		$width ='100%';
	$extraSettings .= '&width='.urlencode('100%');	
		
	$iframeHeight = '';
	if (empty($height))
		$height =$default_height;
	if (strpos($height, 'px') !== FALSE && strpos($height, '%') !== FALSE) 
		$height =$height.'px';
	if (!empty($height)){
		$extraSettings .= '&height='.urlencode($height);
		$iframeHeight=' height="'.$height.'" ';
	}
	
	if (empty($intraday))
		$intraday=$default_intraday;
	if ($intraday == "1")
		$intraday = 'true';
	if ($intraday == "0")
		$intraday = 'false';
	$extraSettings .= '&intraday='.$intraday;

	$iframe_id= str_replace("{","",strtolower(getStocktechAlertsGUID()));
	$iframe_id= str_replace("}","",$iframe_id);
	$extraSettings .= '&onload='.$iframe_id;
	
	  //make main html output  		  
	$default_loadDataWhenVisible = "true";
	if (!array_key_exists('default_loadDataWhenVisible',$stocktech_alerts_options) || (array_key_exists('default_loadDataWhenVisible',$stocktech_alerts_options) && $stocktech_alerts_options['default_loadDataWhenVisible'] == 0) )
			$default_loadDataWhenVisible = "false";
	  
	 if (empty($loaddatawhenvisible))
		$loaddatawhenvisible=$default_loadDataWhenVisible;
	  
	$src = 'src';
	if ($loaddatawhenvisible == "1" || $loaddatawhenvisible == "true") 
		$src = 'iframesrc';		
	
	$output = '<iframe referrerpolicy="no-referrer-when-downgrade" id="'.$iframe_id.'" frameBorder="0" class="stocktech_alerts" scrolling="no" width="'.$width.'" '.$iframeHeight.' '.$src.'="'.$link.'?ids=3&app-key='.$api_key.'&wp=1&showUserMenu=false'.$extraSettings.'"></iframe>';  		
  	//return completed string
  	return $output;

}	

	function getStocktechAlertsGUID(){
		if (function_exists('com_create_guid')){
			return com_create_guid();
		}
		else {
			$charid = strtoupper(md5(uniqid(rand(), true)));
			$hyphen = chr(45);
			$uuid = chr(123)
				.substr($charid, 0, 8).$hyphen
				.substr($charid, 8, 4).$hyphen
				.substr($charid,12, 4).$hyphen
				.substr($charid,16, 4).$hyphen
				.substr($charid,20,12)
				.chr(125);
			return $uuid;
		}
	}

	function stocktech_alerts_get_param_value($varname, $var, $type, &$extraSettings, $stocktech_alerts_options, $defaultvalue){

		$default ='';
		$defaultName ='default_'.$varname;
		$initCheck = array_key_exists('booleanIniCheck',$stocktech_alerts_options)? $stocktech_alerts_options['booleanIniCheck'] == '1' : false;
		if (isset($stocktech_alerts_options[$defaultName]))
			$default = $stocktech_alerts_options[$defaultName];
		if ($type == "string" || $type == "color"){
			if (empty($var))
				$var=$default;
			if (empty($var) && $defaultvalue!="")
				$var=$defaultvalue;
			if (empty($var) && $varname=="palette")
				$var='White';				
			if (!empty($var))	{
				if ($varname=='logoMaxWidth' || $varname=='logoMaxHeight')
					$var =str_replace('px','',$var);
				$var = urlencode($var);
				if ($type == "color"){
					$var =str_replace('#','',$var);	
					$var =str_replace('%20','',$var);	
					$var =str_replace(' ','',$var);	
					$var =str_replace('+','',$var);	
				}
				$extraSettings .= '&'.$varname.'='.$var;			
			}
		}
		else {
			if ($type == "bool"){
				if (empty($var))
					$var=$default;

				if (!$initCheck && empty($var) && $defaultvalue!="")
					$var=$defaultvalue;
					
				if ($var=="1"||$var=="true") 
					$extraSettings .= '&'.$varname.'=true';		
				else
					$extraSettings .= '&'.$varname.'=false';						
			}
		}
	}

    /** 
     * Editor
     */
	function stocktech_alerts_register_button( $buttons ) {
		if (!array_key_exists("stocktech_charts_button", $buttons)) {
			array_push( $buttons, "|", "stocktech_charts_button" );	   
		}
		return $buttons;
	}	 
	function stocktech_alerts_add_plugin( $plugin_array ) {
		if (!array_key_exists("stocktech_charts_button", $plugin_array)) {
			$plugin_data = get_plugin_data( __FILE__ );
			$plugin_version = $plugin_data['Version'];
			$plugin_array['stocktech_charts_button'] = plugin_dir_url( __FILE__ ).'assets/stocktech-charts-shortcode.js?ver='.$plugin_version;
			add_filter( 'mce_buttons', 'stocktech_alerts_register_button' );	  			
		}
	   return $plugin_array;
	}	
	function stocktech_alerts_charts_button() {
	   if ( current_user_can('edit_posts') && current_user_can('edit_pages') ) {
		  add_filter( 'mce_external_plugins', 'stocktech_alerts_add_plugin' );		  		  
	   }
	}	
    /**
     * Global variables
     */
    function stocktech_alerts_stocktech_js(){ 
	$stocktech_alerts_options = get_option( 'stocktech_alerts_options' );
	?>
		<script>
			var stocktech_alerts_settings = <?php echo json_encode( $stocktech_alerts_options ); ?>;	
			jQuery(function () {				
				setDefaultValue = function(o,n,v){
					if (typeof o == 'undefined' || o[n]==null || o[n]=='')
						o[n] = v;
				}				
				setDefaultValue(stocktech_alerts_settings,"default_height", '100%');
				setDefaultValue(stocktech_alerts_settings, "default_width", '100%');
				
				setDefaultValue(stocktech_alerts_settings, "default_logoMaxHeight", '20px');
				setDefaultValue(stocktech_alerts_settings, "default_logoMaxWidth", '90px');
				
				if (pagenow == "settings_page_stocktech-alerts-settings-config") {
					jQuery("#a_show_appkey_input").click(function(e){ 
						e.preventDefault();
						jQuery(".stocktech_register_mode").hide();
						jQuery(".stocktech_alerts_form").show();
					});
					jQuery("#a_show_register_form").click(function(e){ 
						e.preventDefault();
						jQuery(".stocktech_register_mode").show();
						jQuery(".stocktech_alerts_form").hide();
					});				
					var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
					var eventer = window[eventMethod];
					var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

					eventer(messageEvent, function (e) {
						if (typeof e != 'undefined' && typeof e.data != 'undefined' && e.data != "" && e.data.length == 32) {
							jQuery("#api_key").val(e.data);
							jQuery("#submit").click();
						}
					}, false);
									
					if (jQuery("#api_key").val()== ""){					
						if (typeof stocktech_global_settings != 'undefined' && typeof stocktech_global_settings.api_key != 'undefined' && stocktech_global_settings.api_key != "") {
							jQuery("#api_key").val(stocktech_global_settings.api_key);
							jQuery("#a_show_appkey_input").click();
						}
						if (jQuery("#default_exchange").length <= 0 && jQuery("#api_key").val()!= "" && jQuery("#api_key").val().length == 32) {
							jQuery("#submit").click();
						}
					}
				}
			

			});		
			var stocktech_alerts=1;
			
		</script><?php
	}
		 
	function stocktech_alerts_my_plugin_activate() {
		add_option('stocktech_alerts_my_plugin_do_activation_redirect', true);
	}
	 
	function stocktech_alerts_my_plugin_redirect() {
		if (get_option('stocktech_alerts_my_plugin_do_activation_redirect', false)) {
			delete_option('stocktech_alerts_my_plugin_do_activation_redirect');
			if(!isset($_GET['activate-multi']))
			{
				wp_redirect("options-general.php?page=stocktech-alerts-settings-config");
			}
		}
	}
?>
