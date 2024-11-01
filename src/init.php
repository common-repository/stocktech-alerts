<?php
/**
 * Stocktech blocks for editor preview
 */

if (!function_exists( 'register_block_type')) exit;
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function stocktech_alerts_editor_assets() {
	$version = stocktech_alerts_version;
	wp_enqueue_script(
		'stocktech-alerts-block-js',
		plugins_url( '/dist/blocks.build.js?v='.$version, dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		true
	);

	wp_enqueue_style(
		'stocktech-alerts-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css?v='.$version, dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' )
	);
	
}

add_action( 'enqueue_block_editor_assets', 'stocktech_alerts_editor_assets' );

if (!function_exists('stocktech_block_categories_function')) {
	add_filter( 'block_categories', function( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'stocktech-blocks',
					'title' => __( 'Stocktech Widgets', 'stocktech-blocks' ),
				),
			)
		);
	}, 10, 2 );
	function stocktech_block_categories_function() {
		return;
	}
}

function register_stocktech_alerts_api_blocks() {
    register_block_type(
        'cgb/stocktech-alerts',
        array(
            'attributes' => array(
                'content' => array(
                    'type' => 'string',
                ),
                'className' => array(
                    'type' => 'string',
                ),
            ),
            'render_callback' => 'stocktech_alerts_block_posts',
        )
    );
}

add_action('init', 'register_stocktech_alerts_api_blocks');

function stocktech_alerts_block_posts( $attributes ) {
    //add_action('wp_print_scripts', 'enqueueChartHistoricalAssets');
	return stocktech_alerts_func($attributes);
}

